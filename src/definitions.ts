export interface BillingPlan {
  name: string;
  price: number;
}

export type BillingPeriod = "mo" | "yr";

export interface AddOn {
  name: string;
  price: number;
}

export interface StoreData {
  name: string;
  email: string;
  phone: string;
  plan: BillingPlan;
  billingPeriod: BillingPeriod;
  addOns: Array<AddOn>;
}

export interface FormStep {
  element: HTMLElement;
  isValid: () => boolean;
}
