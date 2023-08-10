import { useState, useEffect } from "react";
import { Todo } from '../types/todo';

const validateTodosInLocalStorage = () => {
	const todosFromLocalStorage = localStorage.getItem("todos");
	if (todosFromLocalStorage?.length) {
		return JSON.parse(todosFromLocalStorage);
	} else return [];
};

const updateLocalStorageTodosHandler = (todos: Array<Todo>) => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

const useTodo = () => {
	const [todos, setTodos] = useState(Array<Todo>);
	const [validatedLocalStorage, setValidatedLocalStorage] = useState(false);

	useEffect(() => {
		if (validatedLocalStorage) {
			updateLocalStorageTodosHandler(todos);
		}
	}, [todos, validatedLocalStorage]);

	useEffect(() => {
		setTodos(validateTodosInLocalStorage());
		setValidatedLocalStorage(true)
	}, []);

	const addTodo = (todoContent: string): void => {
		const newTodo: Todo = {
			content: todoContent,
			completed: false,
			createdOn: new Date().toDateString(),
		};
		setTodos((prev) => [...prev, newTodo]);
	};

    const markAsDone = (index: number): void => {
        const updated = [...todos].map((todo, i) => {
            if (i === index) return { ...todo, completed: true };
            return todo;
        });

        setTodos([...updated]);
    }

    const removeTodo = (index: number): void => {
        if (index > -1) {
            const updated = [...todos];
            updated.splice(index, 1);
            setTodos([...updated]);
        }
    };

	return [todos, addTodo, removeTodo, markAsDone] as const;
};

export default useTodo;
