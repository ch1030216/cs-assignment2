import { useState } from "react";

export default function DeadlineList({ selectedDate, deadlines, setDeadlines }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const addDeadline = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      targetDate: newDate,
      checked: false,
    };

    setDeadlines([...deadlines, newItem]);
    setNewTitle("");
    setNewDate("");
  };

  // D-Day 계산 함수 (선택된 날짜를 기준점으로 삼음)
  const calculateDDay = (targetDateStr) => {
    const today = new Date(selectedDate);
    const target = new Date(targetDateStr);
    
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "D-DAY";
    return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  // 조건 필터링: 완료(checked)되었고, 선택된 기준 날짜가 디데이 마감 날짜를 넘겼다면 화면에서 제외
  const visibleDeadlines = deadlines.filter((item) => {
    const today = new Date(selectedDate);
    const target = new Date(item.targetDate);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    if (item.checked && today > target) return false;
    return true;
  });

  const toggleCheck = (id) => {
    setDeadlines(deadlines.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold mb-3 text-slate-800">Deadline</h2>
        
        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
          {visibleDeadlines.length === 0 ? (
            <p className="text-xs text-slate-400">등록된 마감일이 없습니다.</p>
          ) : (
            visibleDeadlines.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="w-3.5 h-3.5 rounded text-slate-800"
                  />
                  <span className={`text-xs font-medium ${item.checked ? "line-through text-slate-400" : "text-slate-700"}`}>
                    {item.title}
                  </span>
                </label>
                <span className={`text-xs font-bold ${item.checked ? "text-slate-400" : "text-red-500"}`}>
                  {calculateDDay(item.targetDate)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 새 마감일 추가 폼 */}
      <form onSubmit={addDeadline} className="flex flex-col gap-1.5 border-t pt-3 border-slate-100">
        <input
          type="text"
          placeholder="마감일 제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-xs p-2 border border-slate-200 rounded-lg focus:outline-slate-400"
        />
        <div className="flex gap-1">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="text-xs p-1.5 border border-slate-200 rounded-lg flex-1 cursor-pointer focus:outline-slate-400"
          />
          <button type="submit" className="text-xs bg-slate-800 text-white px-3 rounded-lg font-bold hover:bg-slate-700 transition-colors">
            추가
          </button>
        </div>
      </form>
    </div>
  );
}