import store from "../store";

export default function createInputField(
  labelText: string,
  inputType: "text" | "email" | "tel",
  inputID: string,
  inputName: string,
  placeholder: string,
  required: boolean = false,
) {
  const field = document.createElement("div");
  field.classList.add("field");

  const label = document.createElement("label");
  label.classList.add("field__label");
  label.htmlFor = inputID;
  label.textContent = labelText;

  const input = document.createElement("input");
  input.classList.add("field__input");
  input.type = inputType;
  input.id = inputID;
  input.placeholder = placeholder;
  input.name = inputName;
  input.required = required;

  field.appendChild(label);
  field.appendChild(input);

  input.addEventListener("change", () => {
    if (inputName in store) {
      (store as any)[inputName] = input.value;
    }
  });

  return field;
}
