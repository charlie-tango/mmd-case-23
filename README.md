# MMD Case | EDC - Find Buyers

## The task

You should design and implement a Next.js application, that allows users to find potential buyers for their real estate property.

### The suggested screen flow is as follows:

- A **landing page**, that prompts the user to enter a few details about the property they want to sell. Submitting the form, should send the user to the next page.
- A **results page**, that displays a list of potential buyers, based on the zip code, and other details, entered by the user.
- A **contact page**, that allows the user to fill in their contact details, so EDC can contact the potential buyers on their behalf.
- A **confirmation page**, that lets the user know that EDC will contact them shortly.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/find-buyers). This endpoint can be edited in `pages/api/find-buyers.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Structure

### Mock data

To get you started, the following mock data is provided under `/src/data`:

- `buyerProfiles.js` - Generate a list of potential buyers, based on the zip code.
- `estateTypes.js` - A fixed list of estate types. You can use this directly in a `<select>` element, by importing it.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
