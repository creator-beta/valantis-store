"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Styles from "./NavBar.module.css";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className={Styles["header"]}>
      <div className={`container ${Styles["header__container"]}`}>
        <Image src="./logo.svg" alt="Valantis" width={200} height={40} />
        <nav className={Styles["nav"]}>
          <Link
            href="/"
            className={`${Styles["nav__link"]} ${
              pathname === "/" && Styles["nav__link_active"]
            }`}
          >
            Каталог
          </Link>
        </nav>
      </div>
    </header>
  );
};
