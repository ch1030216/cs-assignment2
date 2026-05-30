"use client";

import { useState } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [currentTrack, setCurrentTrack] = useState("선택된 음악이 없습니다.");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRegisterMusic = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // 간단한 유튜브 제목 추출 시뮬레이션 및 곡 등록 로직
    try {
      if (urlInput.includes("watch?v=")) {
        const videoId = urlInput.split("watch?v=")[1]?.split("&")[0];
        setCurrentTrack(`YouTube Track (${videoId || "Loaded"})`);
      } else if (urlInput.includes("youtu.be/")) {
        const videoId = urlInput.split("youtu.be/")[1]?.split("?")[0];
        setCurrentTrack(`YouTube Track (${videoId || "Loaded"})`);
      } else {
        setCurrentTrack("등록된 외부 음악 오디오");
      }
      setIsPlaying(true); // 등록 완료 시 자동 재생 상태로 전환
      setUrlInput("");    // 입력창 초기화
    } catch (error) {
      setCurrentTrack("음악 링크 인식 실패");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      {/* 음악 정보 및 재생 바 카드 (다크모드 색상 완벽 조정) */}
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
          <p className={`text-xs font-bold truncate ${
            darkMode ? "text-slate-200" : "text-sky-900"
          }`}>
            {currentTrack}
          </p>
        </div>

        {/* 설정 기어 버튼 스타일 대응 */}
        <button className={`p-2 rounded-xl border transition-colors ${
          darkMode ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-400"
        }`}>
          ⚙️
        </button>
      </div>

      {/* 유튜브 주소 입력 및 등록 폼 영역 */}
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