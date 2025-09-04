import "./styles/reset.css";
import "./styles/main.scss";

import { initCategoriesSlider } from "./ts/categoriesSlider";
import { initProductsSlider } from "./ts/productsSlider";

// импорт баннера (Webpack сам подставит путь в dist)
import salesBanner from "./assets/images/unsplash.jpg";

document.addEventListener("DOMContentLoaded", () => {
  // инициализация слайдера
  initCategoriesSlider("#categoriesSlider");
  initProductsSlider("#productsSlider");

    // установка фона для блока .container-sales
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