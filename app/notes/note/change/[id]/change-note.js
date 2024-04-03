"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../../../page.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";

export const patchNewNote = async ({ id, titleValue }) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: titleValue,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};

export const ChangeNote = ({ note, id }) => {
  const [titleValue, setTitleValue] = useState(note?.title);
  const [isChangesLoading, setIsChangesLoading] = useState(false);
  const [changingError, setChangingError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTitleValue(note?.title);
  }, [note]);

  const handleChange = async ({ id, titleValue }) => {
    try {
      setIsChangesLoading(true);
      const changedNote = await patchNewNote({ id, titleValue });
      router.push(`/notes/note/${changedNote.id}`);
      setIsChangesLoading(false);
    } catch (error) {
      // console.log(error);
      setChangingError(error.message);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  return (
    <div className={styles.change}>
      <h1 className={styles.title}>Редактирование заметки</h1>
      <form
        className={styles.change__form}
        onSubmit={handleSubmit(() =>
          handleChange({ id: id, titleValue: titleValue })
        )}
      >
        <input
          {...register("changeText", {
            required: "Поле не может быть пустым",
          })}
          className={styles.change__input}
          type="text"
          placeholder="Введите текст"
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        {errors?.changeText && (
          <p className={styles.error}>
            {errors?.changeText?.message || "Error!"}
          </p>
        )}
        <input
          className={
            !isValid || isChangesLoading
              ? styles.button__disabled
              : styles.button
          }
          value={isChangesLoading ? "Сохраняем" : "Сохранить заметку"}
          type="submit"
          disabled={!isValid || isChangesLoading}
        />
      </form>

      <div className={styles.notes__buttons}>
        <Link href={`/notes/note/${id}`}>
          <button className={styles.button}>Вернуться назад</button>
        </Link>
      </div>
      {changingError && <p className={styles.error}>{changingError}</p>}
    </div>
  );
};
