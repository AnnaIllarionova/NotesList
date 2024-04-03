import Link from "next/link";
import styles from "../../../page.module.css";
import { notFound } from 'next/navigation'

export const metadata = {
  title: "Next | note",
};

export const getNoteById = async ({ id }) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    next: {
      revalidate: 0,
    },
  });

  if(!res.ok) {
    notFound()
  }

  return res.json();
};

export default async function Note({ params: { id } }) {
  const note = await getNoteById({ id });

  return (
    <div className={styles.note}>
      <h1 className={styles.title}>Страница заметки</h1>
      <h2 className={styles.note__text}>{note.title}</h2>

      <Link href={`/notes/note/change/${id}`}>
        <button className={styles.note__button_change}>Редактировать</button>
      </Link>

      <Link href={"/notes"}>
        <button className={styles.button}>Вернуться к заметкам</button>
      </Link>
    </div>
  );
}
