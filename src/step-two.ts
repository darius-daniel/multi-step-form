import createBillingPlan from "./components/plan";
import formData from "./definitions";

const stepTwo = document.createElement("section");
stepTwo.classList.add("step__plans");

const plans = [
  { title: "Arcade" as const, price: 9 },
  { title: "Advanced" as const, price: 12 },
  { title: "Pro" as const, price: 15 },
] as const;

const updateColors = () => {
  if (formData.billingPeriod === "mo") {
    monthly.style.color = "var(--blue-950)";
    yearly.style.color = "var(--gray-500)";
  } else {
    monthly.style.color = "var(--gray-500)";
    yearly.style.color = "var(--blue-950)";
  }
};

const renderPlans = () => {
  const existingPlans = Array.from(document.getElementsByClassName("plan"));

  plans.forEach((plan, index) => {
    const billingPlan = createBillingPlan(plan.title, plan.price);
    if (formData.plan.name === plan.title)
      billingPlan.classList.add("plan--selected");

    existingPlans.length > 0
      ? existingPlans[index].replaceWith(billingPlan)
      : stepTwo.appendChild(billingPlan);
  });
};

renderPlans();

const toggle = document.createElement("button");
toggle.classList.add("switcher__toggle");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("switcher__toggle--switched");
  formData.billingPeriod = formData.billingPeriod === "mo" ? "yr" : "mo";

  // Recalculate plan price if one is selected
  if (formData.plan.name) {
    const basePrices = { Arcade: 9, Advanced: 12, Pro: 15 };
    const planName = formData.plan.name as "Arcade" | "Advanced" | "Pro";
    formData.plan.price =
      formData.billingPeriod === "mo"
        ? basePrices[planName]
        : basePrices[planName] * 10;
  }

  // Recalculate add-on prices
  formData.addOns = formData.addOns.map((addOn) => {
    const basePrices = {
      "Online service": 1,
      "Larger storage": 2,
      "Customizable profile": 2,
    };
    const basePrice = basePrices[addOn.name as keyof typeof basePrices];
    return {
      ...addOn,
      price: formData.billingPeriod === "mo" ? basePrice : basePrice * 10,
    };
  });

  renderPlans();
  updateColors();
});

const toggleIndicator = document.createElement("span");
toggleIndicator.classList.add("switcher__indicator");
toggle.append(toggleIndicator);

const toggleContainer = document.createElement("div");
toggleContainer.classList.add("switcher__container");

const monthly = document.createElement("span");
monthly.textContent = "Monthly";

const yearly = document.createElement("span");
yearly.textContent = "Yearly";

updateColors();

toggleContainer.append(monthly, toggle, yearly);

stepTwo.appendChild(toggleContainer);

export default stepTwo;
