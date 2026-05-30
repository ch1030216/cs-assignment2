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
  const [deadlines, setDeadlines] = useState([]);

  return (
    <div className={`min-h-screen p-10 flex flex-col items-center transition-colors ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      <button className="mb-4 text-xs font-bold" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="w-full max-w-7xl grid grid-cols-2 gap-6">
        {/* 2번 해결: 클래스에서 darkMode에 따른 배경색 변경을 제거하고 bg-white로 고정 */}
        <div className="p-5 rounded-2xl border shadow-sm bg-white border-sky-100">
          <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} deadlineData={deadlines} darkMode={darkMode} />
        </div>

        <div className="flex flex-col gap-6">
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} darkMode={darkMode} />
          </div>
          <div className={`p-5 rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
            <MusicPlayer darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}