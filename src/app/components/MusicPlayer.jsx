"use client";

import { useState, useEffect } from "react";

export default function MusicPlayer({ darkMode, selectedDate }) {
  const [musicData, setMusicData] = useState({});
  const [urlInput, setUrlInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. 컴포넌트 로드 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("dailyMusicData");
    if (saved) setMusicData(JSON.parse(saved));
  }, []);

  // 2. musicData가 바뀔 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem("dailyMusicData", JSON.stringify(musicData));
  }, [musicData]);

  // 현재 날짜에 맞는 음악 데이터 추출
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
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        {selectedDate}의 음악
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm transition-colors ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          {/* 재생/정지 버튼 (텍스트 아이콘) */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full shadow-md transition-all ${
              isPlaying ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          
          {/* 텍스트 흐르기 (속도 20s로 조절) */}
          <div className="overflow-hidden w-full h-4 relative">
            <p className="absolute animate-marquee whitespace-nowrap text-xs font-bold text-slate-500">
              {currentMusic.title}
            </p>
          </div>
        </div>

        {/* 설정 버튼 */}
        <button onClick={() => setShowInput(!showInput)} className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
          ⚙️
        </button>
      </div>

      {/* 설정 버튼 클릭 시 나타나는 입력 폼 */}
      {showInput && (
        <form onSubmit={handleRegisterMusic} className="flex gap-2 animate-in fade-in slide-in-from-top-2">
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="유튜브 URL을 입력하세요"
            className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none ${
              darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"
            }`}
          />
          <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200">등록</button>
        </form>
      )}

      {/* 유튜브 플레이어 (데이터가 있을 때만 렌더링) */}
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