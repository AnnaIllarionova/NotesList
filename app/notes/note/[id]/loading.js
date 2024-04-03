import styles from "../../../page.module.css";

export default function LoadingNote() {
  return (
    <div className={styles.loading}>
      <h3>Загрузка...</h3>
      <p>Подождите немного, заметка загружается...</p>
    </div>
  );
}
