type Nullable<T> = T | null;

export function initCategoriesSlider(rootSel: string = "#categoriesSlider") {
  const root = document.querySelector(rootSel) as Nullable<HTMLElement>;
  if (!root) return;

  const viewport = root.querySelector(".categories-slider__viewport") as HTMLElement;
  const track    = root.querySelector(".categories-slider__track") as HTMLElement;

  const firstCard = track.querySelector(".category") as HTMLElement;
  if (!firstCard) return;

  function getGapPx(): number {
    const st = getComputedStyle(track);
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

  root.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") scrollByStep(-1);
    if (e.key === "ArrowRight") scrollByStep(1);
  });
  root.tabIndex = 0;
}