"use client";

import { DeleteButton } from "./delete-note";
import styles from "../page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import DoneButton from "./complete-note";

export const getTodos = async () => {
  const res = await fetch("http://localhost:8000/notes", {
    next: {
      revalidate: 0,
    },
  });
  return res.json();
};

export const NotesList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredArray, setFilteredArray] = useState(todos);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUncompleted, setIsUncompleted] = useState(false);
  const [todosError, setTodosError] = useState(null);
  const [todosLoading, setTodosLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const refetchNotes = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
    const fetchData = async () => {
      setTodosLoading(true);
      try {
        const fetchTodos = await getTodos();
        setTodos(fetchTodos);
        setTodosLoading(false);
      } catch (error) {
        // console.log(error);
        setTodosError("Что-то пошло не так, попробуйте еще раз");
      }
    };
    fetchData();
  }, [refetch]);
  return (
    <>
      {todosLoading ? (
        <div className={styles.loading}>
          <h3>Загружаем заметки</h3>
          <p>Это не займет много времени :)</p>
        </div>
      ) : null}
      <ul className={styles.notes__list}>
        {isUncompleted || isCompleted
          ? filteredArray.map((todo) => (
              <Item key={todo.id} todo={todo} refetchNotes={refetchNotes} />
            ))
          : todos.map((todo) => (
              <Item key={todo.id} todo={todo} refetchNotes={refetchNotes} />
            ))}
      </ul>
      <NotesFilter
        todos={todos}
        setFilteredArray={setFilteredArray}
        setIsCompleted={setIsCompleted}
        setIsUncompleted={setIsUncompleted}
        isCompleted={isCompleted}
        isUncompleted={isUncompleted}
      />
      {todosError && <p className={styles.error}>{todosError}</p>}
      {/* {todos.length === 0 && <p>У вас нет заметок!</p>} */}
    </>
  );
};

export const Item = ({ todo, refetchNotes }) => {
  return (
    <Link href={`/notes/note/${todo.id}`}>
      <li className={todo.completed ? styles.item__completed : styles.item}>
        <h3>{todo.title}</h3>

        <div className={styles.item__buttons}>
          <DeleteButton id={todo.id} refetchNotes={refetchNotes} />
          <DoneButton id={todo.id} todo={todo} refetchNotes={refetchNotes} />
        </div>
      </li>
    </Link>
  );
};

export const NotesFilter = ({
  todos,
  setFilteredArray,
  setIsCompleted,
  setIsUncompleted,
  isCompleted,
  isUncompleted,
}) => {
  useEffect(() => {
    if (isCompleted) {
      setFilteredArray(todos.filter((todo) => todo.completed === true));
    } else if (isUncompleted) {
      setFilteredArray(todos.filter((todo) => todo.completed === false));
    }
  }, [todos, isCompleted, isUncompleted]);
  const handleFilterCompleted = ({
    setIsCompleted,
    isCompleted,
    setIsUncompleted,
  }) => {
    setIsCompleted(!isCompleted);
    setIsUncompleted(false);
  };

  const handleFilterNotCompleted = ({
    setIsCompleted,
    setIsUncompleted,
    isUncompleted,
  }) => {
    setIsCompleted(false);
    setIsUncompleted(!isUncompleted);
  };

  return (
    <div className={styles.filter}>
      <p className={styles.filter__text}>Показать только:</p>
      <p
        className={
          isCompleted ? styles.filter__option_filtered : styles.filter__option
        }
        onClick={() =>
          handleFilterCompleted({
            todos,
            setFilteredArray,
            setIsCompleted,
            isCompleted,
            setIsUncompleted,
          })
        }
      >
        выполненные
      </p>
      <p
        className={
          isUncompleted ? styles.filter__option_filtered : styles.filter__option
        }
        onClick={() =>
          handleFilterNotCompleted({
            todos,
            setFilteredArray,
            setIsCompleted,
            setIsUncompleted,
            isUncompleted,
          })
        }
      >
        невыполненные
      </p>
    </div>
  );
};
