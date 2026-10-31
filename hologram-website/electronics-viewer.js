/* ===================================================
   FUSION 5 — ELECTRONICS & HARDWARE VIEWER
   =================================================== */

const ELEC_COMPONENTS = [
  {
    id: "esp32s3",
    sysId: "SYS-02-01",
    name: "ESP32-S3 DevKitC-1 N16R8",
    category: "Microcontroller",
    badge: "MAIN MCU",
    specs: "Xtensa® Dual-Core 32-bit LX7 @ 240 MHz | 16 MB Octal Flash | 8 MB Octal PSRAM | 2.4 GHz Wi-Fi + BLE 5.0 | 512 KB SRAM",
    role: "Primary real-time rotor controller. Executes microsecond-accurate POV frame timers, hall-effect phase synchronization, and DMA pixel streaming to the spinning LED blade.",
    image: "assets/images/electronics/esp32s3.jpg",
    link: "https://tronic.lk/product/esp32-s3-devkitc-1-dev-board-n16r8-wifi-bluetooth-iot?srsltid=AfmBOoprI_voRW0UsEsJZFombh82T6EcBMxWo65qdclMeQNFF3nSBY-l"
  },
  {
    id: "hall_sensor",
    sysId: "SYS-02-02",
    name: "3144E Hall Effect Sensor Module",
    category: "Position Sensor",
    badge: "SYNC SENSOR",
    specs: "Digital Logic Switch Output | 4.5V – 24V DC | Unipolar Magnetic Trigger | Onboard Comparator & LED Indicator",
    role: "Detects the zero-degree magnetic index on each revolution, resetting polar coordinate angular offsets to eliminate drift in volumetric 3D image projection.",
    image: "assets/images/electronics/hall_sensor.jpg",
    link: "https://tronic.lk/product/3144e-hall-effect-switch-speed-counting-position-sensin"
  },
  {
    id: "motor_a2212",
    sysId: "SYS-02-03",
    name: "A2212 1000KV Brushless Outrunner Motor",
    category: "Actuator / Motor",
    badge: "PROPULSION",
    specs: "1000 KV Rating | Max Efficiency: 80% | Current Capacity: 12A/60s | 2S–3S LiPo Input | High Torque Outrunner Design",
    role: "Drives the balanced rotor arm with high torque and minimal vibration to achieve stable 700+ RPM rotation for persistence-of-vision effects.",
    image: "assets/images/electronics/motor_a2212.jpg",
    link: "https://tronic.lk/product/a221213t-1000kv-brushless-outrunner-motor-for-rc-airpla?srsltid=AfmBOopljQZNkfh9ABwVQy3XNlt2YrDZ-G0cIQh0TWCfDDXYX-MPcVKn"
  },
  {
    id: "esc_30a",
    sysId: "SYS-02-04",
    name: "30A Electronic Speed Controller (ESC)",
    category: "Motor Driver",
    badge: "POWER DRIVER",
    specs: "30A Continuous Current | BEC Output: 5V / 2A | Input Voltage: 2S–4S LiPo | Linear PWM Throttle Curve",
    role: "Regulates power delivery from the DC power supply to the brushless motor, enabling closed-loop speed control and smooth acceleration.",
    image: "assets/images/electronics/esc_30a.jpg",
    link: "https://tronic.lk/product/esc-30a-electronic-speed-controller-bec-5v-2a-for-2-4s-"
  },
  {
    id: "magnet_n35",
    sysId: "SYS-02-05",
    name: "Neodymium Magnet N35 (20x3mm)",
    category: "Magnetic Reference",
    badge: "HARDWARE",
    specs: "Grade N35 NdFeB Rare-Earth | 20 mm Diameter × 3 mm Thickness | Nickel-Copper-Nickel Plating | Strong Axial Field",
    role: "Fixed stationary reference point on base plate. Triggers the rotor-mounted Hall sensor on every complete 360° rotation.",
    image: "assets/images/electronics/magnet_n35.jpg",
    link: "https://tronic.lk/product/neodymium-magnet-rare-earth-n35-20x3mm-cylinder"
  },
  {
    id: "ultrasonic",
    sysId: "SYS-02-06",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    category: "Proximity Sensor",
    badge: "INTERACTIVE",
    specs: "2 cm – 400 cm Measurement Range | 3 mm Resolution | 5V DC Supply | 15° Measuring Angle | TTL Pulse Trigger",
    role: "Enables contactless user interaction and proximity-triggered holographic UI state switching (e.g. model rotation, zooming, menu selection).",
    image: "assets/images/electronics/ultrasonic.jpg",
    link: "https://tronic.lk/product/hc-sr04-4pin-ultrasonic-sensor-module?srsltid=AfmBOorkfIW2q2r-4MHeAb-pb5eon3zVrsxWctQ2JpH5Kf6qitG5Y663"
  },
  {
    id: "nodemcu_esp32",
    sysId: "SYS-02-07",
    name: "NodeMCU ESP32 Dev Board (30-Pin)",
    category: "Base Controller",
    badge: "BASE MCU",
    specs: "Xtensa® Dual-Core 32-bit LX6 | 2.4 GHz Wi-Fi + Bluetooth | 30-Pin CP2102 USB-UART | Multiple ADC/DAC & PWM Channels",
    role: "Base station master controller managing wireless telemetry, UI interaction, sensor readings, and safety interlocking.",
    image: "assets/images/electronics/nodemcu_esp32.jpg",
    link: "https://tronic.lk/product/nodemcu-esp32-dev-board-microusb-30-pin-wifi-bluetooth-"
  },
  {
    id: "ws2812",
    sysId: "SYS-02-08",
    name: "WS2812B Addressable RGB LED Strip",
    category: "Display Array",
    badge: "RGB DISPLAY",
    specs: "5V DC Operating Voltage | 5050 SMD LEDs with Integrated WS2811 IC | 24-bit True Color (16.7M colors) | Single-Wire NZR Protocol",
    role: "High-density LED array mounted along the rotating rotor blade, painting full-color volumetric 3D graphics in mid-air.",
    image: "assets/images/electronics/ws2812.jpg",
    link: "https://www.daraz.lk/products/ws2812b-pixel-led-5m-strip-300-led-5v-ip20-addressable-led-strip-5-meter-pack-i198422618.html"
  },
  {
    id: "apa102",
    sysId: "SYS-02-09",
    name: "APA102 High-Speed DotStar LED Strip",
    category: "Display Array (SPI)",
    badge: "HIGH REFRESH",
    specs: "2-Wire SPI (Separate Clock & Data) | Clock Frequency up to 24 MHz | PWM Frequency: 20 kHz | Independent 5-bit Global Brightness",
    role: "High-speed SPI-driven LED strip architecture allowing extreme frame refresh rates without transmission timing jitter.",
    image: "assets/images/electronics/apa102.jpg",
    link: "https://elmwoodelectronics.ca/products/14015"
  }
];

