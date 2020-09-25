import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
import { ListTemplate } from './modules/ListTemplate.js';
import { createList, calculateClosing } from './utils/createList.js';
const form = document.querySelector('.new-item-form');
// inputs
const type = document.querySelector('#type');
const toFrom = document.querySelector('#toFrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const openingBalInput = document.querySelector('#opening');
const closingBalDiv = document.querySelector('#closing');
const savedOpeningBal = JSON.parse(localStorage.getItem('opening'));
let openingBal = savedOpeningBal ? savedOpeningBal : 0;
let closingBal = 0;
openingBalInput.value = String(openingBal);
//On Change Event of opening balance
openingBalInput.addEventListener('change', () => {
    openingBal = Number(openingBalInput.value);
    closingBal = calculateClosing(openingBal, array);
    closingBalDiv.textContent = `£${String(closingBal)}`;
    localStorage.setItem('opening', JSON.stringify(openingBal));
});
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
//Array of Invoices & Payments
let array = [];
//Get data from local storage & set array
let data = JSON.parse(localStorage.getItem('history'));
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
    }
    else {
        //set tuple of values for invoice/payment class creation
        let values;
        values = [type.value, toFrom.value, details.value, amount.valueAsNumber];
        let doc;
        if (type.value === 'invoice') {
            doc = new Invoice(...values);
        }
        else {
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
