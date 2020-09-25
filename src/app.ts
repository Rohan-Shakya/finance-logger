import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
import { HasFormatter } from './interfaces/HasFormatter.js';
import { ListTemplate } from './modules/ListTemplate.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
// inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#toFrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let values: [string, string, number]; //tuples

  values = [toFrom.value, details.value, amount.valueAsNumber];

  let doc: HasFormatter;

  if (type.value === 'invoice') {
    doc = new Invoice(...values);
  } else {
    doc = new Payment(...values);
  }

  if (toFrom.value == '' || details.value == '' || amount.value == null) {
    return null;
  } else {
    list.render(doc, type.value, 'end');
  }

  toFrom.value = '';
  details.value = '';
  amount.value = '';
});
