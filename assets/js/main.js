document.addEventListener('DOMContentLoaded', () => {
    // Shared clipboard function
    async function copyToClipboard(hex, element) {
        try {
            await navigator.clipboard.writeText(hex);
            showFeedback(`Copied: ${hex}`);
            animateClick(element);
        } catch (err) {
            console.error('Failed to copy:', err);
            try {
                // Fallback method
                const textArea = document.createElement('textarea');
                textArea.value = hex;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showFeedback(`Copied: ${hex} (legacy method)`);
            } catch (fallbackErr) {
                showFeedback('Failed to copy color', true);
            }
        }
    }

    // Shared feedback function
    function showFeedback(message, isAlert = false) {
        if (isAlert) {
            alert(message);
            return;
        }

        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }

    // Shared click animation
    function animateClick(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    // Handle color cards
    const cards = document.querySelectorAll('.color-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const hex = card.getAttribute('data-hex');
            copyToClipboard(hex, card);
        });
    });

    // Handle color strips
    const colorStrips = document.querySelectorAll('.color-strip');
    colorStrips.forEach(strip => {
        strip.removeAttribute('onclick');
        strip.addEventListener('click', () => {
            const hex = strip.textContent.match(/HEX: (#[0-9A-F]{6})/i)[1];
            copyToClipboard(hex, strip);
        });
    });
});

  // Updated theme toggle script using only the lightbulb icon (no text change)
        document.addEventListener("DOMContentLoaded", function () {
            const themeToggle = document.getElementById("themeToggle");
            const logo = document.querySelector(".logo");
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            const savedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
            document.body.classList.toggle("dark-mode", currentTheme === "dark");
            if (currentTheme === "dark") {
                logo.src = "core-assets/icons/ss_icon_dark.png";
                if (metaThemeColor) metaThemeColor.setAttribute("content", "#021A40");
            } else {
                logo.src = "core-assets/icons/ss_icon_light.png";
                if (metaThemeColor) metaThemeColor.setAttribute("content", "#043388");
            }

            themeToggle.addEventListener("click", function () {
                const isDark = document.body.classList.toggle("dark-mode");
                const newTheme = isDark ? "dark" : "light";
                localStorage.setItem("theme", newTheme);
                if (isDark) {
                    logo.src = "core-assets/icons/ss_icon_dark.png";
                    if (metaThemeColor) metaThemeColor.setAttribute("content", "#021A40");
                } else {
                    logo.src = "core-assets/icons/ss_icon_light.png";
                    if (metaThemeColor) metaThemeColor.setAttribute("content", "#043388");
                }
            });
        });

        // Auto close navbar after clicking a nav link on mobile
        document.addEventListener("DOMContentLoaded", function () {
            const navLinks = document.querySelectorAll(".nav-link");
            const navbarCollapse = document.getElementById("navbarNav");
            navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    // Only collapse if the navbar-toggler is visible (i.e., in mobile view)
                    if (window.getComputedStyle(document.querySelector(".navbar-toggler")).display !== "none") {
                        new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
                    }
                });
            });
        });

        document.querySelectorAll('.color-list button').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                const imgSrc = btn.dataset.img;
                document.getElementById('logoDisplay').style.backgroundColor = color;
                document.getElementById('logoImg').src = imgSrc;
            });
        });