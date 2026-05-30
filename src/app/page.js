"use client";
import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [diary, setDiary] = useState("");

  return (
    <main className={`min-h-screen p-8 transition-colors ${darkMode ? "bg-[#0B1120]" : "bg-[#F0F7FF]"}`}>
      <label className={`flex items-center gap-2 mb-6 cursor-pointer ${darkMode ? "text-white" : ""}`}>
        {darkMode ? "Dark Mode" : "Light Mode"}
        <input type="checkbox" className="toggle" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </label>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={darkMode} />
        <div className="flex flex-col gap-6">
          <TodoList selectedDate={selectedDate} darkMode={darkMode} />
          <MusicPlayer darkMode={darkMode} />
        </div>
        <div className="flex flex-col gap-6">
          <div className={`p-6 rounded-3xl border ${darkMode ? "bg-[#111827] border-slate-700 text-white" : "bg-white border-sky-100"}`}>
            <h2 className="font-bold mb-4">Diary</h2>
            <textarea value={diary} onChange={(e) => setDiary(e.target.value)} className="w-full h-40 p-2 border rounded bg-transparent" placeholder="일기를 기록하세요..." />
          </div>
          <DeadlineList darkMode={darkMode} />
        </div>
      </div>
    </main>
  );
}