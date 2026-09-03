document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro-screen");
  document.body.classList.add("intro-active");

  const finishIntro = () => {
    document.body.classList.add("page-loaded");
    document.body.classList.remove("intro-active");
    intro?.classList.add("is-hidden");
  };

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));

  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal-box img");
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modal.hidden = true;
    document.body.style.overflow = "";
    if (modalImage) modalImage.src = "";
  };

  document.querySelectorAll("[data-cert]").forEach(button => {
    button.addEventListener("click", () => {
      if (!modal || !modalImage) return;
      modalImage.src = "assets/certificates/" + button.dataset.cert;
      modalImage.alt = button.closest("article")?.querySelector("h3")?.textContent.trim() || "Certificate";
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelector(".modal-close")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  window.setTimeout(finishIntro, 1900);
});
