"use client";

import { useState, useEffect } from "react";
import CalendarBox from "./components/CalendarBox";
import TodoList from "./components/TodoList";
import MusicPlayer from "./components/MusicPlayer";
import DiaryBox from "./components/DiaryBox";
import DeadlineList from "./components/DeadlineList";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [todoData, setTodoData] = useState({});
  const [diaryData, setDiaryData] = useState({});
  const [musicData, setMusicData] = useState({});
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTodoData(JSON.parse(localStorage.getItem("todoData")) || {});
      setDiaryData(JSON.parse(localStorage.getItem("diaryData")) || {});
      setMusicData(JSON.parse(localStorage.getItem("musicData")) || {});
      setDeadlines(JSON.parse(localStorage.getItem("deadlines")) || []);
    }
  }, []);

  const saveAndSetTodo = (newData) => { setTodoData(newData); localStorage.setItem("todoData", JSON.stringify(newData)); };
  const saveAndSetDiary = (newData) => { setDiaryData(newData); localStorage.setItem("diaryData", JSON.stringify(newData)); };
  const saveAndSetMusic = (newData) => { setMusicData(newData); localStorage.setItem("musicData", JSON.stringify(newData)); };
  const saveAndSetDeadlines = (newData) => { setDeadlines(newData); localStorage.setItem("deadlines", JSON.stringify(newData)); };

  return (
    <main className="min-h-screen w-full bg-slate-50 p-8 flex items-center justify-center">
      {/* 12컬럼의 메인 가로 배열 대시보드 판넬 */}
      <div className="w-full max-w-7xl bg-white border-4 border-slate-800 rounded-[2rem] p-8 shadow-2xl grid grid-cols-12 gap-6 min-h-[700px]">
        
        {/* 1. Calendar 영역 (좌측 5칸 차지) */}
        <section className="col-span-5 border-2 border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
          <CalendarBox selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </section>

        {/* 2. Center Column (가운데 3칸 차지: Todo + Music) */}
        <div className="col-span-3 flex flex-col gap-6">
          <section className="flex-1 border-2 border-slate-200 rounded-2xl p-6 overflow-y-auto max-h-[380px]">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Todo-list</h2>
            <TodoList selectedDate={selectedDate} todoData={todoData} setTodoData={saveAndSetTodo} />
          </section>
          
          <section className="h-56 border-2 border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Today's Music</h2>
            <MusicPlayer selectedDate={selectedDate} musicData={musicData} setMusicData={saveAndSetMusic} />
          </section>
        </div>

        {/* 3. Right Column (우측 4칸 차지: Diary + Deadline) */}
        <div className="col-span-4 flex flex-col gap-6">
          <section className="flex-[2] border-2 border-slate-200 rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-3 text-slate-800">Diary</h2>
            <DiaryBox selectedDate={selectedDate} diaryData={diaryData} setDiaryData={saveAndSetDiary} />
          </section>

          <section className="flex-[1] border-2 border-slate-200 rounded-2xl p-6 overflow-y-auto max-h-[220px]">
            <DeadlineList selectedDate={selectedDate} deadlines={deadlines} setDeadlines={saveAndSetDeadlines} />
          </section>
        </div>

      </div>
    </main>
  );
}