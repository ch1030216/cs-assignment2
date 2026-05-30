"use client";

export default function MusicPlayer({ selectedDate, musicData, setMusicData }) {
  const currentLink = musicData[selectedDate] || "";

  const handleUrlChange = (e) => {
    setMusicData({
      ...musicData,
      [selectedDate]: e.target.value
    });
  };

  // 유튜브 링크 형태를 분석해 iframe 전용 embed 주소로 자동 변환하는 필터 함수
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    
    try {
      // 1. 단축 공유 주소 형태 처리 (https://youtu.be/비디오ID)
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
      
      // 2. 일반 PC 웹 주소 형태 처리 (https://www.youtube.com/watch?v=비디오ID)
      if (url.includes("v=")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const videoId = urlParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
    } catch (e) {
      console.error("유튜브 링크 파싱 에러", e);
    }
    return "";
  };

  const embedUrl = getYoutubeEmbedUrl(currentLink);

  return (
    <div className="flex flex-col gap-3 w-full h-full justify-between">
      <div className="flex-1 flex items-center justify-center">
        {embedUrl ? (
          // 내부에서 직접 재생되는 유튜브 공식 Iframe 플레이어 레이어
          <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 shadow-md bg-black">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="w-full h-24 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            아래에 유튜브 링크를 등록하면 음악 재생기가 켜집니다.
          </div>
        )}
      </div>

      <input
        type="text"
        value={currentLink}
        onChange={handleUrlChange}
        placeholder="유튜브 주소(URL)를 복사해서 붙여넣으세요"
        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 bg-slate-50 font-medium text-slate-600 transition-colors"
      />
    </div>
  );
}