"use client";

import { useState } from "react";

export default function DeadlineList({ selectedDate, deadlines = [], setDeadlines }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAddDeadline = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const newDeadline = {
      id: Date.now(),
      text: newTitle,
      date: newDate,
      completed: false,
    };

    setDeadlines([...deadlines, newDeadline]);
    setNewTitle("");
    setNewDate("");
  };

  const handleToggleComplete = (id, e) => {
    e.stopPropagation(); 
    const updated = deadlines.map((dl) =>
      dl.id === id ? { ...dl, completed: !dl.completed } : dl
    );
    setDeadlines(updated);
  };

  const handleDeleteDeadline = (id, e) => {
    e.stopPropagation(); 
    const filtered = deadlines.filter((dl) => dl.id !== id);
    setDeadlines(filtered);
  };

  const calculateDDay = (targetDate) => {
    if (!selectedDate) return "D-Day";
    const baseDate = new Date(selectedDate);
    baseDate.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target - baseDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
    return `D-${diffDays}`;
  };

  return (
    <div className="flex flex-col justify-between gap-3 font-sans">
      <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
        {deadlines.length === 0 ? (
          <p className="text-xs text-sky-400/80 text-center py-4 font-medium">등록된 마감일이 없습니다.</p>
        ) : (
          [...deadlines]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((dl) => (
              <div
                key={dl.id}
                className={`flex items-center justify-between border rounded-xl p-2 shadow-sm group transition-all ${
                  dl.completed 
                    ? "bg-sky-100/30 border-sky-200/40 opacity-50" 
                    : "bg-white border-sky-100/80 hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
                  <input
                    type="checkbox"
                    checked={dl.completed || false}
                    onChange={(e) => handleToggleComplete(dl.id, e)}
                    className="w-3.5 h-3.5 rounded border-sky-300 text-sky-500 focus:ring-sky-400 cursor-pointer flex-shrink-0"
                  />
                  
                  {/* ⭐️ 명도와 채도를 정밀 조절한 연한 하늘색 바탕 + 진한 하늘색 글씨 D-Day 배지 */}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                    dl.completed 
                      ? "bg-sky-100 text-sky-400 line-through" 
                      : "bg-sky-100 text-sky-600 font-extrabold border border-sky-200"
                  }`}>
                    {calculateDDay(dl.date)}
                  </span>
                  
                  <p className={`text-xs font-medium text-sky-900 truncate ${
                    dl.completed ? "line-through text-sky-400/70" : ""
                  }`} title={dl.text}>
                    {dl.text}
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => handleDeleteDeadline(dl.id, e)}
                  className="text-sky-300 hover:text-red-400 text-[10px] p-1 font-bold transition-colors rounded hover:bg-sky-50 flex-shrink-0 opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))
        )}
      </div>

      <form onSubmit={handleAddDeadline} className="flex flex-col gap-1.5 border-t border-sky-100/80 pt-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="마감일 제목을 입력하세요"
          className="w-full text-xs p-2 border border-sky-100 rounded-xl focus:outline-none focus:border-sky-400 bg-white font-medium text-sky-800 placeholder-sky-300 shadow-sm"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="flex-1 text-xs p-2 border border-sky-100 rounded-xl focus:outline-none focus:border-sky-400 bg-white font-medium text-sky-700 shadow-sm"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3.5 rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}