<script>
  import { onMount } from 'svelte';
  import { unlockGate } from '$lib/stores/gate.js';

  // Target answer sequence
  const TARGET_SEQUENCE = ['Kita', 'check', 'dulu.', 'Baru', 'kita', 'rawat.'];
  const TARGET_STR = TARGET_SEQUENCE.join(' ');
  const COOLDOWN_KEY = 'ss_gate_cooldown';

  // Master Pool of 12 tiles: 6 target words + 6 clinical distractors/decoys
  const MASTER_TILES = [
    // Target Words (6)
    { id: 1, text: 'Kita', isTarget: true },
    { id: 2, text: 'check', isTarget: true },
    { id: 3, text: 'dulu.', isTarget: true },
    { id: 4, text: 'Baru', isTarget: true },
    { id: 5, text: 'kita', isTarget: true },
    { id: 6, text: 'rawat.', isTarget: true },

    // Clinical & Commercial Decoy Words (6)
    { id: 7, text: 'terus', isTarget: false },
    { id: 8, text: 'ubat.', isTarget: false },
    { id: 9, text: 'sembuh.', isTarget: false },
    { id: 10, text: 'Beli', isTarget: false },
    { id: 11, text: 'cuba', isTarget: false },
    { id: 12, text: 'segera.', isTarget: false }
  ];

  // Helper: Fisher-Yates Shuffle
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Bilingual Dictionary (BM / EN)
  const I18N = {
    bm: {
      badge: 'Protokol Triage Klinikal • Akses Terhad',
      titleTag: 'Design System & Brand Standards',
      desc: 'Akses khusus untuk kakitangan dalaman dan rakan kerjasama klinikal berdaftar.<br>Sila sahkan pemahaman falsafah rawatan SuamiSihat™ untuk membuka pintu sistem.',
      consoleTitle: 'KONSOL PENGESAHAN PROTOKOL',
      statusIdle: 'MENUNGGU SUSUNAN',
      statusValidating: 'MEMERIKSA PROTOKOL...',
      statusError: (n) => `RALAT DIAGNOSIS (${n})`,
      statusWarning: (n) => `AMARAN: ${n}/3 RALAT`,
      statusLockout: (t) => `SISTEM DIGANTUNG (${t})`,
      statusSuccess: 'PROTOKOL DISAHKAN ✓',
      instruction: 'Susun 6 perkataan prinsip rawatan di bawah mengikut urutan klinikal yang betul (awas perkataan pengeliru):',
      phase1: 'FASA 1: DIAGNOSIS',
      phase2: 'FASA 2: PRESKRIPSI',
      poolPrompt: 'Pilih kad perkataan untuk mengisi slot rawatan:',
      btnHint: 'Perlukan Petunjuk?',
      btnHintClose: 'Tutup Petunjuk',
      btnReset: 'Susun Semula',
      hintText: 'Petunjuk Klinikal: Falsafah utama rawatan kesihatan lelaki SuamiSihat™ menetapkan bahawa saringan & diagnosis mesti didahulukan sebelum sebarang preskripsi atau rawatan dimulakan. Moto rasmi: "Kita check dulu. Baru kita rawat."',
      lockoutTitle: 'Protokol Keselamatan Aktif',
      lockoutDesc: (n) => `Sebanyak <strong>${n} percubaan tidak sah</strong> dikesan berturut-turut.<br>Sistem digantung sementara bagi menghalang sebarang tekaan semberono.`,
      cooldownCaption: 'TEMPOH BERTENANG KESELAMATAN',
      cooldownSub: 'Konsol akan dibuka semula secara automatik apabila pemasa tamat.',
      lockoutAdvice: 'Nasihat Perubatan: SuamiSihat™ berpegang pada rawatan berasaskan diagnosis saintifik. Luangkan masa ini untuk menghayati falsafah kami: <em>"Kita check dulu. Baru kita rawat."</em>',
      legalFooter: 'Pusat Garis Panduan Jenama & Reka Bentuk SuamiSihat™ • Pematuhan Piawaian Klinikal',
      sessionNote: 'Sesi tempatan disahkan selama 30 hari',
      successMessage: '<strong>Protokol Sah:</strong> "Kita check dulu. Baru kita rawat." Mengalihkan ke Design System...',
      diagErrors: {
        ubat: 'Ralat Protokol: SuamiSihat™ bukan penjual ubat lambak. Kami utamakan saringan & konsultasi klinikal berdaftar.',
        terus: 'Ralat Protokol: Tiada jalan pintas "terus rawat". Diagnosis teliti adalah mandatori sebelum sebarang tindakan.',
        beli: 'Ralat Protokol: Rawatan SuamiSihat™ berpaksikan preskripsi perubatan beretika, bukan sekadar urusan jual beli.',
        cuba: 'Ralat Protokol: Kesihatan lelaki bukan bahan uji kaji "cuba-cuba". Kita check dulu secara saintifik!',
        sembuh: 'Ralat Protokol: Kesembuhan bermula dengan diagnosis tepat: "Kita check dulu. Baru kita rawat."',
        segera: 'Ralat Protokol: Jangan terburu-buru rawat segera tanpa diagnosis menyeluruh.',
        prematureTreat: 'Ralat Protokol: SuamiSihat™ tidak merawat tanpa diagnosis teliti! Semak fasa pemeriksaan dahulu.',
        default: 'Ralat Protokol: Susunan prinsip rawatan tidak tepat. Hanya 6 perkataan benar membentuk falsafah SuamiSihat™.'
      }
    },
    en: {
      badge: 'Clinical Triage Protocol • Restricted Access',
      titleTag: 'Design System & Brand Standards',
      desc: 'Restricted access for internal personnel and authorized clinical partners.<br>Please verify comprehension of SuamiSihat™ core clinical philosophy to proceed.',
      consoleTitle: 'CLINICAL TRIAGE CONSOLE',
      statusIdle: 'AWAITING SEQUENCE',
      statusValidating: 'VALIDATING PROTOCOL...',
      statusError: (n) => `DIAGNOSTIC ERROR (${n})`,
      statusWarning: (n) => `WARNING: ${n}/3 ERRORS`,
      statusLockout: (t) => `SYSTEM SUSPENDED (${t})`,
      statusSuccess: 'PROTOCOL VERIFIED ✓',
      instruction: 'Assemble the 6 treatment principle words below in correct clinical order (watch out for decoy words):',
      phase1: 'PHASE 1: DIAGNOSIS',
      phase2: 'PHASE 2: PRESCRIPTION',
      poolPrompt: 'Select word tiles to fill the clinical workflow slots:',
      btnHint: 'Need a Clue?',
      btnHintClose: 'Close Clue',
      btnReset: 'Reset Sequence',
      hintText: 'Clinical Clue: SuamiSihat™ men\'s health standard mandates thorough screening & diagnosis before any treatment or prescription is administered. Official motto: "Kita check dulu. Baru kita rawat." (We diagnose first. Then we treat.)',
      lockoutTitle: 'Security Protocol Active',
      lockoutDesc: (n) => `A total of <strong>${n} invalid attempts</strong> were detected.<br>The console is temporarily suspended to prevent brute-force guessing.`,
      cooldownCaption: 'SECURITY COOLDOWN PERIOD',
      cooldownSub: 'The diagnostic console will unlock automatically once the timer expires.',
      lockoutAdvice: 'Clinical Notice: SuamiSihat™ adheres strictly to evidence-based healthcare. Take this moment to reflect on our core principle: <em>"Kita check dulu. Baru kita rawat."</em>',
      legalFooter: 'SuamiSihat™ Brand Guidelines & Design System Hub • Clinical Governance Standards',
      sessionNote: 'Local session authenticated for 30 days',
      successMessage: '<strong>Protocol Verified:</strong> "Kita check dulu. Baru kita rawat." Loading Design System...',
      diagErrors: {
        ubat: 'Protocol Error: SuamiSihat™ is not an OTC drug peddler. We mandate registered clinical screening and physician consultation.',
        terus: 'Protocol Error: There are no shortcuts to "immediate treatment". Thorough examination is mandatory prior to action.',
        beli: 'Protocol Error: SuamiSihat™ care is rooted in ethical medical prescriptions, not mere commercial retail.',
        cuba: 'Protocol Error: Men\'s health is never trial-and-error. We diagnose thoroughly and scientifically first!',
        sembuh: 'Protocol Error: True recovery begins with precise diagnosis: "Kita check dulu. Baru kita rawat."',
        segera: 'Protocol Error: Do not rush into immediate treatment without comprehensive screening.',
        prematureTreat: 'Protocol Error: SuamiSihat™ never treats without prior diagnostic testing! Review the screening phase first.',
        default: 'Protocol Error: Treatment principle sequence is incorrect. Only 6 true words define SuamiSihat™ philosophy.'
      }
    }
  };

  // State
  let currentLang = $state('bm');
  let t = $derived(I18N[currentLang]);

  let availableTiles = $state(shuffleArray(MASTER_TILES));
  let selectedTiles = $state([]);
  let status = $state('idle'); // 'idle' | 'validating' | 'error' | 'success' | 'lockout'
  let errorMessage = $state('');
  let showHint = $state(false);
  let isShaking = $state(false);

  // Security Lockout / Anti-Brute-Force Rate Limiting
  let failedAttempts = $state(0);
  let lockoutSeconds = $state(0);
  let countdownTimer = null;
  let isLockedOut = $derived(lockoutSeconds > 0);

  // Canvas Reference & Animation Frame ID
  let canvasEl = $state(null);
  let animationId = null;

  // Realistic Living Microscopic Sperm Particle
  class SpermMotilityParticle {
    constructor(w, h, randomPos = true) {
      this.w = w;
      this.h = h;
      this.reset(randomPos);
    }

    reset(randomPos = false) {
      this.depth = 0.35 + Math.random() * 0.65;
      this.speed = (0.75 + Math.random() * 1.3) * this.depth;
      this.angle = Math.random() * Math.PI * 2;
      this.wavePhase = Math.random() * Math.PI * 2;
      this.waveSpeed = 0.16 + Math.random() * 0.08;
      this.tailLength = (28 + Math.random() * 14) * this.depth;
      this.headLength = (5.5 + Math.random() * 1.5) * this.depth;
      this.headWidth = (3.2 + Math.random() * 0.8) * this.depth;
      this.alpha = (0.12 + Math.random() * 0.22) * this.depth;

      if (randomPos) {
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
      } else {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = -40; this.y = Math.random() * this.h; this.angle = (Math.random() - 0.5) * 1.2; }
        else if (edge === 1) { this.x = this.w + 40; this.y = Math.random() * this.h; this.angle = Math.PI + (Math.random() - 0.5) * 1.2; }
        else if (edge === 2) { this.x = Math.random() * this.w; this.y = -40; this.angle = Math.PI / 2 + (Math.random() - 0.5) * 1.2; }
        else { this.x = Math.random() * this.w; this.y = this.h + 40; this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2; }
      }
    }

    update(w, h) {
      this.w = w;
      this.h = h;
      this.wavePhase += this.waveSpeed;
      this.angle += (Math.random() - 0.5) * 0.035;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      if (this.x < -80 || this.x > this.w + 80 || this.y < -80 || this.y > this.h + 80) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // 1. Oval Cell Head (Natural acrosome morphology)
      ctx.beginPath();
      ctx.ellipse(0, 0, this.headLength, this.headWidth, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 242, 254, ${this.alpha * 1.4})`;
      ctx.shadowColor = 'rgba(109, 198, 236, 0.45)';
      ctx.shadowBlur = 6 * this.depth;
      ctx.fill();

      // 2. Acrosome Inner Core Glow
      ctx.beginPath();
      ctx.ellipse(this.headLength * 0.25, 0, this.headLength * 0.5, this.headWidth * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`;
      ctx.fill();

      // 3. Undulating Flagellum (Tail using sine wave segments)
      ctx.beginPath();
      ctx.moveTo(-this.headLength + 1, 0);

      const segments = 16;
      const segmentStep = this.tailLength / segments;
      for (let i = 1; i <= segments; i++) {
        const segX = -this.headLength - (i * segmentStep);
        const amplitude = (i / segments) * 4.2 * this.depth;
        const segY = Math.sin(this.wavePhase - (i * 0.48)) * amplitude;
        ctx.lineTo(segX, segY);
      }

      ctx.strokeStyle = `rgba(186, 230, 253, ${this.alpha * 0.95})`;
      ctx.lineWidth = Math.max(0.65, 1.35 * this.depth);
      ctx.shadowBlur = 4 * this.depth;
      ctx.stroke();

      ctx.restore();
    }
  }

  onMount(() => {
    availableTiles = shuffleArray(MASTER_TILES);
    checkPersistedLockout();

    // Initialize Canvas Motility
    let cleanupCanvas = initCanvasAnimation();

    return () => {
      if (countdownTimer) clearInterval(countdownTimer);
      if (cleanupCanvas) cleanupCanvas();
    };
  });

  function initCanvasAnimation() {
    if (!canvasEl) return null;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return null;

    let w = 0;
    let h = 0;
    const spermCells = [];
    const NUM_CELLS = 24;

    function resize() {
      if (!canvasEl) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvasEl.width = w * window.devicePixelRatio;
      canvasEl.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NUM_CELLS; i++) {
      spermCells.push(new SpermMotilityParticle(w, h, true));
    }

    function render() {
      ctx.clearRect(0, 0, w, h);

      // Deep fluid background gradient
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) * 0.8);
      grad.addColorStop(0, 'rgba(8, 22, 52, 0.45)');
      grad.addColorStop(1, 'rgba(4, 8, 19, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const cell of spermCells) {
        cell.update(w, h);
        cell.draw(ctx);
      }
      animationId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }

  function checkPersistedLockout() {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(COOLDOWN_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.failedAttempts) {
        failedAttempts = data.failedAttempts;
      }
      if (data.lockoutUntil && data.lockoutUntil > Date.now()) {
        const remaining = Math.ceil((data.lockoutUntil - Date.now()) / 1000);
        if (remaining > 0) {
          triggerLockout(remaining);
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  function triggerLockout(durationSec) {
    status = 'lockout';
    lockoutSeconds = durationSec;
    playAudioCue('lockout');

    if (countdownTimer) clearInterval(countdownTimer);

    countdownTimer = setInterval(() => {
      lockoutSeconds -= 1;
      if (lockoutSeconds <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        status = 'idle';
        errorMessage = '';
        handleReset();
        saveLockoutState(0);
      }
    }, 1000);
  }

  function saveLockoutState(lockoutUntil = 0) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(COOLDOWN_KEY, JSON.stringify({
        failedAttempts,
        lockoutUntil
      }));
    } catch (e) {
      // Ignore
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s < 10 ? '0' : ''}${s}s` : `${s}s`;
  }

  // Play subtle medical console audio cues via Web Audio API
  function playAudioCue(type) {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'success') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.09);
          osc.stop(ctx.currentTime + i * 0.09 + 0.25);
        });
      } else if (type === 'error') {
        [220, 185].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.16);
        });
      } else if (type === 'lockout') {
        [150, 120, 95].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.18);
          osc.stop(ctx.currentTime + i * 0.18 + 0.22);
        });
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  function handleSelectTile(tile) {
    if (isLockedOut || status === 'success' || status === 'validating') return;
    if (selectedTiles.length >= 6) return;

    playAudioCue('click');
    selectedTiles = [...selectedTiles, tile];
    availableTiles = availableTiles.filter(t => t.id !== tile.id);

    // If all 6 words selected, evaluate immediately
    if (selectedTiles.length === 6) {
      evaluateSequence();
    }
  }

  function handleRemoveTile(index) {
    if (isLockedOut || status === 'success' || status === 'validating') return;

    playAudioCue('click');
    const removed = selectedTiles[index];
    selectedTiles = selectedTiles.filter((_, i) => i !== index);
    availableTiles = [...availableTiles, removed];

    status = 'idle';
    errorMessage = '';
    isShaking = false;
  }

  function evaluateSequence() {
    status = 'validating';
    const assembledText = selectedTiles.map(t => t.text).join(' ');

    if (assembledText === TARGET_STR) {
      // SUCCESS!
      status = 'success';
      playAudioCue('success');
      failedAttempts = 0;
      if (typeof window !== 'undefined') {
        try { localStorage.removeItem(COOLDOWN_KEY); } catch (e) {}
      }

      setTimeout(() => {
        unlockGate();
      }, 900);
    } else {
      // ERROR
      status = 'error';
      playAudioCue('error');
      isShaking = true;
      failedAttempts += 1;

      // Smart Contextual Diagnostics
      const errs = t.diagErrors;
      if (assembledText.includes('ubat')) {
        errorMessage = errs.ubat;
      } else if (assembledText.includes('terus')) {
        errorMessage = errs.terus;
      } else if (assembledText.includes('Beli')) {
        errorMessage = errs.beli;
      } else if (assembledText.includes('cuba')) {
        errorMessage = errs.cuba;
      } else if (assembledText.includes('sembuh')) {
        errorMessage = errs.sembuh;
      } else if (assembledText.includes('segera')) {
        errorMessage = errs.segera;
      } else if (assembledText.startsWith('rawat') || (assembledText.includes('rawat') && !assembledText.startsWith('Kita check'))) {
        errorMessage = errs.prematureTreat;
      } else {
        errorMessage = errs.default;
      }

      // Check for progressive lockout thresholds
      let lockoutDuration = 0;
      if (failedAttempts === 3) {
        lockoutDuration = 30; // 30s cooldown
      } else if (failedAttempts === 4) {
        lockoutDuration = 60; // 1 min cooldown
      } else if (failedAttempts >= 5) {
        lockoutDuration = 180; // 3 min cooldown
      }

      if (lockoutDuration > 0) {
        const lockoutUntil = Date.now() + lockoutDuration * 1000;
        saveLockoutState(lockoutUntil);

        setTimeout(() => {
          isShaking = false;
          triggerLockout(lockoutDuration);
        }, 800);
      } else {
        saveLockoutState(0);

        setTimeout(() => {
          isShaking = false;
        }, 500);

        // Auto-reset after 2.2 seconds on error
        setTimeout(() => {
          if (status === 'error' && !isLockedOut) {
            handleReset();
          }
        }, 2200);
      }
    }
  }

  function handleReset() {
    selectedTiles = [];
    availableTiles = shuffleArray(MASTER_TILES);
    status = isLockedOut ? 'lockout' : 'idle';
    errorMessage = '';
    isShaking = false;
  }

  function toggleHint() {
    showHint = !showHint;
  }
</script>

<div class="ss-gate-overlay">
  <!-- Living Microscopic Sperm Fluid Canvas -->
  <canvas bind:this={canvasEl} class="ss-microscope-canvas" aria-hidden="true"></canvas>
  <div class="ss-viewport-vignette" aria-hidden="true"></div>

  <!-- Main Gate Container -->
  <div class="ss-portal-shell">
    <!-- Top Bar: Compliance Pill & Dual Language Toggle -->
    <div class="ss-top-toolbar">
      <div class="ss-clinic-badge">
        <span class="ss-pulse-dot"></span>
        <span>{t.badge}</span>
      </div>

      <div class="ss-lang-switcher" aria-label="Language selector">
        <button 
          type="button" 
          class="ss-lang-btn" 
          class:active={currentLang === 'bm'} 
          onclick={() => currentLang = 'bm'}
        >
          BM
        </button>
        <button 
          type="button" 
          class="ss-lang-btn" 
          class:active={currentLang === 'en'} 
          onclick={() => currentLang = 'en'}
        >
          EN
        </button>
      </div>
    </div>

    <!-- Official SuamiSihat Vector Logo & Header -->
    <header class="ss-portal-header">
      <div class="ss-logo-container" title="SuamiSihat™ Official Vector Logo">
        <svg viewBox="0 0 1574 416" version="1.1" xmlns="http://www.w3.org/2000/svg" aria-label="SuamiSihat Logo">
          <g>
            <!-- Wordmark: SuamiSihat in Crisp Pure White -->
            <path d="M526.886,270.833c-27.864,0 -49.638,-13.84 -50.559,-40.042l33.582,0c0.923,9.963 7.197,14.762 16.054,14.762c9.225,0 15.13,-4.614 15.13,-12.178c0,-23.989 -64.766,-11.072 -64.398,-57.018c0,-24.542 20.112,-38.196 47.239,-38.196c28.23,0 47.237,14.023 48.529,38.749l-34.137,0c-0.555,-8.303 -6.458,-13.285 -14.947,-13.47c-7.565,-0.185 -13.285,3.69 -13.285,11.81c0,22.512 64.029,12.362 64.029,55.724c0,21.774 -16.975,39.858 -47.237,39.858Zm163.664,-1.292l-31.554,0l0,-14.024c-6.273,8.857 -17.343,15.132 -31.182,15.132c-23.802,0 -39.858,-16.422 -39.858,-43.916l0,-60.154l31.369,0l0,55.909c0,14.024 7.935,21.774 19.744,21.774c12.179,0 19.927,-7.75 19.927,-21.774l0,-55.909l31.554,0l0,102.963Zm57.199,-104.44c15.315,0 26.202,7.012 31.737,16.054l0,-14.577l31.554,0l0,102.963l-31.554,0l0,-14.577c-5.72,9.04 -16.607,16.054 -31.922,16.054c-25.095,0 -45.207,-20.669 -45.207,-53.143c0,-32.477 20.112,-52.774 45.392,-52.774Zm9.225,27.494c-11.81,0 -22.512,8.857 -22.512,25.279c0,16.422 10.702,25.649 22.512,25.649c11.995,0 22.512,-9.042 22.512,-25.464c0,-16.424 -10.517,-25.464 -22.512,-25.464Zm214.224,21.036c0,-13.47 -7.75,-20.852 -19.744,-20.852c-11.993,0 -19.743,7.382 -19.743,20.852l0,55.909l-31.369,0l0,-55.909c0,-13.47 -7.75,-20.852 -19.744,-20.852c-11.995,0 -19.744,7.382 -19.744,20.852l0,55.909l-31.552,0l0,-102.963l31.552,0l0,12.917c6.09,-8.304 16.607,-14.024 30.077,-14.024c15.5,0 28.047,6.827 35.059,19.192c6.827,-10.889 19.744,-19.192 34.691,-19.192c25.463,0 41.887,16.237 41.887,43.916l0,60.154l-31.369,0l0,-55.909Zm48.892,-47.053l31.554,0l0,102.963l-31.554,0l0,-102.963Zm-2.954,-27.679c0,-9.595 7.567,-17.16 18.822,-17.16c11.072,0 18.637,7.565 18.637,17.16c0,9.41 -7.565,16.975 -18.637,16.975c-11.255,0 -18.822,-7.565 -18.822,-16.975Zm99.641,131.934c-27.864,0 -49.638,-13.84 -50.559,-40.042l33.582,0c0.923,9.963 7.197,14.762 16.054,14.762c9.225,0 15.13,-4.614 15.13,-12.178c0,-23.989 -64.766,-11.072 -64.398,-57.018c0,-24.542 20.112,-38.196 47.239,-38.196c28.23,0 47.237,14.023 48.529,38.749l-34.137,0c-0.555,-8.303 -6.458,-13.285 -14.947,-13.47c-7.565,-0.185 -13.285,3.69 -13.285,11.81c0,22.512 64.029,12.362 64.029,55.724c0,21.774 -16.975,39.858 -47.237,39.858Zm61.994,-104.254l31.554,0l0,102.963l-31.554,0l0,-102.963Zm-2.952,-27.679c0,-9.595 7.565,-17.16 18.822,-17.16c11.072,0 18.635,7.565 18.635,17.16c0,9.41 -7.563,16.975 -18.635,16.975c-11.257,0 -18.822,-7.565 -18.822,-16.975Zm52.772,-5.904l31.554,0l0,47.422c6.273,-8.857 17.53,-14.947 31.737,-14.947c23.434,0 39.119,16.237 39.119,43.916l0,60.154l-31.369,0l0,-55.909c0,-14.024 -7.75,-21.772 -19.744,-21.772c-11.993,0 -19.743,7.748 -19.743,21.772l0,55.909l-31.554,0l0,-136.545Zm158.869,32.106c15.315,0 26.202,7.012 31.737,16.054l0,-14.577l31.554,0l0,102.963l-31.554,0l0,-14.577c-5.72,9.04 -16.607,16.054 -31.922,16.054c-25.095,0 -45.207,-20.669 -45.207,-53.143c0,-32.477 20.112,-52.774 45.392,-52.774Zm9.225,27.494c-11.81,0 -22.512,8.857 -22.512,25.279c0,16.422 10.702,25.649 22.512,25.649c11.995,0 22.512,-9.042 22.512,-25.464c0,-16.424 -10.517,-25.464 -22.512,-25.464Zm77.308,0.185l-12.547,0l0,-26.202l12.547,0l0,-25.095l31.554,0l0,25.095l20.667,0l0,26.202l-20.667,0l0,41.334c0,6.088 2.583,8.671 9.595,8.671l11.255,0l0,26.757l-16.052,0c-21.405,0 -36.351,-9.042 -36.351,-35.797l0,-40.964Z" fill="#FFFFFF"/>
            <!-- Logomark in SuamiSihat Medical Cyan #6DC6EC -->
            <path d="M202.379,278.213c-0.214,-0.189 -0.428,-0.405 -0.631,-0.606l-26.461,-26.461l21.408,-21.408l26.461,26.461c5.91,5.911 15.497,5.911 21.406,0c5.697,-5.695 5.9,-14.818 0.606,-20.775c-0.189,-0.214 -0.404,-0.428 -0.606,-0.631l-42.814,-42.814c-0.201,-0.201 -0.415,-0.415 -0.606,-0.629c-5.292,-5.959 -5.089,-15.08 0.606,-20.777c5.911,-5.911 15.497,-5.911 21.408,0l42.814,42.814c0.201,0.201 0.415,0.415 0.606,0.629c4.649,4.817 8.015,10.419 10.121,16.353c3.437,9.763 3.437,20.467 -0.013,30.243l-0.012,0.012c-0.511,1.511 -1.129,2.984 -1.83,4.448c-2.046,4.28 -4.793,8.312 -8.266,11.903c-0.191,0.214 -0.405,0.428 -0.606,0.631c-0.203,0.201 -0.417,0.417 -0.631,0.606c-3.592,3.473 -7.623,6.219 -11.905,8.266l-0.012,0.012c-1.463,0.702 -2.926,1.308 -4.437,1.821l-0.012,0.012c-9.775,3.448 -20.479,3.448 -30.243,0.012c-5.934,-2.106 -11.534,-5.471 -16.352,-10.121Zm-5.043,-139.763l-0.012,0.012c-1.511,0.512 -2.985,1.13 -4.448,1.832c2.046,-4.282 4.793,-8.313 8.266,-11.905c0.189,-0.214 0.404,-0.428 0.606,-0.629c0.203,-0.203 0.417,-0.417 0.631,-0.608c3.592,-3.471 7.623,-6.219 11.903,-8.266c1.463,-0.7 2.938,-1.32 4.448,-1.83l0.013,-0.012c9.775,-3.45 20.479,-3.45 30.242,-0.013c5.934,2.106 11.536,5.471 16.353,10.121c0.214,0.191 0.427,0.405 0.629,0.608l16.353,16.352l-21.408,21.408l-16.352,-16.353c-0.203,-0.203 -0.417,-0.417 -0.631,-0.606c-4.816,-4.651 -10.417,-8.017 -16.352,-10.121c-9.765,-3.437 -20.467,-3.437 -30.243,0.012Zm159.834,84.786l-0.03,-0.018l-47.295,0c-7.14,-16.876 -19.615,-28.375 -19.615,-28.375l-2.018,-2.017l65.734,0l0,-0.053l33.863,0c0.451,5.068 0.695,10.205 0.695,15.394c0,93.918 -76.423,170.342 -170.342,170.342c-46.989,0 -89.574,-19.134 -120.387,-50.017l21.436,-21.436c25.312,25.312 60.266,40.982 98.891,40.982c72.062,0 131.398,-54.497 139.039,-124.526l0.03,-0.277Z" fill="#FFFFFF"/>
            <path d="M248.975,288.322l0.012,-0.012c1.511,-0.512 2.974,-1.119 4.437,-1.821c-2.035,4.27 -4.781,8.302 -8.254,11.893c-0.189,0.214 -0.404,0.428 -0.606,0.631c-0.203,0.201 -0.417,0.415 -0.631,0.606c-3.592,3.473 -7.623,6.219 -11.903,8.264c-1.463,0.703 -2.938,1.321 -4.448,1.832l-0.012,0.012c-9.776,3.45 -20.48,3.45 -30.243,0.013c-5.934,-2.106 -11.536,-5.471 -16.353,-10.121c-0.214,-0.191 -0.428,-0.405 -0.629,-0.606l-26.461,-26.462l21.406,-21.406l26.461,26.461c0.203,0.203 0.417,0.417 0.631,0.606c4.816,4.651 10.417,8.015 16.352,10.121c9.765,3.437 20.467,3.437 30.243,-0.012Zm-30.872,-220.025c-72.062,0 -131.398,54.497 -139.039,124.528l0.008,0.015l89.457,0c-2.295,-8.763 -1.936,-18.08 1.097,-26.68l0.013,-0.012c0.511,-1.511 1.129,-2.985 1.83,-4.448c2.046,-4.28 4.793,-8.312 8.266,-11.903c0.191,-0.214 0.405,-0.428 0.606,-0.631c0.203,-0.203 0.417,-0.417 0.631,-0.606c3.592,-3.473 7.623,-6.221 11.892,-8.254l0.013,-0.012c1.461,-0.702 2.938,-1.32 4.447,-1.832l0.013,-0.012c9.775,-3.448 20.479,-3.448 30.242,-0.012c5.934,2.104 11.536,5.47 16.353,10.121c0.214,0.189 0.428,0.404 0.629,0.606l16.353,16.352l-21.406,21.408l-16.353,-16.353c-5.911,-5.91 -15.495,-5.91 -21.406,0c-5.697,5.697 -5.9,14.819 -0.608,20.777c0.191,0.214 0.405,0.428 0.608,0.631l42.812,42.814c0.203,0.201 0.417,0.415 0.606,0.629c5.293,5.957 5.091,15.08 -0.606,20.777c-5.91,5.911 -15.495,5.911 -21.406,0l-32.977,-32.977l-141.751,0c-0.437,-4.961 -0.674,-9.979 -0.674,-15.053c0,-49.295 21.07,-93.745 54.65,-124.88l-0.018,-0.02c0.185,-0.171 0.382,-0.333 0.568,-0.504c0.995,-0.914 2.02,-1.797 3.035,-2.689c0.977,-0.855 1.947,-1.717 2.944,-2.549c1.064,-0.891 2.153,-1.753 3.241,-2.62c0.987,-0.786 1.97,-1.575 2.975,-2.339c1.124,-0.855 2.269,-1.684 3.415,-2.512c1.008,-0.728 2.017,-1.456 3.041,-2.163c1.171,-0.809 2.359,-1.592 3.55,-2.371c1.038,-0.679 2.079,-1.354 3.134,-2.012c1.211,-0.755 2.435,-1.488 3.667,-2.213c1.071,-0.631 2.147,-1.254 3.232,-1.862c1.246,-0.697 2.501,-1.376 3.765,-2.043c1.11,-0.585 2.227,-1.158 3.353,-1.718c1.269,-0.634 2.544,-1.254 3.83,-1.855c1.157,-0.542 2.321,-1.066 3.493,-1.582c1.285,-0.568 2.573,-1.125 3.877,-1.661c1.206,-0.498 2.423,-0.97 3.643,-1.44c1.295,-0.498 2.592,-0.992 3.901,-1.458c1.264,-0.451 2.539,-0.873 3.817,-1.295c1.293,-0.427 2.587,-0.855 3.893,-1.252c1.33,-0.404 2.674,-0.771 4.018,-1.143c1.28,-0.354 2.559,-0.715 3.852,-1.04c1.407,-0.354 2.83,-0.667 4.252,-0.985c1.255,-0.28 2.506,-0.575 3.771,-0.829c1.507,-0.301 3.03,-0.554 4.552,-0.814c1.203,-0.208 2.4,-0.435 3.611,-0.616c1.651,-0.245 3.318,-0.435 4.982,-0.634c1.107,-0.132 2.206,-0.292 3.32,-0.402c1.908,-0.189 3.834,-0.313 5.758,-0.44c0.891,-0.058 1.776,-0.148 2.671,-0.193c2.832,-0.142 5.682,-0.217 8.549,-0.217c2.783,0 5.549,0.068 8.299,0.199c0.86,0.041 1.708,0.13 2.564,0.185c1.881,0.12 3.763,0.229 5.626,0.409c1.041,0.1 2.066,0.254 3.101,0.372c1.664,0.191 3.333,0.364 4.98,0.603c1.092,0.16 2.168,0.371 3.254,0.55c1.57,0.259 3.15,0.498 4.707,0.801c1.127,0.219 2.236,0.491 3.356,0.731c1.493,0.321 2.995,0.623 4.473,0.984c1.14,0.277 2.259,0.606 3.389,0.908c1.438,0.382 2.883,0.745 4.305,1.163c1.152,0.339 2.282,0.73 3.424,1.092c1.376,0.437 2.758,0.852 4.117,1.323c1.176,0.409 2.331,0.865 3.498,1.298c1.297,0.481 2.603,0.942 3.885,1.453c1.211,0.484 2.394,1.017 3.592,1.527c1.206,0.514 2.425,1.008 3.62,1.55c1.244,0.565 2.46,1.178 3.689,1.773c1.117,0.539 2.246,1.058 3.348,1.621c1.28,0.654 2.531,1.356 3.793,2.041c1.017,0.554 2.048,1.084 3.053,1.657c1.316,0.75 2.601,1.547 3.895,2.331c0.919,0.557 1.853,1.092 2.76,1.666c1.348,0.852 2.661,1.748 3.982,2.636c0.822,0.552 1.657,1.082 2.468,1.648c1.374,0.959 2.715,1.962 4.059,2.961c0.723,0.537 1.461,1.054 2.176,1.601c1.394,1.068 2.751,2.181 4.111,3.29c0.633,0.517 1.282,1.015 1.906,1.542c1.402,1.176 2.765,2.397 4.129,3.62c0.483,0.433 0.985,0.845 1.465,1.285l-0.02,0.02c0,0 2.082,1.855 5.368,5.144l-21.474,21.474c-25.312,-25.311 -60.265,-40.98 -98.889,-40.98Z" fill="#6DC6EC"/>
          </g>
        </svg>
      </div>

      <div class="ss-portal-title-tag">
        <span>{t.titleTag}</span>
      </div>

      <p class="ss-portal-desc">
        {@html t.desc}
      </p>
    </header>

    <!-- Main Diagnostic Console Card -->
    <div 
      class="ss-console-card" 
      class:shake={isShaking} 
      class:success={status === 'success'} 
      class:lockout={isLockedOut}
    >
      <div class="ss-console-topbar">
        <div class="ss-console-title">
          <span style="color: var(--color-brand-cyan, #6DC6EC);">✚</span>
          <span>{t.consoleTitle}</span>
        </div>
        <div class="ss-status-badge">
          {#if isLockedOut}
            <span class="ss-status-dot lockout"></span>
            <span class="text-crimson">{t.statusLockout(formatTime(lockoutSeconds))}</span>
          {:else if status === 'idle'}
            {#if failedAttempts > 0}
              <span class="ss-status-dot warning"></span>
              <span class="text-amber">{t.statusWarning(failedAttempts)}</span>
            {:else}
              <span class="ss-status-dot"></span>
              <span>{t.statusIdle}</span>
            {/if}
          {:else if status === 'validating'}
            <span class="ss-status-dot pulse"></span>
            <span>{t.statusValidating}</span>
          {:else if status === 'error'}
            <span class="ss-status-dot error"></span>
            <span class="text-crimson">{t.statusError(failedAttempts)}</span>
          {:else if status === 'success'}
            <span class="ss-status-dot success"></span>
            <span class="text-emerald">{t.statusSuccess}</span>
          {/if}
        </div>
      </div>

      <div class="ss-console-body">
        {#if isLockedOut}
          <!-- Security Lockout / Anti-Brute-Force Screen -->
          <div class="ss-lockout-view">
            <div class="ss-lockout-badge-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 class="ss-lockout-title">{t.lockoutTitle}</h3>
            <p class="ss-lockout-message">
              {@html t.lockoutDesc(failedAttempts)}
            </p>

            <div class="ss-cooldown-timer-panel">
              <div class="ss-timer-caption">{t.cooldownCaption}</div>
              <div class="ss-timer-digits">{formatTime(lockoutSeconds)}</div>
              <div class="ss-timer-instruction">{t.cooldownSub}</div>
            </div>

            <div class="ss-lockout-clinical-quote">
              {@html t.lockoutAdvice}
            </div>
          </div>
        {:else}
          <!-- Sentence Assembly Workflow -->
          <p class="ss-instruction">
            {t.instruction}
          </p>

          <!-- Sentence Assembly Slots -->
          <div class="ss-slots-container">
            <!-- Phase 1: Diagnosis -->
            <div class="ss-phase-column">
              <span class="ss-phase-label">{t.phase1}</span>
              <div class="ss-phase-slots">
                {#each [0, 1, 2] as idx}
                  <div class="ss-slot-box">
                    {#if selectedTiles[idx]}
                      <button 
                        type="button" 
                        class="ss-tile ss-tile-slotted"
                        onclick={() => handleRemoveTile(idx)}
                        title="Klik untuk buang"
                      >
                        <span>{selectedTiles[idx].text}</span>
                        <span class="ss-tile-remove-icon">×</span>
                      </button>
                    {:else}
                      <div class="ss-slot-empty">{idx + 1}</div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>

            <div class="ss-phase-arrow" aria-hidden="true">→</div>

            <!-- Phase 2: Prescription -->
            <div class="ss-phase-column">
              <span class="ss-phase-label">{t.phase2}</span>
              <div class="ss-phase-slots">
                {#each [3, 4, 5] as idx}
                  <div class="ss-slot-box">
                    {#if selectedTiles[idx]}
                      <button 
                        type="button" 
                        class="ss-tile ss-tile-slotted"
                        onclick={() => handleRemoveTile(idx)}
                        title="Klik untuk buang"
                      >
                        <span>{selectedTiles[idx].text}</span>
                        <span class="ss-tile-remove-icon">×</span>
                      </button>
                    {:else}
                      <div class="ss-slot-empty">{idx + 1}</div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Diagnostic Feedback Alert Banner -->
          {#if status === 'error'}
            <div class="ss-feedback-banner banner-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>{errorMessage}</span>
            </div>
          {:else if status === 'success'}
            <div class="ss-feedback-banner banner-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{@html t.successMessage}</span>
            </div>
          {/if}

          <!-- Word Pool Grid -->
          <div class="ss-pool-wrapper">
            <div class="ss-pool-prompt">{t.poolPrompt}</div>
            <div class="ss-tiles-grid">
              {#each availableTiles as tile (tile.id)}
                <button 
                  type="button" 
                  class="ss-tile ss-tile-option"
                  onclick={() => handleSelectTile(tile)}
                  disabled={status === 'success' || status === 'validating'}
                >
                  <span>{tile.text}</span>
                </button>
              {/each}
            </div>
          </div>

          <!-- Console Footer Toolbar -->
          <div class="ss-console-actions">
            <button type="button" class="ss-action-btn" onclick={toggleHint}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <span>{showHint ? t.btnHintClose : t.btnHint}</span>
            </button>

            <button 
              type="button" 
              class="ss-action-btn" 
              onclick={handleReset}
              disabled={selectedTiles.length === 0 || status === 'success'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              <span>{t.btnReset}</span>
            </button>
          </div>

          <!-- Clinical Clue Box -->
          {#if showHint}
            <div class="ss-hint-container">
              <span>{t.hintText}</span>
            </div>
          {/if}
        {/if}
      </div>
    </div>

    <!-- Official Corporate Footer -->
    <footer class="ss-portal-footer">
      <span>{t.legalFooter}</span>
      <span class="ss-footer-sep">•</span>
      <span>{t.sessionNote}</span>
    </footer>
  </div>
</div>

<style>
  :root {
    --bg-base: #040813;
    --surface-card: rgba(8, 17, 34, 0.88);
    --surface-card-border: rgba(109, 198, 236, 0.22);
    --color-brand-navy: #022057;
    --color-brand-cyan: #6DC6EC;
    --color-emerald: #10B981;
    --color-crimson: #EF4444;
    --color-amber: #F59E0B;
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-muted: #64748B;
  }

  .ss-gate-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background-color: var(--bg-base);
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.25rem;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  /* Living Microscope Fluid Field (Canvas) */
  .ss-microscope-canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
  }

  /* Soft Vignette Overlay */
  .ss-viewport-vignette {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, transparent 40%, rgba(4, 8, 19, 0.85) 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Main Container */
  .ss-portal-shell {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 680px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  /* Top Navigation: Language Toggle & Clinic Badge */
  .ss-top-toolbar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .ss-clinic-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.85rem;
    background: rgba(2, 32, 87, 0.5);
    border: 1px solid rgba(109, 198, 236, 0.25);
    border-radius: 9999px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #BAE6FD;
    letter-spacing: 0.03em;
  }

  .ss-pulse-dot {
    width: 6px;
    height: 6px;
    background-color: var(--color-brand-cyan);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--color-brand-cyan);
    animation: ss-pulse-ring 2.5s infinite;
  }

  @keyframes ss-pulse-ring {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(109, 198, 236, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(109, 198, 236, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(109, 198, 236, 0); }
  }

  /* Bilingual Toggle Switch */
  .ss-lang-switcher {
    display: inline-flex;
    background: rgba(8, 17, 34, 0.8);
    border: 1px solid rgba(109, 198, 236, 0.25);
    border-radius: 8px;
    padding: 2px;
    gap: 2px;
  }

  .ss-lang-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: inherit;
    font-size: 0.725rem;
    font-weight: 700;
    padding: 0.28rem 0.65rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .ss-lang-btn.active {
    background: #022057;
    color: #FFFFFF;
    border: 1px solid rgba(109, 198, 236, 0.4);
    box-shadow: 0 2px 8px rgba(2, 32, 87, 0.6);
  }

  .ss-lang-btn:hover:not(.active) {
    color: #E2E8F0;
  }

  /* Header & Official Logo */
  .ss-portal-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
  }

  .ss-logo-container {
    width: 220px;
    max-width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5));
  }

  .ss-logo-container svg {
    width: 100%;
    height: auto;
  }

  .ss-portal-title-tag {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-brand-cyan);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .ss-portal-desc {
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--text-secondary);
    max-width: 520px;
  }

  /* Diagnostic Console Card */
  .ss-console-card {
    width: 100%;
    background: var(--surface-card);
    border: 1px solid var(--surface-card-border);
    border-radius: 16px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 
      0 24px 60px -12px rgba(0, 0, 0, 0.75),
      0 0 0 1px rgba(255, 255, 255, 0.03);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .ss-console-card.success {
    border-color: rgba(16, 185, 129, 0.65);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(16, 185, 129, 0.2);
  }

  .ss-console-card.lockout {
    border-color: rgba(239, 68, 68, 0.65);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(239, 68, 68, 0.2);
  }

  .ss-console-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.25rem;
    background: rgba(4, 9, 20, 0.7);
    border-bottom: 1px solid rgba(109, 198, 236, 0.15);
    font-size: 0.75rem;
    font-weight: 600;
  }

  .ss-console-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
  }

  .ss-status-badge {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--text-secondary);
  }

  .ss-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #475569;
  }

  .ss-status-dot.pulse {
    background: var(--color-brand-cyan);
    box-shadow: 0 0 8px var(--color-brand-cyan);
    animation: ss-pulse-ring 1s infinite;
  }

  .ss-status-dot.error {
    background: var(--color-crimson);
    box-shadow: 0 0 8px var(--color-crimson);
  }

  .ss-status-dot.warning {
    background: var(--color-amber);
    box-shadow: 0 0 8px var(--color-amber);
  }

  .ss-status-dot.lockout {
    background: var(--color-crimson);
    box-shadow: 0 0 8px var(--color-crimson);
    animation: ss-pulse-ring 0.8s infinite;
  }

  .ss-status-dot.success {
    background: var(--color-emerald);
    box-shadow: 0 0 8px var(--color-emerald);
  }

  .text-crimson { color: var(--color-crimson); }
  .text-amber { color: var(--color-amber); }
  .text-emerald { color: var(--color-emerald); }

  /* Console Body */
  .ss-console-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .ss-instruction {
    font-size: 0.875rem;
    color: #CBD5E1;
    text-align: center;
    line-height: 1.5;
  }

  /* Clinical Triage Slots */
  .ss-slots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    background: rgba(3, 7, 16, 0.7);
    border: 1px solid rgba(109, 198, 236, 0.16);
    border-radius: 12px;
    padding: 1.25rem 1rem;
    flex-wrap: wrap;
  }

  .ss-phase-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
  }

  .ss-phase-label {
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #38BDF8;
    text-transform: uppercase;
  }

  .ss-phase-slots {
    display: flex;
    gap: 0.45rem;
  }

  .ss-phase-arrow {
    color: #475569;
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    padding: 0 0.25rem;
  }

  .ss-slot-box {
    width: 74px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ss-slot-empty {
    width: 100%;
    height: 100%;
    border: 1.5px dashed rgba(109, 198, 236, 0.25);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(2, 6, 23, 0.35);
    color: #475569;
    font-size: 0.75rem;
    font-weight: 700;
  }

  /* Word Tiles */
  .ss-tile {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .ss-tile-slotted {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #022057 0%, #063C96 100%);
    border: 1px solid rgba(109, 198, 236, 0.4);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(2, 32, 87, 0.4);
    padding: 0.4rem 0.5rem;
    gap: 0.35rem;
  }

  .ss-tile-slotted:hover {
    background: linear-gradient(135deg, #043388 0%, #0A50C4 100%);
    border-color: var(--color-brand-cyan);
    transform: translateY(-1px);
  }

  .ss-tile-remove-icon {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1;
  }

  /* Word Pool Grid */
  .ss-pool-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .ss-pool-prompt {
    font-size: 0.785rem;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
  }

  .ss-tiles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.65rem;
  }

  .ss-tile-option {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(109, 198, 236, 0.2);
    color: #E2E8F0;
    padding: 0.75rem 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  .ss-tile-option:hover:not(:disabled) {
    background: rgba(2, 32, 87, 0.85);
    border-color: rgba(109, 198, 236, 0.6);
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(2, 32, 87, 0.5);
  }

  .ss-tile-option:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Diagnostic Feedback Banner */
  .ss-feedback-banner {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.45;
    animation: ss-fade-slide 0.25s ease-out;
  }

  .banner-error {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #FCA5A5;
  }

  .banner-success {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.35);
    color: #6EE7B7;
  }

  @keyframes ss-fade-slide {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Toolbar Actions */
  .ss-console-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .ss-action-btn {
    background: transparent;
    border: 1px solid rgba(109, 198, 236, 0.18);
    color: var(--text-secondary);
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.45rem 0.85rem;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition: all 0.15s ease;
  }

  .ss-action-btn:hover:not(:disabled) {
    background: rgba(2, 32, 87, 0.4);
    color: #FFFFFF;
    border-color: rgba(109, 198, 236, 0.4);
  }

  .ss-action-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* Hint Box */
  .ss-hint-container {
    padding: 0.85rem 1rem;
    background: rgba(2, 32, 87, 0.35);
    border-left: 3px solid var(--color-brand-cyan);
    border-radius: 4px;
    font-size: 0.785rem;
    line-height: 1.5;
    color: #BAE6FD;
  }

  /* Lockout Mode View */
  .ss-lockout-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 0.5rem;
    gap: 1.15rem;
  }

  .ss-lockout-badge-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: var(--color-crimson);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 24px rgba(239, 68, 68, 0.25);
  }

  .ss-lockout-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
  }

  .ss-lockout-message {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
    max-width: 480px;
  }

  .ss-cooldown-timer-panel {
    background: rgba(4, 9, 20, 0.85);
    border: 1px solid rgba(239, 68, 68, 0.35);
    border-radius: 12px;
    padding: 1.25rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    box-shadow: inset 0 0 20px rgba(239, 68, 68, 0.1);
  }

  .ss-timer-caption {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #F87171;
  }

  .ss-timer-digits {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2.25rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    text-shadow: 0 0 16px rgba(239, 68, 68, 0.4);
  }

  .ss-timer-instruction {
    font-size: 0.725rem;
    color: var(--text-muted);
  }

  .ss-lockout-clinical-quote {
    font-size: 0.785rem;
    color: #94A3B8;
    line-height: 1.5;
    max-width: 500px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1rem;
  }

  /* Official Corporate Footer */
  .ss-portal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-align: center;
    flex-wrap: wrap;
  }

  .ss-footer-sep {
    opacity: 0.4;
  }

  /* Shake Animation */
  @keyframes ss-shake-anim {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-8px); }
    40%, 80% { transform: translateX(8px); }
  }

  .shake {
    animation: ss-shake-anim 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border-color: rgba(239, 68, 68, 0.65) !important;
  }

  @media (max-width: 600px) {
    .ss-slots-container {
      flex-direction: column;
      gap: 0.85rem;
    }
    .ss-phase-arrow {
      transform: rotate(90deg);
    }
    .ss-slot-box {
      width: 62px;
      height: 44px;
    }
    .ss-tile {
      font-size: 0.8rem;
    }
    .ss-tiles-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
