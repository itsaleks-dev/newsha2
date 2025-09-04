import "./styles/reset.css";
import "./styles/main.scss";

import { initCategoriesSlider } from "./ts/categoriesSlider";

// импорт баннера (Webpack сам подставит путь в dist)
import salesBanner from "./assets/images/unsplash.jpg";

document.addEventListener("DOMContentLoaded", () => {
  // инициализация слайдера
  initCategoriesSlider("#categoriesSlider");

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