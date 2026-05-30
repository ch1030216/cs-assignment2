export default function DeadlineList({ selectedDate, darkMode }) {
  // 예시 데이터
  const deadlineDate = "2026-05-31"; 
  
  const calculateDDay = (target) => {
    const diff = new Date(target).getTime() - new Date(selectedDate).getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? "D-Day" : days > 0 ? `D-${days}` : `D+${Math.abs(days)}`;
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold">마감일 알림창</h3>
      <div className={`p-2 rounded ${darkMode ? "text-slate-200" : "text-slate-800"}`}>
        {calculateDDay(deadlineDate)}: 컴퓨터개론 과제 제출
      </div>
    </div>
  );
}