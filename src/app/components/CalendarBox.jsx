"use client";
export default function CalendarBox({ selectedDate, setSelectedDate, darkMode }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className={`p-6 rounded-3xl border ${darkMode ? "bg-[#111827] border-slate-700 text-white" : "bg-white border-sky-100"}`}>
      <h2 className="font-bold mb-4">Calendar</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const dateStr = `2026-05-${String(day).padStart(2, '0')}`;
          return (
            <button key={day} onClick={() => setSelectedDate(dateStr)} className={`p-2 rounded ${selectedDate === dateStr ? "bg-sky-500 text-white" : ""}`}>
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}