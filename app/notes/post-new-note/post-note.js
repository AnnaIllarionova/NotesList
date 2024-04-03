"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const postNewNote = async ({ newTitle }) => {
  const res = await fetch("http://localhost:8000/notes", {
    method: "POST",
    body: JSON.stringify({
      title: newTitle,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};

export const PostNote = () => {
  const [newTitle, setNewTitle] = useState("");
  const [isNewNoteLoading, setIsNewNoteLoading] = useState(false);
  const [newNoteError, setNewNoteError] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const handlePost = async () => {
    try {
      setIsNewNoteLoading(true);
      const newNote = await postNewNote({ newTitle: newTitle });
      setIsNewNoteLoading(false);

      router.push(`/notes/note/${newNote.id}`);
      reset();
    } catch (error) {
      // console.log(error);
      setNewNoteError(error.message)
    }
  };
  return (
    <div className={styles.new}>
      <h1 className={styles.title}>Создайте новую заметку</h1>
      <form className={styles.post__form} onSubmit={handleSubmit(handlePost)}>
        <input
          className={styles.new__input}
          {...register("noteText", {
            required: "Вы не можете сохранить пустую заметку",
            minLength: {
              value: 3,
              message: "Введите больше 3х символов",
            },
          })}
          type="text"
          placeholder="Введите текст заметки"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div>
          {errors?.noteText && (
            <p className={styles.error}>
              {errors?.noteText?.message || "Error!"}
            </p>
          )}
        </div>
        <input
          className={
            !isValid || isNewNoteLoading
              ? styles.button__disabled
              : styles.button
          }
          value={isNewNoteLoading ? "Сохраняем" : "Сохранить заметку"}
          type="submit"
          disabled={!isValid || isNewNoteLoading}
        />
      </form>

      <div className={styles.notes__buttons}>
        <Link href={"/notes"}>
          <button className={styles.button}>Вернуться к заметкам</button>
        </Link>
      </div>

      {newNoteError && <p className={styles.error}>{newNoteError}</p>}
    </div>
  );
};
