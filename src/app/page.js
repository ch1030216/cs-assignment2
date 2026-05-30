"use client";
import { useState } from "react";
import dynamic from 'next/dynamic'; // ⭐️ 추가
import CalendarBox from "./components/CalendarBox";
import MusicPlayer from "./components/MusicPlayer";
import DeadlineList from "./components/DeadlineList";

// ⭐️ 핵심: 서버 빌드에서 이 컴포넌트를 아예 무시하게 만듭니다.
const TodoList = dynamic(() => import('./components/TodoList'), { ssr: false });

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [todos, setTodos] = useState({ "2026-05-30": [] });
  const [deadlines, setDeadlines] = useState([]);

  return (
    <main className={`min-h-screen p-8 flex gap-8 transition-colors ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      <div className="w-1/2 bg-white p-6 rounded-3xl shadow-lg border border-sky-100">
        <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={false} />
      </div>

      <div className="w-1/2 flex flex-col gap-6">
        <label className="flex items-center gap-2 cursor-pointer self-end">
          <input type="checkbox" className="toggle" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className={darkMode ? "text-white" : "text-black"}>Dark Mode</span>
        </label>

        <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-sky-100"}`}>
          <h2 className="font-bold mb-2">Diary</h2>
          <textarea className="w-full h-32 p-2 border rounded-xl bg-transparent" placeholder="일기를 기록하세요..." />
          
          <TodoList selectedDate={selectedDate} todos={todos} setTodos={setTodos} darkMode={darkMode} />
          <MusicPlayer selectedDate={selectedDate} darkMode={darkMode} />
          <DeadlineList selectedDate={selectedDate} deadlines={deadlines} setDeadlines={setDeadlines} darkMode={darkMode} />
        </div>
      </div>
    </main>
  );
}