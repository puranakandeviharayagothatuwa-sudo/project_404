document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. Global Variables & Initialization
       ========================================================================== */
    let currentImageIndex = 0;
    let selectedStarRating = 0;

    // Sample/Default Gallery Images (Auto loads if container exists)
    const galleryImages = [
        "IMAGE/banner1.jpg",
        "IMAGE/banner2.jpg"
    ];

    /* ==========================================================================
       2. Scroll Progress Bar Engine
       ========================================================================== */
    window.addEventListener("scroll", function () {
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + "%";
        }

        // Back to Top Button Toggle
        const backToTopBtn = document.getElementById("backToTop");
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        }
    });

    // Back to Top Click
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ==========================================================================
       3. Real-time Live Active Users Simulation
       ========================================================================== */
    function updateActiveUsers() {
        const userElem = document.getElementById("active-users");
        if (!userElem) return;

        // Dynamic simulation between 12 and 48 active visitors
        const randomUsers = Math.floor(Math.random() * 37) + 12;
        const currentLang = document.documentElement.lang || "si";

        if (currentLang === "en") {
            userElem.innerText = `🟢 ${randomUsers} Devotees Currently Online`;
            userElem.setAttribute("data-en", `🟢 ${randomUsers} Devotees Currently Online`);
            userElem.setAttribute("data-si", `🟢 මේ මොහොතේ පින්වතුන් ${randomUsers} දෙනෙකු සජීවීව...`);
        } else {
            userElem.innerText = `🟢 මේ මොහොතේ පින්වතුන් ${randomUsers} දෙනෙකු සජීවීව...`;
            userElem.setAttribute("data-si", `🟢 මේ මොහොතේ පින්වතුන් ${randomUsers} දෙනෙකු සජීවීව...`);
            userElem.setAttribute("data-en", `🟢 ${randomUsers} Devotees Currently Online`);
        }
    }
    updateActiveUsers();
    setInterval(updateActiveUsers, 8000);

    /* ==========================================================================
       4. Advanced Typing Effect Banner
       ========================================================================== */
    const typingContainer = document.getElementById("advanced-typing");
    if (typingContainer) {
        const typingTextsSi = [
            "ගොතටුව කන්දේ පුරාණ විහාරස්ථානයට සාදරයෙන් පිළිගනිමු...",
            "චිරං තිට්ඨතු ලෝකස්මිං සම්මා සම්බුද්ධ සාසනං!",
            "තෙරුවන් සරණයි!"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = typingTextsSi[textIndex];
            
            if (isDeleting) {
                typingContainer.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingContainer.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at full sentence
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTextsSi.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    /* ==========================================================================
       5. Voice Greeting & Speech Synthesis Logic
       ========================================================================== */
    /* ==========================================================================
   5. Voice Greeting & MP3 Audio Player Logic
   ========================================================================== */
window.speakGreeting = function () {
    const audioVisualizer = document.getElementById("audio-visualizer");
    const templeAudio = document.getElementById("templeAudio");

    // MP3 Audio එක Play කිරීම
    if (templeAudio) {
        if (templeAudio.paused) {
            templeAudio.play().then(() => {
                if (audioVisualizer) audioVisualizer.style.display = "flex";
            }).catch(error => {
                console.log("Audio Play Error:", error);
                alert("Audio එක Play කිරීමේදී දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න.");
            });
        } else {
            templeAudio.pause();
            if (audioVisualizer) audioVisualizer.style.display = "none";
        }

        // Audio එක ඉවර වූ පසු Visualizer එක Hide කිරීම
        templeAudio.onended = function () {
            if (audioVisualizer) audioVisualizer.style.display = "none";
        };
    } else {
        alert("Audio file එක (templeAudio) සොයා ගැනීමට නොහැකි විය!");
    }
};

    /* ==========================================================================
       6. Dynamic Photo Gallery & Lightbox Popups
       ========================================================================== */
    const galleryContainer = document.getElementById("image-gallery");

    function loadGallery() {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = "";

        galleryImages.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Temple Gallery Photo ${index + 1}`;
            img.onclick = () => openPopup(index);
            galleryContainer.appendChild(img);
        });
    }
    loadGallery();

    window.openPopup = function (index) {
        currentImageIndex = index;
        const popup = document.getElementById("image-popup");
        const popupImg = document.getElementById("popup-image");
        if (popup && popupImg) {
            popupImg.src = galleryImages[currentImageIndex];
            popup.style.display = "flex";
        }
    };

    window.closePopup = function () {
        const popup = document.getElementById("image-popup");
        if (popup) popup.style.display = "none";
    };

    window.changeImage = function (direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        const popupImg = document.getElementById("popup-image");
        if (popupImg) popupImg.src = galleryImages[currentImageIndex];
    };

    /* ==========================================================================
       7. Upload Modal System (Formspree Photo Upload)
       ========================================================================== */
    const uploadModal = document.getElementById("uploadModal");
    const openModalBtn = document.getElementById("open-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal-btn");

    if (openModalBtn && uploadModal) {
        openModalBtn.addEventListener("click", () => {
            uploadModal.style.display = "flex";
        });
    }

    if (closeModalBtn && uploadModal) {
        closeModalBtn.addEventListener("click", () => {
            uploadModal.style.display = "none";
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
        if (e.target === uploadModal) {
            uploadModal.style.display = "none";
        }
    });

    // Dynamic Photo Form Handler
    const photoForm = document.getElementById("photoForm");
    const uploadStatus = document.getElementById("upload-status");

    if (photoForm) {
        photoForm.addEventListener("submit", function (e) {
            // Formspree submit logic enhancement
            if (uploadStatus) {
                uploadStatus.style.display = "block";
                uploadStatus.innerText = "ඡායාරූපය යොමු වෙමින් පවතී... කරුණාකර රැඳී සිටින්න.";
            }
        });
    }

    /* ==========================================================================
       8. Interactive Star Rating & Review System
       ========================================================================== */
    const stars = document.querySelectorAll(".star-rating .star");
    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedStarRating = parseInt(this.getAttribute("data-value"));
            updateStarColors(selectedStarRating);
        });

        star.addEventListener("mouseover", function () {
            const hoverValue = parseInt(this.getAttribute("data-value"));
            updateStarColors(hoverValue);
        });

        star.addEventListener("mouseout", function () {
            updateStarColors(selectedStarRating);
        });
    });

    function updateStarColors(rating) {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute("data-value"));
            if (val <= rating) {
                star.style.color = "#ffcc00";
            } else {
                star.style.color = "#ccc";
            }
        });
    }

    window.submitReview = function () {
        const comment = document.getElementById("review-comment").value.trim();
        const msgElem = document.getElementById("review-message");
        const currentLang = document.documentElement.lang || "si";

        if (selectedStarRating === 0) {
            alert(currentLang === "en" ? "Please select a star rating!" : "කරුණාකර තරු (Star) ගණන තෝරන්න!");
            return;
        }

        if (comment === "") {
            alert(currentLang === "en" ? "Please enter your thoughts!" : "කරුණාකර ඔබේ අදහස සටහන් කරන්න!");
            return;
        }

        if (msgElem) {
            msgElem.style.display = "block";
            msgElem.innerText = currentLang === "en" 
                ? "🙏 Thank you for your feedback & review!" 
                : "🙏 ඔබගේ වටිනා අදහස් සහ ඇගයීමට බොහොමත්ම ස්තූතියි!";
            
            document.getElementById("review-comment").value = "";
            selectedStarRating = 0;
            updateStarColors(0);

            setTimeout(() => {
                msgElem.style.display = "none";
            }, 4000);
        }
    };

    /* ==========================================================================
       9. Contact Modals Global Controller
       ========================================================================== */
    window.openContactModal = function (event, modalId) {
        event.preventDefault();
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "flex";
        }
    };

    window.closeContactModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
        }
    };

    // Close contact modals on outside click
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    /* ==========================================================================
       10. Scroll Reveal Animations (Smooth Fade-in on Scroll)
       ========================================================================== */
    const scrollRevealElements = document.querySelectorAll(".scroll-reveal");

    const revealOnScroll = function () {
        const windowHeight = window.innerHeight;
        scrollRevealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.transition = "all 0.6s ease-out";
            }
        });
    };

    // Initial styling for scroll reveal items
    scrollRevealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load

    /* ==========================================================================
       11. Donate Buttons Alert Customization
       ========================================================================== */
    const donateBtns = document.querySelectorAll(".donate-btn");
    donateBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const currentLang = document.documentElement.lang || "si";
            const alertSi = this.getAttribute("data-si-alert");
            const alertEn = this.getAttribute("data-en-alert");

            if (alertSi && alertEn) {
                alert(currentLang === "en" ? alertEn : alertSi);
            }
        });
    });

});