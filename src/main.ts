import "./style.css";
import stepOne from "./step-one";
import btnNext from "./btn-next";
import stepTwo from "./step-two";

const app = document.getElementById("app");

const formSteps = [stepOne, stepTwo];
let currentStep = 0;
app.appendChild(formSteps[currentStep]);

const markers = document.getElementsByClassName("navItem__marker");
let markerForCurrentStep = markers.item(currentStep);
markerForCurrentStep.classList.add("highlightMarker");

btnNext.addEventListener("click", (event: Event) => {
  event.preventDefault();
  app.removeChild(formSteps[currentStep]);
  markerForCurrentStep.classList.remove("highlightMarker");

  currentStep++;

  app.appendChild(formSteps[currentStep]);
  markerForCurrentStep = markers.item(currentStep);
  markerForCurrentStep.classList.add("highlightMarker");
});
