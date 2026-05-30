"use client";

import { useState, useRef, useEffect } from "react";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const [inputValue, setInputValue] = useState("");
  const inputRefs = useRef({}); // 각 투두 항목의 input 접근을 위한 ref

  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos({ ...todos, [selectedDate]: [...currentTodos, newTodo] });
    setInputValue("");
  };

  const handleTodoChange = (id, newText) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, text: newText } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  // 엔터 입력 시 새 투두 생성 및 커서 이동
  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: "", completed: false };
      const index = currentTodos.findIndex((t) => t.id === id);
      const updated = [...currentTodos];
      updated.splice(index + 1, 0, newTodo);
      setTodos({ ...todos, [selectedDate]: updated });
      
      // 다음 항목으로 포커스 이동을 위해 짧은 지연 후 실행
      setTimeout(() => {
        inputRefs.current[newTodo.id]?.focus();
      }, 0);
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-sans">
      <h2 className={`text-sm font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Todo-list
      </h2>

      {/* 기존의 추가 입력창 */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="새로운 할 일을 입력하고 Enter를 눌러 추가하세요"
          className={`w-full text-xs p-2.5 border rounded-xl ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"}`}
        />
      </form>

      {/* 리스트 영역 */}
      <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
        {currentTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded border ${todo.completed ? "bg-sky-500 border-sky-500" : "border-slate-300"}`} />
            <input
              ref={(el) => (inputRefs.current[todo.id] = el)}
              type="text"
              value={todo.text}
              onChange={(e) => handleTodoChange(todo.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, todo.id)}
              className="flex-1 bg-transparent outline-none text-xs text-slate-700"
              placeholder="내용을 입력하세요..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}