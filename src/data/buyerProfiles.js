import { estateTypes } from "@/data/estateTypes";
import { faker } from "@faker-js/faker";

const priceFormatter = new Intl.NumberFormat("da-DK", {
  currency: "DKK",
  style: "currency",
  maximumFractionDigits: 0,
});

/**
 * Generate a fake profile for a potential buyer.
 */
function generateBuyerProfile() {
  const today = new Date();
  const endDate = new Date();
  // Set the end date to 3 months from now.
  endDate.setMonth(endDate.getMonth() + 3);

  const result = {
    id: faker.datatype.uuid().split("-")[0],
    /** Maximum price in kr */
    priceMax: faker.datatype.number({ min: 5, max: 200 }) * 100000,
    /** Minimum size in m2 */
    minSize: faker.datatype.number({ min: 60, max: 300 }),
    adults: faker.datatype.number({ min: 1, max: 2 }),
    children: faker.datatype.number({ min: 0, max: 5 }),
    description: faker.lorem.paragraph(),
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
    result.priceMax
  )} ${faker.lorem.sentence()}`;

  return result;
}

/**
 * Generate a fake list of buyer profiles for a given zip code
 * @param zipCode {number}
 * @param min? {number}
 * @param max? {number}
 * @returns {{ priceMax: number, estateType: string, takeoverDate: string, children: number, adults: number, description: string, minSize: number, id: string}[]}
 */
export function generateBuyerProfiles({
  zipCode = 2100,
  min = 0,
  max = undefined,
} = {}) {
  faker.seed(zipCode);

  return Array.from(
    {
      length: faker.datatype.number({
        min: min !== undefined ? min : 0,
        max: max !== undefined ? max : 100,
      }),
    },
    generateBuyerProfile
  );
}
