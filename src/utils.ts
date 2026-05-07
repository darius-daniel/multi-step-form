export function hasEmptyInputs(form: HTMLFormElement): boolean {
  const inputs = Array.from(
    form.querySelectorAll<HTMLInputElement>("input[required]"),
  );
  return inputs.some((input) => input.value.trim().length === 0);
}
