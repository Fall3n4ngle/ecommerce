# Ecommerce

A fully functional ecommerce website that enables users to discover products they need through an advanced filtering system, add them to their cart, and make purchases.

<img width="960" alt="Project preview" src="https://github.com/Fall3n4ngle/ecommerce/assets/57858281/ea28b386-48d7-46c4-a35e-7a0bbe1f96fc">

## View app 

_https://ecommerce-amber-six.vercel.app_

## Features
- Search, sort and filter products
- See product details
- Add products to cart
- Complete product purchase
- ISR (Incremental Static Regeneration)
- Admin dashboard

<img width="960" alt="Admin dashboard preview" src="https://github.com/Fall3n4ngle/ecommerce/assets/57858281/3ea249e1-6c7a-45da-95f9-022d6a268d17">

## ISR
The application leverages Next.js’s Incremental Static Regeneration feature to provide users with pre-built pages that load quickly. When data changes, Sanity triggers a request to a webhook handler, which then revalidates the data on-demand using revalidateTag.

## Technologies Used

- _[Next.js](https://nextjs.org/)_
- _[Typescript](https://www.typescriptlang.org/)_
- _[Sanity](https://www.sanity.io/)_
- _[Stripe](https://stripe.com/)_
- _[ShadcnUi](https://ui.shadcn.com/)_
- _[React-hook-form](https://react-hook-form.com/)_
