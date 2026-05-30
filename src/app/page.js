"use client";
import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [todos, setTodos] = useState({ "2026-05-30": [] });

  return (
    <main className={`min-h-screen p-8 transition-colors ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      {/* 2. 다크모드 스위치 */}
      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
          <input type="checkbox" className="toggle" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className={darkMode ? "text-white" : "text-slate-800"}>Dark Mode</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 왼쪽: 캘린더 */}
        <div className={`p-6 rounded-3xl border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
          <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={darkMode} />
        </div>

        {/* 오른쪽: 투두, 다이어리, 음악, 데드라인 */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} darkMode={darkMode} />
          
          <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"}`}>
            <h2 className="font-bold mb-2">Diary</h2>
            <textarea className="w-full h-32 p-2 border rounded-xl bg-transparent" placeholder="일기를 기록하세요..." />
          </div>

          <MusicPlayer selectedDate={selectedDate} darkMode={darkMode} />
          <DeadlineList selectedDate={selectedDate} darkMode={darkMode} />
        </div>
      </div>
    </main>
  );
}