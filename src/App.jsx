import { useEffect, useMemo, useState } from "react";

import { Form } from "./components/Form";
import { Tasks } from "./components/Tasks";

import "./styles/App.css";

const LOCALSTORAGE_TASKS_KEY = "todolist-tasks";

export function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTaskName, setSearchTaskName] = useState("");

  const onAddTask = (newTask) => {
    setTasks((currentState) => [...currentState, newTask]);
    setSearchTaskName("");
  };

  const onRemoveTask = (taskId) => {
    setTasks((currentState) =>
      currentState.filter((task) => task.id !== taskId)
    );
  };

  const onChangeCompleted = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const updatedTask = [...tasks];
    updatedTask[taskIndex].completed = !updatedTask[taskIndex].completed;

    setTasks(updatedTask);
  };

  // Ce bloc de code est déclenché chaque fois que le
  // les tâches subissent tout changement (ajout, suppression, mise à jour)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Ce bloc de code est déclenché lorsque la page de l'utilisateur est chargée.
  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY);
    tasksLocal && setTasks(JSON.parse(tasksLocal));
    setIsLoading(false);
  }, []);

  const handleTermSearch = (e) => {
    const valueTerm = e.target.value.toLocaleLowerCase();
    setSearchTaskName(valueTerm);
  };

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const totalCompletedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  });

  return (
    <div className="container">
      <div>
        <div className="titleHead">
          <img src="./todoappicon.png" alt="Icon ToDo" />
          <h1>My TasksBoard</h1>
        </div>

        <div className="sub_container">
          <Form onSubmit={onAddTask} />

          <hr className="hrLine" />

          <input
            className="input_form margin_bottom"
            value={searchTaskName}
            type="text"
            placeholder="Rechercher une tâche"
            onChange={handleTermSearch}
          />

<hr className="hrLine" />

          <Tasks
            tasks={tasks}
            searchTaskName={searchTaskName}
            onRemoveTask={onRemoveTask}
            onChangeCompletedTask={onChangeCompleted}
          />
        </div>
        
        <footer className="footer sub_container">
          <h6>
            Total des tâches :<span>{totalTasks}</span>
          </h6>

          <h6>
            Tâches accomplies :<span>{totalCompletedTasks}</span>
          </h6>
        </footer>
      </div>
    </div>
  );
}
