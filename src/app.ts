import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
import { HasFormatter } from './interfaces/HasFormatter.js';
import { ListTemplate } from './modules/ListTemplate.js';
import { createList, calculateClosing } from './utils/createList.js';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
// inputs
const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#toFrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

const openingBalInput = document.querySelector('#opening') as HTMLInputElement;
const closingBalDiv = document.querySelector('#closing') as HTMLDivElement;

const savedOpeningBal: number = JSON.parse(localStorage.getItem('opening')!);

let openingBal: number = savedOpeningBal ? savedOpeningBal : 0;
let closingBal: number = 0;

openingBalInput.value = String(openingBal);

//On Change Event of opening balance
openingBalInput.addEventListener('change', () => {
  openingBal = Number(openingBalInput.value);

  closingBal = calculateClosing(openingBal, array);

  closingBalDiv.textContent = `£${String(closingBal)}`;

  localStorage.setItem('opening', JSON.stringify(openingBal));
});

// list template instance
const ul = document.querySelector('ul')!;
const list = new ListTemplate(ul);

//Array of Invoices & Payments
let array: HasFormatter[] = [];

//Get data from local storage & set array
let data: HasFormatter[] = JSON.parse(localStorage.getItem('history')!);
data ? (array = data) : null;

//if data held, print it
if (array) {
  createList(array, ul);

  //if data held, update closing balance
  closingBal = calculateClosing(openingBal, array);
  closingBalDiv.textContent = `$${String(closingBal)}`;
}
console.log(form);

//on Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (toFrom.value == '' || details.value == '' || amount.value == '') {
    return null;
  } else {
    //set tuple of values for invoice/payment class creation
    let values: [string, string, string, number];
    values = [type.value, toFrom.value, details.value, amount.valueAsNumber];

    let doc: HasFormatter;
    if (type.value === 'invoice') {
      doc = new Invoice(...values);
    } else {
      doc = new Payment(...values);
    }

    array.push(doc);

    list.render(doc, type.value, 'end', array);

    localStorage.setItem('history', JSON.stringify(array));
  }

  toFrom.value = '';
  details.value = '';
  amount.value = '';
});
