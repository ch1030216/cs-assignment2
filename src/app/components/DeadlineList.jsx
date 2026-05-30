"use client";

import { useState } from "react";

export default function DeadlineList({ selectedDate, deadlines = [], setDeadlines }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  // 1. 데드라인 추가 함수
  const handleAddDeadline = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const newDeadline = {
      id: Date.now(),
      text: newTitle,
      date: newDate,      // YYYY-MM-DD 포맷
      completed: false,   // 완료 체크박스 상태값 기본 설정
    };

    setDeadlines([...deadlines, newDeadline]);
    setNewTitle("");
    setNewDate("");
  };

  // 2. 데드라인 완료 체크박스 토글 함수 (복구 및 추가!)
  const handleToggleComplete = (id, e) => {
    e.stopPropagation(); // 부모 클릭 이벤트로 번지는 현상 차단
    const updated = deadlines.map((dl) =>
      dl.id === id ? { ...dl, completed: !dl.completed } : dl
    );
    setDeadlines(updated);
  };

  // 3. 데드라인 삭제 함수
  const handleDeleteDeadline = (id, e) => {
    e.stopPropagation(); // 버튼 클릭 시 다른 이벤트가 켜지는 현상 방지 (날짜 튕김 해결)
    const filtered = deadlines.filter((dl) => dl.id !== id);
    setDeadlines(filtered);
  };

  // D-Day 계산 함수
  const calculateDDay = (targetDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "D-Day";
    if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
    return `D-${diffDays}`;
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      {/* 데드라인 리스트 출력 영역 */}
      <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
        {deadlines.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">등록된 마감일이 없습니다.</p>
        ) : (
          [...deadlines]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((dl) => (
              <div
                key={dl.id}
                className={`flex items-center justify-between bg-slate-50 border rounded-xl p-2.5 shadow-sm group transition-all ${
                  dl.completed ? "border-slate-200 opacity-60" : "border-slate-100 hover:border-slate-300"
                }`}
              >
                {/* 왼쪽 영역: 체크박스 + 디데이 배지 + 마감 내용 */}
                <div className="flex items-center gap-2 overflow-hidden flex-1 mr-2">
                  {/* ☑️ 완료 체크박스 복구 */}
                  <input
                    type="checkbox"
                    checked={dl.completed || false}
                    onChange={(e) => handleToggleComplete(dl.id, e)}
                    className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500 cursor-pointer flex-shrink-0"
                  />
                  
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    dl.completed 
                      ? "bg-slate-200 text-slate-500 line-through" 
                      : "bg-red-50 text-red-500"
                  }`}>
                    {calculateDDay(dl.date)}
                  </span>
                  
                  <p className={`text-xs font-semibold text-slate-700 truncate ${
                    dl.completed ? "line-through text-slate-400" : ""
                  }`} title={dl.text}>
                    {dl.text}
                  </p>
                </div>
                
                {/* ❌ 우측 정렬 삭제 버튼 (이벤트 전파 방지 적용) */}
                <button
                  type="button"
                  onClick={(e) => handleDeleteDeadline(dl.id, e)}
                  className="text-slate-400 hover:text-red-500 text-xs p-1 font-bold transition-colors rounded hover:bg-slate-100 flex-shrink-0"
                  title="삭제하기"
                >
                  ✕
                </button>
              </div>
            ))
        )}
      </div>

      {/* 데드라인 입력 폼 */}
      <form onSubmit={handleAddDeadline} className="flex flex-col gap-2 border-t border-slate-100 pt-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="마감일 제목을 입력하세요"
          className="w-full text-xs p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white font-medium text-slate-700 shadow-sm"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="flex-1 text-xs p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white font-medium text-slate-600 shadow-sm"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 rounded-xl shadow-md transition-all active:scale-95"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
}