import store from "../store";

export default function createAddOn(
  name: string,
  description: string,
  price: number,
) {
  const addOn = document.createElement("section");
  addOn.classList.add("addOn");

  const addOnSelect = document.createElement("input");
  addOnSelect.setAttribute("type", "checkbox");
  addOnSelect.classList.add("addOn__select");

  // Reflect persisted checked state from store
  const isChecked = store.addOns.some((a) => a.name === name);
  if (isChecked) {
    addOnSelect.checked = true;
    addOn.classList.add("addOn--checked");
  }

  addOn.addEventListener("click", () => {
    addOnSelect.checked = !addOnSelect.checked;
    addOn.classList.toggle("addOn--checked");

    if (addOnSelect.checked) {
      store.addOns.push({
        name,
        price: store.billingPeriod === "mo" ? price : price * 10,
      });
    } else {
      store.addOns = store.addOns.filter((item) => item.name !== name);
    }
  });

  addOn.appendChild(addOnSelect);

  const addOnDetails = document.createElement("div");
  addOnDetails.classList.add("addOn__details");

  const div = document.createElement("div");
  addOnDetails.appendChild(div);

  const addOnName = document.createElement("h3");
  addOnName.classList.add("addOn__name");
  addOnName.textContent = name;
  div.appendChild(addOnName);

  const addOnDescription = document.createElement("p");
  addOnDescription.classList.add("addOn__description");
  addOnDescription.textContent = description;
  div.appendChild(addOnDescription);

  const addOnPricing = document.createElement("span");
  addOnPricing.classList.add("addOn__pricing");
  addOnPricing.textContent = `+$${store.billingPeriod === "mo" ? price : price * 10}/${store.billingPeriod}`;
  addOnDetails.appendChild(addOnPricing);

  addOn.appendChild(addOnDetails);

  return addOn;
}
