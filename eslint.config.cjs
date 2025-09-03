@use "sass:map";
@use "../common/colors" as vars;
@use "../common/breakpoints" as bp;

/* ===== Slider ===== */
.categories-slider {
  --gap: 20px;
  --cols: 2;       /* минимум: всегда 2 карточки */
  --ratio: 4/3;    /* соотношение кадра */
  display: flex;
  align-items: center;
}

/* вьюпорт: скролл есть, но не виден */
.categories-slider__viewport {
  flex: 1 1 auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  /* прячем полосу прокрутки */
  scrollbar-width: none;              /* Firefox */
  -ms-overflow-style: none;           /* old Edge/IE */
}
.categories-slider__viewport::-webkit-scrollbar { display: none; }

/* только на < s (480px) — поля по бокам */
@media (max-width: calc(map.get(bp.$grid-breakpoints, s) - 0.1px)) {
  .categories-slider__viewport { padding-inline: 10px; }
}

/* трек: от края до края с равными промежутками */
.categories-slider__track {
  display: flex;
  justify-content: space-between;
  gap: var(--gap);
  min-width: 100%;
  padding-block: 4px;
}

/* ===== Card ===== */
.category {
  scroll-snap-align: start;
  /* ширина карточки так, чтобы занять ряд ровно в N колонок */
  flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__link {
    display: block;
    width: 100%;
    aspect-ratio: var(--ratio); /* стабильная высота по ширине */
    border-radius: 16px;
    overflow: hidden;           /* скругление по контейнеру */
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;          /* не тянем, красиво кадрируем */
    object-position: center;
    display: block;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1.2px;
    color: vars.$black;
    text-align: center;
  }
}

/* ===== Columns per breakpoint ===== */
@media (min-width: map.get(bp.$grid-breakpoints, sm)) { .categories-slider { --cols: 3; } }
@media (min-width: map.get(bp.$grid-breakpoints, lg)) { .categories-slider { --cols: 4; } }

/* на всякий случай, если где-то остались стили кнопок */
.categories-slider__btn { display: none !important; }