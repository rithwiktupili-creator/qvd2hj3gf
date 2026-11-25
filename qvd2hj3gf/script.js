
const $ = id => document.getElementById(id);

let isRegister = false;
let currentUser = "";
let eventBudget = 0;
let selectedServices = {};
let wishlist = [];

const formatMoney = amount =>
  "₹" + Number(amount || 0).toLocaleString("en-IN");

// ======================================
// UNIQUE IMAGES FOR EVERY SERVICE VENDOR
// ======================================

const serviceImages = {
  "Venue": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85",
  "Catering": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85",
  "Decoration": "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=85",
  "Photography": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  "Music & DJ": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
  "Lighting": "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
  "Stage & Florals": "https://images.unsplash.com/photo-1507504031003-b417219a0ecd?auto=format&fit=crop&w=900&q=85",
  "Makeup & Styling": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85",
  "Transport": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85",
  "Guest Management": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
  "Entertainment": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  "Technical & AV": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85"
};

// Each vendor has its own image
const vendorImages = {
  "Venue": [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=900&q=85"
  ],

  "Catering": [
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=900&q=85"
  ],

  "Decoration": [
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1507504031003-b417219a0ecd?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85"
  ],

  "Photography": [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=85"
  ],

  "Music & DJ": [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85"
  ],

  "Lighting": [
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1507504031003-b417219a0ecd?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85"
  ],

  "Stage & Florals": [
    "https://images.unsplash.com/photo-1507504031003-b417219a0ecd?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85"
  ],

  "Makeup & Styling": [
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=85"
  ],

  "Transport": [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85"
  ],

  "Guest Management": [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=85"
  ],

  "Entertainment": [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85"
  ],

  "Technical & AV": [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85"
  ]
};

// ======================================
// VENDOR DATA
// ======================================

const vendorData = {
  "Venue": [
    ["Royal Palace Convention Hall", "Grand indoor venue with premium interiors", 85000],
    ["Garden Paradise", "Beautiful outdoor celebration space", 65000],
    ["The Grand Banquet", "Elegant banquet and dining space", 50000],
    ["Luxury Resort", "Premium resort event experience", 120000]
  ],

  "Catering": [
    ["Royal Feast Catering", "Traditional South Indian menu", 45000],
    ["Spice Route Kitchens", "Multi-cuisine catering experience", 60000],
    ["Annapurna Caterers", "Classic vegetarian feast", 35000],
    ["Grand Buffet Services", "Premium buffet arrangements", 75000]
  ],

  "Decoration": [
    ["Blossom Decor Studio", "Elegant floral and theme decoration", 30000],
    ["Dream Designs", "Custom event decoration concepts", 45000],
    ["Royal Floral Events", "Luxury floral arrangements", 55000],
    ["Minimal Moments", "Simple and elegant styling", 18000]
  ],

  "Photography": [
    ["Pixel Memories", "Candid and traditional photography", 25000],
    ["Frame Story Studio", "Cinematic photography and video", 40000],
    ["Golden Hour Films", "Premium event films", 55000],
    ["Click Moments", "Photography coverage", 18000]
  ],

  "Music & DJ": [
    ["DJ Beats", "Professional DJ and sound system", 18000],
    ["Melody Live Band", "Live music performance", 35000],
    ["Rhythm Entertainment", "DJ, lights and entertainment", 28000],
    ["Classic Orchestra", "Live instrumental music", 22000]
  ],

  "Lighting": [
    ["Glow Lighting Co.", "Decorative ambient lighting", 15000],
    ["Stage Light Works", "Professional stage lighting", 25000],
    ["Spark Event Lights", "Premium lighting arrangements", 35000],
    ["Elegant Glow", "Warm and minimal lighting", 10000]
  ],

  "Stage & Florals": [
    ["Petal Stage Studio", "Floral stage arrangements", 25000],
    ["Grand Stage Makers", "Custom stage setup", 40000],
    ["Royal Backdrops", "Premium stage backdrop design", 35000]
  ],

  "Makeup & Styling": [
    ["Glamour Studio", "Professional event makeup", 12000],
    ["Bridal Beauty Lounge", "Premium bridal styling", 25000],
    ["Style Avenue", "Hair and makeup package", 18000]
  ],

  "Transport": [
    ["Luxury Wheels", "Premium guest and family transport", 20000],
    ["City Travel Services", "Group transportation", 12000],
    ["Royal Car Rentals", "Luxury car arrangements", 18000]
  ],

  "Guest Management": [
    ["Welcome Events Team", "Guest reception and assistance", 10000],
    ["Elite Hospitality", "Guest coordination team", 18000],
    ["Event Support Crew", "Registration and event assistance", 8000]
  ],

  "Entertainment": [
    ["Fun Fiesta", "Games and interactive activities", 15000],
    ["Magic Moments", "Live performers and special acts", 25000],
    ["Celebration Crew", "Hosts and entertainment team", 18000]
  ],

  "Technical & AV": [
    ["Pro AV Solutions", "Screens, microphones and projectors", 25000],
    ["Stage Tech Systems", "Professional audio visual setup", 40000],
    ["Smart Event Tech", "Basic technical event support", 15000]
  ]
};

