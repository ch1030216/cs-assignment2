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
    
    // ⭐️ 메인 홈화면의 날짜 상태를 안전하게 변경합니다.
    setSelectedDate(`${year}-${formattedMonth}-${formattedDay}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-2">
      {/* 달력 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Calendar</h2>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
          <button type="button" onClick={prevMonth} className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors text-xs font-bold">◀</button>
          <span className="text-xs font-bold text-slate-700 px-2">{year}년 {month + 1}월</span>
          <button type="button" onClick={nextMonth} className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors text-xs font-bold">▶</button>
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

      {/* 날짜 그리드판 - 세로 길이 확장 및 터치 영역 최적화 */}
      <div className="grid grid-cols-7 gap-1 flex-1 min-h-[420px]">
        {daysArray.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} className="bg-transparent" />;

          const formattedMonth = String(month + 1).padStart(2, "0");
          const formattedDay = String(day).padStart(2, "0");
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
          const isSelected = selectedDate === dateStr;

          // ⭐️ 시차 버그가 발생하던 `new Date().toISOString()`을 걷어내고, 
          // 대시가 포함된 문자열(YYYY-MM-DD) 규격을 정확하게 대조하여 버그를 완벽 해결했습니다.
          const dayDeadlines = Array.isArray(deadlineData)
            ? deadlineData.filter((dl) => {
                if (!dl.date) return false;
                
                // 각 브라우저 인풋 폼마다 다를 수 있는 월/일 앞의 0 자릿수를 맞춰서 정규화
                const [dlY, dlM, dlD] = dl.date.split("-");
                if (!dlY || !dlM || !dlD) return false;
                const normDlDate = `${dlY}-${String(dlM).padStart(2, "0")}-${String(dlD).padStart(2, "0")}`;
                
                return normDlDate === dateStr;
              })
            : [];

          return (
            <button
              key={`day-${day}`}
              type="button" // form 전송 간섭 방지
              onClick={() => handleDateClick(day)}
              className={`border border-slate-100 rounded-xl p-1 flex flex-col justify-between items-start cursor-pointer transition-all min-h-[70px] w-full text-left ${
                isSelected
                  ? "bg-slate-800 text-white border-slate-800 shadow-md scale-[1.02]"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {/* 날짜 숫자 */}
              <span className="text-xs font-bold px-1.5 py-0.5">{day}</span>

              {/* 데드라인 미니 배지 영역 */}
              <div className="w-full flex flex-col gap-0.5 overflow-hidden mt-1">
                {dayDeadlines.slice(0, 2).map((dl) => (
                  <div
                    key={dl.id}
                    className={`text-[9px] px-1 py-0.5 rounded font-bold truncate max-w-full text-center block w-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : dl.completed
                          ? "bg-slate-100 text-slate-400 line-through" // 완료된 일정은 달력에서도 흐리게 처리
                          : "bg-red-50 text-red-500 border border-red-100"
                    }`}
                    title={dl.text}
                  >
                    📌 {dl.text}
                  </div>
                ))}
                {dayDeadlines.length > 2 && (
                  <div className={`text-[8px] text-center font-medium w-full ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                    +{dayDeadlines.length - 2}개 더 있음
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}