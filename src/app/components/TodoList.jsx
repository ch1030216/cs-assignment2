"use client";

export default function TodoList({ selectedDate, todos, setTodos, darkMode }) {
  const currentTodos = todos[selectedDate] || [];

  const handleAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newTodo = { id: Date.now(), text: e.target.value, completed: false };
      setTodos({ ...todos, [selectedDate]: [...currentTodos, newTodo] });
      e.target.value = '';
    }
  };

  const toggleTodo = (id) => {
    const updated = currentTodos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos({ ...todos, [selectedDate]: updated });
  };

  return (
    <div className={`p-6 rounded-3xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-sky-100"}`}>
      <h2 className="font-bold mb-4">Todo-list ({selectedDate})</h2>
      <input type="text" className="w-full p-2 mb-4 border rounded-xl bg-transparent" placeholder="+ 할 일을 적고 Enter" onKeyDown={handleAdd} />
      {currentTodos.map(todo => (
        <div key={todo.id} className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span className={todo.completed ? "line-through opacity-50" : ""}>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}