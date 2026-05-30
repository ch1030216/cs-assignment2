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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlInput.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;

    if (id) {
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        const data = await res.json();
        setMusicData(prev => ({ ...prev, [selectedDate]: { id, title: data.title } }));
      } catch {
        setMusicData(prev => ({ ...prev, [selectedDate]: { id, title: "제목을 가져올 수 없습니다." } }));
      }
      setIsPlaying(true);
      setShowInput(false);
      setUrlInput("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        {selectedDate}의 음악
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${isPlaying ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}>
            {isPlaying ? (
              <div className="flex gap-1"><div className="w-1 h-3 bg-white rounded-sm"></div><div className="w-1 h-3 bg-white rounded-sm"></div></div>
            ) : (
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent ml-0.5"></div>
            )}
          </button>
          
          <div className="overflow-hidden w-full relative h-4">
            <p className="absolute animate-marquee whitespace-nowrap text-xs font-bold text-sky-900">{currentMusic.title}</p>
          </div>
        </div>

        <button onClick={() => setShowInput(!showInput)} className="p-2 text-slate-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.6-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.6.22l-1.92 3.32a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.18.48-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>
        </button>
      </div>

      {showInput && (
        <form onSubmit={handleRegisterMusic} className="flex gap-2">
          <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="유튜브 URL 입력" className="flex-1 text-xs p-2.5 border rounded-xl border-sky-100" />
          <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700">등록</button>
        </form>
      )}

      {currentMusic.id && (
        <iframe className="hidden" src={`https://www.youtube.com/embed/${currentMusic.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`} allow="autoplay"></iframe>
      )}

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translate(100%, 0); } 100% { transform: translate(-100%, 0); } }
        .animate-marquee { animation: marquee 12s linear infinite; }
      `}</style>
    </div>
  );
}