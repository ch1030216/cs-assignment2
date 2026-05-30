"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 항목의 ID

  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  // 1. 상단 입력창으로 추가
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos({ ...todos, [selectedDate]: [...currentTodos, newTodo] });
    setInputValue("");
  };

  // 2. 리스트 내용 수정 (메모장 기능)
  const handleEditChange = (id, newText) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, text: newText } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  // 3. 토글 및 삭제 등 기타 기능
  const handleToggle = (id) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <h2 className={`text-sm font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>

      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="새로운 할 일을 입력하고 Enter를 눌러 추가하세요"
          className={`w-full text-xs p-2.5 border rounded-xl ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"}`}
        />
      </form>

      <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
        {currentTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3 group">
            {/* 체크박스 */}
            <div 
              onClick={() => handleToggle(todo.id)}
              className={`w-4 h-4 rounded border cursor-pointer flex-shrink-0 ${todo.completed ? "bg-sky-500 border-sky-500" : "border-slate-300"}`} 
            />
            
            {/* 메모장처럼 동작하는 텍스트 영역 */}
            {editingId === todo.id ? (
              <input
                autoFocus
                value={todo.text}
                onChange={(e) => handleEditChange(todo.id, e.target.value)}
                onBlur={() => setEditingId(null)} // 포커스 잃으면 수정 모드 종료
                className="flex-1 bg-transparent outline-none text-xs text-slate-700 border-b border-sky-300"
              />
            ) : (
              <span 
                onClick={() => setEditingId(todo.id)}
                className={`flex-1 text-xs cursor-text ${todo.completed ? "line-through text-slate-400" : "text-slate-700"}`}
              >
                {todo.text || "내용을 입력하세요..."}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}