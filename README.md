# Ecommerce

A fully functional ecommerce website that enables users to discover products they need through an advanced filtering system, add them to their cart, and make purchases.

<img width="960" alt="Project preview" src="https://github.com/Fall3n4ngle/ecommerce/assets/57858281/d1f9954c-b4b3-485d-80c4-b8b0ba15e379">

## View app 

_https://ecommerce-amber-six.vercel.app_

## Features
- Search, sort and filter products
- See product details
- Add products to cart
- Complete product purchase
- ISR (Incremental Static Regeneration)
- Admin dashboard

<img width="960" alt="Admin dashboard preview" src="https://github.com/Fall3n4ngle/ecommerce/assets/57858281/c7abb318-35b1-4b58-8f27-de9f2215ba5b">

## ISR
The application leverages Next.js’s Incremental Static Regeneration feature to provide users with pre-built pages that load quickly. When data changes, Sanity triggers a request to a webhook handler, which then revalidates the data on-demand using revalidateTag.

## Technologies Used

- _[Next.js](https://nextjs.org/)_
- _[Typescript](https://www.typescriptlang.org/)_
- _[Sanity](https://www.sanity.io/)_
- _[Stripe](https://stripe.com/)_
- _[ShadcnUi](https://ui.shadcn.com/)_
- _[React-hook-form](https://react-hook-form.com/)_
