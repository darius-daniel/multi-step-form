import createTableRow from "./components/table-row";
import store from "./store";

export default function createStepFour(): HTMLTableElement {
  const stepFour = document.createElement("table");
  stepFour.classList.add("summary");

  const tableHead = document.createElement("thead");

  const headRow = createTableRow();
  headRow.classList.add("table__head");
  const headCellOne = document.createElement("th");

  const cellGroup = document.createElement("div");
  cellGroup.classList.add("cellgroup");

  const planName = document.createElement("span");
  planName.textContent = `${store.planName} (${store.billingPeriod === "mo" ? "Monthly" : "Yearly"})`;

  const planChangeBtn = document.createElement("button");
  planChangeBtn.id = "btn__planChange";
  planChangeBtn.textContent = "Change";

  cellGroup.append(planName, planChangeBtn);
  headCellOne.appendChild(cellGroup);

  const headCellTwo = document.createElement("th");
  headCellTwo.textContent = `$${store.planPrice}/${store.billingPeriod}`;

  headRow.append(headCellOne, headCellTwo);
  tableHead.appendChild(headRow);

  const tableBody = document.createElement("tbody");
  tableBody.classList.add("table__body");

  store.addOns.forEach((addOn) => {
    const newRow = createTableRow();

    const addOnName = document.createElement("td");
    addOnName.classList.add();
    addOnName.textContent = addOn.name;

    const addOnPrice = document.createElement("td");
    addOnPrice.classList.add();
    addOnPrice.textContent = `+$${addOn.price}/${store.billingPeriod}`;

    newRow.append(addOnName, addOnPrice);
    tableBody.appendChild(newRow);
  });

  // Total row
  const totalSection = document.createElement("section");
  totalSection.classList.add("total");
  const totalLabel = document.createElement("span");
  totalLabel.classList.add("total__label");

  totalLabel.textContent = `Total (per ${store.billingPeriod === "mo" ? "month" : "year"})`;

  const totalValue = document.createElement("td");
  totalValue.classList.add("total__value");
  const addOnTotal = store.addOns.reduce((sum, a) => sum + a.price, 0);
  totalValue.textContent = `+$${store.planPrice + addOnTotal}/${store.billingPeriod}`;

  totalSection.append(totalLabel, totalValue);

  stepFour.append(tableHead, tableBody, totalSection);

  return stepFour;
}
