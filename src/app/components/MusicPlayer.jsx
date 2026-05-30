"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayer({ selectedDate, musicData, setMusicData }) {
  const currentLink = musicData[selectedDate] || "";
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setIsPlaying(false);
  }, [selectedDate]);

  const handleUrlChange = (e) => {
    setMusicData({
      ...musicData,
      [selectedDate]: e.target.value,
    });
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    try {
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : "";
      }
      if (url.includes("v=")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const videoId = urlParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : "";
      }
    } catch (e) {
      console.error(e);
    }
    return "";
  };

  const embedUrl = getYoutubeEmbedUrl(currentLink);

  const togglePlay = () => {
    if (!embedUrl || !iframeRef.current) return;
    const command = isPlaying ? '{"event":"command","func":"pauseVideo","args":[]}' : '{"event":"command","func":"playVideo","args":[]}';
    iframeRef.current.contentWindow.postMessage(command, "*");
    setIsPlaying(!isPlaying);
  };

  // 링크 주소에서 비디오 ID나 핵심 문구만 추출하여 제목처럼 보여주는 함수
  const getMusicTitle = () => {
    if (!currentLink) return "등록된 음악이 없습니다.";
    if (isPlaying) return "🎵 지정된 음악 재생 중";
    return "⏱️ 음악 재생 대기 중";
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full justify-between relative">
      {embedUrl && (
        <div className="w-0 h-0 absolute opacity-0 pointer-events-none">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            allow="autoplay"
          ></iframe>
        </div>
      )}

      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between p-4 shadow-inner min-h-[100px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              disabled={!embedUrl}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all active:scale-95 ${
                !embedUrl 
                  ? "bg-slate-300 cursor-not-allowed"
                  : isPlaying 
                    ? "bg-red-500 hover:bg-red-600 shadow-md" 
                    : "bg-emerald-500 hover:bg-emerald-600 shadow-md"
              }`}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 tracking-tight">
                {getMusicTitle()}
              </span>
            </div>
          </div>

          {/* 깔끔한 모던 스타일 SVG 설정 톱니바퀴 아이콘 버튼 */}
          <button
            onClick={() => setShowInput(!showInput)}
            className={`p-2 rounded-lg border transition-all ${
              showInput 
                ? "bg-slate-800 text-white border-slate-800" 
                : "bg-white text-slate-400 hover:text-slate-600 border-slate-200 shadow-sm"
            }`}
            title="링크 수정"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.123 1.123 0 0 0-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 0 0 .417 1.03l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.075.124c-.073.044-.146.087-.22.128c-.332.183-.582.495-.645.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87c-.074-.04-.147-.083-.22-.127a1.125 1.125 0 0 0-1.074-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.003-.767a1.122 1.122 0 0 0 .417-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 0 0-.417-1.03l-1.003-.767a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.041.146-.084.218-.128c.332-.183.582-.495.646-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      </div>

      {(showInput || !embedUrl) && (
        <div className="w-full">
          <input
            type="text"
            value={currentLink}
            onChange={handleUrlChange}
            placeholder="유튜브 주소(URL)를 입력하세요"
            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white font-medium text-slate-600 shadow-sm transition-all"
          />
        </div>
      )}
    </div>
  );
}