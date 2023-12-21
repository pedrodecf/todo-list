import { useState, useEffect } from "react"
import styles from "./Task.module.css"
import { PiTrash } from "react-icons/pi"

interface TaskProps {
  content: string
  onDeleteTask: (task: string) => void
  onConcludeTask: (task: string) => void
}

export function Task({ content, onDeleteTask, onConcludeTask }: TaskProps) {
  const [taskCompleted, setTaskCompleted] = useState(false)

  function handleDeleteTask() {
    onDeleteTask(content)
  }

  function handleConcludeTask() {
    const updatedState = !taskCompleted
    setTaskCompleted(updatedState)

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "{}")
    localStorage.setItem(
      "tasks",
      JSON.stringify({ ...storedTasks, [content]: updatedState })
    )

    onConcludeTask(content)
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "{}")
    setTaskCompleted(storedTasks[content] || false)
  }, [content])

  return (
    <div className={styles.taskContainer}>
      <div>
        <input
          type="radio"
          onChange={handleConcludeTask}
          checked={taskCompleted}
          className={styles.inputRadio}
        />
      </div>
      <p
        className={
          taskCompleted ? styles.taskCompleted : styles.taskNotCompleted
        }
      >
        {content}
      </p>
      <PiTrash onClick={handleDeleteTask} />
    </div>
  )
}
