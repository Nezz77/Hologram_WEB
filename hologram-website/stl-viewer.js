/* ===================================================
   FUSION 5 — STL 3D VIEWER
   Uses Three.js r128 + STLLoader + OrbitControls
   =================================================== */

const STL_PARTS = [
  { name: 'Complete Structure (Exploded)', file: 'assets/models/complete_Structure.stl', badge: 'EXPLODED VIEW' },
  { name: 'Top',                           file: 'assets/models/Top.stl' },
  { name: 'Bottom',                        file: 'assets/models/Bottom.stl' },
  { name: 'Motor Mount',                   file: 'assets/models/Motor Mount.stl' },
  { name: 'Motor Plate',                   file: 'assets/models/Motor Plate.stl' },
  { name: 'Top Coil Holder',               file: 'assets/models/Top Coil Holder.stl' },
  { name: 'Bottom Coil Holder',            file: 'assets/models/Bottom Coil Holder.stl' },
  { name: 'Bar 1',                         file: 'assets/models/Bar1.stl' },
  { name: 'Bar 2',                         file: 'assets/models/Bar2.stl' },
  { name: 'Side 1',                        file: 'assets/models/Side1.stl' },
  { name: 'Side 2',                        file: 'assets/models/Side2.stl' },
  { name: 'Spacer',                        file: 'assets/models/Spacer.stl' },
];

/* ── DOM refs ───────────────────────────────────── */
const modal        = document.getElementById('stl-modal');
const closeBtn     = document.getElementById('stl-modal-close');
const partList     = document.getElementById('stl-part-list');
const canvas       = document.getElementById('stl-canvas');
const loadingEl    = document.getElementById('stl-loading');
const partNameEl   = document.getElementById('stl-part-name');

/* ── Three.js state ─────────────────────────────── */
let renderer, scene, camera, controls, currentMesh, animId;
let initialized = false;
let currentPartIdx = 0;

/* ── Build sidebar list ─────────────────────────── */
STL_PARTS.forEach((part, idx) => {
  const li = document.createElement('li');
  li.className = 'stl-part-list__item' + (part.badge ? ' stl-part-list__item--featured' : '');
  li.setAttribute('data-idx', idx);
  li.innerHTML = `
    <span class="stl-part-list__num">${String(idx + 1).padStart(2,'0')}</span>
    <div class="stl-part-list__text">
      <span class="stl-part-list__title">${part.name}</span>
      ${part.badge ? `<span class="stl-part-list__badge">${part.badge}</span>` : ''}
    </div>
  `;
  li.addEventListener('click', () => loadPart(idx));
  partList.appendChild(li);
});

/* ── Modal open / close ─────────────────────────── */
window.openStlModal = function () {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  if (!initialized) {
    initThree();
    initialized = true;
  }
  setTimeout(() => {
    resizeRenderer();
    loadPart(currentPartIdx || 0);
  }, 50);
  setTimeout(resizeRenderer, 360);
};

function closeStlModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeStlModal);
modal.addEventListener('click', e => { if (e.target === modal) closeStlModal(); });
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeStlModal();
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    loadPart((currentPartIdx + 1) % STL_PARTS.length);
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    loadPart((currentPartIdx - 1 + STL_PARTS.length) % STL_PARTS.length);
  }
});

/* Also allow Enter/Space on the spec card */
const mechCard = document.getElementById('spec-mechanical');
if (mechCard) {
  mechCard.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.openStlModal(); }
  });
}

