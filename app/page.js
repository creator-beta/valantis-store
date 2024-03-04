import { getProductsData } from "./api/api-utils";
import { itemsPerPage } from "./api/config";
import { FilterForm } from "./components/FilterForm/FilterForm";
import { ProductsList } from "./components/Products/ProductsList";
import { PagButton } from "./components/PagButton/PagButton";
import { ProductsNotFound } from "./components/Products/ProductsNotFound";
import Styles from "./page.module.css";

export default async function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const filters = {
    price:
      searchParams?.price !== undefined
        ? Number(searchParams.price) || 0
        : undefined,
    product:
      searchParams?.product !== undefined
        ? decodeURIComponent(searchParams.product) || ""
        : undefined,
    brand:
      searchParams?.brand !== undefined
        ? decodeURIComponent(searchParams.brand) || ""
        : undefined,
  };

  const data = await getProductsData(page, filters);

  return (
    <main>
      <section className={Styles["catalog-section"]}>
        <div className="container">
          <div className={Styles["catalog-section__header"]}>
            <h1>Каталог товаров</h1>
            {data.length && <p>Товаров на странице: {data.length}</p>}
          </div>
          <div className={Styles["catalog-section__inner"]}>
            <FilterForm />
            {data.length ? <ProductsList data={data} /> : <ProductsNotFound />}
          </div>
          {data.length && (
            <div className={Styles["catalog-section__footer"]}>
              <PagButton
                isPrev
                isEnd={page === 1}
                href={{
                  pathname: "/",
                  query: { ...searchParams, page: page > 1 ? page - 1 : 1 },
                }}
              />
              <PagButton
                href={{
                  pathname: "/",
                  query: { ...searchParams, page: page + 1 },
                }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
