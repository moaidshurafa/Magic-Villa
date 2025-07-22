import React from "react";
import { useState } from "react";
import AddTaskModal from "./AddTask";
import Task from "./task";

const List = ({ name, listId, tasks, onAddTask }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded shadow-md w-72">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
        >
          + Add
        </button>
      </div>

      {showModal && (
        <AddTaskModal
          listId={listId}
          onClose={() => setShowModal(false)}
          onSave={onAddTask}
        />
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
};

export default List;