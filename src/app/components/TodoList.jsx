"use client";
export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  // ⭐️ 핵심: 빌드 타임 에러 방지용 안전 검사
  const safeTodos = (todos && todos[selectedDate]) ? todos[selectedDate] : [];

  return (
    <div className="mt-4">
      <h2 className={`font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>
      {safeTodos.map((todo) => (
        <div key={todo.id} className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            checked={!!todo.completed}
            className={`w-4 h-4 rounded border appearance-none cursor-pointer ${
              darkMode ? "bg-slate-700 border-slate-600 checked:bg-sky-500" : "bg-white border-sky-300 checked:bg-sky-500"
            }`}
          />
          <span className={darkMode ? "text-slate-200" : "text-slate-700"}>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}