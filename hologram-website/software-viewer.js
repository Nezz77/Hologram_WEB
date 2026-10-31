/* ===================================================
   FUSION 5 — SOFTWARE & ALGORITHM VIEWER
   =================================================== */

const SOFT_MODULES = [
  {
    id: "repo_main",
    sysId: "SYS-04-01",
    name: "hologram_fan_software_Overlap",
    category: "Main Repository",
    badge: "GITHUB REPO",
    desc: "Primary software repository for the Hologram Array project. Includes host computer polar rendering pipelines, sub-pixel overlap algorithms, real-time image slicing, and high-speed Wi-Fi UDP streaming server.",
    specs: "Languages: Python 3.10+, C++, Arduino/ESP-IDF | Protocols: UDP Socket, SPI, DMA | Target: ESP32-S3 / Host PC | Resolution: Polar (r, θ) 200×360",
    tags: ["GitHub", "Python", "ESP-IDF", "OpenCV", "NumPy", "UDP Stream", "POV Algorithm"],
    codeFile: "hologram_overlap.py",
    codeLang: "PYTHON",
    code: `# Hologram Array: Cartesian to Polar Ray Mapping with Overlap
import numpy as np
import cv2

def render_polar_frame(image, num_leds=200, angular_slices=360):
    """
    Transforms rectangular frame (H x W) into Polar coordinate matrix
    optimized for spinning LED blade array with spatial overlap correction.
    """
    h, w, _ = image.shape
    center = (w // 2, h // 2)
    max_radius = min(center[0], center[1])

    # Log-polar warp with sub-pixel interpolation
    polar_img = cv2.warpPolar(
        image, 
        (num_leds, angular_slices),
        center, 
        max_radius, 
        cv2.WARP_POLAR_LINEAR + cv2.INTER_LANCZOS4
    )
    return polar_img`,
    link: "https://github.com/Nezz77/hologram_fan_software_Overlap"
  },
  {
    id: "polar_transform",
    sysId: "SYS-04-02",
    name: "Polar Coordinate Transformation",
    category: "Graphics Pipeline",
    badge: "ALGORITHM",
    desc: "Transforms 2D/3D video frames from standard Cartesian (X, Y) coordinate space into continuous polar coordinate (r, θ) arrays matched to the physical radius of the LED arm.",
    specs: "Interpolation: Lanczos4 & Bilinear | Transformation Cost: <2.1ms per frame | Color Depth: 24-bit RGB | Radial Resolution: 200 segments",
    tags: ["OpenCV", "Linear Algebra", "Polar Mapping", "NumPy"],
    codeFile: "coordinate_transform.py",
    codeLang: "PYTHON",
    code: `def cartesian_to_polar_matrix(radius_samples, theta_samples):
    theta = np.linspace(0, 2 * np.pi, theta_samples, endpoint=False)
    r = np.linspace(0, 1.0, radius_samples)
    
    # Meshgrid polar coordinates
    R, T = np.meshgrid(r, theta)
    X = R * np.cos(T)
    Y = R * np.sin(T)
    
    return X, Y  # Precomputed LUT for zero-latency frame slicing`,
    link: "https://github.com/Nezz77/hologram_fan_software_Overlap"
  },
  {
    id: "overlap_algorithm",
    sysId: "SYS-04-03",
    name: "Sub-Pixel Overlap Blending",
    category: "Optical Enhancement",
    badge: "CORE FEATURE",
    desc: "Compensates for the angular density gradient (where pixels near center are denser than outer edge) through dynamic brightness weighting and radial overlap anti-aliasing.",
    specs: "Radial Decay Factor: 1/r normalizer | Gamma Correction: 2.2 LUT | Edge Sharpness: Adaptive unsharp mask | Ghosting Reduction: Phase decay",
    tags: ["Anti-Aliasing", "Overlap Blend", "Gamma LUT", "Color Balancing"],
    codeFile: "overlap_blend.py",
    codeLang: "PYTHON",
    code: `def apply_radial_overlap_correction(polar_frame):
    slices, leds, channels = polar_frame.shape
    
    # Density compensation curve from center to blade tip
    radial_weights = np.linspace(0.4, 1.0, leds).reshape(1, leds, 1)
    corrected = polar_frame * radial_weights
    
    # Gamma 2.2 correction for linear perceptual brightness
    gamma_lut = np.array([((i / 255.0) ** 2.2) * 255 for i in range(256)]).astype("uint8")
    return cv2.LUT(corrected.astype("uint8"), gamma_lut)`,
    link: "https://github.com/Nezz77/hologram_fan_software_Overlap"
  },
  {
    id: "udp_streaming",
    sysId: "SYS-04-04",
    name: "High-Throughput UDP Streamer",
    category: "Network Protocol",
    badge: "STREAMING",
    desc: "Low-overhead Wi-Fi UDP transmission protocol broadcasting polar frame slices in real-time from the Python host application directly to the ESP32-S3 over local 2.4 GHz Wi-Fi.",
    specs: "Transport: UDP Datagram | Frame Rate: 30–60 FPS | Packet Size: 1472 bytes MTU | Packet Drop Rate: <0.2% on local AP",
    tags: ["Sockets", "UDP", "Real-Time", "Wi-Fi Telemetry"],
    codeFile: "udp_streamer.py",
    codeLang: "PYTHON",
    code: `import socket

class HologramStreamer:
    def __init__(self, host_ip="192.168.4.1", port=4210):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.target = (host_ip, port)

    def send_slice(self, slice_idx, pixel_bytes):
        header = bytes([0xAA, 0x55, slice_idx & 0xFF, (slice_idx >> 8) & 0xFF])
        self.sock.sendto(header + pixel_bytes, self.target)`,
    link: "https://github.com/Nezz77/hologram_fan_software_Overlap"
  },
  {
    id: "esp_sync",
    sysId: "SYS-04-05",
    name: "ESP32 Hall-Effect Phase Sync",
    category: "Embedded Firmware",
    badge: "FIRMWARE",
    desc: "Microsecond-accurate hardware interrupt service routine triggered by the 3144E Hall effect sensor to lock LED column refresh timing to the rotor's exact instantaneous angular velocity.",
    specs: "Timer Resolution: 1 µs hardware timer | Interrupt Latency: <1.2 µs | Dynamic RPM Tracking: Moving average window (N=8) | Jitter: <0.05%",
    tags: ["C++", "FreeRTOS", "ISR", "Hardware Timers", "ESP32-S3"],
    codeFile: "hall_sync.cpp",
    codeLang: "C++",
    code: `// Hardware Interrupt for Hall-Effect Zero Reference
volatile uint32_t last_revolution_time = 0;
volatile uint32_t slice_period_us = 0;

void IRAM_ATTR on_hall_trigger() {
    uint32_t now = micros();
    uint32_t rev_duration = now - last_revolution_time;
    last_revolution_time = now;
    
    // Recalculate duration per angular slice (360 slices)
    slice_period_us = rev_duration / 360;
    current_slice_index = 0;
}`,
    link: "https://github.com/Nezz77/hologram_fan_software_Overlap"
  }
];

