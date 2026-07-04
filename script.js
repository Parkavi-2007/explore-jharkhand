/* ==========================================================================
   Explore Jharkhand — shared behaviour
   Sections: nav toggle, places data, favorites (localStorage),
   destinations filter/search, detail page, map page, contact form,
   trip planner.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }
});

/* ==========================================================================
   Places data — single source of truth for cards, detail pages, map,
   trip planner and favorites.
   ========================================================================== */

var PLACES = {
  hundru: {
    name: "Hundru Falls",
    category: "eco",
    location: "Ranchi",
    bestTime: "October – February",
    fee: "Free",
    summary: "One of Jharkhand's tallest waterfalls, fed by the Subarnarekha river.",
    description: "Hundru Falls drops around 98 metres over a rocky escarpment on the Subarnarekha river, roughly 45 km from Ranchi. The falls are at their most dramatic just after the monsoon, when the flow is at its heaviest, and become a popular day-trip spot for swimming in the pools below (with caution) and short hikes around the viewpoints.",
    howToReach: "About 45 km from Ranchi via Ranchi–Purulia road; taxis and local buses run from Ranchi's main bus stand.",
    img: "images/hundru.jpeg",
    lat: 23.4295, lng: 85.6597
  },
  dassam: {
    name: "Dassam Falls",
    category: "eco",
    location: "Ranchi",
    bestTime: "October – February",
    fee: "Free",
    summary: "A wide cascading waterfall popular for its dramatic monsoon flow.",
    description: "Dassam Falls forms where the Kanchi river drops around 44 metres over a wide rock face, creating a broad curtain of water rather than a single narrow stream. It's roughly 40 km from Ranchi and a popular stop for photography, especially through the monsoon and early winter months.",
    howToReach: "About 40 km from Ranchi on the Ranchi–Jamshedpur (NH-33) route; regular buses and taxis available.",
    img: "images/dassamfalls.jpeg",
    lat: 23.2919, lng: 85.6883
  },
  betla: {
    name: "Betla National Park",
    category: "eco",
    location: "Latehar",
    bestTime: "November – March",
    fee: "Paid entry",
    summary: "Tiger reserve and safari park set inside the Palamu forests.",
    description: "Betla National Park sits within the Palamu Tiger Reserve and covers dense sal and bamboo forest, home to tigers, elephants, bison and deer. Jeep safaris run through designated forest trails, and the park also has the ruins of two old forts, Palamu Fort, tucked inside the reserve.",
    howToReach: "About 25 km from Daltonganj town, and roughly 170 km from Ranchi; best reached by road via NH-75.",
    img: "images/betlapark.jpeg",
    lat: 23.8804, lng: 84.1936
  },
  dalma: {
    name: "Dalma Wildlife Sanctuary",
    category: "eco",
    location: "Jamshedpur",
    bestTime: "November – March",
    fee: "Paid entry",
    summary: "Forested hill sanctuary known for its wild elephant herds.",
    description: "Dalma Wildlife Sanctuary spans the Dalma hill range just north of Jamshedpur and is best known as a corridor for wild elephant herds moving between Jharkhand and West Bengal. Beyond elephants, the reserve is home to leopards, sambar and langurs, with a watchtower and short trekking trails near the entrance.",
    howToReach: "About 10 km from Jamshedpur city centre, accessible by road; local taxis and autos run from the city.",
    img: "images/dalma.jpeg",
    lat: 22.9167, lng: 86.1667
  },
  baidyanath: {
    name: "Baidyanath Temple",
    category: "cultural",
    location: "Deoghar",
    bestTime: "Year-round",
    fee: "Free",
    summary: "One of the twelve Jyotirlinga shrines, a major pilgrimage site.",
    description: "The Baidyanath Temple complex in Deoghar houses one of the twelve Jyotirlingas, making it one of the most significant Shiva pilgrimage sites in India. The complex includes the main shrine and 21 smaller temples, and draws especially large crowds of pilgrims during the Shravan month, when devotees carry holy water from the Ganges for the ritual offering.",
    howToReach: "Deoghar has its own railway station and airport; well connected by road to Ranchi, Patna and Kolkata.",
    img: "images/baidyanath.jpeg",
    lat: 24.4823, lng: 86.6958
  },
  jagannath: {
    name: "Jagannath Temple",
    category: "cultural",
    location: "Ranchi",
    bestTime: "October – March",
    fee: "Free",
    summary: "17th-century temple known for its own Rath Yatra procession.",
    description: "Built in 1691 on a small hillock in Ranchi, this Jagannath Temple is modelled after the famous Puri temple and hosts its own annual Rath Yatra chariot procession, drawing large crowds from across the city. The temple's elevated position also gives a good view over the surrounding neighbourhood.",
    howToReach: "Located within Ranchi city, roughly 10 km from Ranchi railway station; easily reached by auto or cab.",
    img: "images/jaganath.jpeg",
    lat: 23.3324, lng: 85.2775
  },
  museum: {
    name: "Tribal Museum",
    category: "cultural",
    location: "Ranchi",
    bestTime: "Year-round",
    fee: "Nominal ticket",
    summary: "Art, dress and daily-life artefacts from Jharkhand's tribal communities.",
    description: "Ranchi's Tribal Research Institute Museum documents the material culture of Jharkhand's tribal communities, including Santhal, Munda, Oraon and Ho groups, through traditional clothing, tools, musical instruments and dioramas of village life. It's a compact but useful stop for understanding the cultural backdrop behind much of the state's festivals and art.",
    howToReach: "Located in the Morabadi area of Ranchi; accessible by auto or cab from anywhere in the city.",
    img: "images/tribalmuseum.jpeg",
    lat: 23.3441, lng: 85.3096
  },
  patratu: {
    name: "Patratu Valley",
    category: "eco",
    location: "Ramgarh",
    bestTime: "October – March",
    fee: "Free",
    summary: "Winding hill road above a dam, famous for sunset valley views.",
    description: "Patratu Valley is known for its winding ghat road that loops above the Patratu Dam reservoir, framed by forested hills. It's a popular spot for an evening drive, with several viewpoints along the road that look out over the water — especially striking around sunset.",
    howToReach: "About 40 km from Ranchi, on the Ranchi–Patratu road; best visited by car or bike.",
    img: "images/patratu.jpeg",
    lat: 23.6667, lng: 85.2833
  },
  netarhat: {
    name: "Netarhat",
    category: "eco",
    location: "Latehar",
    bestTime: "October – March",
    fee: "Free",
    summary: "A hill station known as the 'Queen of Chotanagpur', famous for sunrise views.",
    description: "Sitting at around 1,070 metres, Netarhat is Jharkhand's best-known hill station, prized for its cool climate and the sunrise/sunset points that draw visitors before dawn for the view over the surrounding plateau. Pine forests and the nearby Lower and Upper Ghaghri waterfalls make it a good base for a couple of days away from the plains.",
    howToReach: "About 156 km from Ranchi; reached by road via Lohardaga, roughly a 4–5 hour drive.",
    img: "images/netarhat.jpeg",
    lat: 23.4685, lng: 84.2645
  },
  rajrappa: {
    name: "Rajrappa Temple",
    category: "cultural",
    location: "Ramgarh",
    bestTime: "October – March",
    fee: "Free",
    summary: "A Chinnamasta temple set at the confluence of the Bhairavi and Damodar rivers.",
    description: "The Rajrappa Temple is dedicated to the goddess Chhinnamasta and sits right at the confluence of the Bhairavi and Damodar rivers, roughly 80 km from Ranchi. The riverside setting, with rocky banks and shallow rapids, makes it as much a scenic stop as a pilgrimage site.",
    howToReach: "About 80 km from Ranchi via Ramgarh; regular buses run from Ranchi to Ramgarh, with local transport onward.",
    img: "images/rajrappa.jpeg",
    lat: 23.6284, lng: 85.6067
  },
  parasnath: {
    name: "Parasnath Hill (Shikharji)",
    category: "cultural",
    location: "Giridih",
    bestTime: "October – March",
    fee: "Free",
    summary: "Jharkhand's highest peak and a major Jain pilgrimage site, Shikharji.",
    description: "At around 1,350 metres, Parasnath is Jharkhand's highest peak and home to Shikharji, one of the most sacred pilgrimage sites in Jainism — believed to be the place where twenty of the twenty-four Jain Tirthankaras attained liberation. The climb to the temple cluster at the summit is a demanding but well-marked trek, typically taking most of a day round trip.",
    howToReach: "Base town is Madhuban, about 165 km from Ranchi and well connected by rail via Parasnath railway station.",
    img: "images/parasnath.jpeg",
    lat: 23.9636, lng: 86.1447
  },
  maithon: {
    name: "Maithon Dam",
    category: "eco",
    location: "Dhanbad",
    bestTime: "October – March",
    fee: "Free (paid boating)",
    summary: "A large reservoir dam popular for boating and its underground power station.",
    description: "Maithon Dam, built across the Barakar river, forms a large reservoir popular for boating and picnics, and is notable for having one of the few underground hydel power stations in India. The dam and surrounding gardens make for an easy half-day trip from Dhanbad.",
    howToReach: "About 48 km from Dhanbad city; accessible by road, with local transport available from Dhanbad.",
    img: "images/maithon.jpeg",
    lat: 23.7833, lng: 86.8167
  }
};

