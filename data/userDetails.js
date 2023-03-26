import { Chance } from "chance";

const chance = new Chance();

export const userDetails = {
  userName: "standard_user",
  password: "secret_sauce",
  firstName: chance.first(),
  lastName: chance.last(),
  postalCode: chance.postal(),
};
