"use client";

import { useState } from "react";

export default function MusicPlayer({ darkMode }) {
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");

  return (
    <div className="w-full">
      <div className={`p-3 rounded-xl border flex items-center gap-3 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
        <button className="w-8 h-8 bg-sky-500 text-white rounded-full">▶</button>
        <p className={`text-xs font-bold ${darkMode ? "text-slate-200" : "text-sky-900"}`}>
          {videoTitle}
        </p>
      </div>
    </div>
  );
}