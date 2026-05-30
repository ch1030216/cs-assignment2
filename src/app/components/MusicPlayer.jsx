"use client";
import { useState } from "react";
export default function MusicPlayer({ darkMode }) {
  const [url, setUrl] = useState("");
  return (
    <div className={`p-6 rounded-3xl border ${darkMode ? "bg-[#111827] border-slate-700 text-white" : "bg-white border-sky-100"}`}>
      <h2 className="font-bold mb-4">Today's Music</h2>
      <div className="flex items-center gap-2 mb-4 bg-sky-100 p-3 rounded-lg text-slate-800">▶ 선택된 음악이 없습니다.</div>
      <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 border rounded-lg bg-transparent text-sm" placeholder="유튜브 주소(URL)를 입력하세요" />
      <button className="mt-2 w-full bg-sky-500 text-white p-2 rounded">등록</button>
    </div>
  );
}