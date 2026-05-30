"use client";

export default function CalendarBox({ selectedDate, setSelectedDate, darkMode }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={`p-4 ${darkMode ? "text-white" : "text-slate-800"}`}>
      <div className="flex justify-between mb-4">
        <button onClick={() => {}}>◀</button>
        <h2 className="font-bold">2026년 5월</h2>
        <button onClick={() => {}}>▶</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          return (
            <button 
              key={day} 
              onClick={() => setSelectedDate(dateStr)}
              className={`p-2 rounded-lg ${isSelected ? "bg-sky-500 text-white" : darkMode ? "bg-slate-700" : "bg-white border"}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}