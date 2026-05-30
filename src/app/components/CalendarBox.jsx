export default function CalendarBox({ selectedDate, setSelectedDate }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Calendar</h2>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-slate-300 rounded-lg font-medium focus:outline-slate-500 cursor-pointer"
          />
        </div>
        
        <div className="flex-1 bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-2">Selected Date</p>
          <p className="text-4xl font-extrabold text-slate-800">{selectedDate}</p>
          <p className="text-slate-500 mt-4 text-center text-sm">
            이 달력에서 날짜를 바꾸면 <br/>오른쪽 섹션들의 내용이 자동으로 전환됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}