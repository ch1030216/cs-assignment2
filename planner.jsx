import React, { useState, useEffect } from 'react';

export default function Planner() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaries, setDiaries] = useState({}); // { "2026-05-30": "오늘의 일기 내용" }
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryText, setDiaryText] = useState('');

  // 1. 로컬 스토리지에서 기존 일기 데이터 불러오기d
  useEffect(() => {
    const savedData = localStorage.getItem('my_planner_data');
    if (savedData) setDiaries(JSON.parse(savedData));
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 = 1월, 11 = 12월

  // 2. 달력 날짜 계산 로직
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 이번 달 시작 요일 (0: 일요일 ~ 6: 토요일)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 이번 달 총 일 수

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  const calendarCells = [...emptySlots, ...daysArray];

  // 3. 월 이동 함수
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 4. 일기 저장 함수
  const handleSaveDiary = () => {
    const updated = { ...diaries, [selectedDate]: diaryText };
    setDiaries(updated);
    localStorage.setItem('my_planner_data', JSON.stringify(updated));
    setSelectedDate(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 캘린더 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="px-4 py-2 bg-gray-200 rounded">이전 달</button>
        <h2 className="text-2xl font-bold">{year}년 {month + 1}월</h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-gray-200 rounded">다음 달</button>
      </div>

      {/* 요일 표시 */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
          <div key={idx} className={idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : ''}>{day}</div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((date, index) => {
          if (!date) return <div key={index} className="h-24 bg-gray-50 rounded"></div>;
          
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          const hasContent = diaries[dateStr];

          return (
            <div
              key={index}
              onClick={() => {
                setSelectedDate(dateStr);
                setDiaryText(diaries[dateStr] || '');
              }}
              className="h-24 border p-1 rounded cursor-pointer hover:bg-blue-50 transition-colors flex flex-col justify-between"
            >
              <span className="font-medium">{date}</span>
              {hasContent && (
                <div className="text-xs bg-yellow-100 text-yellow-800 truncate p-1 rounded">
                  📝 {diaries[dateStr]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 일기 작성 모달 (팝업) */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{selectedDate} 플래너/다이어리</h3>
            <textarea
              className="w-full h-40 border p-2 rounded mb-4 resize-none"
              placeholder="오늘의 계획이나 일기를 적어보세요."
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedDate(null)} className="px-4 py-2 bg-gray-300 rounded">취소</button>
              <button onClick={handleSaveDiary} className="px-4 py-2 bg-blue-600 text-white rounded">저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}