/* Estimated per-person cost (₹) — entry fee + local transport share */
var PLACE_COST = {
  hundru: 150, dassam: 150, betla: 800, dalma: 400,
  baidyanath: 100, jagannath: 50, museum: 80, patratu: 200,
  netarhat: 1200, rajrappa: 250, parasnath: 600, maithon: 350
};

/* ==========================================================================
   Favorites — stored in localStorage, no backend needed
   ========================================================================== */

var FAVORITES_KEY = "jh_favorites";

function getFavorites() {
  try {
    var raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isFavorite(key) {
  return getFavorites().indexOf(key) !== -1;
}

function toggleFavorite(key, btnEl) {
  var favs = getFavorites();
  var idx = favs.indexOf(key);
  var nowActive = idx === -1;
  if (nowActive) {
    favs.push(key);
  } else {
    favs.splice(idx, 1);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  showToast(nowActive ? "Added to favorites" : "Removed from favorites");
  if (btnEl) {
    btnEl.classList.toggle("is-active", nowActive);
    btnEl.setAttribute("aria-pressed", nowActive ? "true" : "false");
    btnEl.innerHTML = heartIcon(nowActive);
  }
  var countEls = document.querySelectorAll("[data-fav-count]");
  countEls.forEach(function (el) { el.textContent = favs.length; });
}

function heartIcon(filled) {
  return '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (filled ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2.3 4.5 6 4c2.2-.3 3.9.9 6 3 2.1-2.1 3.8-3.3 6-3 3.7.5 5.5 4 4 7.7-2.5 4.7-10 9.3-10 9.3z"/></svg>';
}

function renderFavoriteButton(key) {
  var active = isFavorite(key);
  return '<button class="fav-btn' + (active ? " is-active" : "") + '" ' +
    'aria-pressed="' + active + '" aria-label="Save to favorites" ' +
    'onclick="event.preventDefault(); toggleFavorite(\'' + key + '\', this);">' +
    heartIcon(active) + '</button>';
}

function renderFavoritesList(targetId) {
  var target = document.getElementById(targetId);
  if (!target) return;
  var favs = getFavorites();
  if (favs.length === 0) {
    target.innerHTML = '<p style="font-family:var(--font-mono); font-size:14px; color:var(--ink-soft);">No favorites saved yet. Tap the heart icon on any destination to save it here.</p>';
    return;
  }
  var html = '<div class="grid">';
  favs.forEach(function (key) {
    var p = PLACES[key];
    if (!p) return;
    html += '<div class="place-card destination-card ' + p.category + '">' +
      '<div class="thumb"><span class="place-tag ' + p.category + '">' + (p.category === "eco" ? "Eco" : "Cultural") + '</span>' +
      renderFavoriteButton(key) +
      '<img src="' + p.img + '" alt="' + p.name + '"></div>' +
      '<div class="body"><h5>' + p.name + '</h5><p>' + p.summary + '</p>' +
      '<a href="detail.html?place=' + key + '" class="link-arrow">View details →</a></div></div>';
  });
  html += '</div>';
  target.innerHTML = html;
}

/* ==========================================================================
   Destinations page — search + filter
   ========================================================================== */

function searchPlaces() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  var cards = document.querySelectorAll(".destination-card");
  cards.forEach(function (card) {
    var text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "" : "none";
  });
}

function filterPlaces(type) {
  var cards = document.querySelectorAll(".destination-card");
  var pills = document.querySelectorAll(".pill");
  pills.forEach(function (p) {
    p.classList.toggle("is-active", p.dataset.type === type);
  });
  cards.forEach(function (card) {
    if (type === "all" || card.classList.contains(type)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

/* ==========================================================================
   Detail page (detail.html?place=KEY)
   ========================================================================== */

function loadDetailPage() {
  var params = new URLSearchParams(window.location.search);
  var key = params.get("place");
  var place = PLACES[key];
  var container = document.getElementById("detailContent");
  if (!place || !container) {
    if (container) {
      container.innerHTML = '<div class="section"><p>Destination not found. <a href="destinations.html" class="link-arrow">Back to Destinations →</a></p></div>';
    }
    return;
  }

  document.title = place.name + " — Explore Jharkhand";

  var html =
    '<section class="hero" style="min-height:60vh; background-image:linear-gradient(180deg, rgba(27,44,32,0.35), rgba(27,44,32,0.8)), url(\'' + place.img + '\');">' +
      '<span class="eyebrow">' + (place.category === "eco" ? "Eco Tourism" : "Cultural Tourism") + '</span>' +
      '<h1>' + place.name + '</h1>' +
      '<p>' + place.summary + '</p>' +
      '<div class="frieze"></div>' +
    '</section>' +
    '<section class="section" style="padding-top:56px;">' +
      '<div style="display:grid; grid-template-columns:1fr 320px; gap:48px;" class="detail-grid">' +
        '<div>' +
          '<h2 style="margin-bottom:18px;">About ' + place.name + '</h2>' +
          '<p style="color:var(--ink-soft); font-size:16px; margin-bottom:28px;">' + place.description + '</p>' +
          '<h3 style="font-size:20px; margin-bottom:10px;">How to reach</h3>' +
          '<p style="color:var(--ink-soft); font-size:15px; margin-bottom:28px;">' + place.howToReach + '</p>' +
          '<div id="detailMap" style="height:320px; border-radius:4px; border:1px solid rgba(34,28,20,0.15);"></div>' +
        '</div>' +
        '<div>' +
          '<div class="info-card" style="margin-bottom:16px;">' +
            '<span class="eyebrow" style="margin-bottom:14px;">Quick Facts</span>' +
            '<div class="fact" style="margin-bottom:12px;"><span class="k" style="font-family:var(--font-mono); text-transform:uppercase; font-size:11.5px; color:var(--forest); display:block;">Location</span>' + place.location + '</div>' +
            '<div class="fact" style="margin-bottom:12px;"><span class="k" style="font-family:var(--font-mono); text-transform:uppercase; font-size:11.5px; color:var(--forest); display:block;">Best time</span>' + place.bestTime + '</div>' +
            '<div class="fact"><span class="k" style="font-family:var(--font-mono); text-transform:uppercase; font-size:11.5px; color:var(--forest); display:block;">Entry</span>' + place.fee + '</div>' +
          '</div>' +
          renderFavoriteButtonWide(key) +
          '<a href="map.html?place=' + key + '" class="btn-earth outline" style="display:block; text-align:center; width:100%; box-sizing:border-box; margin-top:12px; border-color:var(--ink); color:var(--ink);">View on Map</a>' +
        '</div>' +
      '</div>' +
      '<div class="reviews-host">' + renderReviewsSection(key) + '</div>' +
    '</section>';

  container.innerHTML = html;

  if (window.L) {
    var map = L.map('detailMap', { scrollWheelZoom: false }).setView([place.lat, place.lng], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([place.lat, place.lng]).addTo(map).bindPopup(place.name).openPopup();
  }
}

function renderFavoriteButtonWide(key) {
  var active = isFavorite(key);
  return '<button class="fav-btn-wide' + (active ? " is-active" : "") + '" ' +
    'aria-pressed="' + active + '" ' +
    'onclick="toggleFavoriteWide(\'' + key + '\', this)">' +
    heartIcon(active) + '<span>' + (active ? "Saved to Favorites" : "Save to Favorites") + '</span></button>';
}

function toggleFavoriteWide(key, btnEl) {
  toggleFavorite(key, null);
  var active = isFavorite(key);
  btnEl.classList.toggle("is-active", active);
  btnEl.querySelector("span").textContent = active ? "Saved to Favorites" : "Save to Favorites";
  btnEl.querySelector("svg").setAttribute("fill", active ? "currentColor" : "none");
}

/* ==========================================================================
   Map page (map.html)
   ========================================================================== */

function loadMapPage() {
  if (!window.L) return;
  var params = new URLSearchParams(window.location.search);
  var focusKey = params.get("place");

  var map = L.map('siteMap').setView([23.6, 85.6], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  Object.keys(PLACES).forEach(function (key) {
    var p = PLACES[key];
    var marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.bindPopup(
      '<strong>' + p.name + '</strong><br>' + p.location +
      '<br><a href="detail.html?place=' + key + '">View details →</a>'
    );
    if (key === focusKey) {
      map.setView([p.lat, p.lng], 12);
      marker.openPopup();
    }
  });
}

/* ==========================================================================
   Contact form — inline confirmation instead of alert()
   ========================================================================== */

function submitFeedback(event) {
  event.preventDefault();
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("successPanel").style.display = "block";
}

function resetContactForm() {
  document.getElementById("contactForm").reset();
  document.getElementById("contactForm").style.display = "block";
  document.getElementById("successPanel").style.display = "none";
}

/* ==========================================================================
   Trip planner
   ========================================================================== */

var TRIP_DATA = {
  Nature: [
    { key: "hundru", text: "Enjoy the beautiful waterfall and nature." },
    { key: "dassam", text: "Explore one of Jharkhand's famous waterfalls." },
    { key: "patratu", text: "Enjoy scenic valley views and the dam." },
    { key: "netarhat", text: "Catch the sunrise from the hill station viewpoint." }
  ],
  Wildlife: [
    { key: "betla", text: "Explore wildlife and forests on a jeep safari." },
    { key: "dalma", text: "Known for elephants and short forest treks." },
    { key: "maithon", text: "Relax by the reservoir and try boating." }
  ],
  Culture: [
    { key: "baidyanath", text: "Visit the famous Jyotirlinga temple." },
    { key: "jagannath", text: "Explore Ranchi's historic temple." },
    { key: "museum", text: "Discover Jharkhand's tribal heritage." },
    { key: "rajrappa", text: "Visit the riverside Chinnamasta temple." }
  ]
};

function generatePlan() {
  var interest = document.getElementById("interest").value;
  var days = parseInt(document.getElementById("days").value, 10);
  var budget = parseInt(document.getElementById("budget").value, 10);
  var result = document.getElementById("result");

  if (!days || days < 1) {
    result.innerHTML = '<p style="color:#A8432D;font-family:var(--font-mono);font-size:14px;">Please enter a number of days (1–10) to generate a plan.</p>';
    return;
  }

  var stops = TRIP_DATA[interest] || TRIP_DATA.Nature;
  var count = Math.min(days, stops.length);

  var STAY_PER_NIGHT = 1200;
  var FOOD_PER_DAY = 500;

  var placesCost = 0;
  for (var i = 0; i < count; i++) {
    placesCost += PLACE_COST[stops[i].key] || 0;
  }
  var stayCost = STAY_PER_NIGHT * Math.max(0, days - 1);
  var foodCost = FOOD_PER_DAY * days;
  var totalCost = placesCost + stayCost + foodCost;

  var tripType = "Budget Trip";
  if (totalCost > budget * 1.15) tripType = "Over Budget — consider fewer days";
  else if (budget > 9000) tripType = "Premium Trip";
  else if (budget >= 4000) tripType = "Standard Trip";

  var html = '<div class="plan-summary">' +
    '<span class="eyebrow">Your Itinerary</span>' +
    '<h3>' + tripType + '</h3>' +
    '<div class="facts">' +
    '<span>Interest<b>' + interest + '</b></span>' +
    '<span>Duration<b>' + days + ' Day(s)</b></span>' +
    '<span>Your Budget<b>\u20B9' + (isNaN(budget) ? 0 : budget) + '</b></span>' +
    '<span>Estimated Cost<b>\u20B9' + totalCost + '</b></span>' +
    '</div></div>';

  html += '<div class="info-card" style="margin-bottom:32px;">' +
    '<span class="eyebrow" style="margin-bottom:14px;">Cost Breakdown</span>' +
    '<div style="display:flex; justify-content:space-between; font-size:14.5px; margin-bottom:8px;"><span>Entry fees &amp; local transport (' + count + ' stops)</span><b>\u20B9' + placesCost + '</b></div>' +
    '<div style="display:flex; justify-content:space-between; font-size:14.5px; margin-bottom:8px;"><span>Stay (' + Math.max(0, days - 1) + ' night(s) @ \u20B9' + STAY_PER_NIGHT + ')</span><b>\u20B9' + stayCost + '</b></div>' +
    '<div style="display:flex; justify-content:space-between; font-size:14.5px; margin-bottom:12px;"><span>Food (' + days + ' day(s) @ \u20B9' + FOOD_PER_DAY + ')</span><b>\u20B9' + foodCost + '</b></div>' +
    '<div style="display:flex; justify-content:space-between; font-size:16px; border-top:1px solid rgba(34,28,20,0.15); padding-top:12px;"><span><strong>Total estimate</strong></span><b style="color:var(--terracotta);">\u20B9' + totalCost + '</b></div>' +
    '<p style="font-size:12.5px; color:var(--ink-soft); margin-top:10px; font-family:var(--font-mono);">Estimates only — actual costs vary by season and travel choices.</p>' +
    '</div>';

  html += '<div class="timeline">';
  for (var j = 0; j < count; j++) {
    var stop = stops[j];
    var place = PLACES[stop.key];
    html += '<div class="timeline-item">' +
      '<div class="timeline-day">DAY ' + (j + 1) + '</div>' +
      '<div class="place-card">' +
        '<div class="thumb"><img src="' + place.img + '" alt="' + place.name + '"></div>' +
        '<div class="body"><h5>' + place.name + '</h5><p>' + stop.text + ' <span style="font-family:var(--font-mono); font-size:12px; color:var(--forest);">~₹' + (PLACE_COST[stop.key] || 0) + '</span></p>' +
        '<a href="detail.html?place=' + stop.key + '" class="link-arrow">View details →</a></div>' +
      '</div></div>';
  }
  if (days > stops.length) {
    html += '<p style="font-family:var(--font-mono);font-size:13px;color:var(--ink-soft);margin-top:8px;">' +
      'Remaining day(s) are free for rest or revisiting a favourite spot.</p>';
  }
  html += '</div>';

  result.innerHTML = html;
}

/* ==========================================================================
   Live weather widget (homepage) — Open-Meteo, no API key required
   ========================================================================== */

var WEATHER_CODES = {
  0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy",
  51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow",
  80: "Rain showers", 81: "Rain showers", 82: "Violent showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm"
};

function weatherIcon(code) {
  if (code === 0 || code === 1) return "☀️";
  if (code === 2 || code === 3) return "⛅";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 65) return "🌧️";
  if (code >= 71 && code <= 75) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

function loadWeather() {
  var el = document.getElementById("weatherWidget");
  if (!el) return;

  var url = "https://api.open-meteo.com/v1/forecast?latitude=23.3441&longitude=85.3096&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var cw = data.current_weather;
      var desc = WEATHER_CODES[cw.weathercode] || "Weather";
      var icon = weatherIcon(cw.weathercode);
      var maxT = Math.round(data.daily.temperature_2m_max[0]);
      var minT = Math.round(data.daily.temperature_2m_min[0]);

      el.innerHTML =
        '<span class="eyebrow">Right now in Ranchi</span>' +
        '<div style="display:flex; align-items:center; gap:18px;">' +
          '<div style="font-size:44px;">' + icon + '</div>' +
          '<div>' +
            '<div style="font-family:var(--font-display); font-size:32px; font-style:italic;">' + Math.round(cw.temperature) + '°C</div>' +
            '<div style="font-family:var(--font-mono); font-size:12.5px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-soft);">' + desc + ' · H:' + maxT + '° L:' + minT + '°</div>' +
          '</div>' +
        '</div>' +
        '<p style="margin-top:14px; font-size:14px; color:var(--ink-soft);">Good conditions to check before heading out to the falls or hill viewpoints.</p>';
    })
    .catch(function () {
      el.innerHTML = '<span class="eyebrow">Weather</span><p style="font-size:14px; color:var(--ink-soft);">Weather data is unavailable right now — check again shortly.</p>';
    });
}
/* ==========================================================================
   Reviews & ratings — stored in localStorage per place
   ========================================================================== */

var REVIEWS_KEY = "jh_reviews";

function getAllReviews() {
  try {
    var raw = localStorage.getItem(REVIEWS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function getReviews(key) {
  var all = getAllReviews();
  return all[key] || [];
}

function addReview(key, name, rating, text) {
  var all = getAllReviews();
  if (!all[key]) all[key] = [];
  all[key].push({ name: name, rating: rating, text: text, date: new Date().toLocaleDateString() });
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
}

function getAverageRating(key) {
  var reviews = getReviews(key);
  if (reviews.length === 0) return null;
  var sum = 0;
  reviews.forEach(function (r) { sum += r.rating; });
  return (sum / reviews.length);
}

function starsDisplay(rating) {
  var rounded = Math.round(rating);
  var html = "";
  for (var i = 1; i <= 5; i++) {
    html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="' + (i <= rounded ? "var(--ochre)" : "none") + '" stroke="var(--ochre)" stroke-width="1.5"><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9"/></svg>';
  }
  return html;
}

function renderRatingBadge(key) {
  var avg = getAverageRating(key);
  var count = getReviews(key).length;
  if (avg === null) {
    return '<span style="font-family:var(--font-mono); font-size:11.5px; color:var(--ink-soft);">No reviews yet</span>';
  }
  return '<span style="display:inline-flex; align-items:center; gap:4px;">' +
    starsDisplay(avg) +
    '<span style="font-family:var(--font-mono); font-size:11.5px; color:var(--ink-soft); margin-left:4px;">' + avg.toFixed(1) + ' (' + count + ')</span>' +
    '</span>';
}

function renderReviewsSection(key) {
  var reviews = getReviews(key);
  var avg = getAverageRating(key);

  var html = '<div style="margin-top:48px;">' +
    '<h3 style="font-size:22px; margin-bottom:6px;">Reviews</h3>';

  if (avg !== null) {
    html += '<div style="display:flex; align-items:center; gap:8px; margin-bottom:20px;">' +
      starsDisplay(avg) +
      '<span style="font-family:var(--font-mono); font-size:13px; color:var(--ink-soft);">' + avg.toFixed(1) + ' out of 5 · ' + reviews.length + ' review(s)</span>' +
      '</div>';
  } else {
    html += '<p style="font-size:14px; color:var(--ink-soft); margin-bottom:20px;">No reviews yet — be the first to share your experience.</p>';
  }

  reviews.slice().reverse().forEach(function (r) {
    html += '<div class="info-card" style="margin-bottom:14px;">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
        '<strong style="font-family:var(--font-display); font-style:italic;">' + escapeHtml(r.name) + '</strong>' +
        '<span style="font-family:var(--font-mono); font-size:11px; color:var(--ink-soft);">' + r.date + '</span>' +
      '</div>' +
      '<div style="margin-bottom:8px;">' + starsDisplay(r.rating) + '</div>' +
      '<p style="font-size:14.5px; color:var(--ink-soft);">' + escapeHtml(r.text) + '</p>' +
      '</div>';
  });

  html += '<div class="form-card" style="margin-top:24px;">' +
    '<span class="eyebrow">Leave a Review</span>' +
    '<div id="reviewFormArea">' +
      '<label class="field-label">Your name</label>' +
      '<input type="text" id="reviewName" class="field" placeholder="Your name">' +
      '<label class="field-label">Rating</label>' +
      '<div id="starPicker" style="margin-bottom:22px; cursor:pointer;">' + starPickerHtml(0) + '</div>' +
      '<label class="field-label">Your review</label>' +
      '<textarea id="reviewText" class="field" rows="3" placeholder="Share your experience…"></textarea>' +
      '<button type="button" class="btn-earth" style="border:none;" onclick="submitReview(\'' + key + '\')">Submit Review</button>' +
    '</div>' +
    '</div>' +
  '</div>';

  return html;
}

var currentReviewRating = 0;

function starPickerHtml(selected) {
  var html = "";
  for (var i = 1; i <= 5; i++) {
    html += '<span onclick="setReviewRating(' + i + ')" style="display:inline-block; margin-right:4px;">' +
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="' + (i <= selected ? "var(--ochre)" : "none") + '" stroke="var(--ochre)" stroke-width="1.5"><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,16.5 5.5,21 7.5,13.5 2,9 9,9"/></svg>' +
      '</span>';
  }
  return html;
}

function setReviewRating(n) {
  currentReviewRating = n;
  document.getElementById("starPicker").innerHTML = starPickerHtml(n);
}

function submitReview(key) {
  var name = document.getElementById("reviewName").value.trim();
  var text = document.getElementById("reviewText").value.trim();
  if (!name || !text || currentReviewRating === 0) {
    alert("Please add your name, a star rating, and a short review.");
    return;
  }
  addReview(key, name, currentReviewRating, text);
  showToast("Review submitted — thank you!");
  currentReviewRating = 0;
  var container = document.getElementById("detailContent");
  var reviewsHost = container.querySelector(".reviews-host");
  reviewsHost.innerHTML = renderReviewsSection(key);
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
/* ==========================================================================
   Toast notifications
   ========================================================================== */

function showToast(message) {
  var container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = '<span>✓</span><span>' + message + '</span>';
  container.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("toast-out");
    setTimeout(function () { toast.remove(); }, 260);
  }, 2600);
}
