import "./styles/main.scss";
import "./styles/reset.css";
import { initCategoriesSlider } from "./ts/categoriesSlider";

document.addEventListener("DOMContentLoaded", () => {
  initCategoriesSlider("#categoriesSlider");
});