import Link from "next/link";
import styles from "./page.module.css"


export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Главная</h1>
      <Link href={"/notes"}>
        <button className={styles.button}>Посмотреть все заметки</button>
      </Link>
    </main>
  );
}
