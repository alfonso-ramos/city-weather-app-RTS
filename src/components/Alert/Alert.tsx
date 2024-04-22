import { ReactNode } from "react";
import styles from './Alert.module.css'

export default function Alert({children} : ReactNode) {
    return (
        <div className={styles.alert}>{children}</div>
    )
}
