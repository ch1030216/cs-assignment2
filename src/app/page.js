"use client";

import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [diaryText, setDiaryText] = useState("");
  const [todos, setTodos] = useState({ "2026-05-30": [] });
  const [deadlines, setDeadlines] = useState([
    { id: 1, text: "컴퓨터개론 과제 제출", date: "2026-05-31", completed: false }
  ]);

  return (
    <div className={`min-h-screen p-10 transition-colors ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      <button className="mb-4 text-xs font-bold" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Dark Mode 켜짐" : "Light Mode"}
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* 달력: 다크모드에서도 흰색 고정 */}
        <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm">
          <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={darkMode} />
        </div>

        <div className="flex flex-col gap-6">
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} darkMode={darkMode} />
          </div>
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <MusicPlayer darkMode={darkMode} />
          </div>
        </div>

        {/* 복원된 Diary & DeadlineList 섹션 */}
        <div className="flex flex-col gap-6">
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <h2 className={`font-bold mb-2 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>Diary</h2>
            <textarea className="w-full h-40 p-2 text-sm border rounded-xl" value={diaryText} onChange={(e) => setDiaryText(e.target.value)} />
          </div>
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <DeadlineList deadlines={deadlines} setDeadlines={setDeadlines} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}