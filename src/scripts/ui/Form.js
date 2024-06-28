import Utilities from '../utils/Utilities';

class Form {
    static defaultConfig = {
        idPrefix: "default",
        ctaText: "Click CTA",
        inputPlaceholder: "Input Placeholder",
        required: false
    }

    constructor(config = Form.defaultConfig) {
        this.formMarkup = `<form id="${config.idPrefix}-form" class="flex"></form>`;
        this.inputMarkup = `
            <input
            id="${config.idPrefix}-title-input"
            class="border border-0 rounded-sm p-1.5 flex-1"
            name="${config.idPrefix}-title"
            type="text"
            placeholder="${config.inputPlaceholder}"
            required="${config.required}">`;
        this.buttonMarkup = `
            <button
                id="add-${config.idPrefix}-button"
                class="text-white bg-blue-600 hover:bg-blue-800 px-8 rounded-sm ml-2"
                type="button">
                ${config.ctaText}
            </button>`;

        this.init();
    }

    init() {
        this.formElement = Utilities.createDOMElement(this.formMarkup);
        this.inputField = Utilities.createDOMElement(this.inputMarkup);
        this.button = Utilities.createDOMElement(this.buttonMarkup);

        Utilities.insertDOMNode(this.inputField, this.formElement);
        Utilities.insertDOMNode(this.button, this.formElement);

        this.setupEvents();
    }

    setupEvents() {
        this.button.addEventListener("click", this.handleButtonClick.bind(this));
        this.inputField.addEventListener("input", () => Utilities.removeClass(this.inputField, "input-invalid"));
        this.validInputEvent = new CustomEvent("inputValid", { bubbles: true, detail: { value: () => this.inputField.value }} );
    }

    handleButtonClick(event) {
        const formValid = this.formElement.checkValidity();

        if (!formValid) {
            this.formElement.reportValidity();
            Utilities.addClass(this.inputField, "invalid:border-red-500")
        } else {
            document.dispatchEvent(this.validInputEvent);
            this.inputField.value = "";
            this.inputField.focus();

            Utilities.removeClass(this.inputField, "invalid:border-red-500")
        }
    }
}

export default Form;
