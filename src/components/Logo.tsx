import styles from "./Logo.module.css"

import toDoLogo from "../../public/rocket.svg"

export function Logo() {
  return (
    <div className={styles.logoWrapper}>
      <img src={toDoLogo} alt="Logo do ToDo List" />
      <strong className={styles.toLogo}>
        to<span className={styles.doLogo}>do</span>
      </strong>
    </div>
  )
}
