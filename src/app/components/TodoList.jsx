"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null); // 수정 중인 항목의 ID
  const [editText, setEditText] = useState(""); // 수정 중인 텍스트
  
  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos({ ...todos, [selectedDate]: [...currentTodos, newTodo] });
    setInputValue("");
  };

  const handleToggleTodo = (id) => {
    const updated = currentTodos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos({ ...todos, [selectedDate]: updated });
  };

  const handleDeleteTodo = (e, id) => {
    e.stopPropagation();
    setTodos({ ...todos, [selectedDate]: currentTodos.filter((t) => t.id !== id) });
  };

  // 수정 시작
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 수정 완료 (저장)
  const saveEdit = (id) => {
    const updated = currentTodos.map((t) => t.id === id ? { ...t, text: editText } : t);
    setTodos({ ...todos, [selectedDate]: updated });
    setEditingId(null);
  };

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <h2 className={`text-sm font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Todo-list</h2>

      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="새로운 할 일을 입력하고 Enter..."
          className={`w-full text-xs p-2.5 border rounded-xl ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"}`}
        />
      </form>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[220px]">
        {currentTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 group">
            {editingId === todo.id ? (
              <input
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                className={`flex-1 text-xs p-1.5 rounded border ${darkMode ? "bg-slate-700 text-white" : "bg-sky-50"}`}
              />
            ) : (
              <div 
                onClick={() => startEdit(todo)}
                className={`flex-1 text-xs cursor-pointer truncate ${todo.completed ? "line-through text-slate-400" : ""}`}
              >
                {todo.text}
              </div>
            )}
            <button onClick={(e) => handleDeleteTodo(e, todo.id)} className="text-slate-400 hover:text-red-500">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}