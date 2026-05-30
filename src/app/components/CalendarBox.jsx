"use client";

import { useState } from "react";

export default function CalendarBox({ selectedDate, setSelectedDate, deadlineData = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleDateClick = (day) => {
    if (!day) return;
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    setSelectedDate(`${year}-${formattedMonth}-${formattedDay}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-2">
      {/* 달력 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Calendar</h2>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
          <button onClick={prevMonth} className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors text-xs font-bold">◀</button>
          <span className="text-xs font-bold text-slate-700 px-2">{year}년 {month + 1}월</span>
          <button onClick={nextMonth} className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors text-xs font-bold">▶</button>
        </div>
      </div>

      {/* 요일 라벨 표시 */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
        <div className="text-red-400">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-400">토</div>
      </div>

      {/* 날짜 그리드판 */}
      <div className="grid grid-cols-7 gap-1 flex-1 min-h-[420px]">
        {daysArray.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="bg-transparent" />;

          const formattedMonth = String(month + 1).padStart(2, "0");
          const formattedDay = String(day).padStart(2, "0");
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
          const isSelected = selectedDate === dateStr;

          // ⭐️ 데이터 포맷팅 안전 장치 추가: dl.date 값을 비교하여 달력 날짜와 매핑합니다.
          const dayDeadlines = Array.isArray(deadlineData)
            ? deadlineData.filter((dl) => {
                if (!dl.date) return false;
                // '2026-5-30'와 '2026-05-30' 같은 포맷 불일치 방지를 위해 가볍게 정규화 처리
                const dlDateFormatted = new Date(dl.date).toISOString().split("T")[0];
                return dlDateFormatted === dateStr;
              })
            : [];

          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              className={`border border-slate-100 rounded-xl p-1 flex flex-col justify-between cursor-pointer transition-all min-h-[70px] ${
                isSelected
                  ? "bg-slate-800 text-white border-slate-800 shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {/* 날짜 숫자 */}
              <span className="text-xs font-bold px-1.5 py-0.5">{day}</span>

              {/* ⭐️ 데드라인 미니 배지 영역 */}
              <div className="w-full flex flex-col gap-0.5 overflow-hidden mt-1">
                {dayDeadlines.slice(0, 2).map((dl) => (
                  <div
                    key={dl.id}
                    className={`text-[9px] px-1 py-0.5 rounded font-bold truncate max-w-full text-center ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-red-50 text-red-500 border border-red-100"
                    }`}
                    title={dl.text}
                  >
                    📌 {dl.text}
                  </div>
                ))}
                {dayDeadlines.length > 2 && (
                  <div className={`text-[8px] text-center font-medium ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                    +{dayDeadlines.length - 2}개 더 있음
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}