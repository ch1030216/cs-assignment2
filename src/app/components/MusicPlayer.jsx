"use client";

import { useState, useRef } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRegisterMusic = (e) => {
    e.preventDefault();
    // 유튜브 URL에서 ID 추출 (간편 로직)
    const id = urlInput.split("v=")[1]?.split("&")[0] || urlInput.split("youtu.be/")[1];
    if (id) {
      setVideoId(id);
      setVideoTitle("Lost Stars - Keira Knightley"); // 실제 데이터 시뮬레이션
      setIsPlaying(true);
      setUrlInput("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md flex-shrink-0 transition-colors ${
              darkMode ? "bg-slate-700 text-sky-400" : "bg-sky-100 text-sky-600"
            }`}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          {/* 텍스트 겹침 현상 해결: 고정 크기 컨테이너와 내부 스크롤 */}
          <div className="overflow-hidden w-full">
            <p className={`text-xs font-bold truncate ${darkMode ? "text-slate-200" : "text-sky-900"}`}>
              {videoTitle}
            </p>
          </div>
        </div>
        <button className={`p-2 rounded-xl border ${darkMode ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-slate-50 border-sky-100 text-slate-400"}`}>
          ⚙️
        </button>
      </div>

      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 주소 입력"
          className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none ${
            darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"
          }`}
        />
        <button type="submit" className="text-xs bg-sky-500 text-white px-3 py-2 rounded-xl">등록</button>
      </form>
      
      {/* 실제 재생 엔진 */}
      {videoId && (
        <iframe className="hidden" src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`} allow="autoplay" />
      )}
    </div>
  );
}