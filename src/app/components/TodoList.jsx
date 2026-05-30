"use client";

import { useState, useEffect } from "react";

export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 1. 클라이언트 로드 전엔 렌더링 안 함
  if (!isClient) return null;

  // 2. 안전한 데이터 접근 (빌드/런타임 에러 방지)
  const currentTodos = (todos && typeof todos === 'object' && todos[selectedDate]) ? todos[selectedDate] : [];

  return (
    <div className="mt-4">
      <h2 className={`font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>
      {currentTodos.length > 0 ? (
        currentTodos.map((todo) => (
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
        ))
      ) : (
        <p className={`text-xs ${darkMode ? "text-slate-500" : "text-sky-300"}`}>목록이 없습니다.</p>
      )}
    </div>
  );
}