# Goal

Allow store owners to add custom fields to their products.

# Key Business Logic

- Custom Fields should be of a predictable type (strings, dates, etc)
- A product can have many custom fields
- Custom Fields should be accessible from any product API listing
- The type schemas should reflect the new custom fields added to the products from a DX POV

# Some thoughts around implementation

**Please note that this is not RFC material, but more of a brain dump of ideas, thoughts and patterns that would make up an initial discussion material in order to move to an RFC.**

Upon researching how to model this in a database, I came across the very interesting rabbit hole that is the **Entity-Attribute-Value problem** in SQL. It may be helpful in discovering what **not** to do when creating a technical solution for this.

Our objective here is to **support variable attributes**, meaning, allow for schema extensibility with minimal additional programming. Entity-Attribute-Value (EAV) as a solution offers a few pitfalls and it's certainly worth running through these since they may offer anti-pattern clues.

## Considerations: is creating a new table for fields a good pattern?

One of the common EAV pitfalls seems to be defaulting to "creating a new table" that supports variable attributes. Here's a few considerations when defaulting to this idea of "just adding more tables".

Each row in this new Attribute table would have 3 columns:

- The entity (a foreign key to a parent table that has one row per entity)
- The attribute (the name of the column, which needs to be identifiable on every row)
- The value itself (each entity has a value)

Simple pseudo-schema code:

```
TABLE Products (
  custom_field_id
);

TABLE CustomFieldAttributes (
  custom_field_id
  attr_name
  attr_value
  PRIMARY KEY (custom_field_id, attr_name)
  FOREIGN KEY (custom_field_id)
);

INSERT INTO CustomFieldAttributes (custom_field_id, attr_name, attr_value) VALUES
  (1234, 'custom_field_1', 'x')
  (1234, 'custom_field_2', 'something else')
  (1234, 'status', 'etc)
```

While appearing simple at first, this adds some overhead when used: EAV sacrifices advantages of a conventional database design:

- All queries for custom_fields now need to reference this new table, making them more verbose and less clear
- Data integrity is now less enforceable: we can't enforce mandatory attributes like we can with conventional database design (ie, setting a `NOT NULL` rule)
- In this design, every attribute corresponds to a row in the new table, **not a column**: we need to write more code to enforce constraints
- We can't enforce SQL data types, since we also can't control it per row.
- Databases should not be completely extensible without metadata changes; EAV supports this anti-pattern

## Alternatives to EAV

Although a broad consideration for the time being, we could think about modelling the subtypes for custom fields. These solutions typically seem to work best when there is a finite number of subtypes and their attributes are known.

Patterns such as **Concrete Table Inheritance** and **Class Table Inheritance** do rely on extra tables being created, but this time a separate table for each known custom attribute, as to model them in a predictable fashion. Therefore, there is a one-to-one metadata relationship with all the known (and finite) subtypes.

There is also another resource worth considering, and that is storing these attributes in a **semistructured way** (typically, `JSON`) in the database. This would encode both the attribute names and their values in the same table. While this pattern is very extensible, it can be a little cumbersome to access this type of data using SQL.

## Making use of Medusa's Entities

With some of the lessons from these anti-patterns in mind, we could take a first stab at modelling a solution for custom attributes in Medusa.

A possible solution would involve creating a new Entity, (CustomFieldEntity), that could extend `Product` or `BaseEntity` (unsure). This would ensure the backend would ship with a predictable, flexible schema that could be easily migrated into for existing users.

The fields would then refer to the potential subtypes of custom fields we'd want to support (data type). This is crucial not just for data modelling, but so the user interface knows how to process each custom field, at Admin and Storefront level.

As far as the developer experience (DX) is concerned, we also want to provide ways for `TypeScript` to recognize each new attribute. For this, wherever it is that makes more sense (I'm not yet very familiar with Medusa's codebase), we could provide ways to merge the Product interface with a new, customized, interface which declares the new entities.

### API Layer

At the very least, we'll want to support 3 basic actions: `create`, `update` and `delete` a custom entity.
