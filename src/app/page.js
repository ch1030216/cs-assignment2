"use client";

import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  
  // 수정된 부분: diaryText -> diaryData (객체 형태로 변경)
  const [diaryData, setDiaryData] = useState({}); 

  const [todos, setTodos] = useState({
    "2026-05-30": [],
    "2026-05-31": []
  });

  const [deadlines, setDeadlines] = useState([
    { id: 1, text: "컴퓨터개론 과제 제출", date: "2026-05-31", completed: false },
    { id: 2, text: "C언어 포인터 복습", date: "2026-06-05", completed: false }
  ]);

  // 현재 선택된 날짜의 일기 내용을 가져오는 변수
  const currentDiary = diaryData[selectedDate] || "";

  return (
    <div className={`min-h-screen p-6 md:p-10 flex flex-col justify-center items-center font-sans transition-colors duration-300 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-sky-100/40 text-slate-700"
    }`}>
      
      {/* ... 상단 다크모드 토글 스위치 부분 동일 ... */}
      <div className="w-full max-w-7xl flex justify-start mb-4 px-2">
        <label className="inline-flex items-center cursor-pointer select-none">
          <span className={`text-xs font-bold mr-2.5 transition-colors ${darkMode ? "text-sky-400" : "text-sky-600"}`}>
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <div className="relative">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only peer" />
            <div className={`w-9 h-5 rounded-full transition-colors ${darkMode ? "bg-sky-500" : "bg-sky-200"}`}></div>
            <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? "translate-x-4" : "translate-x-0"}`}></div>
          </div>
        </label>
      </div>

      <div className={`w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl shadow-xl border transition-all duration-300 ${
        darkMode ? "bg-slate-900/90 border-slate-800 shadow-black/60" : "bg-white/80 backdrop-blur-md border-sky-100"
      }`}>
        
        <div className={`p-5 rounded-2xl shadow-sm transition-colors ${
          darkMode ? "bg-slate-900/90 border border-slate-800" : "bg-white border border-sky-100"
        }`}>
          <CalendarBox 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            deadlineData={deadlines}
            darkMode={darkMode}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className={`flex-1 p-5 rounded-2xl border shadow-sm flex flex-col justify-between transition-colors ${
              darkMode ? "bg-slate-800/50 border-slate-700" : "bg-sky-50/50 border-sky-100/60"
            }`}>
              <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} darkMode={darkMode} />
            </div>
            <div className={`p-5 rounded-2xl border shadow-sm transition-colors ${
              darkMode ? "bg-slate-800/50 border-slate-700" : "bg-sky-50/50 border-sky-100/60"
            }`}>
              <MusicPlayer darkMode={darkMode} selectedDate={selectedDate} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`flex-1 p-5 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors ${
              darkMode ? "bg-slate-800/50 border-slate-700" : "bg-sky-50/50 border-sky-100/60"
            }`}>
              <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Diary</h2>
              <textarea
                value={currentDiary}
                onChange={(e) => setDiaryData(prev => ({ ...prev, [selectedDate]: e.target.value }))}
                placeholder={`${selectedDate}의 일기를 자유롭게 기록해 보세요...`}
                className={`w-full flex-1 min-h-[150px] p-3 text-xs border rounded-xl focus:outline-none shadow-sm resize-none font-medium transition-colors ${
                  darkMode 
                    ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 placeholder-slate-500" 
                    : "bg-white border-sky-100 text-sky-900 focus:border-sky-400 placeholder-sky-300"
                }`}
              />
            </div>

            <div className={`p-5 rounded-2xl border shadow-sm transition-colors ${
              darkMode ? "bg-slate-800/50 border-slate-700" : "bg-sky-50/50 border-sky-100/60"
            }`}>
              <h2 className={`text-sm font-bold mb-3 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Deadline</h2>
              <DeadlineList 
                selectedDate={selectedDate} 
                deadlines={deadlines} 
                setDeadlines={setDeadlines} 
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}