"use client"

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [todoItems, setTodoItems] = useState<string[]>([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    
    axios.get('/api/todo')
    .then((res) => {
      console.log(res.data);
      setTodoItems(res.data);
    }).catch(err => {
      console.log(err);
    })

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('/api/todo', {
      task: todoInput
    }).then((res) => {
      const newItem = res.data;
      setTodoItems((prev) => [newItem, ...prev]);
    }).catch(err => {
      console.log(err);
    })

  }

  const deleteItem = (id: string) => {
    axios.delete(`/api/todo/${id}`)
      .then((res) => {
        if (res.data && res.data._id) {
          setTodoItems(prev => prev.filter(item => item._id !== res.data._id));
        } else {
          // fallback: remove by the id we sent
          setTodoItems(prev => prev.filter(item => item._id !== id));
        }
      })
      .catch(err => console.log(err));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px] flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📝 Todo App
        </h1>

        {/* Scrollable list container */}
        <div className="flex-1 overflow-y-auto max-h-[300px] pr-1">
          {todoItems.length > 0 ? (
            <ul className="space-y-3">
              {todoItems.map((todoItem) => (
                <li
                  key={todoItem._id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <span className="text-gray-800 break-words">{todoItem.task}</span>
                  <button
                    onClick={() => deleteItem(todoItem._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No items found!</p>
          )}
        </div>

        {/* Input form stays below the scroll area */}
        <form
          className="flex flex-col mt-6 space-y-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Add a new task..."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2 font-medium hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>


  );
}
