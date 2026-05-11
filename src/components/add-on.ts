export default function createAddOn(
  name: string,
  description: string,
  price: number,
  billingPeriod: "mo" | "yr",
) {
  const addOn = document.createElement("section");
  addOn.classList.add("addOn");

  addOn.addEventListener("click", () => {
    addOnSelect.checked = !addOnSelect.checked;
    addOnSelect.checked
      ? addOn.classList.add("addOn--checked")
      : addOn.classList.remove("addOn--checked");
  });

  const addOnSelect = document.createElement("input");
  addOnSelect.setAttribute("type", "checkbox");
  addOnSelect.classList.add("addOn__select");
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
  addOnPricing.textContent = `+$${price}/${billingPeriod}`;
  addOnDetails.appendChild(addOnPricing);

  addOn.appendChild(addOnDetails);

  return addOn;
}
