import formData from "./definitions";
import stepFour from "./step-four";
import stepOne from "./step-one";
import stepThree from "./step-three";
import stepTwo from "./step-two";
import "./style.css";

let currentStep = 0;
const formSteps = [stepOne, stepTwo, stepThree, stepFour];
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
const btnPrev = document.getElementById("btn__prev");
btnPrev.addEventListener("click", () => {
  if (currentStep <= 0) return;

  stepMarkers.item(currentStep).classList.remove("highlightMarker");
  formSteps[currentStep].remove();
  currentStep--;
  stepHeader.after(formSteps[currentStep]);

  updateFooter();
});

const updateStep = () => {
  const stepMarker = stepMarkers.item(currentStep);
  stepMarker.classList.add("highlightMarker");

  stepTitle.textContent = stepHeaders[currentStep].title;
  stepDescription.textContent = stepHeaders[currentStep].description;

  if (currentStep >= 1) formSteps[currentStep - 1].remove();
  stepHeader.after(formSteps[currentStep]);
};

const updateFooter = () => {
  const stepMarker = stepMarkers.item(currentStep);
  stepMarker.classList.add("highlightMarker");
  btnPrev.style.display = currentStep === 0 ? "none" : "block";
  stepFooter.style.justifyContent =
    currentStep === 0 ? "flex-end" : "space-between";
};

updateStep();
updateFooter();

const btnNext = document.getElementById("btn__next");
btnNext?.addEventListener("click", (event: Event) => {
  event.preventDefault();

  if (currentStep >= formSteps.length - 1) return;

  stepMarkers.item(currentStep).classList.remove("highlightMarker");
  currentStep++;
  updateStep();
  updateFooter();
});
