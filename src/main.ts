import createStepFour from "./step-four";
import stepOne, { flushStepOne } from "./step-one";
import createStepThree from "./step-three";
import createStepTwo from "./step-two";
import "./style.css";
import store from "./store";

const stepFactories: Array<() => HTMLElement> = [
  () => stepOne,
  () => createStepTwo(),
  () => createStepThree(),
  () => createStepFour(),
];

const stepFlushers: Array<(() => void) | undefined> = [flushStepOne];

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

const stepHeader = document.getElementsByClassName("step__header")[0];
const stepTitle = document.getElementsByClassName("step__title")[0];
const stepDescription = document.getElementsByClassName("step__description")[0];
const stepMarkers = document.getElementsByClassName("navItem__marker");
const stepFooter = document.getElementsByClassName(
  "step__footer",
)[0] as HTMLElement;

// Track the currently rendered element so we can remove it
let currentElement: HTMLElement | null = null;

const renderCurrentStep = () => {
  if (currentElement) currentElement.remove();
  currentElement = stepFactories[store.currentStep]();
  stepHeader.after(currentElement);
};

const btnPrev = document.getElementById("btn__prev");
btnPrev.addEventListener("click", () => {
  if (store.currentStep <= 0) return;

  stepMarkers.item(store.currentStep).classList.remove("highlightMarker");
  store.currentStep--;
  updateStep();
  updateFooter();
});

const updateStep = () => {
  const stepMarker = stepMarkers.item(store.currentStep);
  stepMarker.classList.add("highlightMarker");

  stepTitle.textContent = stepHeaders[store.currentStep].title;
  stepDescription.textContent = stepHeaders[store.currentStep].description;

  renderCurrentStep();
};

const updateFooter = () => {
  const stepMarker = stepMarkers.item(store.currentStep);
  stepMarker.classList.add("highlightMarker");
  btnPrev.style.display = store.currentStep === 0 ? "none" : "block";
  stepFooter.style.justifyContent =
    store.currentStep === 0 ? "flex-end" : "space-between";
};

updateStep();
updateFooter();

const btnNext = document.getElementById("btn__next");
btnNext?.addEventListener("click", (event: Event) => {
  event.preventDefault();

  if (store.currentStep >= stepFactories.length - 1) return;
  stepFlushers[store.currentStep]?.();

  stepMarkers.item(store.currentStep).classList.remove("highlightMarker");
  store.currentStep++;
  updateStep();
  updateFooter();
});
