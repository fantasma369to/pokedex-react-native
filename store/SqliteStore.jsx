const { create } = require("zustand");
import * as SQLite from "expo-sqlite";

const openDatabaseAsync = async () => {
  return await SQLite.openDatabaseAsync("task.db");
};

export const initializeDatabase = async () => {
  const db = await openDatabaseAsync();
  return new Promise((resolve, reject) => {
    db.execAsync(
      `
            CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL
            );
        `
    )
      .then(resolve)
      .catch(reject);
  });
};
//obtener todas las tareas
export const fetchTasks = async () => {
  const db = await openDatabaseAsync();
  return new Promise((resolve, reject) => {
    db.getAllAsync("SELECT * FROM tasks")
      .then((rows) => resolve(rows))
      .catch((error) => reject(error));
  });
};
// Agregar una nueva tarea
export const insertTask = async (task) => {
  const db = await openDatabaseAsync();
  return new Promise((resolve, reject) => {
    db.runAsync("INSERT INTO tasks (task) VALUES (?)", [task])
      .then((result) => resolve(result.insertId))
      .catch((error) => reject(error));
  });
};
// Actualizar una tarea
export const updateTask = async (id, task) => {
  const db = await openDatabaseAsync();
  return new Promise((resolve, reject) => {
    db.runAsync("UPDATE tasks SET task = ? WHERE id = ?", [task, id])
      .then(resolve)
      .catch(reject);
  });
};
// Eliminar una tarea
export const deleteTask = async (id) => {
  const db = await openDatabaseAsync();
  return new Promise((resolver, reject) => {
    db.runSync("DELETE FROM tasks WHERE id = ?", [id])
      .then(resolver)
      .catch(reject);
  });
};
