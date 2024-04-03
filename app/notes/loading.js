import styles from "../page.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <h3>Загрузка...</h3>
      <p>Подождите немного, это займет несколько секунд...</p>
    </div>
  );
}