/* ── DOM refs ───────────────────────────────────── */
const softModal     = document.getElementById('soft-modal');
const softCloseBtn  = document.getElementById('soft-modal-close');
const softPartList  = document.getElementById('soft-part-list');
const softIdEl      = document.getElementById('soft-id');
const softBadgeEl   = document.getElementById('soft-badge');
const softNameEl    = document.getElementById('soft-name');
const softDescEl    = document.getElementById('soft-desc');
const softSpecsEl   = document.getElementById('soft-specs');
const softTagsEl    = document.getElementById('soft-tags');
const softCodeFile  = document.getElementById('soft-code-file');
const softCodeLang  = document.getElementById('soft-code-lang');
const softCodePre   = document.getElementById('soft-code-snippet');
const softLinkEl    = document.getElementById('soft-link');

let currentSoftIdx = 0;

/* ── Build sidebar list ─────────────────────────── */
SOFT_MODULES.forEach((mod, idx) => {
  const li = document.createElement('li');
  li.className = 'stl-part-list__item' + (mod.badge ? ' stl-part-list__item--featured' : '');
  li.setAttribute('data-idx', idx);
  li.innerHTML = `
    <span class="stl-part-list__num">${String(idx + 1).padStart(2, '0')}</span>
    <div class="stl-part-list__text">
      <span class="stl-part-list__title">${mod.name}</span>
      <span class="stl-part-list__badge">${mod.category}</span>
    </div>
  `;
  li.addEventListener('click', () => loadSoftModule(idx));
  softPartList.appendChild(li);
});

/* ── Modal open / close ─────────────────────────── */
window.openSoftwareModal = function () {
  softModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  loadSoftModule(currentSoftIdx || 0);
};

function closeSoftModal() {
  softModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

softCloseBtn.addEventListener('click', closeSoftModal);
softModal.addEventListener('click', e => { if (e.target === softModal) closeSoftModal(); });

document.addEventListener('keydown', e => {
  if (!softModal.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeSoftModal();
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    loadSoftModule((currentSoftIdx + 1) % SOFT_MODULES.length);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    loadSoftModule((currentSoftIdx - 1 + SOFT_MODULES.length) % SOFT_MODULES.length);
  }
});

/* Keyboard trigger for software spec card */
const softCard = document.getElementById('spec-software');
if (softCard) {
  softCard.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.openSoftwareModal();
    }
  });
}

/* ── Load module details ────────────────────────── */
function loadSoftModule(idx) {
  currentSoftIdx = idx;
  const mod = SOFT_MODULES[idx];
  if (!mod) return;

  /* Highlight active item */
  softPartList.querySelectorAll('.stl-part-list__item').forEach((li, i) => {
    li.classList.toggle('active', i === idx);
  });

  const activeLi = softPartList.querySelector('.active');
  if (activeLi) activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  /* Update header & descriptions */
  softIdEl.textContent = mod.sysId;
  softBadgeEl.textContent = mod.badge;
  softNameEl.textContent = mod.name;
  softDescEl.textContent = mod.desc;
  softSpecsEl.textContent = mod.specs;
  softCodeFile.textContent = mod.codeFile;
  softCodeLang.textContent = mod.codeLang;
  softCodePre.textContent = mod.code;
  softLinkEl.href = mod.link;

  /* Render tags */
  softTagsEl.innerHTML = "";
  if (mod.tags && mod.tags.length) {
    mod.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      softTagsEl.appendChild(span);
    });
  }
}
