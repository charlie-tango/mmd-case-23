import { generateBuyerProfiles } from "@/data/buyerProfiles";

/**
 * Next.js API route support: https://nextjs.org/docs/api-routes/introduction
 * @param req {import('next').NextApiRequest}
 * @param res {import('next').NextApiResponse}
 */
export default function handler(req, res) {
  // Basic example of how you can create an API route.
  // You can open the browser, and go to http://localhost:3000/api/find-buyers to see the response.

  // Find the zip code from the query parameters, and use it to generate a list of (fake) buyer profiles.
  const zipCode = req.query.zipCode;
  const profilesForZipCode = generateBuyerProfiles({
    zipCode: parseInt(zipCode || "0"),
  });

  // Set the cache headers, so that the response can be cached
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");

  // Make sure to filter out profiles based on the other query parameters. e.g. minSize, maxPrice, etc.
  return res.status(200).json(profilesForZipCode);
}
