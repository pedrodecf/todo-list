import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"
import { PiPlusCircleBold } from "react-icons/pi"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      Criar <PiPlusCircleBold />
    </button>
  )
}
