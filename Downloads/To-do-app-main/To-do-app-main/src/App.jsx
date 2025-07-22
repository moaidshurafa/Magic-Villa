import React, { useEffect, useState } from "react";
import { initialList } from "./data/initialList";
import { initialTask } from "./data/initialTask";
import List from "./components/list";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [lists, setLists] = useState(initialList);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      const fallback = initialTask.map((t) => ({
        ...t,
        listId: initialList[0].id,
      }));
      setTasks(fallback);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = ({ title, description, listId }) => {
    const newTask = { id: uuidv4(), title, description, listId };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center p-6 shadow-md">
        <h1 className="text-3xl font-bold">Multi-List TODO App</h1>
      </header>
      <main className="p-6 pt-12 flex flex-wrap gap-4 justify-center">
        {lists.map((list) => {
          const listTasks = tasks.filter((task) => task.listId === list.id);
          return (
            <List
              key={list.id}
              name={list.name}
              listId={list.id}
              tasks={listTasks}
              onAddTask={handleAddTask}
            />
          );
        })}
      </main>
    </div>
  );
};

export default App;
