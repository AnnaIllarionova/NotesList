"use client";

import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { useState } from "react";

export const deleteNoteById = async ({ id }) => {
  const res = await fetch(`http://localhost:8000/notes/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const DeleteButton = ({ id, refetchNotes }) => {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const deleteCurrentNote = async (event, { id }) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      setIsDeleteLoading(true);
      await deleteNoteById({ id });
      setIsDeleteLoading(false);
      refetchNotes();
      router.push("/notes");
    } catch (error) {
      // console.log(error);
      setDeleteError(error.message);
    }
  };
  return (
    <>
      <button
        className={
          isDeleteLoading
            ? styles.delete__button_disabled
            : styles.delete__button
        }
        disabled={isDeleteLoading}
        onClick={(event) => deleteCurrentNote(event, { id })}
      >
        {isDeleteLoading ? "Удаляем..." : "Удалить"}
      </button>
      {deleteError && <p className={styles.error}>{deleteError}</p>}
    </>
  );
};
