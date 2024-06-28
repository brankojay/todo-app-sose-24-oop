import Form from "./ui/Form";
import List from "./ui/List";
import Utilities from "./utils/Utilities";

import {TodoController, Todo} from "./model/Todo.js"

class ToDoApplication {
    constructor(appElement) {
        this.todoController = new TodoController();

        this.form = new Form({
            idPrefix: "todo",
            ctaText: "Add Todo",
            inputPlaceholder: "Todo Title",
            required: true
        });
        this.list = new List();

        this.appElement = appElement;
        this.setupEvents();
    }

    init() {
        Utilities.insertDOMNode(this.form.formElement, this.appElement);
        Utilities.insertDOMNode(this.list.listElement, this.appElement);

        this.getInitialData();
        this.form.inputField.focus();
    }

    setupEvents() {
        document.addEventListener("inputValid", this.inputEvent.bind(this));
        document.addEventListener("deleteListItem", this.deleteEvent.bind(this));
    }

    async getInitialData() {
        const todoData = await this.todoController.getAllTodos();

        todoData.forEach((todo) => {
            this.list.addListItem(new Todo(todo));
        });
    }

    async inputEvent(event) {
        const newTodo = new Todo({title: event.detail.value()})
        await this.todoController.addTodo(newTodo);

        this.list.addListItem(newTodo);
    }

    async deleteEvent(event) {
        await this.todoController.deleteTodo(event.detail.data());

        this.list.removeListItem(event.detail.data().id);
    }
};

export default ToDoApplication;