// ======================================
// EVENT SERVICE CATEGORIES
// ======================================

const eventServices = {
  "Wedding": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Stage & Florals", "Makeup & Styling", "Transport", "Guest Management"],

  "Birthday": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Entertainment", "Guest Management"],

  "Baby Shower": ["Venue", "Catering", "Decoration", "Photography", "Lighting", "Stage & Florals", "Makeup & Styling", "Guest Management"],

  "College Fest": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Entertainment", "Technical & AV", "Guest Management", "Transport"],

  "Corporate Event": ["Venue", "Catering", "Decoration", "Photography", "Lighting", "Technical & AV", "Guest Management", "Transport"],

  "Engagement": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Stage & Florals", "Makeup & Styling", "Guest Management"],

  "Reception": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Stage & Florals", "Makeup & Styling", "Transport", "Guest Management"],

  "Anniversary": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Entertainment", "Guest Management"],

  "Housewarming": ["Venue", "Catering", "Decoration", "Photography", "Lighting", "Guest Management", "Transport"],

  "Farewell": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Entertainment", "Guest Management"],

  "Naming Ceremony": ["Venue", "Catering", "Decoration", "Photography", "Lighting", "Stage & Florals", "Guest Management"],

  "Other Event": ["Venue", "Catering", "Decoration", "Photography", "Music & DJ", "Lighting", "Stage & Florals", "Makeup & Styling", "Transport", "Guest Management", "Entertainment", "Technical & AV"]
};

// ======================================
// LOGIN AND REGISTRATION
// ======================================

$("authSwitch").addEventListener("click", e => {
  if (e.target.id !== "switchAuth") return;

  e.preventDefault();
  isRegister = !isRegister;

  $("authTitle").textContent = isRegister
    ? "Create your account."
    : "Welcome back.";

  $("authSubtitle").textContent = isRegister
    ? "Join FINORA and start planning beautiful events."
    : "Sign in to start planning something beautiful.";

  $("authButton").innerHTML = isRegister
    ? 'Create Account <span>→</span>'
    : 'Sign In <span>→</span>';

  $("authSwitch").innerHTML = isRegister
    ? 'Already a member? <a href="#" id="switchAuth">Sign in</a>'
    : 'New to FINORA? <a href="#" id="switchAuth">Create an account</a>';

  $("nameField").classList.toggle("hidden", !isRegister);
  $("userName").required = isRegister;
});

