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
  const [deadlines, setDeadlines] = useState([]);

  return (
    <main className={`min-h-screen p-8 flex gap-8 transition-colors ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      <div className="w-1/2 bg-white p-6 rounded-3xl shadow-lg border border-sky-100">
        <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={false} />
      </div>

      <div className="w-1/2 flex flex-col gap-6">
        <label className="flex items-center gap-2 cursor-pointer self-end">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span className={darkMode ? "text-white" : "text-black"}>Dark Mode</span>
        </label>

        <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-sky-100"}`}>
          <h2 className="font-bold mb-2">Diary</h2>
          <textarea className="w-full h-32 p-2 border rounded-xl bg-transparent" placeholder="일기를 기록하세요..." />
          
          {/* ⭐️ 중요: 안전성을 위해 객체 전체가 아닌 특정 날짜 데이터를 보장해서 전달 */}
          <TodoList 
            selectedDate={selectedDate} 
            todos={todos || {}} 
            setTodos={setTodos} 
            darkMode={darkMode} 
          />
          <MusicPlayer selectedDate={selectedDate} darkMode={darkMode} />
          <DeadlineList selectedDate={selectedDate} deadlines={deadlines} setDeadlines={setDeadlines} darkMode={darkMode} />
        </div>
      </div>
    </main>
  );
}