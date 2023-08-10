import React, { useState, FormEvent } from "react";
import useTodo from "../../hooks/useTodo";
import { Todo } from '../../types/todo';
import { Key } from '../../types/vars';
import {
	FaCheck,
	FaTrash,
	FaHourglass,
	FaTimes,
	FaCheckDouble,
} from "react-icons/fa";

const Todo = () => {
	const [todoInput, setTodoInput] = useState("");
	const [todos, addTodo, removeTodo, markAsDone] = useTodo();
	console.log("🚀 ~ file: index.js:6 ~ index ~ todos:", todos);

	const submitTodoFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (todoInput.trim().length) {
			addTodo(todoInput);
			setTodoInput("");
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<h1 className="text-3xl">Todo App</h1>
			<div className="todo-container border-2 p-4 w-full max-w-[650px] rounded-md mt-5">
				<form
					className="input-container flex gap-4 border-b-2 pb-4 mb-6"
					onSubmit={(e: FormEvent<HTMLFormElement>) => submitTodoFormHandler(e)}
				>
					<input
						type="text"
						value={todoInput}
						maxLength={60}
						onChange={(e) => setTodoInput(e.target.value)}
						className="w-full border-2 p-3 rounded-md focus:outline-none focus:border-gray-500"
					/>
					<button
						className="flex gap-2 items-center justify-center text-green-500"
						type="submit"
					>
						<FaCheck /> Save
					</button>
					<button
                        disabled={!todoInput.length}
						onClick={() => setTodoInput("")}
						className={`flex gap-2 items-center justify-center text-gray-600 ${
							todoInput.length ? "opacity-100" : "opacity-20"
						}`}
					>
						<FaTrash /> Discard
					</button>
				</form>

				<div className="todo-list">
					{todos?.map((todo: Todo, index: Key) => (
						<div
							key={index}
							className="todo-item-row flex items-center justify-between py-2"
						>
							<div className="todo-content flex gap-1 items-baseline text-gray-800">
								{todo.completed ? (
									<FaCheckDouble className="text-green-500" />
								) : (
									<FaHourglass />
								)}
								<span
									className={`relative top-[-3px] ${
										todo.completed ? "line-through" : ""
									}`}
								>
									{todo.content}
								</span>
							</div>

							<div className="action-buttons flex gap-3 items-center">
								{!todo.completed && (
									<button
										className="flex gap-2 items-center justify-center text-green-500"
										onClick={() => markAsDone(index)}
									>
										<FaCheck /> Done
									</button>
								)}
								<button
									onClick={() => removeTodo(index)}
									className="flex gap-1 items-center justify-center text-red-400"
								>
									<FaTimes /> Remove
								</button>
							</div>
						</div>
					))}

					{todos?.length == 0 && <div>No todos. Please create one!</div>}
				</div>
			</div>
		</div>
	);
};

export default Todo;
