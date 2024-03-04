"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { methods } from "@/app/api/config";
import { getData, isResponseOk } from "@/app/api/api-utils";
import { getUniqueValues } from "@/app/utils/utils";
import { Button } from "../Button";
import { Select } from "../Select";
import { FilterFormSkeleton } from "../Skeletons/Skeletons";
import Styles from "./FilterForm.module.css";

export const FilterForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [brandOptions, setBrandOptions] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    price: 0,
    brand: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getData(methods.getFields, {
        field: "brand",
      });
      if (isResponseOk(data)) {
        const normalizeData = getUniqueValues(data.result);
        setBrandOptions(normalizeData);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      product: encodeURIComponent(formData.product),
      price: formData.price,
      brand: encodeURIComponent(formData.brand),
    });
    router.push(`/?${query}`);
  };
  const handleResetClick = (e) => {
    e.preventDefault();
    setFormData({
      product: "",
      price: 0,
      brand: "",
    });
    router.push("/");
  };

  return loading ? (
    <FilterFormSkeleton />
  ) : (
    <form className={Styles["form"]}>
      <input
        type="text"
        maxLength={100}
        placeholder="Поиск"
        value={formData.product}
        onChange={(e) => setFormData({ ...formData, product: e.target.value })}
      />
      <input
        type="text"
        maxLength={10}
        placeholder="Точная стоимость"
        value={!formData.price ? "" : formData.price}
        onChange={(e) => {
          const inputValue = e.target.value.replace(/[^\d]/g, "");
          setFormData({ ...formData, price: parseInt(inputValue, 10) });
        }}
      />
      <Select
        placeholder="Бренд"
        options={brandOptions}
        value={formData.brand}
        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
      />
      <Button onClick={handleSubmitClick} className="button">
        Применить
      </Button>
      <Button onClick={handleResetClick} className="button light">
        Сбросить
      </Button>
    </form>
  );
};
