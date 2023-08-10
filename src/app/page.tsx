"use client";
import Todo from "../components/Todo";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-12">
			<h1>This is a test app for Cypress</h1>
			<Todo />
		</main>
	);
}
