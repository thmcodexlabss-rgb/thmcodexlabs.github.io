document.addEventListener("DOMContentLoaded", () => {
  // --- Hamburger Menü ---
  const checkbox = document.getElementById("hamburgerToggle");
  const nav = document.getElementById("navLinks");

  function toggleMenu() {
    const isChecked = checkbox.checked;
    nav.classList.toggle("active", isChecked);
    checkbox.setAttribute("aria-expanded", isChecked);
  }

  checkbox.addEventListener("change", toggleMenu);

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      checkbox.checked = false;
      toggleMenu();
    });
  });

  const hamburgerLabel = document.querySelector(".hamburger");
  hamburgerLabel.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      checkbox.checked = !checkbox.checked;
      toggleMenu();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      checkbox.checked = false;
      toggleMenu();
    }
  });
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburgerLabel.contains(e.target)) {
      checkbox.checked = false;
      toggleMenu();
    }
  });
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- İletişim Formu ---
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-message');

  if (form && toast) {
    const toastText = toast.querySelector('.toast-text');
    const toastIcon = toast.querySelector('.toast-icon');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const email = form.elements["_replyto"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name || !email || !message) {
        showToast("Lütfen tüm alanları doldurun!", "❌", true);
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Gönderiliyor...";

      try {
        const response = await fetch("https://formspree.io/f/xblonrga", {
          method: "POST",
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });

        if (response.ok) {
          form.reset();
          showToast("Teşekkürler! Mesajınız gönderildi.", "✔️");
        } else {
          showToast("Bir hata oluştu. Lütfen tekrar deneyin.", "❌", true);
        }
      } catch {
        showToast("Bağlantı hatası! Lütfen internetinizi kontrol edin.", "❌", true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Gönder";
      }
    });

    function showToast(message, icon, isError = false) {
      toastText.textContent = message;
      toastIcon.textContent = icon;
      toast.classList.toggle("error", isError);
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 4000);
    }
  }

  // --- Hero Title Animasyonu ---
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    const words = ["THM", "CodeX", "Labs"];
    let delay = 0;
    words.forEach(word => {
      const wordDiv = document.createElement('div');
      wordDiv.classList.add('word');
      if (word.toLowerCase() === 'codex') wordDiv.classList.add('codeX');
      for (const char of word.toUpperCase()) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${delay}s`;
        wordDiv.appendChild(span);
        delay += 0.1;
      }
      heroTitle.appendChild(wordDiv);
    });
  }

  // --- Carousel Slider ---
  const track = document.getElementById('carouselTrack');
  const cards = document.querySelectorAll('.card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && cards.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    let visibleCards = 3;

    const updateVisibleCards = () => {
      if (window.innerWidth < 600) visibleCards = 1;
      else if (window.innerWidth < 992) visibleCards = 2;
      else visibleCards = 3;
    };

    const updateSlider = () => {
      const cardWidth = cards[0].offsetWidth + 20;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    nextBtn.addEventListener('click', () => {
      if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    setInterval(() => {
      if (currentIndex < cards.length - visibleCards) currentIndex++;
      else currentIndex = 0;
      updateSlider();
    }, 5000);

    updateVisibleCards();
    window.addEventListener('resize', () => {
      updateVisibleCards();
      updateSlider();
    });
  }

  // --- Modal İşlemleri ---
  const modalOverlayList = document.querySelectorAll('.modal-overlay');
  const modalCloseButtons = document.querySelectorAll('.modal-close-btn');
  const infoButtons = document.querySelectorAll('.info-btn');

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      overlay.classList.remove('active');
      overlay.querySelector('.modal').classList.remove('active');
    });
  });

  modalOverlayList.forEach(overlayEl => {
    overlayEl.addEventListener('click', e => {
      if (e.target === overlayEl) {
        overlayEl.classList.remove('active');
        overlayEl.querySelector('.modal').classList.remove('active');
      }
    });
  });

  infoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalId = btn.getAttribute('aria-controls');
      const modalEl = document.getElementById(modalId);
      if (modalEl) {
        modalEl.classList.add('active');
        modalEl.querySelector('.modal').classList.add('active');
      }
    });
  });

  // --- Form Scroll Fonksiyonu ---
  window.goToForm = function goToForm(button) {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    const charSpan = button.querySelector(".char span");
    const currentText = charSpan.textContent;

    if (currentText === "S") {
      charSpan.setAttribute("data-label", "T");
      charSpan.textContent = "T";
      const spans = button.querySelectorAll(".char span");
      spans[1].setAttribute("data-label", "H");
      spans[1].textContent = "H";
      spans[2].setAttribute("data-label", "M");
      spans[2].textContent = "M";
    } else if (currentText === "T") {
      charSpan.setAttribute("data-label", "S");
      charSpan.textContent = "S";
      const spans = button.querySelectorAll(".char span");
      spans[1].setAttribute("data-label", "o");
      spans[1].textContent = "o";
      spans[2].setAttribute("data-label", "r");
      spans[2].textContent = "r";
    }
  }
});





const overlay = document.getElementById("overlay");
const branchEl = document.getElementById("branch");
const sloganEl = document.getElementById("slogan");
const closeBtn = document.getElementById("closeBtn");

// Bilgi butonuna tıklama (mobil + tablet)
document.querySelectorAll(".info-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation(); // Buton tıklaması kartın click'ini engelle
    if (window.innerWidth <= 1024) {
      const card = btn.closest(".card");
      branchEl.textContent = card.dataset.branch;
      sloganEl.textContent = card.dataset.slogan;
      overlay.style.display = "flex";
    }
  });
});

// Masaüstünde kartın hover efektleri çalışır ama tıklama kapalıdır
// Kartın kendisine tıklama engelleniyor (opsiyonel)
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", e => {
    if (window.innerWidth > 1024) {
      e.preventDefault(); // Tıklamayı iptal et
    }
  });
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", e => {
  if (e.target === overlay) overlay.style.display = "none";
});

// Responsive için pencere boyutu değişirse açılır pencere kapanabilir (isteğe bağlı)
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    overlay.style.display = "none";
  }
});
// Accordion butonları için toggle fonksiyonu
document.querySelectorAll(".accordion-btn").forEach(button => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", !expanded);

    const content = button.nextElementSibling;
    if (!expanded) {
      content.classList.add("open");
    } else {
      content.classList.remove("open");
    }
  });
});

// Responsive olarak görünürlük değişimi (isteğe bağlı)
function updateView() {
  const cards = document.querySelector(".thm-cards");
  const accordion = document.querySelector(".accordion-container");
  if (window.innerWidth <= 768) {
    cards.style.display = "none";
    accordion.style.display = "block";
  } else {
    cards.style.display = "grid";
    accordion.style.display = "none";
  }
}

window.addEventListener("load", updateView);
window.addEventListener("resize", updateView);