$("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = $("email").value.trim().toLowerCase();
  const password = $("password").value;
  const name = $("userName").value.trim();

  const accounts = JSON.parse(
    localStorage.getItem("finoraAccounts") || "{}"
  );

  if (isRegister) {
    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (accounts[email]) {
      alert("An account with this email already exists. Please sign in.");
      return;
    }

    accounts[email] = { name, password };

    localStorage.setItem(
      "finoraAccounts",
      JSON.stringify(accounts)
    );

    currentUser = name;
    alert("Account created! Welcome to FINORA.");

  } else {
    const account = accounts[email];

    if (!account || account.password !== password) {
      alert("Incorrect login details. Please register or try again.");
      return;
    }

    currentUser = account.name;
  }

  openApp();
});

function openApp() {
  $("loginPage").classList.add("hidden");
  $("mainApp").classList.remove("hidden");

  $("welcomeUser").textContent = "Hello, " + currentUser;

  updateCountdown();
}

$("logoutBtn").addEventListener("click", () => {
  $("mainApp").classList.add("hidden");
  $("loginPage").classList.remove("hidden");
  $("loginForm").reset();
});

// ======================================
// EVENT CARD SHORTCUTS
// ======================================

document.querySelectorAll(".event-card").forEach(card => {
  card.addEventListener("click", () => {
    $("eventType").value = card.dataset.event;

    $("planner").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ======================================
// DATE VALIDATION
// ======================================

function localDateString() {
  const now = new Date();

  return new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];
}

$("eventDate").min = localDateString();

// ======================================
// GENERATE SERVICE OPTIONS
// ======================================

$("generateBtn").addEventListener("click", () => {
  const type = $("eventType").value;
  const city = $("city").value;
  const date = $("eventDate").value;
  const guests = Number($("guests").value);
  const budget = Number($("budget").value);

  if (
    !type ||
    !city ||
    !date ||
    !guests ||
    !budget ||
    guests < 1 ||
    budget <= 0
  ) {
    $("formError").textContent =
      "Please complete all event details with valid values.";
    return;
  }

  if (date < localDateString()) {
    $("formError").textContent =
      "Please select today or a future date.";
    return;
  }

  $("formError").textContent = "";

  eventBudget = budget;
  selectedServices = {};
  wishlist = [];

  $("totalBudget").textContent = formatMoney(eventBudget);

  $("servicesArea").classList.remove("hidden");
  $("summarySection").classList.add("hidden");

  renderServices(type);
  updateBudget();
  updateWishlist();
  updateCountdown();

  $("servicesArea").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// ======================================
// RENDER IMAGE-BASED VENDOR CARDS
// ======================================

function renderServices(type) {
  const categories =
    eventServices[type] || eventServices["Other Event"];

  $("serviceCategories").innerHTML = categories.map(category => {
    const vendors = vendorData[category] || [];
    const images = vendorImages[category] || [];

    return `
      <div class="service-category">

        <div class="category-title">
          <div>
            <p class="eyebrow">EXPLORE SERVICE</p>
            <h4>${category}</h4>
          </div>

          <span>Choose one option</span>
        </div>

        <div class="vendor-grid">

          ${vendors.map((vendor, index) => {
            const selected =
              selectedServices[category]?.name === vendor[0];

            const image =
              images[index] || serviceImages[category];

            return `
              <button
                class="vendor-option ${selected ? "selected" : ""}"
                data-category="${category}"
                data-index="${index}"
                type="button">

                <img
                  class="vendor-image"
                  src="${image}"
                  alt="${vendor[0]}"
                  loading="lazy"
                  onerror="this.style.display='none'">

                <div class="vendor-content">

                  <span class="vendor-name">
                    ${vendor[0]}
                  </span>

                  <span class="vendor-description">
                    ${vendor[1]}
                  </span>

                  <span class="vendor-bottom">

                    <span class="vendor-price">
                      ${formatMoney(vendor[2])}
                    </span>

                    <span class="vendor-select">
                      ${selected ? "SELECTED ✓" : "SELECT +"}
                    </span>

                  </span>

                </div>
              </button>
            `;
          }).join("")}

        </div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".vendor-option").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const index = Number(button.dataset.index);

      const vendor = vendorData[category][index];

      if (selectedServices[category]?.name === vendor[0]) {
        delete selectedServices[category];
      } else {
        selectedServices[category] = {
          category,
          name: vendor[0],
          description: vendor[1],
          price: vendor[2]
        };
      }

      refreshCategory(category);
      updateBudget();
      updateWishlist();

      $("summarySection").classList.add("hidden");
    });
  });
}

// ======================================
// REFRESH SELECTED CATEGORY
// ======================================

function refreshCategory(category) {
  document.querySelectorAll(
    `.vendor-option[data-category="${category}"]`
  ).forEach(button => {
    const index = Number(button.dataset.index);
    const vendor = vendorData[category][index];

    const selected =
      selectedServices[category]?.name === vendor[0];

    button.classList.toggle("selected", selected);

    button.querySelector(".vendor-select").textContent =
      selected ? "SELECTED ✓" : "SELECT +";
  });
}

// ======================================
// LIVE BUDGET CALCULATION
// ======================================

function updateBudget() {
  const items = Object.values(selectedServices);

  const spent = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const remaining = eventBudget - spent;

  const percentage = eventBudget
    ? Math.min((spent / eventBudget) * 100, 100)
    : 0;

  $("spentBudget").textContent = formatMoney(spent);
  $("remainingBudget").textContent = formatMoney(remaining);

  $("budgetProgress").style.width =
    percentage + "%";

  $("budgetProgress").style.background =
    remaining < 0 ? "#b94c4c" : "var(--gold)";

  $("remainingBudget").style.color =
    remaining < 0 ? "#b94c4c" : "#47785c";

  $("budgetCaption").textContent =
    remaining < 0
      ? "Your selected services exceed your budget."
      : `${percentage.toFixed(0)}% of your budget allocated.`;

  $("selectedItems").innerHTML = items.length
    ? items.map(item => `
        <div class="selected-entry">
          <span>${item.category}</span>
          <span>${formatMoney(item.price)}</span>
        </div>
      `).join("")
    : '<p class="muted">No services selected yet.</p>';

  showBudgetSuggestions(remaining);
}

// ======================================
// SMART BUDGET OPTIMIZER
// ======================================

function showBudgetSuggestions(remaining) {
  const box = $("budgetSuggestions");

  if (
    remaining >= 0 ||
    Object.keys(selectedServices).length === 0
  ) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }

  const overAmount = Math.abs(remaining);

  let suggestions = [];

  Object.values(selectedServices).forEach(selected => {
    const alternatives = vendorData[selected.category]
      .filter(vendor => vendor[2] < selected.price)
      .sort((a, b) => b[2] - a[2]);

    if (alternatives.length) {
      const alternative = alternatives[0];

      const saving =
        selected.price - alternative[2];

      suggestions.push({
        category: selected.category,
        current: selected.name,
        replacement: alternative,
        saving
      });
    }
  });

  suggestions.sort((a, b) => b.saving - a.saving);

  box.classList.remove("hidden");

  if (!suggestions.length) {
    box.innerHTML = `
      <strong>Budget suggestion</strong>
      <p>Review your selected services and consider removing an optional service.</p>
    `;
    return;
  }

  const best = suggestions[0];

  box.innerHTML = `
    <strong>Smart budget suggestion</strong>

    <p>
      You are over budget by ${formatMoney(overAmount)}.
    </p>

    <p>
      Try replacing ${best.current} with
      ${best.replacement[0]} and save
      ${formatMoney(best.saving)}.
    </p>

    <button
      type="button"
      class="suggestion-action"
      id="applySuggestion">
      Apply this alternative
    </button>
  `;

  $("applySuggestion").addEventListener("click", () => {
    selectedServices[best.category] = {
      category: best.category,
      name: best.replacement[0],
      description: best.replacement[1],
      price: best.replacement[2]
    };

    refreshCategory(best.category);
    updateBudget();
    updateWishlist();

    $("summarySection").classList.add("hidden");
  });
}

// ======================================
// WISHLIST
// ======================================

function updateWishlist() {
  wishlist = Object.values(selectedServices);

  $("wishlistCount").textContent =
    `${wishlist.length} saved service${wishlist.length === 1 ? "" : "s"}`;
}

// ======================================
// EVENT COUNTDOWN
// ======================================

function updateCountdown() {
  const dateValue = $("eventDate").value;

  if (!dateValue) {
    $("countdown").textContent = "Choose an event date";
    return;
  }

  const eventDate = new Date(dateValue + "T00:00:00");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const difference = Math.ceil(
    (eventDate.getTime() - today.getTime()) / 86400000
  );

  $("countdown").textContent =
    difference === 0
      ? "Your event is today!"
      : difference > 0
        ? `${difference} days to go`
        : "Event date has passed";
}

$("eventDate").addEventListener("change", updateCountdown);

// ======================================
// EVENT CHECKLIST
// ======================================

$("checklist").addEventListener("change", () => {
  const boxes = $("checklist").querySelectorAll("input");

  const completed = [...boxes].filter(
    box => box.checked
  ).length;

  $("checklistCount").textContent =
    `${completed} of ${boxes.length} completed`;
});

// ======================================
// FINAL EVENT SUMMARY
// ======================================

$("summaryBtn").addEventListener("click", () => {
  if (!eventBudget) {
    alert("Please enter your event details first.");
    return;
  }

  const items = Object.values(selectedServices);

  if (!items.length) {
    alert("Please select at least one service.");
    return;
  }

  const spent = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const remaining = eventBudget - spent;

  const type = $("eventType").value;
  const city = $("city").value;
  const date = $("eventDate").value;
  const guests = $("guests").value;

  $("summaryContent").innerHTML = `
    <div class="summary-card">

      <h3>${type} Celebration</h3>

      <div class="summary-meta">

        <div>
          <span>Location</span>
          <strong>${city}</strong>
        </div>

        <div>
          <span>Event date</span>
          <strong>${date}</strong>
        </div>

        <div>
          <span>Guests</span>
          <strong>${guests}</strong>
        </div>

        <div>
          <span>Total budget</span>
          <strong>${formatMoney(eventBudget)}</strong>
        </div>

        <div>
          <span>Services selected</span>
          <strong>${items.length}</strong>
        </div>

        <div>
          <span>Budget status</span>
          <strong>
            ${remaining >= 0 ? "Within budget" : "Over budget"}
          </strong>
        </div>

      </div>

      <h3 style="margin-top:25px">
        Your selected arrangements
      </h3>

      ${items.map(item => `
        <div class="summary-service">
          <span>
            ${item.category} — ${item.name}
          </span>

          <strong>
            ${formatMoney(item.price)}
          </strong>
        </div>
      `).join("")}

      <div class="summary-total">
        <span>Total selected cost</span>
        <strong>${formatMoney(spent)}</strong>
      </div>

      <div class="summary-total" style="font-size:18px">
        <span>Remaining budget</span>

        <strong style="color:${remaining >= 0 ? "#47785c" : "#b94c4c"}">
          ${formatMoney(remaining)}
        </strong>
      </div>

      <p class="muted" style="margin-top:18px">
        ${
          remaining >= 0
            ? "Your event plan is ready to review and print."
            : "Your selected services exceed your budget. Consider the suggested alternatives."
        }
      </p>

    </div>
  `;

  $("summarySection").classList.remove("hidden");

  $("summarySection").scrollIntoView({
    behavior: "smooth"
  });
});

// ======================================
// PRINT EVENT SUMMARY
// ======================================

$("printBtn").addEventListener("click", () => {
  window.print();
});