/* ── DOM refs ───────────────────────────────────── */
const elecModal     = document.getElementById('elec-modal');
const elecCloseBtn  = document.getElementById('elec-modal-close');
const elecPartList  = document.getElementById('elec-part-list');
const elecImg       = document.getElementById('elec-img');
const elecCategory  = document.getElementById('elec-category');
const elecIdEl      = document.getElementById('elec-id');
const elecNameEl    = document.getElementById('elec-name');
const elecRoleEl    = document.getElementById('elec-role');
const elecSpecsEl   = document.getElementById('elec-specs');
const elecLinkEl    = document.getElementById('elec-link');

let currentElecIdx = 0;

/* ── Build sidebar list ─────────────────────────── */
ELEC_COMPONENTS.forEach((comp, idx) => {
  const li = document.createElement('li');
  li.className = 'stl-part-list__item' + (comp.badge ? ' stl-part-list__item--featured' : '');
  li.setAttribute('data-idx', idx);
  li.innerHTML = `
    <span class="stl-part-list__num">${String(idx + 1).padStart(2, '0')}</span>
    <div class="stl-part-list__text">
      <span class="stl-part-list__title">${comp.name}</span>
      <span class="stl-part-list__badge">${comp.category}</span>
    </div>
  `;
  li.addEventListener('click', () => loadElecComponent(idx));
  elecPartList.appendChild(li);
});

/* ── Modal open / close ─────────────────────────── */
window.openElectronicsModal = function () {
  elecModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  loadElecComponent(currentElecIdx || 0);
};

function closeElecModal() {
  elecModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

elecCloseBtn.addEventListener('click', closeElecModal);
elecModal.addEventListener('click', e => { if (e.target === elecModal) closeElecModal(); });

document.addEventListener('keydown', e => {
  if (!elecModal.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeElecModal();
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    loadElecComponent((currentElecIdx + 1) % ELEC_COMPONENTS.length);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    loadElecComponent((currentElecIdx - 1 + ELEC_COMPONENTS.length) % ELEC_COMPONENTS.length);
  }
});

/* Keyboard trigger for electronics spec card */
const elecCard = document.getElementById('spec-electronics');
if (elecCard) {
  elecCard.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.openElectronicsModal();
    }
  });
}

/* ── Load component details ─────────────────────── */
function loadElecComponent(idx) {
  currentElecIdx = idx;
  const comp = ELEC_COMPONENTS[idx];
  if (!comp) return;

  /* Highlight active item */
  elecPartList.querySelectorAll('.stl-part-list__item').forEach((li, i) => {
    li.classList.toggle('active', i === idx);
  });

  const activeLi = elecPartList.querySelector('.active');
  if (activeLi) activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  /* Update details */
  elecIdEl.textContent = comp.sysId;
  elecNameEl.textContent = comp.name;
  elecCategory.textContent = comp.category.toUpperCase();
  elecRoleEl.textContent = comp.role;
  elecSpecsEl.textContent = comp.specs;
  elecLinkEl.href = comp.link;

  /* Update image with fade effect */
  elecImg.style.opacity = '0';
  const newImg = new Image();
  newImg.onload = () => {
    elecImg.src = comp.image;
    elecImg.alt = comp.name;
    elecImg.style.opacity = '1';
  };
  newImg.onerror = () => {
    elecImg.src = comp.image;
    elecImg.style.opacity = '1';
  };
  newImg.src = comp.image;
}
