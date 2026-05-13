import { stepFactories } from "./main";
import store from "./store";

const stepHeaders = [
  {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number",
  },
  {
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing",
  },
  {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience",
  },
  {
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
  },
];

export const stepMarkers = document.getElementsByClassName("navItem__marker");

export function hasEmptyInputs(form: HTMLFormElement): boolean {
  const inputs = Array.from(
    form.querySelectorAll<HTMLInputElement>("input[required]"),
  );
  return inputs.some((input) => input.value.trim().length === 0);
}

export function flushStepOne(stepOne: HTMLFormElement) {
  const data = new FormData(stepOne);
  store.name = data.get("name") as string;
  store.email = data.get("email") as string;
  store.phone = data.get("phone") as string;
}

export function goToStep(targetIndex: number) {
  stepMarkers.item(store.currentStep)?.classList.remove("highlightMarker");
  store.currentStep = targetIndex;
  updateStep();
  updateFooter();
}

export function updateFooter() {
  const stepMarker = stepMarkers.item(store.currentStep);
  stepMarker.classList.add("highlightMarker");

  const btnPrev = document.getElementById("btn__prev");
  btnPrev.style.display = store.currentStep === 0 ? "none" : "block";

  const stepFooter = document.getElementsByClassName(
    "step__footer",
  )[0] as HTMLElement;
  stepFooter.style.justifyContent =
    store.currentStep === 0 ? "flex-end" : "space-between";
}

export function updateStep() {
  const stepMarker = stepMarkers.item(store.currentStep);
  stepMarker.classList.add("highlightMarker");

  const stepTitle = document.getElementsByClassName("step__title")[0];
  stepTitle.textContent = stepHeaders[store.currentStep].title;

  const stepDescription =
    document.getElementsByClassName("step__description")[0];
  stepDescription.textContent = stepHeaders[store.currentStep].description;

  renderCurrentStep();
}

// Track the currently rendered element so we can remove it
let currentElement: HTMLElement | null = null;
const renderCurrentStep = () => {
  if (currentElement) currentElement.remove();
  currentElement = stepFactories[store.currentStep]();
  const stepHeader = document.getElementsByClassName("step__header")[0];
  stepHeader.after(currentElement);
};
