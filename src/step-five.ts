import iconThankYou from "./assets/images/icon-thank-you.svg";

export function createStepFive(): HTMLElement {
  const stepFive = document
    .getElementsByClassName("step")
    .item(0) as HTMLElement;
  Array.from(stepFive.children).forEach((child) => child.remove());
  stepFive.classList.add("confirmation");

  const img = document.createElement("img");
  img.classList.add("confirmation__icon");
  img.src = iconThankYou;
  stepFive.appendChild(img);

  const title = document.createElement("h1");
  title.textContent = "Thank you!";
  title.classList.add("confirmation__title");
  stepFive.appendChild(title);

  const message = document.createElement("p");
  message.textContent =
    "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.";
  message.classList.add("confirmation__message");
  stepFive.appendChild(message);

  return stepFive;
}
