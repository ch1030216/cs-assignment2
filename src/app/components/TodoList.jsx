"use client";
import { useState } from "react";

export default function TodoList({ selectedDate, darkMode }) {
  // 컴포넌트 내부에서 상태 관리
  const [todos] = useState({ "2026-05-30": [] });

  const currentTodos = todos[selectedDate] || [];

  return (
    <div className="mt-4">
      <h2 className={`font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>
      {currentTodos.map((todo) => (
        <div key={todo.id || Math.random()} className="flex items-center gap-2 py-1">
          <input type="checkbox" checked={!!todo.completed} className="appearance-none w-4 h-4 rounded border" />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}