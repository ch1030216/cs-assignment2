"use client";

import { useState } from "react";

export default function CalendarBox({ selectedDate, setSelectedDate, deadlineData = [], darkMode }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) { daysArray.push(null); }
  for (let i = 1; i <= daysInMonth; i++) { daysArray.push(i); }

  const handleDateClick = (day) => {
    if (!day) return;
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    setSelectedDate(`${year}-${formattedMonth}-${formattedDay}`);
  };

  return (
    // 1. 전체 컨테이너에 배경색 및 텍스트 색상 적용
    <div className={`w-full h-full flex flex-col justify-between p-1 select-none font-sans ${darkMode ? "bg-slate-950 text-slate-200" : "bg-white text-slate-800"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-base font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
          Calendar
        </h2>
        <div className={`flex items-center gap-1.5 rounded-xl p-1 ${darkMode ? "bg-slate-900" : "bg-sky-100/70"}`}>
          <button type="button" onClick={prevMonth} className={`p-1 rounded-lg text-[10px] font-bold transition-colors ${darkMode ? "text-sky-400 hover:bg-slate-800" : "text-sky-700 hover:bg-white"}`}>◀</button>
          <span className={`text-[11px] font-bold px-1 ${darkMode ? "text-slate-200" : "text-sky-800"}`}>{year}년 {month + 1}월</span>
          <button type="button" onClick={nextMonth} className={`p-1 rounded-lg text-[10px] font-bold transition-colors ${darkMode ? "text-sky-400 hover:bg-slate-800" : "text-sky-700 hover:bg-white"}`}>▶</button>
        </div>
      </div>

      <div className={`grid grid-cols-7 gap-1 text-center text-[11px] font-bold mb-1.5 ${darkMode ? "text-slate-500" : "text-sky-400"}`}>
        <div className="text-red-400">일</div>
        <div>월</div><div>화</div><div>수</div><div>목</div><div>금</div>
        <div className="text-blue-400">토</div>
      </div>

      <div className="grid grid-cols-7 gap-1 flex-1 min-h-[380px]">
        {daysArray.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="bg-transparent" />;

          const formattedMonth = String(month + 1).padStart(2, "0");
          const formattedDay = String(day).padStart(2, "0");
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
          const isSelected = selectedDate === dateStr;

          const dayDeadlines = Array.isArray(deadlineData)
            ? deadlineData.filter((dl) => {
                if (!dl.date) return false;
                const [dlY, dlM, dlD] = dl.date.split("-");
                return `${dlY}-${String(dlM).padStart(2, "0")}-${String(dlD).padStart(2, "0")}` === dateStr;
              })
            : [];

          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              // 2. 날짜 셀: 투명도 제거 및 다크 모드 배경색을 확실한 색상(bg-slate-900)으로 설정
              className={`border rounded-xl p-1 flex flex-col justify-between items-start cursor-pointer transition-all min-h-[62px] relative ${
                isSelected
                  ? "bg-sky-500 text-white border-sky-500 shadow-md scale-[1.01] z-10"
                  : darkMode
                    ? "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                    : "bg-white text-slate-800 border-sky-100/50 hover:bg-sky-50"
              }`}
            >
              {/* 3. 날짜 숫자 텍스트 색상 명시 */}
              <span className={`text-[11px] font-bold px-1 py-0.5 rounded ${isSelected ? "text-white" : darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {day}
              </span>

              <div className="w-full flex flex-col gap-0.5 overflow-hidden mt-0.5 pointer-events-none">
                {dayDeadlines.slice(0, 1).map((dl) => (
                  <div
                    key={dl.id}
                    className={`text-[8px] px-1 py-0.5 rounded font-bold truncate text-center block w-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : dl.completed
                          ? "opacity-40 line-through"
                          : darkMode 
                            ? "bg-slate-800 text-sky-400 border border-slate-700" 
                            : "bg-sky-100 text-sky-600 border border-sky-200/50"
                    }`}
                  >
                    📌 {dl.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}