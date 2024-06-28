import Utilities from '../utils/Utilities';

class ListItem {
    constructor(itemData) {
        this.id = itemData.id;
        this.title = itemData.title;

        this.itemMarkup = `
            <li class="px-2 py-2 mb-3 last:mb-0 bg-orange-200 transition-all rounded-sm shadow">
              <div class="flex items-center justify-between">
                <div class="list-item-input flex-1">
                </div>
                <div class="list-item-controls flex items-center space-x-2">
                </div>
              </div>
            </li>
        `
        this.titleInputMarkup = `
            <input
            id="${this.id}-title-input"
            class="text-sm bg-transparent border-0 ring-0 outline-0 w-full"
            name="${this.id}-title"
            value="${this.title}"
            readonly="true"
            type="text">
        `;
        this.editButtonMarkup = `
        <button class="text-blue-600 hover:text-blue-800">
            <svg class="fill-current w-4 h-auto" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fill-rule="nonzero"/></svg>
        </button>
        `
        this.deleteButtonMarkup = `
        <button class="text-red-500 hover:text-red-600">
            <svg class="fill-current w-4 h-auto" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fill-rule="nonzero"/></svg>
        </button>
        `
        this.confirmButtonMarkup = `
        <button class="text-green-600 hover:text-green-800 hidden">
            <svg class="fill-current w-4 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg>
        </button>
        `
        this.abortButtonMarkup = `
        <button class="text-red-500 hover:text-red-600 hidden">
            <svg class="fill-current w-4 h-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
        </button>
        `

        this.init()
    }

    init() {
        this.itemElement = Utilities.createDOMElement(this.itemMarkup);
        this.titleInput = Utilities.createDOMElement(this.titleInputMarkup);
        this.deleteButton = Utilities.createDOMElement(this.deleteButtonMarkup);
        this.editButton = Utilities.createDOMElement(this.editButtonMarkup);
        this.confirmButton = Utilities.createDOMElement(this.confirmButtonMarkup);
        this.abortButton = Utilities.createDOMElement(this.abortButtonMarkup);

        Utilities.insertDOMNode(this.titleInput, this.itemElement.querySelector(".list-item-input"));
        Utilities.insertDOMNode(this.editButton, this.itemElement.querySelector(".list-item-controls"));
        Utilities.insertDOMNode(this.deleteButton, this.itemElement.querySelector(".list-item-controls"));
        Utilities.insertDOMNode(this.abortButton, this.itemElement.querySelector(".list-item-controls"));
        Utilities.insertDOMNode(this.confirmButton, this.itemElement.querySelector(".list-item-controls"));

        this.setupEvents()
    }

    setupEvents() {
        this.deleteEvent = new CustomEvent("deleteListItem", { bubbles: true, detail: { data: () => this }} );
        this.deleteButton.addEventListener("click", () => document.dispatchEvent(this.deleteEvent));
        this.editButton.addEventListener("click", () => this.setEditMode({active: true}));
        this.abortButton.addEventListener("click", () => this.setEditMode({active: false}));
    }

    setEditMode(mode) {
        if (mode.active) {
            Utilities.addClass(this.editButton, "hidden");
            Utilities.addClass(this.deleteButton, "hidden");
            Utilities.removeClass(this.confirmButton, "hidden");
            Utilities.removeClass(this.abortButton, "hidden");

            Utilities.addClass(this.titleInput, "border-b");
            Utilities.addClass(this.titleInput, "border-black");

            this.titleInput.readOnly = false;
            this.titleInput.selectionStart = this.titleInput.selectionEnd = this.titleInput.value.length;
            this.titleInput.focus();
        } else {
            Utilities.removeClass(this.editButton, "hidden");
            Utilities.removeClass(this.deleteButton, "hidden");
            Utilities.addClass(this.confirmButton, "hidden");
            Utilities.addClass(this.abortButton, "hidden");

            Utilities.removeClass(this.titleInput, "border-b");
            Utilities.removeClass(this.titleInput, "border-black");

            this.titleInput.readOnly = true;
        }
    }
};

export default ListItem;
