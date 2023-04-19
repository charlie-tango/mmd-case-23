import { estateTypes } from "@/data/estateTypes";
import { faker } from "@faker-js/faker";

const priceFormatter = new Intl.NumberFormat("da-DK", {
  currency: "DKK",
  style: "currency",
  maximumFractionDigits: 0,
});

function toNearestHundredThousand(number) {
  return Math.floor(number / 100000) * 100000;
}

/**
 * Generate a fake profile for a potential buyer.
 * Feel free to adjust this date to fit your needs.
 */
export function generateBuyerProfile({ price = 5000000, size = 100 } = {}) {
  const today = new Date();
  const endDate = new Date();
  // Set the end date to 3 months from now.
  endDate.setMonth(endDate.getMonth() + 3);

  const result = {
    id: faker.datatype.uuid().split("-")[0],
    /** Maximum price in kr */
    maxPrice: toNearestHundredThousand(
      faker.datatype.number({
        min: price * 0.5,
        max: price * 1.5,
      })
    ),
    /** Minimum size in m2 */
    minSize: faker.datatype.number({
      min: Math.floor(size * 0.5),
      max: Math.floor(size * 1.5),
    }),
    adults: faker.datatype.number({ min: 1, max: 2 }),
    children: faker.datatype.number({ min: 0, max: 5 }),
    description: "",
    /** The type of estate the buyer is looking for. This is just the ID, so we can find the value in `estateTypes.js` */
    estateType:
      estateTypes[
        faker.datatype.number({ min: 0, max: estateTypes.length - 1 })
      ].id,
    takeoverDate: faker.date
      .between(today, endDate)
      .toISOString()
      .split("T")[0],
  };

  let familyName;
  if (result.adults === 2) {
    if (result.children === 0) {
      familyName = "Couple";
    } else {
      familyName = "Family";
    }
  } else {
    if (result.children === 0) {
      familyName = "Single";
    } else {
      familyName = "Single parent";
    }
  }

  result.description = `${familyName} is looking for a ${
    estateTypes.find((item) => item.id === result.estateType).name
  } with a minimum size of ${
    result.minSize
  } m2 and a maximum price of ${priceFormatter.format(
    result.maxPrice
  )} ${faker.lorem.sentence()}`;

  return result;
}

/**
 * Generate a fake list of buyer profiles for a given zip code
 * @param zipCode {number} Filter profiles based on the zipCode
 * @param price {number} Price in kr
 * @param size {number} Size in square meters
 * @param minResults? {number} Minimum number of profiles to generate
 * @param maxResults? {number} Maximum number of profiles to generate
 * @returns {{ maxPrice: number, estateType: string, takeoverDate: string, children: number, adults: number, description: string, minSize: number, id: string}[]}
 */
export function generateBuyerProfiles({
  zipCode,
  price = undefined,
  size = undefined,
  minResults = 0,
  maxResults = 20,
} = {}) {
  if (!zipCode) return [];
  faker.seed(zipCode);

  return Array.from(
    {
      length: faker.datatype.number({
        min: minResults,
        max: maxResults,
      }),
    },
    () => generateBuyerProfile({ price, size })
  );
}
