document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-item');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            // Ambil target ID yang dituju (misal: #tentang)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Menggulung kontainer utama secara halus ke posisi section tersebut
                targetSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }

            // Perbarui tanda garis menyala (active-nav) pada navbar
            links.forEach(l => l.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });
});