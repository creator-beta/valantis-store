import Link from "next/link";
import Styles from "./Products.module.css";

export const ProductsNotFound = () => {
  return (
    <div className={Styles["not-found"]}>
      <h2 className={Styles["not-found__title"]}>Весь товар распродан</h2>
      <p>Товары, которые вы искали не найдены или проданы.</p>
      <Link className="button" href="/">
        Вернуться назад
      </Link>
    </div>
  );
};
