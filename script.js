document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".page-section");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const themeToggle = document.getElementById("themeToggle");

    const searchTrigger = document.getElementById("searchTrigger");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    // data yang bisa dicari melalui search bar
    const searchData = [
        {
            title: "Tentang Kami",
            type: "ABOUT",
            text: "komunitas developer pemrograman belajar kolaborasi",
            link: "detail.html?type=about"
        },
        {
            title: "Belajar Bersama",
            type: "ABOUT",
            text: "belajar coding html css javascript teknologi",
            link: "detail.html?type=about"
        },
        {
            title: "Website Profile",
            type: "GALLERY",
            text: "galeri website profile web development coding",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80",
            link: "detail.html?type=gallery&id=1"
        },
        {
            title: "JavaScript Workshop",
            type: "GALLERY",
            text: "galeri workshop javascript coding belajar",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
            link: "detail.html?type=gallery&id=2"
        },
        {
            title: "Project Collaboration",
            type: "GALLERY",
            text: "galeri teamwork diskusi proyek kolaborasi",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80",
            link: "detail.html?type=gallery&id=3"
        },
        {
            title: "Proyek Nyata",
            type: "PROJECT",
            text: "proyek aplikasi website portfolio",
            link: "detail.html?type=projects"
        },
        {
            title: "Kolaborasi",
            type: "COMMUNITY",
            text: "komunitas teamwork git github teman developer",
            link: "detail.html?type=collaboration"
        },
        {
            title: "Kontak KodeKita",
            type: "CONTACT",
            text: "kontak email pesan hubungi komunitas",
            link: "detail.html?type=contact"
        }
    ];


    // =========================
    // NAVIGASI
    // =========================

    function scrollToTarget(target) {
        const element = document.querySelector(target);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        navMenu?.classList.remove("open");
    }


    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
                event.preventDefault();

                scrollToTarget(href);

                navLinks.forEach(item => {
                    item.classList.remove("active-nav");
                });

                link.classList.add("active-nav");
            }
        });

    const galleryFilterButtons = document.querySelectorAll(".gallery-filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryFilterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            galleryFilterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            galleryItems.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    });


    // =========================
    // MOBILE MENU
    // =========================

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }


    // =========================
    // ACTIVE NAVBAR SAAT SCROLL
    // =========================

    if (sections.length) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;

                        navLinks.forEach(link => {
                            link.classList.toggle(
                                "active-nav",
                                link.getAttribute("href") === `#${id}`
                            );
                        });
                    }
                });
            },
            {
                threshold: 0.55
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });
    }


    // =========================
    // SCROLL REVEAL ANIMATION
    // =========================

    document.querySelectorAll(".reveal").forEach(element => {

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

        revealObserver.observe(element);
    });


    // =========================
    // DARK / LIGHT MODE
    // =========================

    const savedTheme = localStorage.getItem("kodekita-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        if (themeToggle) {
            themeToggle.textContent = "☀";
        }
    }


    themeToggle?.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "kodekita-theme",
            isLight ? "light" : "dark"
        );

        themeToggle.textContent =
            isLight ? "☀" : "☾";
    });


    // =========================
    // SEARCH
    // =========================

    function openSearch() {

        searchPanel?.classList.add("show");

        setTimeout(() => {
            searchInput?.focus();
        }, 100);
    }


    function closeSearchPanel() {

        searchPanel?.classList.remove("show");

        if (searchInput) {
            searchInput.value = "";
        }

        if (searchResults) {
            searchResults.innerHTML =
                '<p class="search-empty">Ketik sesuatu untuk mencari...</p>';
        }
    }


    searchTrigger?.addEventListener(
        "click",
        openSearch
    );


    closeSearch?.addEventListener(
        "click",
        closeSearchPanel
    );


    // klik area luar search untuk menutup
    searchPanel?.addEventListener("click", event => {

        if (event.target === searchPanel) {
            closeSearchPanel();
        }

    });


    // tombol ESC untuk menutup search
    document.addEventListener("keydown", event => {

        // CTRL + K atau CMD + K
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openSearch();
        }


        if (event.key === "Escape") {
            closeSearchPanel();
        }

    });


    // =========================
    // MENAMPILKAN HASIL SEARCH
    // =========================

    function renderSearchResults(query) {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
        searchResults.innerHTML =
            '<p class="search-empty">Ketik sesuatu untuk mencari...</p>';

        return;
    }

    const keywords = keyword
        .split(/\s+/)
        .filter(Boolean);

    const results = searchData.filter(item => {
        const searchableText =
            `${item.title} ${item.type} ${item.text}`
                .toLowerCase();

        return keywords.every(word =>
            searchableText.includes(word)
        );
    });

    if (!results.length) {
        searchResults.innerHTML = `
            <div class="search-empty">
                <strong>Tidak ditemukan.</strong>
                <p>
                    Coba kata lain seperti
                    "galeri",
                    "website",
                    "workshop",
                    atau
                    "kolaborasi".
                </p>
            </div>
        `;

        return;
    }

    searchResults.innerHTML = results
        .map(item => {
            const title = highlightKeyword(
                item.title,
                keywords
            );

            const type = highlightKeyword(
                item.type,
                keywords
            );

            return `
                <a
                    class="search-result"
                    href="${item.link}"
                >
                    ${
                        item.image
                            ? `
                                <img
                                    src="${item.image}"
                                    alt="${item.title}"
                                >
                            `
                            : ""
                    }

                    <div>
                        <small>${type}</small>
                        <h4>${title}</h4>
                    </div>
                </a>
            `;
        })
        .join("");

    document
        .querySelectorAll(".search-result")
        .forEach(result => {
            result.addEventListener("click", () => {
                closeSearchPanel();
            });
        });
}


