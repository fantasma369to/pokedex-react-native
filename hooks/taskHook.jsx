import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  insertTask,
  updateTask,
  deleteTask,
} from "../store/SqliteStore";
export const useTaskHook = () => {
  const queryClient = useQueryClient();

  // Cargar todas las tareas
  const {
    data: tasksdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  // Mutation para agregar una nueva tarea
  const mutationAddTask = useMutation({
    mutationKey: ["insert task"],
    mutationFn: (p) => insertTask(p),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Invalidar la query de tareas para refetch
    },
    onError: (error) => {
      console.log("error al agregar tarea", error.message);
    },
  });
  return {
    tasksdata,
    isLoading,
    error,
    addTask: mutationAddTask.mutate
  }
};
