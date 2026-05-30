"use client";

import { useState, useRef, useEffect } from "react";

export default function DeadlineList({ selectedDate, deadlines = [], setDeadlines, darkMode }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  // 수정 상태 분리
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editingDateId, setEditingDateId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingDate, setEditingDate] = useState("");
  const editInputRef = useRef(null);

  useEffect(() => {
    if ((editingTitleId !== null || editingDateId !== null) && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTitleId, editingDateId]);

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

  const handleSaveTitle = (id) => {
    const updated = deadlines.map((dl) =>
      dl.id === id ? { ...dl, text: editingText } : dl
    );
    setDeadlines(updated);
    setEditingTitleId(null);
  };

  const handleSaveDate = (id) => {
    const updated = deadlines.map((dl) =>
      dl.id === id ? { ...dl, date: editingDate } : dl
    );
    setDeadlines(updated);
    setEditingDateId(null);
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
            // --- 필터링 로직 수정: 마감일이 오늘 포함 미래(diffDays >= 0)이거나, 완료되지 않은(overdue) 것만 표시 ---
            .filter((dl) => {
              const baseDate = new Date(selectedDate);
              baseDate.setHours(0, 0, 0, 0);
              const target = new Date(dl.date);
              target.setHours(0, 0, 0, 0);
              const diffDays = Math.ceil((target - baseDate) / (1000 * 60 * 60 * 24));
              
              // 오늘 포함 미래이거나, 완료되지 않은 마감일 지난 항목은 표시
              return diffDays >= 0 || !dl.completed;
            })
            // --------------------------------------------------------------------------
            .map((dl) => {
              const dDayInfo = calculateDDay(dl.date);
              
              // 기본 스타일 (하늘색 테마)
              let badgeStyle = darkMode ? "bg-sky-950 text-sky-400 border-sky-800" : "bg-sky-100 text-sky-600 border-sky-200";
              let textStyle = dl.completed ? "line-through text-slate-500" : (darkMode ? "text-slate-200" : "text-sky-900");

              // --- 마감일이 지난(D+) 항목 스타일 수정 ---
              if (dDayInfo.isOverdue && !dl.completed) {
                // 마감일이 지났고 완료되지 않은 경우 (보색 주황색 테마)
                badgeStyle = darkMode ? "bg-orange-950 text-orange-300 border-orange-900" : "bg-orange-100 text-orange-600 border-orange-200";
                // 텍스트는 좀 더 눈에 띄게
                textStyle = darkMode ? "text-slate-100" : "text-sky-900";
              }
              // ----------------------------------------

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
                    <div className="relative flex items-center justify-center flex-shrink-0">
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
                      {dl.completed && (
                        <span className="absolute text-white text-[10px] pointer-events-none font-bold">✓</span>
                      )}
                    </div>
                    
                    {/* 날짜 수정 로직 */}
                    {editingDateId === dl.id ? (
                      <input
                        ref={editInputRef}
                        type="date"
                        value={editingDate}
                        onChange={(e) => setEditingDate(e.target.value)}
                        onBlur={() => handleSaveDate(dl.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveDate(dl.id)}
                        className={`text-[10px] w-20 bg-transparent border-b border-sky-500 focus:outline-none ${darkMode ? "text-slate-100" : "text-sky-900"}`}
                      />
                    ) : (
                      <span 
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 border cursor-pointer ${badgeStyle}`}
                        onClick={() => { setEditingDateId(dl.id); setEditingDate(dl.date); }}
                      >
                        {dDayInfo.text}
                      </span>
                    )}
                    
                    {/* 제목 수정 로직 */}
                    {editingTitleId === dl.id ? (
                      <input
                        ref={editInputRef}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onBlur={() => handleSaveTitle(dl.id)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveTitle(dl.id)}
                        className={`text-xs flex-1 bg-transparent border-b border-sky-500 focus:outline-none ${darkMode ? "text-slate-100" : "text-sky-900"}`}
                      />
                    ) : (
                      <p 
                        className={`text-xs font-medium truncate flex-1 cursor-pointer ${textStyle}`} 
                        title={dl.text}
                        onClick={() => { setEditingTitleId(dl.id); setEditingText(dl.text); }}
                      >
                        {dl.text}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => handleDeleteDeadline(dl.id, e)}
                    className="text-slate-400 hover:text-red-400 text-[10px] p-1 font-bold transition-colors opacity-0 group-hover:opacity-100"
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