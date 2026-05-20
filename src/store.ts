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

type StoreState = typeof rawState;

const store = new Proxy(rawState, {
  set(target: StoreState, property: string | symbol, value: any): boolean {
    if (property in target) {
      (target as any)[property] = value;
      return (target as any)[property] === value;
    }
    return false;
  },

  get(target: StoreState, property: string | symbol) {
    if (property in target) {
      return (target as any)[property];
    } else {
      throw new Error(
        `Property ${String(property)} does not exist in the store`,
      );
    }
  },
});

export default store;
