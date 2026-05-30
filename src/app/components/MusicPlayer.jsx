"use client";

import { useState, useRef } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleRegisterMusic = (e) => {
    e.preventDefault();
    const id = extractVideoId(urlInput);

    if (id) {
      setVideoId(id);
      setVideoTitle("음악이 로드되었습니다."); // 실제 API 연동 시 제목을 받아오세요
      setIsPlaying(true);
      setUrlInput("");
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
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
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 flex-shrink-0 ${
              isPlaying 
                ? "bg-sky-500 text-white" 
                : darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-500"
            }`}
          >
            {isPlaying ? (
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-white rounded-full"></div>
                <div className="w-0.5 h-3 bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent ml-0.5"></div>
            )}
          </button>
          
          {/* 가독성을 위해 텍스트 흐르기 대신 말줄임표(truncate) 적용 권장 */}
          <p className={`text-xs font-bold truncate ${darkMode ? "text-slate-200" : "text-sky-900"}`}>
            {videoTitle}
          </p>
        </div>

        <button className={`p-2 rounded-xl border ${darkMode ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-400"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.167.85.142 1.205-.068l.775-.487c.48-.302 1.077-.247 1.488.136l.773.723c.41.383.568.966.398 1.498l-.28.868c-.145.448-.06.94.225 1.312.285.372.723.585 1.176.585h.926c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.167.85.142 1.205-.068l.775-.487c.48-.302 1.077-.247 1.488.136l.773.723c.41.383.568.966.398 1.498l-.28.868c-.145.448-.06.94.225 1.312.285.372.723.585 1.176.585h.926" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 URL을 입력하세요"
          className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-slate-100" 
              : "bg-white border-sky-100 text-sky-800"
          }`}
        />
        <button type="submit" className={`text-xs font-bold px-4 rounded-xl ${darkMode ? "bg-sky-600 text-white" : "bg-sky-100 text-sky-700"}`}>
          등록
        </button>
      </form>

      {/* iframe의 autoplay는 사용자가 버튼을 클릭한 이후에 동작해야 함 */}
      {videoId && (
        <iframe
          ref={playerRef}
          className="hidden"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          allow="autoplay; encrypted-media"
        ></iframe>
      )}
    </div>
  );
}