"use client";

import { useState, useEffect } from "react";

export default function MusicPlayer({ darkMode, selectedDate }) {
  const [musicData, setMusicData] = useState({});
  const [urlInput, setUrlInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dailyMusicData");
    if (saved) setMusicData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyMusicData", JSON.stringify(musicData));
  }, [musicData]);

  const currentMusic = musicData[selectedDate] || { id: null, title: "선택된 음악이 없습니다." };

  const handleRegisterMusic = async (e) => {
    e.preventDefault();
    const id = urlInput.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/)?.[1];
    if (id) {
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        const data = await res.json();
        setMusicData(prev => ({ ...prev, [selectedDate]: { id, title: data.title } }));
      } catch {
        setMusicData(prev => ({ ...prev, [selectedDate]: { id, title: "제목 로드 실패" } }));
      }
      setIsPlaying(true);
      setShowInput(false);
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
          {/* 재생/일시정지 버튼: 설정 버튼과 스타일 통일(SVG) */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="p-2 text-slate-400 hover:text-sky-500 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          
          <div className="overflow-hidden w-full h-4 relative">
            <p className="absolute animate-marquee whitespace-nowrap text-xs font-bold text-slate-500">
              {currentMusic.title}
            </p>
          </div>
        </div>

        {/* 설정 버튼: 톱니바퀴 SVG */}
        <button onClick={() => setShowInput(!showInput)} className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleRegisterMusic} className="flex gap-2">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="유튜브 URL 입력"
            className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none ${
              darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"
            }`}
          />
          <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200">등록</button>
        </form>
      )}

      {currentMusic.id && (
        <iframe
          className="hidden"
          src={`https://www.youtube.com/embed/${currentMusic.id}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${currentMusic.id}&enablejsapi=1`}
          allow="autoplay"
        ></iframe>
      )}

      <style jsx global>{`
        @keyframes marquee { 
          0% { transform: translate(100%, 0); } 
          100% { transform: translate(-100%, 0); } 
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
}