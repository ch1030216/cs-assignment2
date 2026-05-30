export default function MusicPlayer({ selectedDate, musicData, setMusicData }) {
  const currentLink = musicData[selectedDate] || "";

  const handleUrlChange = (e) => {
    setMusicData({
      ...musicData,
      [selectedDate]: e.target.value
    });
  };

  // 일반 유튜브 주소나 단축 공유 주소에서 11자리 비디오 ID 추출 함수
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : "";
    }
    if (url.includes("spotify.com")) {
      // 스포티파이 주소 포맷 변경
      return url.replace("spotify.com/", "spotify.com/embed/");
    }
    return "";
  };

  const embedUrl = getEmbedUrl(currentLink);

  return (
    <div className="flex flex-col gap-2 w-full">
      {embedUrl ? (
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-black">
          <iframe
            src={embedUrl}
            className="w-full h-24"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-xs text-slate-400">
          재생할 음악 링크가 없습니다.
        </div>
      )}
      <input
        type="text"
        value={currentLink}
        onChange={handleUrlChange}
        placeholder="유튜브나 스포티파이 링크를 붙여넣으세요"
        className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-slate-400 bg-slate-50"
      />
    </div>
  );
}