"use client";
import { useState } from "react";
export default function DeadlineList({ darkMode }) {
  const [deadlines, setDeadlines] = useState([{ id: 1, text: "컴퓨터개론 과제 제출" }]);
  return (
    <div className={`p-6 rounded-3xl border ${darkMode ? "bg-[#111827] border-slate-700 text-white" : "bg-white border-sky-100"}`}>
      <h2 className="font-bold mb-4">마감일 알림창</h2>
      {deadlines.map(d => <div key={d.id} className="py-2 border-b flex items-center gap-2"><input type="checkbox"/> D+4 {d.text}</div>)}
      <input className="w-full mt-4 p-2 border rounded bg-transparent text-sm" placeholder="마감일 제목을 입력하세요" />
      <input type="date" className="w-full mt-2 p-2 border rounded bg-transparent text-sm" />
      <button className="mt-2 w-full bg-sky-500 text-white p-2 rounded">추가</button>
    </div>
  );
}