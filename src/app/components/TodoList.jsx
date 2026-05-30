"use client";
import { useState } from "react";
export default function TodoList({ selectedDate, darkMode }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const handleAdd = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput("");
    }
  };
  return (
    <div className={`p-6 rounded-3xl border ${darkMode ? "bg-[#111827] border-slate-700 text-white" : "bg-white border-sky-100"}`}>
      <h2 className="font-bold mb-4">Todo-list</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleAdd} className="w-full p-2 mb-2 border rounded-xl bg-transparent" placeholder="+ 할 일을 적고 Enter" />
      {todos.map(t => <div key={t.id} className="py-1">✅ {t.text}</div>)}
    </div>
  );
}