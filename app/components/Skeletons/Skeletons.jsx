import Styles from "./Skeletons.module.css";

export const FilterFormSkeleton = () => {
  return (
    <div className={Styles["form"]}>
      <div className={Styles["field"]}></div>
      <div className={Styles["field"]}></div>
      <div className={Styles["field"]}></div>
      <div className={Styles["field"]}></div>
      <div className={Styles["field"]}></div>
    </div>
  );
};
