"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todoData, setTodoData }) {
  const items = todoData[selectedDate] || [];
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    // ⭐️ 한글 입력 중 엔터를 칠 때 두 번 입력되는 버그를 완벽히 막아줍니다.
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newItem = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      
      setTodoData({
        ...todoData,
        [selectedDate]: [...items, newItem],
      });
      setInputValue("");
    }
  };

  const toggleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodoData({
      ...todoData,
      [selectedDate]: updatedItems,
    });
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setTodoData({
      ...todoData,
      [selectedDate]: updatedItems,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-slate-400 text-sm">＋</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 적고 Enter를 눌러 추가하세요"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 shadow-inner transition-all"
        />
      </div>

      <div className="w-full bg-white border border-slate-100 rounded-xl min-h-[180px] max-h-[260px] overflow-y-auto p-2 flex flex-col gap-1.5">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-300 py-12">
            오늘 해야 할 일 목록이 비어있습니다.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg group transition-colors"
            >
              <div
                onClick={() => toggleComplete(item.id)}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    item.completed
                      ? "bg-slate-800 border-slate-800 text-white"
                      : "border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  {item.completed && <span className="text-[10px]">✓</span>}
                </div>
                <span
                  className={`text-sm font-medium transition-all ${
                    item.completed
                      ? "line-through text-slate-300 decoration-slate-400 decoration-2"
                      : "text-slate-600"
                  }`}
                >
                  {item.text}
                </span>
              </div>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-slate-300 hover:text-red-500 text-xs px-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}