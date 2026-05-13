import createBillingPlan from "./components/plan";
import store from "./store";

const plans = [
  { title: "Arcade" as const, price: 9 },
  { title: "Advanced" as const, price: 12 },
  { title: "Pro" as const, price: 15 },
] as const;

export default function createStepTwo(): HTMLElement {
  const stepTwo = document.createElement("section");
  stepTwo.classList.add("step__plans");

  const monthly = document.createElement("span");
  monthly.textContent = "Monthly";

  const yearly = document.createElement("span");
  yearly.textContent = "Yearly";

  const updateColors = () => {
    if (store.billingPeriod === "mo") {
      monthly.style.color = "var(--blue-950)";
      yearly.style.color = "var(--gray-500)";
    } else {
      monthly.style.color = "var(--gray-500)";
      yearly.style.color = "var(--blue-950)";
    }
  };

  const renderPlans = () => {
    const existingPlans = Array.from(stepTwo.getElementsByClassName("plan"));

    plans.forEach((plan, index) => {
      const billingPlan = createBillingPlan(plan.title, plan.price);
      if (store.planName === plan.title)
        billingPlan.classList.add("plan--selected");

      existingPlans.length > 0
        ? existingPlans[index].replaceWith(billingPlan)
        : stepTwo.appendChild(billingPlan);
    });
  };

  renderPlans();

  const toggle = document.createElement("button");
  toggle.classList.add("switcher__toggle");

  // Reflect persisted billing period on re-entry
  if (store.billingPeriod === "yr") {
    toggle.classList.add("switcher__toggle--switched");
  }

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("switcher__toggle--switched");
    store.billingPeriod = store.billingPeriod === "mo" ? "yr" : "mo";

    // Recalculate plan price if one is selected
    if (store.planName) {
      const basePrices = { Arcade: 9, Advanced: 12, Pro: 15 };
      const planName = store.planName as "Arcade" | "Advanced" | "Pro";
      store.planPrice =
        store.billingPeriod === "mo"
          ? basePrices[planName]
          : basePrices[planName] * 10;
    }

    // Recalculate add-on prices
    store.addOns = store.addOns.map((addOn) => {
      const basePrices = {
        "Online service": 1,
        "Larger storage": 2,
        "Customizable profile": 2,
      };
      const basePrice = basePrices[addOn.name as keyof typeof basePrices];
      return {
        ...addOn,
        price: store.billingPeriod === "mo" ? basePrice : basePrice * 10,
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

  updateColors();

  toggleContainer.append(monthly, toggle, yearly);
  stepTwo.appendChild(toggleContainer);

  return stepTwo;
}
