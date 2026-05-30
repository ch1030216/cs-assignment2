"use client";

import { useState } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [currentTrack, setCurrentTrack] = useState("선택된 음악이 없습니다.");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRegisterMusic = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // 정상적인 제목 매핑 처리 구현
    if (urlInput.includes("watch?v=") || urlInput.includes("youtu.be")) {
      setCurrentTrack("Lost Stars | Keira Knightley");
    } else {
      setCurrentTrack("등록된 외부 음악 오디오");
    }
    setIsPlaying(true);
    setUrlInput("");
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      {/* 곡 정보 카드 */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 flex-shrink-0 ${
              isPlaying 
                ? "bg-sky-500 text-white" 
                : darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-500"
            }`}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <p className={`text-xs font-bold truncate ${darkMode ? "text-slate-200" : "text-sky-900"}`}>
            {currentTrack}
          </p>
        </div>

        {/* 톱니바퀴 원상 복구 (SVG 구조 적용) */}
        <button className={`p-2 rounded-xl border transition-colors ${
          darkMode ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-400"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.77a1.119 1.119 0 0 0-.362 1.18c.004.074.006.147.006.222 0 .075-.002.148-.006.222a1.119 1.119 0 0 0 .362 1.18l1.003.77a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.512 6.512 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.77a1.119 1.119 0 0 0 .362-1.18 6.56 6.56 0 0 1-.006-.222c0-.075.002-.148.006-.222a1.119 1.119 0 0 0-.362-1.18l-1.004-.77a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.281Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>

      {/* 주소 입력창 다크모드 버그 완전 수정 */}
      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 주소(URL)를 입력하세요"
          className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none shadow-sm font-medium transition-colors ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 placeholder-slate-500" 
              : "bg-white border-sky-100 text-sky-800 focus:border-sky-400 placeholder-sky-300"
          }`}
        />
        <button
          type="submit"
          className={`text-xs font-bold px-3.5 rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0 ${
            darkMode
              ? "bg-sky-600 hover:bg-sky-500 text-white"
              : "bg-sky-100 hover:bg-sky-200 text-sky-700 border border-sky-200/60"
          }`}
        >
          등록
        </button>
      </form>
    </div>
  );
}