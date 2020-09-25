const form = document.querySelector('.new-item-form') as HTMLFormElement;
// inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#toFrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul = document.querySelector('ul')!;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(type.value);
  console.log(toFrom.value);
  console.log(details.value);
  console.log(amount.valueAsNumber);
});
