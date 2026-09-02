/* =========================================================
   AYITAM RAKESH KUMAR — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE / NAVIGATION
     ======================================================= */

  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });
  });


  /* =======================================================
     SCROLL REVEAL ANIMATION
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-head, .about-card, .point, .timeline-item, .project-card, .credential, .skill, .contact-box"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);

        }

      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     CERTIFICATE MODAL
     ======================================================= */

  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal-box img");
  const closeModal = document.querySelector(".modal-close");

  const certificateButtons =
    document.querySelectorAll("[data-cert]");


  certificateButtons.forEach(button => {

    button.addEventListener("click", () => {

      const certificate = button.getAttribute("data-cert");

      if (!certificate || !modal || !modalImage) return;

      modalImage.src =
        "assets/certificates/" + certificate;

      modalImage.alt = "Certificate";

      modal.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  });


  function closeCertificateModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

    if (modalImage) {
      modalImage.src = "";
    }

  }


  if (closeModal) {
    closeModal.addEventListener(
      "click",
      closeCertificateModal
    );
  }


  if (modal) {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeCertificateModal();
      }

    });

  }


  /* =======================================================
     ESC KEY — CLOSE MODAL
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeCertificateModal();
    }

  });


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navigationLinks =
    document.querySelectorAll(".nav-links a");


  window.addEventListener(
    "scroll",
    () => {

      let currentSection = "";

      sections.forEach(section => {

        const sectionTop =
          section.offsetTop - 150;

        if (
          window.scrollY >= sectionTop
        ) {
          currentSection =
            section.getAttribute("id");
        }

      });


      navigationLinks.forEach(link => {

        link.classList.remove("active");

        const target =
          link.getAttribute("href");

        if (
          target === "#" + currentSection
        ) {
          link.classList.add("active");
        }

      });

    },
    { passive: true }
  );


  /* =======================================================
     SKILL BAR ANIMATION
     ======================================================= */

  const skillBars =
    document.querySelectorAll(".skill-fill");

  const skillObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const bar = entry.target;

            const width =
              bar.getAttribute("data-width");

            if (width) {
              bar.style.width = width;
            }

            skillObserver.unobserve(bar);

          }

        });

      },
      {
        threshold: 0.4
      }
    );


  skillBars.forEach(bar => {

    const currentWidth =
      bar.style.width;

    if (currentWidth) {
      bar.setAttribute(
        "data-width",
        currentWidth
      );

      bar.style.width = "0";
    }

    skillObserver.observe(bar);

  });


  /* =======================================================
     PROJECT CARD TILT EFFECT
     ======================================================= */

  const projectCards =
    document.querySelectorAll(".project-card");


  projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth < 800) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -3;

      const rotateY =
        ((x - centerX) / centerX) * 3;

      card.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-year]");

  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", event => {

        const targetId =
          anchor.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });


  /* =======================================================
     BUTTON RIPPLE EFFECT
     ======================================================= */

  const buttons =
    document.querySelectorAll(".btn");


  buttons.forEach(button => {

    button.addEventListener("click", event => {

      const ripple =
        document.createElement("span");

      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";

      const rect =
        button.getBoundingClientRect();

      const size =
        Math.max(
          rect.width,
          rect.height
        );

      ripple.style.width =
        size + "px";

      ripple.style.height =
        size + "px";

      ripple.style.left =
        event.clientX -
        rect.left -
        size / 2 +
        "px";

      ripple.style.top =
        event.clientY -
        rect.top -
        size / 2 +
        "px";

      ripple.style.background =
        "rgba(255,255,255,.15)";

      ripple.style.transform =
        "scale(0)";

      ripple.style.transition =
        "transform .5s ease, opacity .5s ease";

      button.style.position = "relative";
      button.style.overflow = "hidden";

      button.appendChild(ripple);

      requestAnimationFrame(() => {

        ripple.style.transform =
          "scale(2)";

        ripple.style.opacity = "0";

      });

      setTimeout(() => {

        ripple.remove();

      }, 550);

    });

  });


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  const heroVisual =
    document.querySelector(".hero-visual");


  window.addEventListener(
    "mousemove",
    event => {

      if (
        !heroVisual ||
        window.innerWidth < 900
      ) {
        return;
      }

      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 2;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 2;

      heroVisual.style.transform =
        `translate(${x * 5}px, ${y * 5}px)`;

    },
    { passive: true }
  );


  /* =======================================================
     PAGE LOADED
     ======================================================= */

  document.body.classList.add("page-loaded");

});