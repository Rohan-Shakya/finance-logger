import { Invoice } from './modules/Invoice.js';
import { Payment } from './modules/Payment.js';
import { ListTemplate } from './modules/ListTemplate.js';
const form = document.querySelector('.new-item-form');
// inputs
const type = document.querySelector('#type');
const toFrom = document.querySelector('#toFrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
// list template instance
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let values; //tuples
    values = [toFrom.value, details.value, amount.valueAsNumber];
    let doc;
    if (type.value === 'invoice') {
        doc = new Invoice(...values);
    }
    else {
        doc = new Payment(...values);
    }
    if (toFrom.value == '' || details.value == '' || amount.value == null) {
        return null;
    }
    else {
        list.render(doc, type.value, 'end');
    }
    toFrom.value = '';
    details.value = '';
    amount.value = '';
});
