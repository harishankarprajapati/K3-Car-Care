// ===== Site Data =====
const siteData = {
    siteName: "K3 Car Care",

    // ===== 3 PHONE NUMBERS =====
    phonesit: "+91 72757-55556", // <-- Sri Ram Nagar
    phonesit2: "+91 98392-65759", // <-- Chandpur
    phonesit3: "+91 70681-25556", // <-- Tarna Babatpur

    timeopen: "9:30 AM – 9:30 PM (All Days Open)",
    email: "infok3carcre@gmail.com",

    // ===== 3 ADDRESSES + LINKS =====
    address1: "N-10/58-J-5 Sri Ram Nagar Colony Kakarmta, DLW Rd, Manduadih, Varanasi, Uttar Pradesh 221103",
    address1_link: "https://maps.google.com/?q=N-10/58-J-5+Sri+Ram+Nagar+Colony+Kakarmta+Varanasi",

    address2: "270, Industrial Estate Manduadih Chandpur, Road, Varanasi, Uttar Pradesh 221106",
    address2_link: "https://maps.google.com/?q=270+Industrial+Estate+Manduadih+Varanasi",

    address3: "Survey number 200, Tarna Babatpur Road, Shivpur, Varanasi, Ganeshpur, Uttar Pradesh 221002",
    address3_link: "https://maps.google.com/?q=Tarna+Babatpur+Road+Varanasi",

    // ===== 3 MAP EMBED CODES =====
    map1: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.296359330859!2d82.96972727444506!3d25.294245227764765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e095ea431f7%3A0x4f7bab1c2780752e!2sK3%20Car%20Care!5e0!3m2!1sen!2sin!4v1764479738067!5m2!1sen!2sin`,


};


// ===== Function to apply site data =====
function applySiteData() {
    document.querySelectorAll("[data-site]").forEach(el => {
        const key = el.getAttribute("data-site");
        const value = siteData[key];
        if (!value) return;

        // PHONE (supports 3 phones)
        if (key === "phonesit" || key === "phonesit2" || key === "phonesit3") {
            el.innerHTML = `<a href="tel:${value}" class="text-white text-decoration-none">${value}</a>`;
        }

        // EMAIL
        else if (key === "email") {
            el.innerHTML = `<a href="mailto:${value}" class="text-white text-decoration-none">${value}</a>`;
        }

        // ADDRESSES (with google map clickable link)
        else if (key.startsWith("address") && !key.endsWith("_link")) {
            const linkKey = key + "_link";
            const mapLink = siteData[linkKey];

            el.innerHTML = `<a href="${mapLink}" target="_blank" class="text-white text-decoration-none">${value}</a>`;
        }

        // MAPS (auto iframe embed)
        else if (key.startsWith("map")) {
            el.innerHTML = `
                <iframe 
                    src="${value}" 
                    width="100%" 
                    height="450" 
                    style="border:0;" 
                    allowfullscreen 
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>`;
        }

        // NORMAL TEXT
        else {
            el.textContent = value;
        }
    });
}


// ===== Include HTML function =====
function includeHTML(callback) {
    const elements = document.querySelectorAll("[include-html]");
    let total = elements.length;
    if (total === 0 && callback) callback();

    elements.forEach(el => {
        const file = el.getAttribute("include-html");
        if (!file) return;

        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                applySiteData();
                if (--total === 0 && callback) callback();
            })
            .catch(err => {
                el.innerHTML = `<div class="text-danger small">Error loading ${file}: ${err}</div>`;
                if (--total === 0 && callback) callback();
            });
    });
}


// ===== Back to Top Button =====
function setupBackToTopButton() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        btn.classList.toggle("show", window.scrollY > 300);
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ===== Run on page load =====
document.addEventListener("DOMContentLoaded", () => {
    applySiteData();
    includeHTML(() => {
        setupBackToTopButton();
    });
});
