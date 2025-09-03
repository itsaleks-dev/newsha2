// Простой скролл-слайдер под твой HTML/SCSS.
// Листает ровно на ширину карточки + gap.

type Nullable<T> = T | null;

export function initCategoriesSlider(rootSel: string = "#categoriesSlider") {
  const root = document.querySelector(rootSel) as Nullable<HTMLElement>;
  if (!root) return;

  const viewport = root.querySelector(".categories-slider__viewport") as HTMLElement;
  const track    = root.querySelector(".categories-slider__track") as HTMLElement;
  const prevBtn  = root.querySelector(".categories-slider__btn--prev") as Nullable<HTMLButtonElement>;
  const nextBtn  = root.querySelector(".categories-slider__btn--next") as Nullable<HTMLButtonElement>;

  const firstCard = track.querySelector(".category") as HTMLElement;
  if (!firstCard) return;

  // читаем gap из CSS
  function getGapPx(): number {
    const st = getComputedStyle(track);
    // поддержка gap/columnGap — что доступно, то и берём
    const raw = (st as any).gap ?? st.columnGap ?? "0px";
    return Number.parseFloat(String(raw)) || 0;
  }

  function cardStep(): number {
    const w = firstCard.getBoundingClientRect().width;
    return Math.round(w + getGapPx());
  }

  function scrollByStep(dir: 1 | -1) {
    viewport.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  }

  prevBtn?.addEventListener("click", () => scrollByStep(-1));
  nextBtn?.addEventListener("click", () => scrollByStep(1));

  // Клавиатура (стрелки)
  root.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") scrollByStep(-1);
    if (e.key === "ArrowRight") scrollByStep(1);
  });
  root.tabIndex = 0; // чтобы контейнер фокусировался для клавиатуры

  // Простая «блокировка» кнопок у краёв (необязательно)
  function updateButtons() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 1;
    const atStart = viewport.scrollLeft <= 0;
    const atEnd   = viewport.scrollLeft >= maxScroll;

    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
  }
  updateButtons();
  viewport.addEventListener("scroll", () => {
    // throttle легко не нужен — событий мало
    updateButtons();
  });

  // пересчёт шага при ресайзе (смена брейкпоинта)
  window.addEventListener("resize", () => {
    // Ничего, кроме шага, пересчитывать не нужно — берём реальные размеры
  });
}