"use client";

import { useState, useEffect, useRef } from "react";

export default function MusicPlayer({ darkMode }) {
  const [urlInput, setUrlInput] = useState("");
  const [videoTitle, setVideoTitle] = useState("선택된 음악이 없습니다.");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  // 유튜브 URL에서 비디오 ID 추출 로직
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
      // 링크가 정상적으로 들어가면 동영상 타이틀 시뮬레이션 설정
      setVideoTitle("Lost Stars - Keira Knightley (YouTube Audio Loaded)");
      setIsPlaying(true);
      setUrlInput("");
    } else {
      alert("올바른 유튜브 링크를 입력해 주세요.");
    }
  };

  // 포스트 메시지를 통해 가상 iframe 오디오 제어
  useEffect(() => {
    if (!videoId || !playerRef.current) return;
    const command = isPlaying 
      ? JSON.stringify({ event: "command", func: "playVideo" })
      : JSON.stringify({ event: "command", func: "pauseVideo" });
    
    playerRef.current.contentWindow.postMessage(command, "*");
  }, [isPlaying, videoId]);

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      <h2 className={`text-sm font-bold ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Today's Music
      </h2>

      {/* 음악 정보 및 재생 바 카드 */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between shadow-sm overflow-hidden transition-colors ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
      }`}>
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-2">
          {/* 구린 이모티콘 빼고 미니멀 디자인 그래픽 패치 */}
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
              // 미니멀 일시정지 아이콘
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-white rounded-sm"></div>
                <div className="w-1 h-3 bg-white rounded-sm"></div>
              </div>
            ) : (
              // 미니멀 재생 아이콘
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent ml-0.5"></div>
            )}
          </button>
          
          {/* 글자 흐르기 애니메이션 효과 (Marquee) 완벽 복구 */}
          <div className="overflow-hidden relative w-full whitespace-nowrap group h-4">
            <p className={`inline-block text-xs font-bold animate-marquee ${
              darkMode ? "text-slate-200" : "text-sky-900"
            }`}>
              {videoTitle}
            </p>
            {isPlaying && (
              <p className={`inline-block text-xs font-bold animate-marquee absolute top-0 pl-4 ${
                darkMode ? "text-slate-200" : "text-sky-900"
              }`} style={{ animationDelay: '10s' }}>
                {videoTitle}
              </p>
            )}
          </div>
        </div>

        {/* 설정 톱니바퀴 테두리 구조 복원 */}
        <button className={`p-2 rounded-xl border transition-colors flex-shrink-0 ${
          darkMode ? "bg-slate-700 border-slate-600 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-400"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.77a1.119 1.119 0 0 0-.362 1.18c.004.074.006.147.006.222 0 .075-.002.148-.006.222a1.119 1.119 0 0 0 .362 1.18l1.003.77a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.512 6.512 0 0 1-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.77a1.119 1.119 0 0 0 .362-1.18 6.56 6.56 0 0 1-.006-.222c0-.075.002-.148.006-.222a1.119 1.119 0 0 0-.362-1.18l-1.004-.77a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.281Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>

      {/* 유튜브 주소 입력 및 등록 폼 */}
      <form onSubmit={handleRegisterMusic} className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="유튜브 주소(URL)를 입력하세요"
          className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none shadow-sm font-medium transition-colors ${
            darkMode 
              ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500 placeholder-slate-500" 
              : "bg-white border-sky-100 text-sky-800 focus:border-sky-400 placeholder-sky-300"
          }`}
        />
        <button
          type="submit"
          className={`text-xs font-bold px-3.5 rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0 ${
            darkMode
              ? "bg-sky-600 hover:bg-sky-500 text-white"
              : "bg-sky-100 hover:bg-sky-200 text-sky-700 border border-sky-200/60"
          }`}
        >
          등록
        </button>
      </form>

      {/* 가상 유튜브 백그라운드 오디오 플레이어 엔진 (화면에는 표시되지 않음) */}
      {videoId && (
        <iframe
          ref={playerRef}
          className="hidden"
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&rel=0`}
          allow="autoplay"
        ></iframe>
      )}

      {/* Marquee 흘러가는 CSS 애니메이션 인젝션 */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
}