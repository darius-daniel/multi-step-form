import stepOne from "./step-one";
import "./style.css";

let currentStep = 0;
const formSteps = [stepOne];
const stepHeaders = [
  {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number",
  },
];

const stepHeader = document.getElementsByClassName("step__header")[0];
const stepTitle = document.getElementsByClassName("step__title")[0];
const stepDescription = document.getElementsByClassName("step__description")[0];
const stepMarkers = document.getElementsByClassName("navItem__marker");

const updateStep = () => {
  const stepMarker = stepMarkers.item(currentStep);
  stepMarker.classList.add("highlightMarker");

  stepTitle.textContent = stepHeaders[currentStep].title;
  stepDescription.textContent = stepHeaders[currentStep].description;

  stepHeader.after(formSteps[currentStep]);
};

updateStep();

const btnNext = document.getElementById("btn__next");
btnNext?.addEventListener("click", (event: Event) => {
  event.preventDefault();

  if (currentStep >= formSteps.length - 1) return;

  stepMarkers.item(currentStep).classList.remove("highlightMarker");
  currentStep++;
  updateStep();
});
