import styled from "styled-components/native";
import * as SQLite from "expo-sqlite";
import { Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
let db;
const initializeDatabase = async () => {

  db = await SQLite.openDatabaseAsync("tasksdb.db");
  // await db.execAsync(`DROP TABLE IF EXISTS tasks`)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed INTEGER DEFAULT 0,
    color TEXT 
    )
  `);
};
const fetchTasks = async () => {
  const allrows = await db.getAllAsync("SELECT * FROM tasks");
  return allrows;
};
const addTasks = async (title) => {
  if (title) {
    await db.runAsync("INSERT INTO tasks (title) VALUES (?)", title);
  } else {
    Alert.alert("Ingrese una tarea");
  }
};
const deleteTask = async (id) => {
  await db.runAsync("DELETE FROM tasks WHERE id = ?", id);
};
const toggleCompleteTask = async (id, completed) => {
  const newCompleted = completed ? 0 : 1;
  await db.runAsync("UPDATE tasks SET completed = ? WHERE id = ?", [
    newCompleted,
    id,
  ]);
};

export function Sqlite() {
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    initializeDatabase();
  }, []);
  const { data, refetch } = useQuery({
    queryKey: ["mostrar tareas"],
    queryFn: fetchTasks,
  });
  const addTaskMutation = useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      refetch();
      setNewTask("");
    },
  });
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => refetch(),
    onError: () => {
      Alert.alert("Error", "Hubo un problema al eliminar la tarea");
    },
  });
  const toggleCompleteTaskMutation = useMutation({
    mutationFn: ({ id, completed }) => toggleCompleteTask(id, completed),
    onSuccess: () => refetch(),
    onError: () => {
      Alert.alert("Error", "Hubo un problema al completar la tarea");
    },
  });

  const renderTask = ({ item }) => (
    <TaskItem>
      <CheckBoxContainer
        completed={item.completed}
        onPress={() =>
          toggleCompleteTaskMutation.mutate({
            id: item.id,
            completed: item.completed,
          })
        }
      >
        {item.completed ? (
          <Ionicons name="checkmark" size={16} color="#fff" />
        ) : null}
      </CheckBoxContainer>
      <TaskText completed={item.completed}>{item.title} </TaskText>
      <DeleteButton onPress={()=>deleteTaskMutation.mutate(item.id)}>
        <DeleteButtonText name="trash-outline" size={24}/>
      </DeleteButton>
    </TaskItem>
  );
  return (
    <Container>
      <Header>TO DO LIST</Header>
      <TaskInputContainer>
        <TaskInput
          value={newTask}
          placeholderTextColor="#888"
          placeholder="ingrese una tarea"
          onChangeText={setNewTask}
        />
        <AddTaskButton onPress={() => addTaskMutation.mutate(newTask)}>
          <Ionicons name="add" size={28} color="#fff" />
        </AddTaskButton>
      </TaskInputContainer>
      {data && <FlatList keyExtractor={item =>item.id.toString()} data={data} renderItem={renderTask} />}
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;
const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;
const TaskInputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #444;
`;
const TaskInput = styled.TextInput`
  flex: 1;
  color: #ffffff;
  padding: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
`;
const AddTaskButton = styled.TouchableOpacity`
  background-color: #404dff;
  padding: 12px;
  border-radius: 50px;
  margin-bottom: 8px;
`;
//styled render item
const TaskItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  background-color: #2c2c3e;
`;
const TaskText = styled.Text`
  font-size: 18px;
  color: ${(props) => (props.completed ? "#888" : "#fff")};
  text-decoration-line: ${(props) =>
    props.completed ? "line-through" : "none"};
`;
const CheckBoxContainer = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${(props) => (props.completed ? "#404dff" : "#fff")};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.completed ? "#404dff" : "transparent")};
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: transparent;
  padding: 8px;
  border-radius: 8px;
`;

const DeleteButtonText = styled(Ionicons)`
  color: #ff4081;
`;