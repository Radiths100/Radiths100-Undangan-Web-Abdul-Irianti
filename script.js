document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnOpen = document.getElementById('btn-open');
    const coverScreen = document.getElementById('cover-screen');
    const mainWeb = document.getElementById('main-web');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const heroBg = document.querySelector('.hero-bg');
    const btnClose = document.getElementById('btn-close');
    const targetDate = new Date("April 26, 2026 00:00:00").getTime();


    // === AMBIL NAMA DARI URL ===
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get("to");

    // tampilkan di cover
    const guestEl = document.querySelector(".guest-name");

    // input form
    const nameInput = document.querySelector('#rsvp-form input[type="text"]');

    if (guestName) {
        const decodedName = decodeURIComponent(guestName);

        if (guestEl) guestEl.textContent = decodedName;
        if (nameInput) nameInput.value = decodedName;
    }
    // 1. Fitur Buka Undangan & Play Music
   btnOpen.addEventListener('click', () => {
    // 🔥 paksa fullscreen (hilangin bar browser)
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    // lock body
    document.body.style.overflow = 'hidden';

    // tampilkan main
    mainWeb.classList.remove('is-hidden');
    mainWeb.classList.add('show');

    // hilangkan cover
    coverScreen.classList.add('fade-out');

    // tombol musik
    musicToggle.classList.remove('hidden');

    // 🔥 play langsung
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});

    initScrollReveal();
});

btnClose.addEventListener('click', () => {
    // 🔥 langsung munculkan cover dulu
    coverScreen.classList.remove('fade-out');

    // lalu turunkan main
    mainWeb.classList.remove('show');

    setTimeout(() => {
        mainWeb.classList.add('is-hidden');
    }, 800);

    bgMusic.pause();
});

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / 1000 / 60) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

    // 2. Kontrol Musik
    let isPlaying = true;
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.querySelector('.icon').innerText = '🔇';
        } else {
            bgMusic.play();
            musicToggle.querySelector('.icon').innerText = '🎵';
        }
        isPlaying = !isPlaying;
    });

    // 3. Efek Parallax Ringan pada Hero
    mainWeb.addEventListener('scroll', () => {
    const scrollY = mainWeb.scrollTop;

    if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.2}px) scale(1.1)`;
    }
});

    // 4. Animasi Scroll (Intersection Observer)
    const initScrollReveal = () => {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // 🔥 ini bikin dia hilang lagi saat keluar layar
                entry.target.classList.remove('active');
            }

        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
};

    // 5. Galeri & Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden'; // Lock scroll
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Unlock scroll
    });

    // === 6. MODAL SAVE DATE ===
const saveBtn = document.getElementById("saveDateBtn");
const modal = document.getElementById("calendarModal");
const closeModal = document.querySelector(".close-modal");

saveBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

// close
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// klik luar
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// === ACTION BUTTON ===

// Google Calendar
document.querySelector(".cal-btn.google").addEventListener("click", () => {
    window.open(
`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan Abdul & Iranti&dates=20260426T000000Z/20260426T050000Z&details=Undangan Pernikahan&location=Sorong`
    );
});

// Apple / iPhone (download ICS)
document.querySelector(".cal-btn.apple").addEventListener("click", () => {
    downloadICS();
});

// Outlook (pakai ICS juga)
document.querySelector(".cal-btn.outlook").addEventListener("click", () => {
    downloadICS();
});

// === FUNCTION ICS ===
function downloadICS() {
    const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Pernikahan Abdul & Iranti
DTSTART:20260426T000000Z
DTEND:20260426T050000Z
DESCRIPTION:Undangan Pernikahan
LOCATION:Sorong
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "save-the-date.ics";
    a.click();
}

    // Klik di luar gambar untuk menutup lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.getElementById("scrollBtn").addEventListener("click", function() {
    document.getElementById("target-section").scrollIntoView({
        behavior: "smooth"
    });
});
    document.getElementById("backToTop").addEventListener("click", function() {
    document.getElementById("main-web").scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



// === script ===
const scriptURL = "https://script.google.com/macros/s/AKfycbwAL4-aOwmYFxfRG5wCdcUuD_-_e5sSwQ8PRz6brC64H-1Ba9IA7T79JVxlViiYfGlV/exec";
const form = document.getElementById("rsvp-form");
const msgBox = document.getElementById("form-message");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Tampilkan status loading di tombol atau teks
    msgBox.style.display = "block";
    msgBox.style.color = "#666";
    msgBox.innerText = "Sedang mengirim... Mohon tunggu 🙏";

    const inputs = this.querySelectorAll("input, select, textarea");
    const data = {
        nama: inputs[0].value,
        hadir: inputs[1].options[inputs[1].selectedIndex].text,
        ucapan: inputs[2].value
    };

    try {
        const res = await fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.status === "SUCCESS") {
            msgBox.style.color = "green";
            msgBox.innerText = "Berhasil! Pesan Anda telah kami terima 🙏";
            form.reset();
        } else if (result.status === "EXIST") {
            msgBox.style.color = "white";
            msgBox.innerText = "Nama ini sudah mengirimkan konfirmasi sebelumnya ❗";
        } else {
            throw new Error();
        }
    } catch (error) {
        msgBox.style.color = "red";
        msgBox.innerText = "Gagal mengirim. Silakan coba lagi nanti ❌";
    }

    // Hilangkan pesan setelah 5 detik agar bersih kembali
    setTimeout(() => {
        msgBox.innerText = "";
        msgBox.style.display = "none";
    }, 5000);
});
});