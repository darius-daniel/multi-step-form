import createBillingPlan from "./components/plan";

const stepTwo = document.createElement("section");
stepTwo.classList.add("step__plans");

const plans = [
  { title: "Arcade" as const, price: 90 },
  { title: "Advanced" as const, price: 120 },
  { title: "Pro" as const, price: 150 },
] as const;

plans.forEach((plan) => {
  const billingPlan = createBillingPlan(plan.title, plan.price);
  stepTwo.appendChild(billingPlan);
});

export default stepTwo;
