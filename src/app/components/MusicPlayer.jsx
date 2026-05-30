"use client";

import { useState } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInput, setShowInput] = useState(false); // 입력 폼 토글 state

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
      fetchVideoTitle(id);
      setIsPlaying(true);
      setUrlInput("");
      setShowInput(false); // 등록 후 폼 숨기기
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-sky-500 text-white shadow-md hover:bg-sky-600">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          
          {/* Marquee 애니메이션 복구 및 컨테이너 제약 */}
          <div className="overflow-hidden w-full">
            <p className="text-xs font-bold whitespace-nowrap animate-marquee text-slate-500">{videoTitle}</p>
          </div>
        </div>

        <button onClick={() => setShowInput(!showInput)} className="p-2 text-slate-400 hover:text-sky-500">
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
          <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100 text-sky-700">등록</button>
        </form>
      )}

      {videoId && (
        <iframe className="hidden" src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`} allow="autoplay"></iframe>
      )}

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate(100%, 0); }
          100% { transform: translate(-100%, 0); }
        }
        .animate-marquee { animation: marquee 10s linear infinite; }
      `}</style>
    </div>
  );
}