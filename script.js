(() => {
  const panels = Array.from(document.querySelectorAll(".panel"));
  const nav = document.getElementById("section-nav");
  const number = document.getElementById("current-number");
  const progress = document.getElementById("progress-bar");
  const TRANSITION_MS = 760;
  let activeIndex = 0;
  let transitioning = false;
  let lastWheelAt = 0;
  let touchStart = null;

  const twoDigits = (value) => String(value).padStart(2, "0");

  panels.forEach((panel, index) => {
    panel.inert = index !== 0;
    if (index !== 0) panel.setAttribute("aria-hidden", "true");

    const button = document.createElement("a");
    button.className = "dot-link";
    button.href = `#${panel.id}`;
    button.setAttribute("aria-label", `Go to section ${index + 1}: ${panel.dataset.title}`);
    if (index === 0) button.setAttribute("aria-current", "step");

    const dot = document.createElement("span");
    dot.textContent = `${twoDigits(index + 1)} · ${panel.dataset.title}`;
    button.append(dot);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      goTo(index);
    });
    nav.append(button);
  });

  const dots = Array.from(nav.querySelectorAll(".dot-link"));

  function goTo(nextIndex) {
    if (transitioning || nextIndex === activeIndex || nextIndex < 0 || nextIndex >= panels.length) return;

    transitioning = true;
    const previous = panels[activeIndex];
    const next = panels[nextIndex];

    previous.classList.remove("is-active");
    previous.classList.add("is-exiting");
    previous.inert = true;
    previous.setAttribute("aria-hidden", "true");

    next.inert = false;
    next.removeAttribute("aria-hidden");
    next.classList.add("is-active");
    activeIndex = nextIndex;

    dots.forEach((dot, index) => {
      if (index === activeIndex) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
    number.textContent = twoDigits(activeIndex + 1);
    progress.style.width = `${((activeIndex + 1) / panels.length) * 100}%`;
    history.replaceState(null, "", `#${next.id}`);

    window.setTimeout(() => {
      previous.classList.remove("is-exiting");
      transitioning = false;
    }, TRANSITION_MS);
  }

  window.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) < 30) return;
    event.preventDefault();
    const now = Date.now();
    if (transitioning || now - lastWheelAt < TRANSITION_MS + 80) return;
    lastWheelAt = now;
    goTo(activeIndex + (event.deltaY > 0 ? 1 : -1));
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    const keysDown = ["ArrowDown", "PageDown", " "];
    const keysUp = ["ArrowUp", "PageUp"];
    if (keysDown.includes(event.key)) {
      event.preventDefault();
      goTo(Math.min(activeIndex + 1, panels.length - 1));
    } else if (keysUp.includes(event.key)) {
      event.preventDefault();
      goTo(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(panels.length - 1);
    }
  });

  window.addEventListener("touchstart", (event) => {
    if (event.touches.length === 1) touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dy) < 50 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
    goTo(activeIndex + (dy < 0 ? 1 : -1));
  }, { passive: true });

  const hashMatch = window.location.hash.match(/^#section-(\d+)$/);
  if (hashMatch) {
    const requested = Number(hashMatch[1]) - 1;
    if (requested >= 0 && requested < panels.length) {
      panels[0].classList.remove("is-active");
      panels[0].inert = true;
      panels[0].setAttribute("aria-hidden", "true");
      panels[requested].classList.add("is-active");
      panels[requested].inert = false;
      panels[requested].removeAttribute("aria-hidden");
      dots[0].removeAttribute("aria-current");
      dots[requested].setAttribute("aria-current", "step");
      activeIndex = requested;
      number.textContent = twoDigits(requested + 1);
      progress.style.width = `${((requested + 1) / panels.length) * 100}%`;
    }
  }
})();
