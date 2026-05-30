"use client";

import { useState, useEffect } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. YouTube oEmbed API로 제목 가져오기
  const fetchVideoTitle = async (id) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
      const data = await response.json();
      setVideoTitle(data.title);
    } catch (error) {
      setVideoTitle("제목을 불러올 수 없습니다.");
    }
  };

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
      fetchVideoTitle(id); // 제목 가져오기 실행
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
          {/* 재생/일시정지 버튼 */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-sky-500 text-white shadow-md hover:bg-sky-600 transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="ml-1">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </button>
          
          <p className="text-xs font-bold truncate text-slate-500">{videoTitle}</p>
        </div>

        {/* 설정 버튼 */}
        <button className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 URL 입력"
          className="flex-1 text-xs p-2.5 border rounded-xl border-sky-100"
        />
        <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200">등록</button>
      </form>

      {videoId && (
        <iframe
          className="hidden"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          allow="autoplay"
        ></iframe>
      )}
    </div>
  );
}