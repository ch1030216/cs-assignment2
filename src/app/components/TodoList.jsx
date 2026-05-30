"use client";

import { useState } from "react";

export default function TodoList({ selectedDate, todoData, setTodoData }) {
  // 해당 날짜의 할 일 목록 배열 배열 가져오기 (없으면 빈 배열)
  const items = todoData[selectedDate] || [];
  const [inputValue, setInputValue] = useState("");

  // 새로운 할 일 리스트에 추가 (Enter 키 입력 시)
  const handleKeyDown = (e) => {
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
      setInputValue(""); // 입력창 초기화
    }
  };

  // 체크박스 토글 함수
  const toggleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodoData({
      ...todoData,
      [selectedDate]: updatedItems,
    });
  };

  // 할 일 개별 삭제 함수
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setTodoData({
      ...todoData,
      [selectedDate]: updatedItems,
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 새로운 투두 작성 입력창 */}
      <div className="relative flex items-center">
        <span className="absolute left-4 text-slate-300 text-sm">➕</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 적고 Enter를 눌러 추가하세요"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 focus:bg-white text-slate-700 shadow-inner transition-all"
        />
      </div>

      {/* 생성된 체크박스 리스트 본체 영역 */}
      <div className="w-full bg-white border border-slate-100 rounded-xl min-h-[180px] max-h-[260px] overflow-y-auto p-2 flex flex-col gap-1.5 custom-scrollbar">
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
              {/* 왼쪽: 체크박스 아이콘 및 텍스트 조합 */}
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

              {/* 오른쪽: 마우스를 올렸을 때만 수줍게 노출되는 개별 삭제(X) 버튼 */}
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