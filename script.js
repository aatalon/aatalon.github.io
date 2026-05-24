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

const container = document.getElementById("click-container");

document.addEventListener("click",(e)=>{

    const circle=document.createElement("div");

    circle.classList.add("click-effect");

    circle.style.left=e.clientX+"px";
    circle.style.top=e.clientY+"px";

    container.appendChild(circle);

    setTimeout(()=>{
        circle.remove();
    },700);

});

const icons = ["✦","•","✧","✺"];

document.addEventListener("click",(e)=>{
    const spark=document.createElement("div");

    spark.innerText=
        icons[Math.floor(Math.random()*icons.length)];

    spark.style.position="fixed";
    spark.style.left=e.clientX+"px";
    spark.style.top=e.clientY+"px";
    spark.style.fontSize="22px";
    spark.style.color="#9a6c46";
    spark.style.pointerEvents="none";

    spark.animate(
        [
            {transform:"translate(-50%,-50%) scale(.2)",opacity:1},
            {transform:"translate(-50%,-100px) scale(1.5)",opacity:0}
        ],
        {duration:800}
    );

    document.body.appendChild(spark);

    setTimeout(()=>spark.remove(),800);
});

sections.forEach(section => observer.observe(section));
