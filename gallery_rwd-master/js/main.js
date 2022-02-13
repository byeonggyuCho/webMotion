window.addEventListener("load", () => {
  const grid = new Isotope("section", {
    itemSelector: "article",
    columnWidth: "article",
    transitionDuration: "0.5s",
  });

  const btns = document.querySelectorAll("main ul li");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const isOn = e.currentTarget.classList.contains("on");
      if (isOn) return;
      activation(e);
    });
  });

  function activation(event) {
    for (let btn of btns) btn.classList.remove("on");
    event.currentTarget.classList.add("on");

    const btn_a = event.currentTarget.querySelector("a");
    const a_href = btn_a.getAttribute("href");

    grid.arrange({ filter: a_href });
  }
});
