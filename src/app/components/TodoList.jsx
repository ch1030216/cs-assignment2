"use client";

import { useEffect, useRef } from "react";

export default function TodoList({ selectedDate, todoData, setTodoData }) {
  // 현재 날짜의 투두 텍스트 가져오기 (없으면 빈 문자열)
  const currentText = todoData[selectedDate] || "";
  const textareaRef = useRef(null);

  // 글자 수에 따라 높이가 자동으로 늘어나도록 조절하는 함수
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentText]);

  const handleChange = (e) => {
    setTodoData({
      ...todoData,
      [selectedDate]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[250px] shadow-inner">
      <textarea
        ref={textareaRef}
        value={currentText}
        onChange={handleChange}
        placeholder="할 일을 입력하세요.&#10;(Enter를 누르면 바로 다음 줄에 이어서 작성할 수 있습니다)"
        className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700 leading-relaxed resize-none overflow-hidden min-h-[200px]"
      />
    </div>
  );
}