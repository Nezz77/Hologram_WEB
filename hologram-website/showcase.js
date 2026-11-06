/* Continuous playback for the evaluation videos. */
(() => {
  const showcase = document.getElementById('showcase');
  const playback = document.getElementById('showcase-playback');
  const toggle = document.getElementById('showcase-loop');
  const hint = document.getElementById('showcase-playback-hint');
  if (!showcase || !playback || !toggle || !hint) return;

  const videos = [...showcase.querySelectorAll('video')];
  if (!videos.length) return;

  // Keep ordinary player controls usable when JavaScript is unavailable.
  toggle.checked = false;
  playback.hidden = false;

  toggle.addEventListener('change', () => {
    const enabled = toggle.checked;
    hint.textContent = enabled
      ? 'Loop is on. Videos start muted; use each player for sound or pause.'
      : 'Loop is off. Playing videos will stop at the end.';

    videos.forEach(video => {
      video.loop = enabled;
      if (!enabled) return;

      video.muted = true;
      if (video.ended) video.currentTime = 0;
      video.play().catch(() => {
        if (toggle.checked) {
          hint.textContent = 'Loop is on. Press Play on any paused video to start it.';
        }
      });
    });
  });
})();
