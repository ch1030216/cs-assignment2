export default function MusicPlayer({ selectedDate, musicData, setMusicData, darkMode }) {
  const currentMusic = musicData[selectedDate] || { title: "재생 중인 곡 없음", status: "STOP" };

  const handlePlayToggle = () => {
    setMusicData({ ...musicData, [selectedDate]: { ...currentMusic, status: currentMusic.status === "PLAY" ? "STOP" : "PLAY" } });
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-bold mb-2">Today's Music</h3>
      <div className={`p-3 rounded-lg flex justify-between items-center ${darkMode ? "bg-slate-800" : "bg-sky-50"}`}>
        <span className="text-sm font-medium">{currentMusic.title}</span>
        <div className="flex gap-2">
          <button onClick={handlePlayToggle} className="text-xs border px-2 py-1 rounded">
            {currentMusic.status === "PLAY" ? "일시정지" : "재생"}
          </button>
          <button className="text-xs border px-2 py-1 rounded">설정</button>
        </div>
      </div>
    </div>
  );
}