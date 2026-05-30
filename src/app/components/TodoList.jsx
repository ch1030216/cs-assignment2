"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  // 빌드 타임에 서버가 이 값을 읽으려 시도하면 에러가 나므로,
  // 안전하게 데이터를 추출하는 로직을 분리합니다.
  const getTodosForDate = () => {
    if (!todos || typeof todos !== 'object') return [];
    return todos[selectedDate] || [];
  };

  const currentTodos = getTodosForDate();

  return (
    <div className="mt-4">
      <h2 className={`font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>
      {currentTodos.map((todo) => (
        <div key={todo.id || Math.random()} className="flex items-center gap-2 py-1">
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