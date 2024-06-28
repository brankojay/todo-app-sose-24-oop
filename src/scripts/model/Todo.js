import { v4 as uuidv4 } from "uuid";
import ApiController from "../api/Api";

class Todo {
    constructor(data) {
        this.type = "todo";
        this.id = data.id ? data.id : uuidv4();
        this.title = data.title;
    }
};

class TodoController {
    constructor() {
        this.apiController = new ApiController();
    }

    getAllTodos() {
        return this.apiController.get("/todos");
    }

    getTodoById() {
        return this.apiController.get(`/todos/${id}`);
    }

    addTodo(todo) {
        return this.apiController.post("/todos", todo);
    }

    deleteTodo(todo) {
        return this.apiController.delete(`/todos/${todo.id}`);
    }
};

export { Todo, TodoController };
