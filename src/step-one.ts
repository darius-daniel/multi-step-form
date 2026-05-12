import createInputField from "./components/input-field";
import formData from "./definitions";

const stepOne: HTMLFormElement = document.createElement("form");
stepOne.action = "#";
stepOne.classList.add("step__form");

const formFields = [
  {
    label: "Name",
    type: "text" as const,
    name: "name",
    id: "name",
    placeholder: "e.g. Stephen King",
    required: true,
  },
  {
    label: "Email Address",
    type: "email" as const,
    name: "email",
    id: "email",
    placeholder: "e.g. stephenking@lorem.com",
    required: true,
  },
  {
    label: "Phone Number",
    type: "tel" as const,
    name: "phone",
    id: "phone",
    placeholder: "e.g. +1 234 567 890",
    required: true,
  },
] as const;

formFields.forEach((formField) => {
  const field = createInputField(
    formField.label,
    formField.type,
    formField.id,
    formField.name,
    formField.placeholder,
    formField.required,
  );

  stepOne.appendChild(field);
});

stepOne.addEventListener("change", () => {
  const nextButton = document.getElementById("btn__next") as HTMLButtonElement;
  nextButton.disabled = !stepOne.checkValidity();

  if (stepOne.checkValidity()) flushStepOne();
});

export function flushStepOne() {
  const data = new FormData(stepOne);
  formData.name = data.get("name") as string;
  formData.email = data.get("email") as string;
  formData.phone = data.get("phone") as string;
}

export default stepOne;
