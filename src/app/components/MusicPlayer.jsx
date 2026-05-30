"use client";

import { useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  return (
    <div className="w-full flex flex-col gap-2.5 font-sans">
      <h2 className="text-sm font-bold text-sky-800 flex items-center gap-1.5">
        <span>🎵</span> Today's Music
      </h2>

      <div className="flex items-center gap-3 bg-white border border-sky-100/70 p-3 rounded-2xl shadow-sm">
        {/* ⭐️ 명도와 채도를 조절하여 확실히 눈에 띄는 선명한 하늘색 재생/일시정지 버튼 */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-sky-400 hover:bg-sky-500 text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 flex-shrink-0"
        >
          {isPlaying ? (
            // 일시정지 아이콘 (Pause)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            // 재생 아이콘 (Play)
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          )}
        </button>

        {/* 곡 제목 스트리밍 텍스트 느낌 표현 */}
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-bold text-sky-900 truncate">
            {isPlaying ? "🎧 감성 코딩 Lo-fi 플레이리스트 재생 중..." : "선택된 음악이 없습니다."}
          </p>
        </div>
      </div>

      {/* 유튜브 주소 등록 인풋 */}
      <div className="flex gap-1.5">
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="유튜브 주소(URL)를 입력하세요"
          className="flex-1 text-[11px] p-2 border border-sky-100 rounded-xl focus:outline-none focus:border-sky-400 bg-white font-medium text-sky-800 placeholder-sky-300"
        />
        <button 
          type="button"
          className="p-2 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl text-xs font-bold transition-all"
        >
          등록
        </button>
      </div>
    </div>
  );
}