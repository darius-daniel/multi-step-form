export interface IBillingPlan {
  name: string;
  price: number;
}

export type BillingPeriod = "mo" | "yr";

export interface IAddOn {
  name: string;
  price: number;
}

export interface IFormData {
  name: string;
  email: string;
  phone: string;
  plan: IBillingPlan;
  billingPeriod: BillingPeriod;
  addOns: Array<IAddOn>;
}

const formData: IFormData = {
  name: "",
  email: "",
  phone: "",
  addOns: [],
  billingPeriod: "mo",
  plan: {
    name: "",
    price: 0,
  },
};

export default formData;
