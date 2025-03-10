function TaskItem({ task, deleteTask, toggleComplete }) {
  return (
    <li className={`flex justify-between items-center p-3 border rounded ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleComplete(task.id)} 
          className="cursor-pointer"
        />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
          {task.title}
        </span>
      </div>
      <button 
        onClick={() => deleteTask(task.id)} 
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;