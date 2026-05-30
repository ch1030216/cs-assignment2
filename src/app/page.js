"use client";

import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [diaryText, setDiaryText] = useState("");
  
  // ⭐️ 빌드 에러를 방지하기 위해 기본 날짜 키값들을 안전하게 초기화해 둡니다.
  const [todos, setTodos] = useState({
    "2026-05-30": [],
    "2026-05-31": []
  });

  const [deadlines, setDeadlines] = useState([
    { id: 1, text: "컴퓨터개론 과제 제출", date: "2026-05-31", completed: false },
    { id: 2, text: "C언어 포인터 복습", date: "2026-06-05", completed: false }
  ]);

  return (
    <div className="min-h-screen p-6 md:p-10 flex justify-center items-center font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-sky-100">
        
        {/* 왼쪽: 달력 영역 */}
        <div className="md:col-span-1 bg-sky-50/50 p-5 rounded-2xl border border-sky-100/60 shadow-sm">
          <CalendarBox 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            deadlineData={deadlines}
          />
        </div>

        {/* 가운데: 투두리스트 & 음악 영역 */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-sky-50/50 p-5 rounded-2xl border border-sky-100/60 shadow-sm flex flex-col justify-between">
            {/* ⭐️ 안정적인 데이터 연동을 위해 todos와 setTodos를 함께 전달합니다. */}
            <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} />
          </div>
          <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-100/60 shadow-sm">
            <MusicPlayer />
          </div>
        </div>

        {/* 오른쪽: 일기장 & 데드라인 리스트 */}
        <div className="flex flex-col gap-6">
          {/* 일기장 영역 */}
          <div className="flex-1 bg-sky-50/50 p-5 rounded-2xl border border-sky-100/60 shadow-sm flex flex-col gap-3">
            <h2 className="text-sm font-bold text-sky-800 flex items-center gap-1.5">
              <span>✍️</span> Diary
            </h2>
            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder={`${selectedDate}의 일기를 자유롭게 기록해 보세요...`}
              className="w-full flex-1 min-h-[150px] p-3 text-xs border border-sky-100 rounded-xl focus:outline-none focus:border-sky-400 bg-white font-medium text-sky-900 placeholder-sky-300 shadow-sm resize-none"
            />
          </div>

          {/* 데드라인 알림창 영역 */}
          <div className="bg-sky-50/50 p-5 rounded-2xl border border-sky-100/60 shadow-sm">
            <h2 className="text-sm font-bold text-sky-800 mb-3 flex items-center gap-1.5">
              <span>📅</span> 마감일 알림창
            </h2>
            <DeadlineList 
              selectedDate={selectedDate} 
              deadlines={deadlines} 
              setDeadlines={setDeadlines} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}