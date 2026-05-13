import type { BillingPeriod, AddOn } from "./definitions";

const rawState = {
  currentStep: 0,
  name: "",
  email: "",
  phone: "",
  addOns: [] as Array<AddOn>,
  billingPeriod: "mo" as BillingPeriod,
  planName: "",
  planPrice: 0,
};

const store = new Proxy(rawState, {
  set(target, property, value) {
    target[property] = value;
    return true;
  },

  get(target, property) {
    return target[property];
  },
});

export default store;
