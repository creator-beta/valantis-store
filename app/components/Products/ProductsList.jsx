import { ProductCard } from "./ProductCard";
import Styles from "./Products.module.css";

export const ProductsList = (props) => {
  return (
    <div>
      <ul className={Styles["list"]}>
        {props.data.map((product, index) => {
          return (
            <li key={index}>
              <ProductCard {...product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
