import type { FC } from "react";
import type { LoaderProps } from "@/types/types-props";
import styles from "@/components/Loader/Loader.module.css";

const Loader: FC<LoaderProps> = ({ pageLoading }) => {
  if (!pageLoading) return null;

  return (
    <div className={styles.loader}>
      <div className={styles.preloader}>
        <div className={`${styles.crack} ${styles.crack1}`}></div>
        <div className={`${styles.crack} ${styles.crack2}`}></div>
        <div className={`${styles.crack} ${styles.crack3}`}></div>
        <div className={`${styles.crack} ${styles.crack4}`}></div>
        <div className={`${styles.crack} ${styles.crack5}`}></div>
      </div>
    </div>
  );
};

export default Loader;
