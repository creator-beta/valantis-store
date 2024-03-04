import { formatCurrency } from "@/app/utils/utils";
import Styles from "./Products.module.css";

export const ProductCard = (props) => {
  return (
    <article className={Styles["card"]}>
      <div className={Styles["card__header"]}>
        <span className={Styles["card__id"]}>{props.id}</span>
        <h2 className={Styles["card__product"]}>{props.product}</h2>
        <p className={Styles["card__brand"]}>
          Бренд: {props.brand ? props.brand : "Не указано"}
        </p>
      </div>
      <span className={Styles["card__price"]}>
        {formatCurrency(props.price)}
      </span>
    </article>
  );
};
