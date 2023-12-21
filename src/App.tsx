import styles from "./App.module.css"
import "./global.css"

import { Logo } from "./components/Logo"
import { Button } from "./components/Button"
import { NoTask } from "./components/NoTask"
import { Task } from "./components/Task"

import { useEffect, useState } from "react"

export function App() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState("")
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  function handleCreateTask() {
    if (!newTask) {
      return alert("Digite o conteúdo da tarefa.")
    }
    setTasks([...tasks, newTask])
    setNewTask("")

    const tasksToLocalStorage = [...tasks, newTask]

    localStorage.setItem("@tasks", JSON.stringify(tasksToLocalStorage))
  }

  function deleteTask(taskToBeDeleted: string) {
    const tasksWithoutDeletedTask = tasks.filter((task) => {
      return task !== taskToBeDeleted
    })

    const completedTaskWithoutDeletedTask = completedTasks.filter((task) => {
      return task !== taskToBeDeleted
    })

    localStorage.setItem("@tasks", JSON.stringify(tasksWithoutDeletedTask))

    localStorage.setItem(
      "@completedTasks",
      JSON.stringify(completedTaskWithoutDeletedTask)
    )

    setTasks(tasksWithoutDeletedTask)
    setCompletedTasks(completedTaskWithoutDeletedTask)
  }

  function taskCompleted(taskToBeCompleted: string) {
    setCompletedTasks([...completedTasks, taskToBeCompleted])

    const tasksCompletedToLocalStorage = [...completedTasks, taskToBeCompleted]
    localStorage.setItem(
      "@completedTasks",
      JSON.stringify(tasksCompletedToLocalStorage)
    )
  }

  useEffect(() => {
    const haveTasksInLocalStorage = localStorage.getItem("@tasks")

    console.log(haveTasksInLocalStorage)
    if (haveTasksInLocalStorage) {
      const tasksToObject = JSON.parse(haveTasksInLocalStorage)
      setTasks(tasksToObject)
    }

    const haveCompletedTasksInLocalStorage =
      localStorage.getItem("@completedTasks")

    if (haveCompletedTasksInLocalStorage) {
      const completedTasksToObject = JSON.parse(
        haveCompletedTasksInLocalStorage
      )
      setCompletedTasks(completedTasksToObject)
    }
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo />
      </header>
      <div className={styles.main}>
        <div className={styles.controls}>
          <input
            className={styles.input}
            placeholder="Adicione uma nova tarefa"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={handleCreateTask} />
        </div>
        <div className={styles.content}>
          <section>
            <div className={styles.tasks}>
              <p>
                Tarefas criadas <span>{tasks.length}</span>
              </p>
            </div>
            <div className={styles.tasksCompleted}>
              <p>
                Concluídas{" "}
                <span>
                  {tasks.length > 0
                    ? `${completedTasks.length} de ${tasks.length}`
                    : 0}
                </span>
              </p>
            </div>
          </section>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  key={task}
                  content={task}
                  onDeleteTask={deleteTask}
                  onConcludeTask={taskCompleted}
                />
              )
            })
          ) : (
            <NoTask />
          )}
        </div>
      </div>
    </div>
  )
}