function highlightKeyword(text, keywords) {
    let result = text;

    keywords.forEach(word => {
        const lowerText = result.toLowerCase();
        const lowerWord = word.toLowerCase();

        if (lowerText.includes(lowerWord)) {
            const index = lowerText.indexOf(lowerWord);

            result =
                result.slice(0, index) +
                "<mark>" +
                result.slice(index, index + word.length) +
                "</mark>" +
                result.slice(index + word.length);
        }
    });

    return result;
}

    searchInput?.addEventListener(
        "input",
        event => {

            renderSearchResults(
                event.target.value
            );

        }
    );


    // =========================
    // DETAIL PAGE
    // =========================

    const detailContent =
        document.getElementById("detailContent");


    if (detailContent) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const type =
            params.get("type");


        const id =
            params.get("id");


        // =========================
        // DATA GALERI
        // =========================

        const galleryItems = [

            {
                title: "Website Profile",

                category: "WEB DEVELOPMENT",

                image:
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",

                description:
                    "Proyek website profile dengan fokus pada tampilan modern, responsive layout, navigasi yang jelas, dan pengalaman pengguna yang sederhana."
            },

            {
                title: "JavaScript Workshop",

                category: "WORKSHOP",

                image:
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",

                description:
                    "Kegiatan belajar JavaScript melalui latihan langsung. Peserta mencoba membuat fitur interaktif dan memahami dasar DOM."
            },

            {
                title: "Project Collaboration",

                category: "TEAMWORK",

                image:
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",

                description:
                    "Dokumentasi kerja tim saat membagi tugas, melakukan review, dan menyatukan hasil pekerjaan menggunakan Git dan GitHub."
            }

        ];


        // =========================
        // DATA DETAIL
        // =========================

        const templates = {

            about: {

                kicker: "01 — ABOUT US",

                title:
                    "Mengenal KodeKita lebih dekat.",

                description:
                    "KodeKita adalah komunitas belajar teknologi yang mengutamakan praktik, kolaborasi, dan proses berkembang bersama.",

                cards: [

                    [
                        "Belajar",

                        "Materi dipelajari dari dasar lalu langsung dipraktikkan melalui mini project."
                    ],

                    [
                        "Eksperimen",

                        "Setiap anggota bebas mencoba ide baru dan belajar dari error yang ditemukan."
                    ],

                    [
                        "Berkembang",

                        "Hasil belajar diarahkan menjadi portofolio yang bisa terus dikembangkan."
                    ]

                ]

            },


            projects: {

                kicker: "02 — PROJECTS",

                title:
                    "Dari ide menjadi proyek nyata.",

                description:
                    "Proyek dibuat sebagai tempat untuk menguji kemampuan teknis sekaligus belajar bekerja seperti tim developer.",

                cards: [

                    [
                        "Website",

                        "Landing page, profile, dashboard, dan website komunitas."
                    ],

                    [
                        "Aplikasi",

                        "Membuat aplikasi sederhana dengan fitur yang benar-benar bisa digunakan."
                    ],

                    [
                        "Portfolio",

                        "Menyusun hasil proyek agar mudah dipresentasikan dan dikembangkan."
                    ]

                ]

            },


            collaboration: {

                kicker: "03 — COLLABORATION",

                title:
                    "Kerja tim yang terstruktur.",

                description:
                    "Kolaborasi menggunakan Git dan GitHub supaya setiap perubahan kode punya riwayat yang jelas.",

                cards: [

                    [
                        "Branch",

                        "Setiap fitur dapat dikerjakan di branch terpisah supaya kode utama tetap aman."
                    ],

                    [
                        "Commit",

                        "Setiap perubahan penting disimpan dalam commit dengan pesan yang jelas."
                    ],

                    [
                        "Pull Request",

                        "Perubahan direview sebelum digabungkan ke branch pengembangan."
                    ]

                ]

            },


            contact: {

                kicker: "04 — CONTACT",

                title:
                    "Mari mulai kolaborasi.",

                description:
                    "Gunakan form kontak di halaman utama untuk mengirim pertanyaan, ide proyek, atau ajakan kolaborasi.",

                cards: [

                    [
                        "Diskusi",

                        "Ceritakan ide atau kebutuhan yang ingin kamu kerjakan bersama."
                    ],

                    [
                        "Kolaborasi",

                        "Tentukan pembagian tugas dan teknologi yang akan digunakan."
                    ],

                    [
                        "Mulai",

                        "Setelah jelas, proyek bisa dimulai dari branch dan task pertama."
                    ]

                ]

            }

        };


        // =========================
        // DETAIL GALERI
        // =========================

        if (type === "gallery") {

            const selected =
                id
                    ? galleryItems[
                        Number(id) - 1
                    ]
                    : null;


            // detail satu gallery
            if (selected) {

                detailContent.innerHTML = `

                    <article class="detail-hero">

                        <span class="section-kicker">
                            ${selected.category}
                        </span>

                        <h1>
                            ${selected.title}
                        </h1>

                        <p>
                            ${selected.description}
                        </p>

                    </article>


                    <div class="detail-gallery">

                        <figure>

                            <img
                                src="${selected.image}"
                                alt="${selected.title}"
                            >

                            <figcaption>
                                ${selected.title}
                                — dokumentasi proyek KodeKita.
                            </figcaption>

                        </figure>

                    </div>

                `;

            }


            // semua gallery
            else {

                detailContent.innerHTML = `

                    <article class="detail-hero">

                        <span class="section-kicker">
                            02 — ALL GALLERY
                        </span>

                        <h1>
                            Semua dokumentasi kegiatan.
                        </h1>

                        <p>
                            Berikut beberapa kegiatan dan proyek
                            yang bisa kamu lihat lebih detail.
                        </p>

                    </article>


                    <div class="detail-gallery">

                        ${
                            galleryItems
                                .map((item, index) => {

                                    return `

                                        <figure>

                                            <img
                                                src="${item.image}"
                                                alt="${item.title}"
                                            >

                                            <figcaption>

                                                <strong>
                                                    ${item.title}
                                                </strong>

                                                <br>

                                                ${item.category}

                                                ·

                                                <a
                                                    class="text-link"
                                                    href="detail.html?type=gallery&id=${index + 1}"
                                                >
                                                    Lihat detail →
                                                </a>

                                            </figcaption>

                                        </figure>

                                    `;

                                })
                                .join("")
                        }

                    </div>

                `;

            }

        }


        // =========================
        // DETAIL SELAIN GALERI
        // =========================

        else {

            const data =
                templates[type] ||
                templates.about;


            detailContent.innerHTML = `

                <article class="detail-hero">

                    <span class="section-kicker">
                        ${data.kicker}
                    </span>

                    <h1>
                        ${data.title}
                    </h1>

                    <p>
                        ${data.description}
                    </p>

                </article>


                <div class="detail-grid">

                    ${
                        data.cards
                            .map(card => {

                                return `

                                    <article class="detail-card">

                                        <h3>
                                            ${card[0]}
                                        </h3>

                                        <p>
                                            ${card[1]}
                                        </p>

                                    </article>

                                `;

                            })
                            .join("")
                    }

                </div>

            `;

        }

    }

});