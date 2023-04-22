import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, deleteTask, getTask, updateTask } from '../api/tasks.api';

export const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('tarea actualizada', {
        position: 'top-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });
    } else {
      await createTask(data);
      toast.success('tarea creada', {
        position: 'top-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      });
    }
    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue('title', data.title);
        setValue('description', data.description);
      }
    }
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register('title', { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <p>Title is required</p>}
        <textarea
          placeholder="description"
          cols="30"
          rows="3"
          {...register('description', { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <p>Description is required</p>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full">
          Save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg block w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm('are you sure?');
              if (accepted) {
                await deleteTask(params.id);
                toast.success('tarea eliminada', {
                  position: 'top-right',
                  style: {
                    background: '#101010',
                    color: '#fff',
                  },
                });
              }
              navigate('/tasks');
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
