
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const url = link.getAttribute("href");
        if (!url || url.startsWith("http")) return;

        e.preventDefault();
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = url;
        }, 350);
    });
});


const modal = document.querySelector(".modal");
const title = document.getElementById("modal-title");
const desc = document.getElementById("modal-description");
const links = document.getElementById("modal-links");
const image = document.getElementById("carousel-image");

const closeBtn = document.querySelector(".modal-close");
const leftBtn = document.querySelector(".carousel-btn.left");
const rightBtn = document.querySelector(".carousel-btn.right");

let currentImages = [];
let currentIndex = 0;
let currentProject;

const data = {
    badge: {
        title: "Badge+",
        description: "A Roblox Studio plugin that makes badge creation and management simple and fast. Created to fix developer repetition.",
        folder: "BadgePlus",
        images: ["BadgePlus.png"],
        links: [{ name: "DevForum", url: "https://devforum.roblox.com/t/badge-badges-made-easier/1749697" }]
    },
    sprinter: {
        title: "Super Sprinter",
        description: "A fast-paced Roblox running game focused on speed and progression. Based off of Super Mario.",
        folder: "SuperSprinter",
        images: ["SuperSprinter.png", "SuperSprinter1.png", "SuperSprinter2.png"],
        links: [{ name: "Roblox", url: "https://www.roblox.com/games/6806752735/Super-Sprinter" }]
    },
    ocean: {
        title: "Ocean Cleaning Simulator",
        description: "A Roblox simulation game centered around environmental cleanup. Promoting the cleanup of the ocean to younger generations.",
        folder: "OceanCleaning",
        images: ["OceanCleaning.png", "OceanCleaning1.png"],
        links: [{ name: "Roblox", url: "https://www.roblox.com/games/8359669434/Ocean-Cleaning-Simulator" }]
    },
    schoolday: {
        title: "School Day Calculator",
        description: "A web-based school schedule and productivity tool built with HTML, CSS, and JavaScript.",
        folder: "SchoolDay",
        images: ["SchoolDay.png"],
        links: [
            { name: "Website", url: "https://aatalon.github.io/schoolday.github.io/" },
            { name: "GitHub", url: "https://github.com/aatalon/schoolday.github.io" }
        ]
    }
};

function updateImage() {
    image.style.opacity = 0;
    setTimeout(() => {
        image.src = `images/${currentProject.folder}/${currentImages[currentIndex]}`;
        image.style.opacity = 1;
    }, 200);
}

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        currentProject = data[card.dataset.project];
        currentImages = currentProject.images;
        currentIndex = 0;

        title.textContent = currentProject.title;
        desc.textContent = currentProject.description;
        image.src = `images/${currentProject.folder}/${currentImages[0]}`;

        links.innerHTML = "";
        currentProject.links.forEach(link => {
            links.innerHTML += `
                <a href="${link.url}" target="_blank">
                    ${link.name} <i class="fa-solid fa-up-right-from-square"></i>
                </a>
            `;
        });

        document.body.classList.add("modal-open");
        modal.classList.remove("hidden");
    });
});

leftBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateImage();
};

rightBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateImage();
};

function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}

closeBtn.onclick = closeModal;
modal.onclick = e => {
    if (e.target === modal) closeModal();
};


const counters = document.querySelectorAll(".impact-number");
let hasAnimated = false;

const impactObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;

        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let count = 0;
            const step = Math.ceil(target / 80);

            const interval = setInterval(() => {
                count += step;
                if (count >= target) {
                    counter.textContent = target + "+";
                    clearInterval(interval);
                } else {
                    counter.textContent = count;
                }
            }, 20);
        });
    }
}, { threshold: 0.4 });

const impactSection = document.getElementById("impact");
if (impactSection) impactObserver.observe(impactSection);

const lastUpdated = document.getElementById("lastUpdated");
if (lastUpdated) {
    lastUpdated.textContent =
        new Date().toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}


const commitList = document.getElementById("commitList");

if (commitList) {
    fetch("https://api.github.com/users/aatalon/events/public")
        .then(res => res.json())
        .then(events => {
            commitList.innerHTML = "";

            events
                .filter(e => e.type === "PushEvent")
                .slice(0, 4)
                .forEach(event => {
                    const li = document.createElement("li");
                    li.textContent =
                        `${event.repo.name}: ${event.payload.commits[0].message}`;
                    commitList.appendChild(li);
                });
        })
        .catch(() => {
            commitList.innerHTML =
                "<li style='color:var(--muted);'>Unable to load commits</li>";
        });
}
