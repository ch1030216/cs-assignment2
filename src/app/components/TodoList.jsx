"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const [inputValue, setInputValue] = useState("");
  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !setTodos) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos({
      ...todos,
      [selectedDate]: [...currentTodos, newTodo],
    });
    setInputValue("");
  };

  const handleToggleTodo = (id) => {
    if (!setTodos) return;
    const updated = currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos({
      ...todos,
      [selectedDate]: updated,
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between font-sans">
      <div>
        <h2 className={`text-sm font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
          Todo-list
        </h2>

        {/* 할 일 입력창 다크모드 대응 완전 수정 */}
        <form onSubmit={handleAddTodo} className="mb-4">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sky-400 font-bold text-xs">+</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="할 일을 적고 Enter를 눌러 추가하세요"
              className={`w-full text-xs pl-7 pr-3 py-2.5 border rounded-xl focus:outline-none shadow-sm transition-colors font-medium ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 placeholder-slate-500"
                  : "bg-white border-sky-100 text-sky-900 focus:border-sky-400 placeholder-sky-300"
              }`}
            />
          </div>
        </form>

        {/* 할 일 목록 목록판 */}
        <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
          {currentTodos.length === 0 ? (
            <div className="text-center py-10">
              <p className={`text-xs font-medium ${darkMode ? "text-slate-500" : "text-sky-300"}`}>오늘 해야 할 일 목록이 비어있습니다.</p>
            </div>
          ) : (
            currentTodos.map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleToggleTodo(todo.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                  todo.completed
                    ? "bg-sky-100/30 border-sky-200/20 opacity-50"
                    : darkMode
                      ? "bg-slate-800 border-slate-700/80 hover:border-slate-600 shadow-sm"
                      : "bg-white border-sky-100/80 hover:border-sky-200 shadow-sm"
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="w-3.5 h-3.5 rounded border-sky-300 text-sky-500 focus:ring-sky-400 cursor-pointer flex-shrink-0"
                />
                <span className={`text-xs font-medium truncate ${
                  todo.completed 
                    ? "line-through text-slate-400" 
                    : darkMode ? "text-slate-200" : "text-sky-900"
                }`}>
                  {todo.text}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}