"use client";

import { useState, useRef } from "react";
import YouTube from "react-youtube";

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
      setVideoTitle("음악 로드됨");
      setIsPlaying(true);
      setUrlInput("");
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
    }
  };

  // YouTube 플레이어 상태 변화 핸들러
  const onReady = (event) => {
    playerRef.current = event.target;
  };

  // 재생/일시정지 제어 함수
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const opts = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 1, // 자동 재생 시도
    },
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"}`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <p className="text-xs font-bold truncate text-slate-500">{videoTitle}</p>
        </div>
      </div>

      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 URL 입력"
          className="flex-1 text-xs p-2.5 border rounded-xl"
        />
        <button type="submit" className="text-xs font-bold px-4 rounded-xl bg-sky-100">등록</button>
      </form>

      {/* 보이지 않는 유튜브 플레이어 */}
      {videoId && (
        <div className="hidden">
          <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </div>
      )}
    </div>
  );
}