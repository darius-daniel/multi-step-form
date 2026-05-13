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
    addOnName.classList.add("addOn__name");
    addOnName.textContent = addOn.name;

    const addOnPrice = document.createElement("td");
    addOnPrice.classList.add("addOn__price");
    addOnPrice.textContent = `+$${addOn.price}/${store.billingPeriod}`;

    newRow.append(addOnName, addOnPrice);
    tableBody.appendChild(newRow);
  });

  const tableFoot = document.createElement("tfoot");
  tableFoot.classList.add("table__foot");

  // Total row
  const totalRow = createTableRow();
  const totalLabel = document.createElement("td");
  totalLabel.textContent = `Total (per ${store.billingPeriod === "mo" ? "month" : "year"})`;

  const totalValue = document.createElement("td");
  const addOnTotal = store.addOns.reduce((sum, a) => sum + a.price, 0);
  totalValue.textContent = `+$${store.planPrice + addOnTotal}/${store.billingPeriod}`;

  totalRow.append(totalLabel, totalValue);
  tableFoot.appendChild(totalRow);

  stepFour.append(tableHead, tableBody, tableFoot);

  return stepFour;
}
