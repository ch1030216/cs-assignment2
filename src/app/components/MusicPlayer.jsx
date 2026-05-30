"use client";

import { useState, useEffect } from "react";

export default function MusicPlayer({ darkMode, selectedDate }) {
  // 1. 날짜별 음악 데이터를 객체로 관리 (예: { "2026-05-31": { id: "...", title: "..." } })
  const [musicData, setMusicData] = useState({});
  const [urlInput, setUrlInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("dailyMusicData");
    if (saved) setMusicData(JSON.parse(saved));
  }, []);

  // 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("dailyMusicData", JSON.stringify(musicData));
  }, [musicData]);

  const currentMusic = musicData[selectedDate] || { id: null, title: "선택된 음악이 없습니다." };

  const fetchVideoTitle = async (id) => {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
      const data = await response.json();
      return data.title;
    } catch {
      return "제목을 불러올 수 없습니다.";
    }
  };

  const handleRegisterMusic = async (e) => {
    e.preventDefault();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlInput.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;

    if (id) {
      const title = await fetchVideoTitle(id);
      setMusicData(prev => ({ ...prev, [selectedDate]: { id, title } }));
      setIsPlaying(true);
      setShowInput(false);
      setUrlInput("");
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        {selectedDate}의 음악
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-sky-500 text-white shadow-md hover:bg-sky-600"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          
          <div className="overflow-hidden w-full">
            <p className="text-xs font-bold whitespace-nowrap animate-marquee text-slate-500">
              {currentMusic.title}
            </p>
          </div>
        </div>

        <button onClick={() => setShowInput(!showInput)} className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
          ⚙️
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleRegisterMusic} className="flex gap-2">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="유튜브 URL 입력"
            className="flex-1 text-xs p-2.5 border rounded-xl border-sky-100"
          />
          <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200">등록</button>
        </form>
      )}

      {currentMusic.id && (
        <iframe
          className="hidden"
          src={`https://www.youtube.com/embed/${currentMusic.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          allow="autoplay"
        ></iframe>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translate(100%, 0); } 100% { transform: translate(-100%, 0); } }
        .animate-marquee { animation: marquee 12s linear infinite; }
      `}</style>
    </div>
  );
}