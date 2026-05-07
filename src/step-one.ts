import btnNext from "./btn-next";
import { hasEmptyInputs } from "./utils";

const stepOne = document.createElement("section");
stepOne.classList.add("step");

const stepOneHeader = document.createElement("header");
stepOneHeader.classList.add("step__header");

const stepOneTitle = document.createElement("h1");
stepOneTitle.classList.add("step__title");
stepOneTitle.textContent = "Personal info";

const stepOneDescription = document.createElement("p");
stepOneDescription.classList.add("step__description");
stepOneDescription.textContent =
  "Please provide your name, email address, and phone number.";

stepOneHeader.appendChild(stepOneTitle);
stepOneHeader.appendChild(stepOneDescription);

const stepOneForm = document.createElement("form");
stepOneForm.classList.add("step__form");
stepOneForm.action = "#";
stepOneForm.addEventListener("input", () => {
  btnNext.disabled = hasEmptyInputs(stepOneForm);
});

const fields = [
  {
    label: "Name",
    id: "name",
    placeholder: "e.g. Stephen King",
    type: "text",
  },
  {
    label: "Email Address",
    id: "email",
    placeholder: "e.g. stephenking@lorem.com",
    type: "email",
  },
  {
    label: "Phone Number",
    id: "phone",
    placeholder: "e.g. +1 234 567 890",
    type: "tel",
  },
];

fields.forEach((field) => {
  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("fieldset");

  const label = document.createElement("label");
  label.classList.add("fieldset__label");
  label.textContent = field.label;
  label.htmlFor = field.id;

  const input = document.createElement("input");
  input.classList.add("fieldset__input");
  input.type = field.type;
  input.name = field.id;
  input.id = field.id;
  input.placeholder = field.placeholder;
  input.required = true;

  fieldset.appendChild(label);
  fieldset.appendChild(input);

  stepOneForm.appendChild(fieldset);
});

btnNext.textContent = "Next Step";
btnNext.disabled = hasEmptyInputs(stepOneForm);
stepOneForm.appendChild(btnNext);

stepOne.appendChild(stepOneHeader);
stepOne.appendChild(stepOneForm);

export default stepOne;
