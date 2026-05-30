"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];
  const [isComposing, setIsComposing] = useState(false); // 한글 입력 상태 체크

  const updateTodos = (newTodos) => {
    setTodos({ ...todos, [selectedDate]: newTodos });
  };

  const handleKeyDown = (e, index, todo) => {
    // 1. Enter: 다음 줄 생성
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: "", completed: false };
      const updated = [...currentTodos];
      updated.splice(index + 1, 0, newTodo);
      updateTodos(updated);
    } 
    // 2. Backspace: 내용이 없으면 줄 삭제
    else if (e.key === "Backspace" && todo.text === "") {
      e.preventDefault();
      if (currentTodos.length > 1) {
        const updated = currentTodos.filter((t) => t.id !== todo.id);
        updateTodos(updated);
      }
    }
  };

  return (
    <div className={`w-full h-full p-5 rounded-2xl border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100 shadow-sm"}`}>
      <h2 className={`text-sm font-bold mb-4 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>

      <div className="flex flex-col gap-2">
        {currentTodos.map((todo, index) => (
          <div key={todo.id} className="flex items-center gap-3">
            <div 
              onClick={() => {
                const updated = currentTodos.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t);
                updateTodos(updated);
              }}
              className={`w-4 h-4 rounded border cursor-pointer flex-shrink-0 ${todo.completed ? "bg-sky-500 border-sky-500" : "border-slate-300"}`} 
            />
            <input
              value={todo.text}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onChange={(e) => {
                const updated = currentTodos.map(t => t.id === todo.id ? {...t, text: e.target.value} : t);
                updateTodos(updated);
              }}
              onKeyDown={(e) => handleKeyDown(e, index, todo)}
              placeholder="내용을 입력하세요..."
              className={`flex-1 bg-transparent outline-none text-xs ${todo.completed ? "line-through text-slate-400" : (darkMode ? "text-slate-200" : "text-slate-700")}`}
            />
          </div>
        ))}
        
        {/* 리스트가 비었을 때 첫 줄 생성 버튼 */}
        {currentTodos.length === 0 && (
          <button 
            onClick={() => updateTodos([{id: Date.now(), text: "", completed: false}])}
            className={`text-xs ${darkMode ? "text-slate-500" : "text-sky-300"}`}
          >
            + 새로운 할 일을 기록하세요
          </button>
        )}
      </div>
    </div>
  );
}