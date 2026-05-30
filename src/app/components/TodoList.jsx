export default function TodoList({ selectedDate, todoData, setTodoData }) {
  // 현재 선택된 날짜의 투두 배열 가져오기 (없으면 빈 기본값 생성)
  const currentTodos = todoData[selectedDate] || [{ id: Date.now(), text: "", checked: false }];

  const updateTodos = (newTodos) => {
    setTodoData({
      ...todoData,
      [selectedDate]: newTodos
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = { id: Date.now(), text: "", checked: false };
      const updated = [...currentTodos];
      updated.splice(index + 1, 0, newTodo);
      updateTodos(updated);

      // 다음 포커스 처리를 위해 약간의 딜레이 후 다음 input에 포커스
      setTimeout(() => {
        const inputs = document.querySelectorAll(".todo-input");
        if (inputs[index + 1]) inputs[index + 1].focus();
      }, 10);
    } 
    
    if (e.key === "Backspace" && currentTodos[index].text === "") {
      e.preventDefault();
      if (currentTodos.length > 1) {
        const updated = currentTodos.filter((_, i) => i !== index);
        updateTodos(updated);
        
        // 지워지면 이전 input으로 포커스 이동
        setTimeout(() => {
          const inputs = document.querySelectorAll(".todo-input");
          if (inputs[index - 1]) inputs[index - 1].focus();
        }, 10);
      }
    }
  };

  const handleChange = (index, value) => {
    const updated = [...currentTodos];
    updated[index].text = value;
    updateTodos(updated);
  };

  const handleCheck = (index) => {
    const updated = [...currentTodos];
    updated[index].checked = !updated[index].checked;
    updateTodos(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      {currentTodos.map((todo, index) => (
        <div key={todo.id} className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={todo.checked} 
            onChange={() => handleCheck(index)}
            className="w-4 h-4 rounded text-slate-800 focus:ring-slate-500 cursor-pointer"
          />
          <input
            type="text"
            value={todo.text}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder="할 일 입력 (Enter로 추가, 빈 칸에서 Backspace로 삭제)"
            className={`todo-input flex-1 bg-transparent border-b border-transparent focus:border-slate-300 focus:outline-none text-sm pb-0.5 ${
              todo.checked ? "line-through text-slate-400" : "text-slate-700"
            }`}
          />
        </div>
      ))}
    </div>
  );
}