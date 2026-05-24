const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("#intro, #about, #projects, #impact, #contact");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(link => link.classList.remove("active"));

      const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add("active");
    });
  },
  {
    root: null,
    threshold: 0.45
  }
);

sections.forEach(section => observer.observe(section));
