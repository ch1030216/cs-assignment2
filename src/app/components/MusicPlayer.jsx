"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicPlayer({ selectedDate, musicData, setMusicData }) {
  const currentLink = musicData[selectedDate] || "";
  const [showInput, setShowInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  // 날짜가 바뀌면 재생 상태 초기화
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

  // 오디오 컨트롤을 위해 유튜브 iframe을 제어하는 함수
  const togglePlay = () => {
    if (!embedUrl || !iframeRef.current) return;
    
    const command = isPlaying ? '{"event":"command","func":"pauseVideo","args":[]}' : '{"event":"command","func":"playVideo","args":[]}';
    iframeRef.current.contentWindow.postMessage(command, "*");
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full justify-between relative">
      
      {/* 실제 유튜브 화면은 크기를 0으로 만들어 소리만 나게 숨김 처리 */}
      {embedUrl && (
        <div className="w-0 h-0 absolute opacity-0 pointer-events-none">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* 메인 플레이어 카드 디자인 */}
      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between p-4 shadow-inner min-h-[100px]">
        {embedUrl ? (
          <div className="flex items-center justify-between w-full">
            {/* 왼쪽: 재생 컨트롤 상태 및 음악 안내 */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform active:scale-95 ${
                  isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">
                  {isPlaying ? "오늘의 배경음악 재생 중" : "음악 대기 중"}
                </span>
                <span className="text-xs text-slate-400">Audio Only Mode</span>
              </div>
            </div>

            {/* 오른쪽: 주소창 토글 톱니바퀴 버튼 */}
            <button
              onClick={() => setShowInput(!showInput)}
              className="text-slate-400 hover:text-slate-600 text-xl p-2 transition-colors"
              title="링크 수정"
            >
              ⚙️
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setShowInput(true)}
            className="w-full h-full flex flex-col items-center justify-center text-xs text-slate-400 font-medium cursor-pointer hover:bg-slate-100/50 rounded-xl transition-colors gap-1"
          >
            <span>🎵 등록된 음악이 없습니다.</span>
            <span className="text-[10px] text-slate-300">(클릭하여 링크 주소 등록하기)</span>
          </div>
        )}
      </div>

      {/* 숨겨져 있다가 조건 만족 시 아래에 스르륵 나타나는 주소 수정창 */}
      {(showInput || !embedUrl) && (
        <div className="w-full animate-fadeIn">
          <input
            type="text"
            value={currentLink}
            onChange={handleUrlChange}
            placeholder="유튜브 주소(URL)를 입력하세요"
            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-white font-medium text-slate-600 shadow-sm transition-colors"
          />
        </div>
      )}
    </div>
  );
}