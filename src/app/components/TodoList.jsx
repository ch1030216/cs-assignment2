"use client";

export default function TodoList({ selectedDate, todos = {}, setTodos, darkMode }) {
  const currentTodos = todos && todos[selectedDate] ? todos[selectedDate] : [];

  // 줄바꿈 시 새 항목 생성
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: "", completed: false };
      const updated = [...currentTodos];
      updated.splice(index + 1, 0, newTodo);
      setTodos({ ...todos, [selectedDate]: updated });
    }
  };

  const handleTextChange = (id, newText) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, text: newText } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  const handleToggle = (id) => {
    const updated = currentTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTodos({ ...todos, [selectedDate]: updated });
  };

  return (
    <div className="w-full h-full p-4 font-sans">
      <h2 className={`text-sm font-bold mb-4 ${darkMode ? "text-sky-400" : "text-sky-800"}`}>
        Todo-list
      </h2>

      <div className="flex flex-col gap-2">
        {/* 항목이 없을 경우 첫 줄 생성 */}
        {currentTodos.length === 0 && (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border rounded border-slate-300" />
            <input 
              autoFocus
              className="flex-1 bg-transparent outline-none text-xs"
              onKeyDown={(e) => e.key === 'Enter' && setTodos({...todos, [selectedDate]: [{id: Date.now(), text: "", completed: false}]})}
            />
          </div>
        )}

        {/* 리스트 출력 */}
        {currentTodos.map((todo, index) => (
          <div key={todo.id} className="flex items-center gap-3 group">
            <div 
              onClick={() => handleToggle(todo.id)}
              className={`w-4 h-4 rounded border cursor-pointer flex-shrink-0 ${todo.completed ? "bg-sky-500 border-sky-500" : "border-slate-300"}`} 
            />
            <input
              value={todo.text}
              onChange={(e) => handleTextChange(todo.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              placeholder="내용을 입력하세요..."
              className="flex-1 bg-transparent outline-none text-xs text-slate-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}