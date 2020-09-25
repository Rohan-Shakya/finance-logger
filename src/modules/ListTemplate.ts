import { HasFormatter } from '../interfaces/HasFormatter.js';
import { calculateClosing } from '../utils/createList.js';
import { Invoice } from './Invoice.js';
import { Payment } from './Payment.js';

export class ListTemplate {
  constructor(private container: HTMLUListElement) {}

  render(
    item: HasFormatter,
    heading: string,
    pos: 'start' | 'end',
    array: HasFormatter[]
  ) {
    //for update to opening & closing cash
    const openingBalInput = document.querySelector(
      '#opening'
    ) as HTMLInputElement;
    const closingBalDiv = document.querySelector('#closing') as HTMLDivElement;

    const li = document.createElement('li');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    const textContainer = document.createElement('div');

    h4.innerText = heading;

    item.type === 'payment' ? (h4.style.color = 'crimson') : null;
    li.append(h4);

    //use own format function when adding object with class
    if (item instanceof Invoice || item instanceof Payment) {
      p.innerText = item.format();
    }

    //for when getting from JSON local store and object has lost class
    else {
      item.type === 'invoice'
        ? (p.innerText = `${item.client} owes you £${item.amount} for ${item.details}`)
        : (p.innerText = `${item.recipient} is owed £${item.amount} for ${item.details}`);
    }

    const amount = document.createElement('p');
    amount.innerText =
      item.type === 'invoice' ? `+$${item.amount}` : `-$${item.amount}`;
    item.type === 'payment'
      ? (amount.style.color = 'crimson')
      : (amount.style.color = 'navy');

    const del = document.createElement('i');
    del.className = 'fas fa-trash-alt';

    const index: number = this.container.children.length;
    del.id = String(index);
    del.onclick = function () {
      //delete from saved array by index
      array.splice(index, 1);
      //saved new array to local store
      localStorage.setItem('history', JSON.stringify(array));
      //remove the li from HTML
      li.remove();

      //TODO: update closing bal
      let closingBal: number = calculateClosing(
        Number(openingBalInput.value),
        array
      );

      closingBalDiv.textContent = `$${String(closingBal)}`;
    };

    textContainer.append(p);
    const div = document.createElement('div');
    div.className = 'small-container';
    div.append(amount);
    div.append(del);
    textContainer.append(div);
    li.append(textContainer);

    if (pos === 'start') {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }

    //TODO: update closing bal
    let closingBal: number = calculateClosing(
      Number(openingBalInput.value),
      array
    );

    closingBalDiv.textContent = `$${String(closingBal)}`;
  }
}
