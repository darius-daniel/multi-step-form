import createAddOn from "./components/add-on";

const addOns = [
  {
    id: 1,
    title: "Online service",
    description: "Access to multiplayer games",
    billingPeriod: "mo",
    price: 1,
  },
  {
    id: 2,
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    billingPeriod: "mo",
    price: 2,
  },
  {
    id: 3,
    title: "Customizable profile",
    description: "Custom theme on your profile",
    billingPeriod: "mo" as const,
    price: 2,
  },
] as const;

const stepThree = document.createElement("section");
stepThree.classList.add("step__addOns");

addOns.forEach((addOn) => {
  const addOnElement = createAddOn(
    addOn.title,
    addOn.description,
    addOn.price,
    addOn.billingPeriod,
  );
  addOnElement.classList.add("addOn__container");

  stepThree.appendChild(addOnElement);
});

export default stepThree;
