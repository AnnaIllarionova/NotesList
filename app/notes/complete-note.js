import { useEffect, useState } from "react";
import styles from "../page.module.css";

export const patchNote = async ({ id, done }) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: done,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};

export default function DoneButton({ id, refetchNotes, todo }) {
  const [done, setDone] = useState(todo?.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [completedError, setCompletedError] = useState(null);
  useEffect(() => {
    setDone(todo?.completed);
  }, [todo]);

  const handleChangeCompleted = async (event, {id} ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      setIsLoading(true);
      await patchNote({ id, done: !done });
      setIsLoading(false);

      refetchNotes();
    } catch (error) {
      // console.log(error);
      setCompletedError(error.message);
    }
  };

  return (
    <>
      <button
        onClick={(event) => handleChangeCompleted(event, { id, done })}
        className={
          todo.completed ? styles.done__button : styles.done__button_false
        }
        disabled={isLoading}
      >
        {todo.completed ? " Выполнено" : "Отметить как выполненное"}
      </button>
      {completedError && <p className={styles.error}>{completedError}</p>}
    </>
  );
}
