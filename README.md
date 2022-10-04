# Medusa Storefront (well, sort of)

This is meant to be a very basic implementation of the simplest possible storefront that consumes the headless store using MedusaJS.
Only an initial listing of all products and detailed view is available (no add to Cart functionality).

## Running locally

Pretty straightforward Next.js usage: clone the repo, yarn install, `yarn dev`. Make sure to have the Medusa server up and running, **and** allow its CORS setting to find a storefront at port `3000`, which by default it isn't.

## Building details & challenges

A total of 6.5 hours were spent on this project, including the initial Medusa SDK documentation and strategizing how to do certain actions using Next.js. It uses `styled-components` for styling (alongside some shared UI components), and TypeScript for type annotation.

A good chunk of time (probably 1.5h in total) was spent fighting some environment issues: `styled-components` didn't play nice with Next.js initially and styling was lost every time the server hot-reloaded. As is turned out, Next.js needs some special configuration for styled-components; I probably have duplicate fixes both on `.babelrc` and on `next.config.js`.

`TypeScript` is also giving me some trouble with `styled-components`, as my usual usage of both isn't really allowing me to infer types on my custom components. I've spent a great deal of time trying to ensure the `{theme}` prop was typed, but it's still coming across as `any`. Had I had more time, I'd look into fixing whatever is causing type infer issues here.

Given my lack of experience with Next.js, some patterns aren't the most performant for a production-ready website. Learning more on the job, I probably would now experiment with `getStaticProps` for product fetching instead of `getServerSideProps`, and make more efficient use of templates for my pages. This wasn't a priority however, given only 2 pages for now.

## What I left unfinished

### Variants in State

It was only this morning that I realized I failed to notice that **we need one dropdown per option (variant)**. Before, I made use of the object that allowed me to have all possible combinations in one dropdown (eg, X / White, X / Black), which was selecting the variant correctly and storing it in state (as in, the price was being pulled from the correct variant selected). With just an hour to correct my mistake, I did make the **as many dropdowns as there are variants** requirement appear in the UI, but I needed a little more time to make sure the correct `option_id` would be selected in state (eg, if we were indeed adding to the Cart, this would matter).

### Global Store configuration

I didn't get to create any React Provider for this storefront (apart from the Theme Provider), but I'd love to get some store details into one, namely anything concerning Region/Currency preferred by the client. When displaying prices, I'm making a currency assumption, but ideally this would depend on user preference. A Provider that would store these settings (and allow the user to change them) could be a recommended approach.

### Collections

While I check for the existence of collections, I don't render anything even if they exist, for lack of time. I would have taken a similar approach to the `product/[id]` page to collections. Ideally, also creating some sort of template for this page too, avoiding pages that have too much happening in them (ie, too many components).

Depending on the design and requirements, I imagine that the product details (especially dropdowns of variants) could also be created as reusable modules, as to not have any data manipulation logic to display them.

### Accessibility

Because I relied on native components (`<select>` and `<input type="number">`) for these pages, the experience should be accessible. Obviously, the `input type="number"` isn't great user experience, and I would like to build a component with dedicated plus/minus buttons to increment this input. These buttons would have an associated `aria-describedBy` or `aria-label` in order to correctly link them to the amount input.

The `amount` input is able to receive and ID so I could link it with the `Amount` label using `aria-describedBy`, but didn't implement this in the end. Maybe I will tonight when you're not looking 👀

### DX

Some of the developer experience bits are frustrating but easily solved: I can think of creating aliases for the `/lib` and `/components/shared` folders in order to avoid the `../../../../` frustrating hell when importing them.

Error handling is also next to none here. While I did grab a generic `ErrorBoundary` and wrapped the main app with it, it's not the most helpful or useful error boundary in the world. I figured that throwing a `try/catch` in the server-side fetching of Next.js wouldn't be as helpful as it is on the client, so I refrained from doing so until I can read some documentation about error handling in Next.js.