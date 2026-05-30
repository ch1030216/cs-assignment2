export default function DiaryBox({ selectedDate, diaryData, setDiaryData }) {
  const currentDiary = diaryData[selectedDate] || "";

  const handleChange = (e) => {
    setDiaryData({
      ...diaryData,
      [selectedDate]: e.target.value
    });
  };

  return (
    <div className="flex-1 min-h-[200px] flex flex-col">
      <textarea
        value={currentDiary}
        onChange={handleChange}
        placeholder={`${selectedDate}의 일기를 자유롭게 기록해 보세요...`}
        className="w-full flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:border-slate-300 text-slate-700 leading-relaxed shadow-inner"
      />
    </div>
  );
}