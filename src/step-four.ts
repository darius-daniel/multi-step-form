import createTableRow from "./components/table-row";
import formData from "./definitions";

const stepFour = document.createElement("table");
stepFour.classList.add("summary");

const tableHead = document.createElement("thead");

const headRow = createTableRow();
headRow.classList.add("table__head");
const headCellOne = document.createElement("th");

const cellGroup = document.createElement("div");
cellGroup.classList.add("cellgroup");

const planName = document.createElement("span");
planName.textContent = `${formData.plan.name} (${formData.billingPeriod === "mo" ? "Monthly" : "Yearly"})`;

const planChangeBtn = document.createElement("button");
planChangeBtn.id = "btn__planChange";
planChangeBtn.textContent = "Change";

cellGroup.append(planName, planChangeBtn);
headCellOne.appendChild(cellGroup);

const headCellTwo = document.createElement("th");
headCellTwo.textContent = "$90/yr";

headRow.append(headCellOne, headCellTwo);
tableHead.appendChild(headRow);

const tableBody = document.createElement("tbody");
tableBody.classList.add("table__body");

formData.addOns.forEach((addOn) => {
  const newRow = createTableRow();

  const addOnName = document.createElement("td");
  addOnName.classList.add("addOn__name");
  addOnName.textContent = addOn.name;

  const addOnPrice = document.createElement("td");
  addOnPrice.classList.add("addOn__price");
  addOnPrice.textContent = `${addOn.price}`;

  newRow.append(addOnName, addOnPrice);
  tableBody.appendChild(newRow);
});

const tableFoot = document.createElement("tfoot");
tableFoot.classList.add("table__foot");

stepFour.append(tableHead, tableBody, tableFoot);

export default stepFour;
