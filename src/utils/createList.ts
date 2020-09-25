import { HasFormatter } from '../interfaces/HasFormatter.js';
import { ListTemplate } from '../modules/ListTemplate.js';

export function createList(array: HasFormatter[], ul: HTMLUListElement) {
  array.forEach((item) => {
    const list = new ListTemplate(ul);
    list.render(item, item.type, 'end', array);
  });
}

export const calculateClosing = (opening: number, array: HasFormatter[]) => {
  const netCash: number = array.reduce((a, c) => {
    if (c.type === 'invoice') return a + c.amount;
    else return a - c.amount;
  }, 0);

  return opening + netCash;
};
