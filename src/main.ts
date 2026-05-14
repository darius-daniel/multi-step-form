import "./style.css";
import store from "./store";
import { updateStep, updateFooter, goToStep } from "./utils";
import createStepFour from "./step-four";
import stepOne from "./step-one";
import createStepThree from "./step-three";
import createStepTwo from "./step-two";
import { createStepFive } from "./step-five";

export const stepFactories: Array<() => HTMLElement> = [
  () => stepOne,
  () => createStepTwo(),
  () => createStepThree(),
  () => createStepFour(),
];

const btnPrev = document.getElementById("btn__prev");
btnPrev.addEventListener("click", () => {
  if (store.currentStep <= 0) return;
  goToStep(store.currentStep - 1);
});

updateStep();
updateFooter();

const btnNext = document.getElementById("btn__next") as HTMLButtonElement;
btnNext.disabled = !stepOne.checkValidity();
btnNext.setAttribute("form", "formStep1");
btnNext.addEventListener("click", (event: Event) => {
  event.preventDefault();

  if (store.currentStep + 1 >= stepFactories.length) {
    createStepFive();
  } else {
    goToStep(store.currentStep + 1);
  }
});
