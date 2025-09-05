import "./styles/reset.css";
import "./styles/main.scss";

import { initCategoriesSlider } from "./ts/categoriesSlider";
import { initProductsSlider } from "./ts/productsSlider";


import salesBanner from "./assets/images/unsplash.jpg";

document.addEventListener("DOMContentLoaded", () => {
  initCategoriesSlider("#categoriesSlider");
  initProductsSlider("#productsSlider");

    const salesSection = document.querySelector<HTMLElement>(".container-sales");

    if (salesSection) {
      Object.assign(salesSection.style, {
        backgroundImage: `url(${salesBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      });
    }
  });