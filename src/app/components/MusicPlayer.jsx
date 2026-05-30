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
        setMusicData(prev => ({ ...prev, [selectedDate]: { id, title: "제목을 가져올 수 없습니다." } }));
      }
      setIsPlaying(true);
      setShowInput(false);
      setUrlInput("");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      {/* 제목을 "Today's Music"으로 통일 */}
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          {/* 재생/일시정지 버튼 (사진과 같은 깔끔한 스타일) */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all ${
              isPlaying ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          
          <div className="overflow-hidden w-full h-4 relative">
            <p className="absolute animate-marquee whitespace-nowrap text-xs font-bold text-slate-500">
              {currentMusic.title}
            </p>
          </div>
        </div>

        {/* 설정 아이콘 (사진처럼 톱니바퀴) */}
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
          src={`https://www.youtube.com/embed/${currentMusic.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          allow="autoplay"
        ></iframe>
      )}

      <style jsx global>{`
        @keyframes marquee { 
          0% { transform: translate(100%, 0); } 
          100% { transform: translate(-100%, 0); } 
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}