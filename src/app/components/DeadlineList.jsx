"use client";

import { useState, useRef, useEffect } from "react";

export default function DeadlineList({ selectedDate, deadlines = [], setDeadlines, darkMode }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  
  // 수정 기능을 위한 상태 관리
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const editInputRef = useRef(null);

  // 수정 모드 진입 시 자동 포커스
  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

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

  const handleSaveEdit = (id) => {
    if (!editingText.trim()) return;
    setDeadlines(deadlines.map(dl => dl.id === id ? { ...dl, text: editingText } : dl));
    setEditingId(null);
    setEditingText("");
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
    if (!selectedDate) return { text: "D-Day", isOverdue: false };
    const baseDate = new Date(selectedDate);
    baseDate.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target - baseDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { text: "D-Day", isOverdue: false };
    if (diffDays < 0) return { text: `D+${Math.abs(diffDays)}`, isOverdue: true };
    return { text: `D-${diffDays}`, isOverdue: false };
  };

  return (
    <div className="flex flex-col justify-between gap-3 font-sans">
      <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
        {deadlines.length === 0 ? (
          <p className={`text-xs text-center py-4 font-medium ${darkMode ? "text-slate-500" : "text-sky-400/80"}`}>
            등록된 마감일이 없습니다.
          </p>
        ) : (
          [...deadlines]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .filter((dl) => {
              const baseDate = new Date(selectedDate);
              baseDate.setHours(0, 0, 0, 0);
              const target = new Date(dl.date);
              target.setHours(0, 0, 0, 0);
              const diffDays = Math.ceil((target - baseDate) / (1000 * 60 * 60 * 24));
              return diffDays >= 0 || !dl.completed;
            })
            .map((dl) => {
              const dDayInfo = calculateDDay(dl.date);
              const isEditing = editingId === dl.id;
              
              let badgeStyle = darkMode ? "bg-sky-950 text-sky-400 border-sky-800" : "bg-sky-100 text-sky-600 border-sky-200";
              let textStyle = dl.completed ? "line-through text-slate-500" : (darkMode ? "text-slate-200" : "text-sky-900");

              if (dDayInfo.isOverdue && !dl.completed) {
                badgeStyle = darkMode ? "bg-orange-950 text-orange-300 border-orange-900" : "bg-orange-100 text-orange-600 border-orange-200";
                textStyle = darkMode ? "text-slate-100" : "text-sky-900";
              }

              return (
                <div
                  key={dl.id}
                  className={`flex items-center justify-between border rounded-xl p-2 shadow-sm group transition-all ${
                    dl.completed
                      ? "opacity-40"
                      : darkMode 
                        ? "bg-slate-800 border-slate-700/60 hover:border-slate-600" 
                        : "bg-white border-sky-100/80 hover:border-sky-300"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
                    <input
                      type="checkbox"
                      checked={dl.completed || false}
                      onChange={(e) => handleToggleComplete(dl.id, e)}
                      className={`w-4 h-4 rounded border appearance-none transition-colors cursor-pointer checked:bg-sky-500 ${
                        darkMode 
                          ? "bg-slate-700 border-slate-600 checked:border-sky-500" 
                          : "bg-white border-sky-300 checked:border-sky-500"
                      }`}
                    />
                    
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 border ${badgeStyle}`}>
                      {dDayInfo.text}
                    </span>
                    
                    {/* 수정 로직 적용 부분 */}
                    {isEditing ? (
                      <input
                        ref={editInputRef}
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveEdit(dl.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(dl.id)}
                        className={`text-xs w-full bg-transparent border-b focus:outline-none ${darkMode ? "border-sky-500 text-slate-100" : "border-sky-400 text-sky-900"}`}
                      />
                    ) : (
                      <p 
                        className={`text-xs font-medium truncate flex-1 cursor-pointer hover:opacity-70 ${textStyle}`} 
                        onClick={() => { setEditingId(dl.id); setEditingText(dl.text); }}
                      >
                        {dl.text}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => handleDeleteDeadline(dl.id, e)}
                    className="text-slate-400 hover:text-red-400 text-[10px] p-1 font-bold transition-opacity opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              );
            })
        )}
      </div>

      <form onSubmit={handleAddDeadline} className={`flex flex-col gap-1.5 border-t pt-2 ${darkMode ? "border-slate-700" : "border-sky-100/80"}`}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="마감일 제목을 입력하세요"
          className={`w-full text-xs p-2.5 border rounded-xl focus:outline-none shadow-sm font-medium ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 placeholder-slate-500" 
              : "bg-white border-sky-100 text-sky-800 focus:border-sky-400 placeholder-sky-300"
          }`}
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className={`flex-1 text-xs p-2 border rounded-xl focus:outline-none shadow-sm font-medium ${
              darkMode 
                ? "bg-slate-800 border-slate-700 text-slate-200 focus:border-sky-500" 
                : "bg-white border-sky-100 text-sky-700 focus:border-sky-400"
            }`}
          />
          <button
            type="submit"
            className={`text-xs font-bold px-3.5 rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0 ${
              darkMode
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-sky-500 hover:bg-sky-600 text-white"
            }`}
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}