"use client";

export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  // 데이터가 없거나 로딩 중일 경우를 완전히 차단합니다.
  if (!todos) return <div className="p-4 text-xs">로딩 중...</div>;
  
  // 안전하게 데이터 접근
  const currentTodos = todos[selectedDate] || [];

  return (
    <div className="mt-4">
      <h2 className={`font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>
      {currentTodos.length > 0 ? (
        currentTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={todo.completed || false}
              className={`w-4 h-4 rounded border appearance-none cursor-pointer ${
                darkMode ? "bg-slate-700 border-slate-600 checked:bg-sky-500" : "bg-white border-sky-300 checked:bg-sky-500"
              }`}
            />
            <span className={darkMode ? "text-slate-200" : "text-slate-700"}>{todo.text}</span>
          </div>
        ))
      ) : (
        <p className={`text-xs ${darkMode ? "text-slate-500" : "text-sky-300"}`}>오늘 해야 할 일 목록이 비어있습니다.</p>
      )}
    </div>
  );
}