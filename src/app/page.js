"use client";
import { useState } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import Diary from "./components/Diary";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-05-30");
  const [musicData, setMusicData] = useState({}); // 날짜별 음악 저장

  return (
    <div className={`min-h-screen p-8 flex gap-8 ${darkMode ? "bg-slate-950" : "bg-sky-50"}`}>
      {/* 1. 왼쪽 모니터: 캘린더 전용 */}
      <div className="w-1/2 bg-white p-6 rounded-3xl shadow-lg border border-sky-100">
        <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} darkMode={false} />
      </div>

      {/* 6. 라이트모드 스위치 */}
      <div className="w-1/2 flex flex-col gap-6">
        <label className="flex items-center gap-2 cursor-pointer self-end">
          <input type="checkbox" className="toggle" onChange={() => setDarkMode(!darkMode)} />
          <span className={darkMode ? "text-white" : "text-black"}>Dark Mode</span>
        </label>

        {/* 2. 섹션 분리 (다이어리, 투두, 음악, 데드라인) */}
        <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-sky-100"}`}>
          <Diary selectedDate={selectedDate} darkMode={darkMode} />
          <TodoList selectedDate={selectedDate} darkMode={darkMode} />
          <MusicPlayer selectedDate={selectedDate} musicData={musicData} setMusicData={setMusicData} darkMode={darkMode} />
          <DeadlineList selectedDate={selectedDate} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}