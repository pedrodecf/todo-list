import styles from "./NoTask.module.css"
import notaskimg from "../assets/notaskimg.png"

export function NoTask() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={notaskimg} />
      </div>
      <div className={styles.info}>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}
