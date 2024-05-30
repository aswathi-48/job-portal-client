"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {

  const router  = useRouter()

  router.push('/home')
  return (
    <main className={styles.main}>

    </main>
  );
}
