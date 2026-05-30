"use client";

export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  const currentTodos = todos[selectedDate] || [];

  return (
    <div>
      <h2 className={darkMode ? "text-sky-400" : "text-sky-800"}>Todo-list</h2>
      {currentTodos.map((todo) => (
        <div key={todo.id} className="flex items-center gap-2 py-2">
          <input type="checkbox" checked={todo.completed} readOnly className="cursor-pointer" />
          <span className={darkMode ? "text-slate-200" : "text-slate-700"}>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}