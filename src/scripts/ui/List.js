import Utilities from '../utils/Utilities';
import ListItem from "./ListItem";

class List {
    constructor() {
        this.listItems = [];
        this.listMarkup = `<ul id="todo-list" class="mt-8"></ul>`;

        this.init();
    }

    init() {
        this.listElement = Utilities.createDOMElement(this.listMarkup);
    }

    getItemById(id) {
        return this.listItems.find(item => item.id === id);
    }

    addListItem(item) {
        const listItem = new ListItem(item)
        this.listItems.push(listItem);

        Utilities.insertDOMNode(listItem.itemElement, this.listElement);
    }

    removeListItem(itemId) {
        const itemToRemove = this.getItemById(itemId);

        if (itemToRemove) {
            this.listItems.splice(this.listItems.indexOf(itemToRemove), 1);
            itemToRemove.itemElement.remove();
        }
    }
};

export default List;
