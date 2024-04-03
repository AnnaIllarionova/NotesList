import Link from "next/link";
import styles from "../page.module.css";
import { NotesList } from "./notes-list";

export const metadata = {
  title: "Next | notes",
};

export default function notes() {
  return (
    <div className={styles.notes}>
      <h1  className={styles.title}>Заметки</h1>
      <div className={styles.notes__buttons}>
        <Link href={"/"}>
          <button className={styles.button}>Вернуться на главную</button>
        </Link>
        <Link href={"/notes/post-new-note"}>
          <button className={styles.button}>Добавить заметку</button>
        </Link>
      </div>
        <NotesList />
       
    </div>
  );
}
