- A README with the following
    - Short description of the project
        - Time spend
        - The implementation that was most challenging
        - The implementation you are most proud of
    - Concise description of how you structured the project and any considerations you might have had

# A simple storefront

This is meant to be a very basic implementation of the simplest possible storefront that consumes the headless store using MedusaJS.
Only an initial listing of all products and detailed view is available (no add to Cart functionality).

## Running locally

Pretty straightforward Next.js usage: clone the repo, yarn install, `yarn dev`. Make sure to have the Medusa server up and running, **and** allow its CORS setting to find a storefront at port `3000`, which by default it isn't.

## Building details & challenges

A total of 6.5 hours were spent on this project, including the initial Medusa SDK documentation and strategizing how to do certain actions using Next.js. It uses `styled-components` for styling (alongside some shared UI components), and TypeScript for type annotation.

A good chunk of time (probably 1.5h in total) was spent fighting some environment issues: `styled-components` didn't play nice with Next.js initially and styling was lost every time the server hot-reloaded. As is turned out, Next.js needs some special configuration for styled-components; I probably have duplicate fixes both on `.babelrc` and on `next.config.js`.

`TypeScript` is also giving me some trouble with `styled-components`, as my usual usage of both isn't really allowing me to infer types on my custom components. I've spent a great deal of time trying to ensure the `{theme}` prop was typed, but it's still coming across as `any`. Had I had more time, I'd look into fixing whatever is causing type infer issues here.

Given my lack of experience with Next.js, some patterns aren't the most performant for a production-ready website. Learning more on the job, I probably would now experiment with `getStaticProps` for product fetching instead of `getServerSideProps`, and make more efficient use of templates for my pages. This wasn't a priority however, given only 2 pages for now.