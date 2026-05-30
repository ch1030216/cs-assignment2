"use client";

export default function CalendarBox({ selectedDate, setSelectedDate }) {
  const [yearStr, monthStr, dayStr] = selectedDate.split("-");
  const currentYear = parseInt(yearStr);
  const currentMonth = parseInt(monthStr); // 1 ~ 12

  // 이전 달, 다음 달 이동 버튼 함수
  const changeMonth = (direction) => {
    let nextYear = currentYear;
    let nextMonth = currentMonth + direction;

    if (nextMonth > 12) { nextMonth = 1; nextYear += 1; }
    if (nextMonth < 1) { nextMonth = 12; nextYear -= 1; }

    const padMonth = String(nextMonth).padStart(2, "0");
    setSelectedDate(`${nextYear}-${padMonth}-01`);
  };

  // 달력 그리드를 그리기 위한 날짜 계산 logic
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay(); // 시작 요일 (0: 일요일)
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // 해당 달의 총 일수

  const daysArray = [];
  // 시작 요일 전까지 빈 칸 채우기
  for (let i = 0; i < firstDayOfMonth; i++) { daysArray.push(null); }
  // 1일부터 마지막 날까지 채우기
  for (let i = 1; i <= daysInMonth; i++) { daysArray.push(i); }

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* 상단 컨트롤러 조작 바 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Calendar</h2>
          <div className="flex items-center gap-4 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <button onClick={() => changeMonth(-1)} className="font-bold hover:text-slate-500 text-slate-700 px-1">◀</button>
            <span className="font-extrabold text-sm text-slate-800">{currentYear}년 {currentMonth}월</span>
            <button onClick={() => changeMonth(1)} className="font-bold hover:text-slate-500 text-slate-700 px-1">▶</button>
          </div>
        </div>

        {/* 요일 라벨 표시 행 */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">
          {dayLabels.map((day, idx) => (
            <div key={idx} className={idx === 0 ? "text-red-400" : idx === 6 ? "text-blue-400" : ""}>{day}</div>
          ))}
        </div>

        {/* 30일 바둑판 달력 그리드 본체 */}
        <div className="grid grid-cols-7 gap-2">
          {daysArray.map((day, index) => {
            if (day === null) return <div key={`empty-${index}`} />;

            const dateString = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isSelected = selectedDate === dateString;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateString)}
                className={`h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-all ${
                  isSelected 
                    ? "bg-slate-800 text-white shadow-md transform scale-105" 
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* 최하단에 현재 선택된 날짜 바 한 번 더 노출 */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-medium">Selected:</span>
        <span className="text-sm font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">{selectedDate}</span>
      </div>
    </div>
  );
}