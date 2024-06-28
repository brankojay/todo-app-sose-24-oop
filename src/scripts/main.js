import ToDoApplication from './ToDoApplication';
import Utilities from './utils/Utilities';

document.addEventListener("DOMContentLoaded", () => {
    const todoApp = new ToDoApplication(Utilities.getElement("#todo-app"));

    todoApp.init();
})

