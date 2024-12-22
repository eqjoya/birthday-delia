// Slider Otomatis
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelector('.slides');
    const slideCount = slides.children.length; // Hitung jumlah slide
    slideIndex = (slideIndex + 1) % slideCount; // Loop slide
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Jalankan slider setiap 3 detik
setInterval(showSlides, 3000);

// Musik Background Play dan Efek Kejutan
function showSurprise() {
    const music = document.getElementById('birthdayMusic');
    music.play();

    // Tambahkan efek kejutan
    document.body.style.background = 'linear-gradient(to bottom, #ffecd2, #fcb69f)';
    alert('Selamat ulang tahun, Delia! 🎉 Semoga harimu indah!');
}

// Tombol Toggle Musik
let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById('birthdayMusic');
    if (isPlaying) {
        music.pause();
    } else {
        music.play();
    }
    isPlaying = !isPlaying;
}