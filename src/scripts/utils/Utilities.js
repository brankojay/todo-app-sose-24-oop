class Utilities {
    static getElement(selector) {
        return document.querySelector(selector);
    }

    static createDOMElement(elementString) {
        const elementDocument = new DOMParser().parseFromString(elementString, "text/html");
        return elementDocument.body.firstChild;
    }

    static insertDOMNode(element, target) {
        target.appendChild(element);
    }

    static removeClass(element, className) {
        element.classList.remove(className);
    }

    static addClass(element, className) {
        element.classList.add(className);
    }

    static toggleClass(element, className) {
        if (element.classList.contains(className)) {
            this.removeClass(element, className);
        } else {
            this.addClass(element, className);
        }
    }
};

export default Utilities;