/* ── Three.js init ──────────────────────────────── */
function initThree() {
  const wrap = canvas.parentElement;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x080808, 1);
  renderer.shadowMap.enabled = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, (wrap.clientWidth || 600) / (wrap.clientHeight || 400), 0.1, 5000);
  camera.position.set(100, 100, 150);

  /* Lights */
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(120, 200, 150);
  scene.add(dirLight);

  const cyanLight = new THREE.PointLight(0x00e5ff, 2.0, 800);
  cyanLight.position.set(-150, 120, 100);
  scene.add(cyanLight);

  const backLight = new THREE.DirectionalLight(0x00e5ff, 0.4);
  backLight.position.set(-100, -100, -100);
  scene.add(backLight);

  /* OrbitControls */
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.5;
  controls.minDistance   = 5;
  controls.maxDistance   = 2000;

  // Pause auto-rotation on user drag
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  resizeRenderer();
  window.addEventListener('resize', resizeRenderer);

  /* Render loop */
  function animate() {
    animId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

function resizeRenderer() {
  if (!renderer) return;
  const wrap = canvas.parentElement;
  const w = wrap.clientWidth || 600;
  const h = wrap.clientHeight || 400;
  renderer.setSize(w, h, false);
  if (camera) {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}

/* ── Load a part ────────────────────────────────── */
function loadPart(idx) {
  currentPartIdx = idx;
  const part = STL_PARTS[idx];
  if (!part) return;

  /* Highlight sidebar */
  partList.querySelectorAll('.stl-part-list__item').forEach((li, i) => {
    li.classList.toggle('active', i === idx);
  });

  /* Scroll sidebar item into view */
  const activeLi = partList.querySelector('.active');
  if (activeLi) activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  /* Update part name */
  partNameEl.textContent = part.name;

  /* Reset loading spinner UI */
  loadingEl.innerHTML = '<div class="stl-spinner"></div><span class="mono">Loading ' + part.name + '…</span>';
  loadingEl.classList.remove('hidden');

  /* Remove old mesh */
  if (currentMesh && scene) {
    scene.remove(currentMesh);
    if (currentMesh.geometry) currentMesh.geometry.dispose();
    if (currentMesh.material) currentMesh.material.dispose();
    currentMesh = null;
  }

  resizeRenderer();

  /* Load new STL */
  if (typeof THREE.STLLoader === 'undefined') {
    loadingEl.innerHTML = '<span class="mono" style="color:var(--red)">STLLoader not loaded</span>';
    return;
  }

  const loader = new THREE.STLLoader();
  const fileUrl = encodeURI(part.file);

  loader.load(
    fileUrl,
    (geometry) => {
      geometry.computeVertexNormals();
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0x00daf3,
        metalness: 0.3,
        roughness: 0.45,
        emissive: 0x002233,
        emissiveIntensity: 0.2,
      });

      currentMesh = new THREE.Mesh(geometry, material);
      currentMesh.castShadow    = true;
      currentMesh.receiveShadow = true;

      /* Auto-fit camera */
      const box    = new THREE.Box3().setFromObject(currentMesh);
      const size   = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 50;
      const fov    = camera.fov * (Math.PI / 180);
      let   dist   = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
      dist *= 1.8;

      camera.position.set(dist * 0.7, dist * 0.5, dist * 0.9);
      camera.lookAt(0, 0, 0);
      controls.target.set(0, 0, 0);
      controls.minDistance = maxDim * 0.2;
      controls.maxDistance = maxDim * 8;
      controls.autoRotate = true;
      controls.update();

      scene.add(currentMesh);
      loadingEl.classList.add('hidden');
    },
    (xhr) => {
      if (xhr.lengthComputable && xhr.total > 0) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        const span = loadingEl.querySelector('span');
        if (span) span.textContent = 'Loading ' + part.name + ' (' + percent + '%)…';
      }
    },
    (err) => {
      console.error('STL load error:', err);
      const isFileProtocol = window.location.protocol === 'file:';
      loadingEl.innerHTML = isFileProtocol
        ? '<div style="text-align:center;padding:16px"><span class="mono" style="color:var(--red);display:block;margin-bottom:8px">Browser blocked local file access (CORS)</span><span class="mono" style="font-size:11px;color:var(--muted)">Please open the site via local server:<br><strong style="color:var(--cyan)">http://localhost:8765</strong></span></div>'
        : '<span class="mono" style="color:var(--red)">Failed to load ' + part.name + '.stl</span>';
    }
  );
}
