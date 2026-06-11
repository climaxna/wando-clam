"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-zinc-800 mb-6">Todo List</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="할 일을 입력하세요"
            className="flex-1 border border-zinc-300 rounded-lg px-4 py-2 text-sm outline-none focus:border-zinc-500"
          />
          <button
            onClick={addTodo}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
          >
            추가
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-8">할 일이 없어요</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-zinc-100 hover:border-zinc-200 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-4 h-4 accent-zinc-800 cursor-pointer"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.done ? "line-through text-zinc-400" : "text-zinc-700"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors text-xs"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xs text-zinc-400 mt-4 text-right">
          {todos.filter((t) => t.done).length} / {todos.length} 완료
        </p>
      </div>
    </div>
  );
}
