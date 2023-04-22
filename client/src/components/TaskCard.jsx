/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

export const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-600 hover:cursor-pointer border border-spacing-2 rounded-lg"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <h1 className="font-bold uppercase">{task.title}</h1>
      <p className="text-slate-400">{task.description}</p>
    </div>
  );
};
