"use client";

import { useState, useEffect } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DiaryBox from "./components/DiaryBox";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 초기화
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // 각 섹션별 데이터 상태 (날짜별로 독립 저장할 수 있도록 객체 형태 구조 사용)
  const [todoData, setTodoData] = useState({});
  const [diaryData, setDiaryData] = useState({});
  const [musicData, setMusicData] = useState({});
  
  // 데드라인은 모든 날짜에서 공유하므로 배열 구조 사용
  const [deadlines, setDeadlines] = useState([]);

  // 컴포넌트 마운트 시 LocalStorage에서 기존 데이터 불러오기 (새로고침 방지)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTodoData(JSON.parse(localStorage.getItem("todoData")) || {});
      setDiaryData(JSON.parse(localStorage.getItem("diaryData")) || {});
      setMusicData(JSON.parse(localStorage.getItem("musicData")) || {});
      setDeadlines(JSON.parse(localStorage.getItem("deadlines")) || []);
    }
  }, []);

  // 데이터가 변경될 때마다 LocalStorage에 자동 저장
  const saveAndSetTodo = (newData) => { setTodoData(newData); localStorage.setItem("todoData", JSON.stringify(newData)); };
  const saveAndSetDiary = (newData) => { setDiaryData(newData); localStorage.setItem("diaryData", JSON.stringify(newData)); };
  const saveAndSetMusic = (newData) => { setMusicData(newData); localStorage.setItem("musicData", JSON.stringify(newData)); };
  const saveAndSetDeadlines = (newData) => { setDeadlines(newData); localStorage.setItem("deadlines", JSON.stringify(newData)); };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      {/* 와이어프레임 토대의 12컬럼 메인 Grid 뼈대 */}
      <div className="w-full max-w-7xl bg-white border-4 border-slate-800 rounded-[2rem] p-8 shadow-2xl grid grid-cols-12 gap-6 min-h-[750px]">
        
        {/* 1. Calendar 영역 (좌측 5칸 차지) */}
        <section className="col-span-5 border-2 border-slate-200 rounded-2xl p-5 flex flex-col">
          <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </section>

        {/* 2. Center Column (가운데 3칸 차지: Todo + Music) */}
        <div className="col-span-3 flex flex-col gap-6">
          <section className="flex-1 border-2 border-slate-200 rounded-2xl p-5 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Todo-list</h2>
            <TodoList 
              selectedDate={selectedDate} 
              todoData={todoData} 
              setTodoData={saveAndSetTodo} 
            />
          </section>
          
          <section className="h-52 border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-slate-800">Today's Music</h2>
            <MusicPlayer 
              selectedDate={selectedDate}
              musicData={musicData}
              setMusicData={saveAndSetMusic}
            />
          </section>
        </div>

        {/* 3. Right Column (우측 4칸 차지: Diary + Deadline) */}
        <div className="col-span-4 flex flex-col gap-6">
          <section className="flex-[2] border-2 border-slate-200 rounded-2xl p-5 flex flex-col">
            <h2 className="text-xl font-bold mb-3 text-slate-800">Diary</h2>
            <DiaryBox 
              selectedDate={selectedDate} 
              diaryData={diaryData} 
              setDiaryData={saveAndSetDiary} 
            />
          </section>

          <section className="flex-[1] border-2 border-slate-200 rounded-2xl p-5 overflow-y-auto">
            <DeadlineList 
              selectedDate={selectedDate} 
              deadlines={deadlines} 
              setDeadlines={saveAndSetDeadlines} 
            />
          </section>
        </div>

      </div>
    </main>
  );
}