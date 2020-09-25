export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, pos) {
        const li = document.createElement('li');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        if (heading == '') {
            h4.innerText = '';
            p.innerText = '';
        }
        else {
            h4.innerText = heading;
            li.append(h4);
            p.innerText = item.format();
            li.append(p);
        }
        if (pos === 'start') {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    }
}
