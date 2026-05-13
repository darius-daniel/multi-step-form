import store from "../store";

export default function createBillingPlan(
  name: "Arcade" | "Advanced" | "Pro",
  price: number,
) {
  const plan = document.createElement("button");
  plan.classList.add("plan");

  const icon = document.createElement("img");
  icon.classList.add("plan__icon");
  icon.src = `/src/assets/images/icon-${name.toLowerCase()}.svg`;
  plan.appendChild(icon);

  const div = document.createElement("div");

  const planName = document.createElement("h2");
  planName.classList.add("plan__name");
  planName.textContent = name;
  div.appendChild(planName);

  const planPricing = document.createElement("p");
  planPricing.classList.add("plan__pricing");
  planPricing.textContent = `$${store.billingPeriod === "mo" ? price : price * 10}/${store.billingPeriod}`;
  div.appendChild(planPricing);

  if (store.billingPeriod === "yr") {
    const planBonus = document.createElement("p");
    planBonus.classList.add("plan__bonus");
    planBonus.textContent = "2 months free";
    div.appendChild(planBonus);
  }

  plan.append(div);

  plan.addEventListener("click", () => {
    // Remove selected class from all plans
    const allPlans = document.querySelectorAll(".plan");
    allPlans.forEach((p) => p.classList.remove("plan--selected"));

    // Add selected class to clicked plan
    plan.classList.add("plan--selected");

    store.planName = name;
    store.planPrice = store.billingPeriod === "mo" ? price : price * 10;
  });
  return plan;
}
