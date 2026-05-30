"use client";

import { useState } from "react";

export default function DiaryTodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  // 투두 수정 (메모장처럼 텍스트 변경)
  const handleTextChange = (id, newText) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, text: newText } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  // 투두 토글
  const handleToggle = (id) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  // 줄바꿈 시 새 투두 추가 (Enter 키)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: "", completed: false };
      setTodos({ ...todos, [selectedDate]: [...currentTodos, newTodo] });
    }
  };

  return (
    <div className={`w-full h-full p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-sky-50 shadow-sm"}`}>
      <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Diary</h2>
      
      <div className="flex flex-col gap-2">
        {currentTodos.length === 0 ? (
          <div 
            onClick={() => setTodos({ ...todos, [selectedDate]: [{ id: Date.now(), text: "", completed: false }] })}
            className={`text-sm cursor-text ${darkMode ? "text-slate-600" : "text-sky-300"}`}
          >
            {selectedDate}의 일기를 자유롭게 기록해 보세요...
          </div>
        ) : (
          currentTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3">
              {/* 체크박스 */}
              <button 
                onClick={() => handleToggle(todo.id)}
                className={`w-5 h-5 rounded border flex items-center justify-center ${
                  todo.completed ? "bg-sky-500 border-sky-500" : "border-slate-300"
                }`}
              >
                {todo.completed && <span className="text-white text-xs">✓</span>}
              </button>
              
              {/* 텍스트 입력 영역 (다이어리 줄) */}
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleTextChange(todo.id, e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="내용을 입력하세요..."
                className={`flex-1 bg-transparent border-none outline-none text-sm ${
                  todo.completed ? "line-through text-slate-400" : (darkMode ? "text-slate-200" : "text-slate-700")
                }`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}