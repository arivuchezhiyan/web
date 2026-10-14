/**
 * DevCraft Studio — Pure Vanilla JavaScript (ES6+)
 * Progressive showcase from Simple DOM to Advanced Browser APIs
 */

// ==========================================================================
// 1. Web Audio API — Dynamic Micro-Synthesizer FX
// ==========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('devcraft_sound') !== 'false';
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // AudioContext not allowed before user gesture
    }
  }

  click() { this.playTone(600, 'triangle', 0.04, 0.05); }
  success() {
    this.playTone(523.25, 'sine', 0.08, 0.08);
    setTimeout(() => this.playTone(659.25, 'sine', 0.12, 0.08), 80);
  }
  toggle() { this.playTone(480, 'sine', 0.06, 0.06); }
  pop() { this.playTone(720, 'sine', 0.05, 0.07); }
}

const audio = new SoundEngine();

// ==========================================================================
// 2. Toast Notification Engine
// ==========================================================================
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = { success: '✅', warning: '⚠️', info: '💡' };
  toast.innerHTML = `<span>${icons[type] || '💡'}</span><span>${message}</span>`;

  container.appendChild(toast);
  audio.pop();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// ==========================================================================
// 3. Theme & Global UI Controls
// ==========================================================================
function initThemeAndGlobal() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const soundBtn = document.getElementById('sound-toggle-btn');
  const savedTheme = localStorage.getItem('devcraft_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('devcraft_theme', next);
    themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
    audio.toggle();
    showToast(`Switched to ${next} theme`, 'info', 2000);
  });

  // Sound toggle button
  const updateSoundBtn = () => {
    soundBtn.querySelector('.icon').textContent = audio.enabled ? '🔊' : '🔇';
    soundBtn.style.opacity = audio.enabled ? '1' : '0.5';
    document.getElementById('stat-audio-fx').textContent = audio.enabled ? 'Active' : 'Muted';
  };
  updateSoundBtn();

  soundBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    localStorage.setItem('devcraft_sound', audio.enabled);
    updateSoundBtn();
    if (audio.enabled) audio.click();
    showToast(`Sound FX ${audio.enabled ? 'Enabled' : 'Muted'}`, 'info', 1800);
  });

  // Tab switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId)?.classList.add('active');

      audio.click();
    });
  });

  // Modal Shortcuts Dialog
  const modal = document.getElementById('shortcuts-modal');
  const openModalBtn = document.getElementById('shortcuts-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  openModalBtn.addEventListener('click', () => {
    modal.showModal();
    audio.click();
  });

  closeModalBtn.addEventListener('click', () => {
    modal.close();
    audio.click();
  });

  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      modal.close();
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Ctrl + K or Cmd + K -> shortcuts modal
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.open ? modal.close() : modal.showModal();
      audio.click();
    }
    // T -> theme toggle (when not typing in an input)
    if (e.key.toLowerCase() === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      themeBtn.click();
    }
    // / -> focus task input
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      document.querySelector('[data-tab="tab-intermediate"]').click();
      document.getElementById('task-title-input')?.focus();
    }
    // Space -> trigger shockwave if not typing
    if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      document.getElementById('burst-particles-btn')?.click();
    }
  });
}

// ==========================================================================
// 4. LEVEL 1 (Simple): Counter Component
// ==========================================================================
function initCounter() {
  let count = 0;
  let step = 1;

  const valueEl = document.getElementById('counter-value');
  const badgeEl = document.getElementById('counter-badge');
  const decBtn = document.getElementById('counter-dec-btn');
  const resetBtn = document.getElementById('counter-reset-btn');
  const incBtn = document.getElementById('counter-inc-btn');
  const stepSlider = document.getElementById('step-slider');
  const stepLabel = document.getElementById('step-value-label');

  const updateUI = () => {
    valueEl.textContent = count;
    valueEl.style.transform = 'scale(1.15)';
    setTimeout(() => { valueEl.style.transform = 'scale(1)'; }, 150);

    badgeEl.className = 'counter-status';
    if (count > 0) {
      badgeEl.classList.add('positive');
      badgeEl.textContent = `Positive (+${count})`;
    } else if (count < 0) {
      badgeEl.classList.add('negative');
      badgeEl.textContent = `Negative (${count})`;
    } else {
      badgeEl.classList.add('neutral');
      badgeEl.textContent = 'Neutral Zero';
    }
  };

  decBtn.addEventListener('click', () => {
    count -= step;
    audio.playTone(340, 'triangle', 0.05);
    updateUI();
  });

  incBtn.addEventListener('click', () => {
    count += step;
    audio.playTone(580, 'triangle', 0.05);
    updateUI();
  });

  resetBtn.addEventListener('click', () => {
    count = 0;
    audio.click();
    updateUI();
    showToast('Counter reset to 0', 'info', 1500);
  });

  stepSlider.addEventListener('input', (e) => {
    step = parseInt(e.target.value, 10);
    stepLabel.textContent = step;
    decBtn.textContent = `- ${step}`;
    incBtn.textContent = `+ ${step}`;
  });
}

// ==========================================================================
// 5. LEVEL 1 (Simple): Text Analyzer
// ==========================================================================
function initTextAnalyzer() {
  const textarea = document.getElementById('live-textarea');
  const charEl = document.getElementById('stat-chars');
  const wordEl = document.getElementById('stat-words');
  const sentenceEl = document.getElementById('stat-sentences');
  const readTimeEl = document.getElementById('stat-readtime');

  const updateStats = () => {
    const text = textarea.value;
    charEl.textContent = text.length;

    // Words
    const words = text.trim().split(/\s+/).filter(Boolean);
    wordEl.textContent = text.trim() ? words.length : 0;

    // Sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    sentenceEl.textContent = sentences.length;

    // Read time (~200 words per minute)
    const totalSeconds = Math.ceil((words.length / 200) * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    readTimeEl.textContent = `${mins}m ${secs}s`;
  };

  textarea.addEventListener('input', updateStats);

  document.getElementById('btn-uppercase').addEventListener('click', () => {
    textarea.value = textarea.value.toUpperCase();
    updateStats();
    audio.click();
  });

  document.getElementById('btn-lowercase').addEventListener('click', () => {
    textarea.value = textarea.value.toLowerCase();
    updateStats();
    audio.click();
  });

  document.getElementById('btn-capitalize').addEventListener('click', () => {
    textarea.value = textarea.value.replace(/\b\w/g, (c) => c.toUpperCase());
    updateStats();
    audio.click();
  });

  document.getElementById('btn-clear-text').addEventListener('click', () => {
    textarea.value = '';
    updateStats();
    audio.click();
  });
}

// ==========================================================================
// 6. LEVEL 1 (Simple): Harmonic Palette Generator
// ==========================================================================
function initPalette() {
  const container = document.getElementById('palette-container');
  const genBtn = document.getElementById('generate-palette-btn');
  const autoToggleBtn = document.getElementById('auto-palette-toggle');
  let autoInterval = null;

  const generateHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderPalette = () => {
    container.innerHTML = '';
    const baseHue = Math.floor(Math.random() * 360);

    for (let i = 0; i < 5; i++) {
      const hue = (baseHue + i * 45) % 360;
      const saturation = 65 + Math.floor(Math.random() * 25);
      const lightness = 45 + Math.floor(Math.random() * 25);
      const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      const card = document.createElement('div');
      card.className = 'swatch-card';
      card.innerHTML = `
        <div class="swatch-color" style="background: ${hsl}"></div>
        <div class="swatch-info">
          <span class="swatch-hex">${hsl}</span>
          <span class="swatch-lbl">Click to Copy</span>
        </div>
      `;

      card.addEventListener('click', () => {
        navigator.clipboard.writeText(hsl).then(() => {
          audio.success();
          showToast(`Copied ${hsl} to clipboard!`, 'success');
        });
      });

      container.appendChild(card);
    }
  };

  renderPalette();

  genBtn.addEventListener('click', () => {
    renderPalette();
    audio.click();
  });

  autoToggleBtn.addEventListener('click', () => {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
      autoToggleBtn.innerHTML = '<span>⏱️ Auto Rotate (Off)</span>';
      showToast('Palette rotation paused', 'info');
    } else {
      autoInterval = setInterval(renderPalette, 2500);
      autoToggleBtn.innerHTML = '<span>⏱️ Auto Rotate (On)</span>';
      showToast('Palette rotation active (every 2.5s)', 'success');
    }
    audio.click();
  });
}

// ==========================================================================
// 7. LEVEL 2 (Intermediate): LocalStorage Task Manager
// ==========================================================================
function initTaskManager() {
  const STORAGE_KEY = 'devcraft_tasks_v1';
  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  let activeFilter = 'all';
  let searchQuery = '';

  const form = document.getElementById('task-form');
  const titleInput = document.getElementById('task-title-input');
  const catSelect = document.getElementById('task-category-select');
  const prioSelect = document.getElementById('task-priority-select');
  const listEl = document.getElementById('task-list');
  const emptyEl = document.getElementById('tasks-empty-state');
  const searchInput = document.getElementById('task-search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.getElementById('clear-completed-btn');

  // Metric displays
  const countAll = document.getElementById('count-all');
  const countActive = document.getElementById('count-active');
  const countCompleted = document.getElementById('count-completed');
  const totalMetric = document.getElementById('stat-tasks-total');

  const saveAndRender = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

    // Calculate metrics
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;

    countAll.textContent = total;
    countActive.textContent = active;
    countCompleted.textContent = completed;
    if (totalMetric) totalMetric.textContent = active;

    // Filter & search
    let filtered = tasks.filter((t) => {
      if (activeFilter === 'active') return !t.completed;
      if (activeFilter === 'completed') return t.completed;
      return true;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.priority.toLowerCase().includes(q)
      );
    }

    listEl.innerHTML = '';
    if (filtered.length === 0) {
      emptyEl.style.display = 'flex';
    } else {
      emptyEl.style.display = 'none';
      filtered.forEach((t) => {
        const li = document.createElement('li');
        li.className = `task-item ${t.completed ? 'completed' : ''}`;
        li.innerHTML = `
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${t.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(t.title)}</span>
          </div>
          <div class="task-badges">
            <span class="tag-badge cat">${t.category}</span>
            <span class="tag-badge priority-${t.priority.toLowerCase()}">${t.priority}</span>
            <button class="delete-task-btn" title="Delete Task">&times;</button>
          </div>
        `;

        // Toggle complete
        li.querySelector('.task-checkbox').addEventListener('change', () => {
          t.completed = !t.completed;
          audio.toggle();
          saveAndRender();
        });

        // Delete task
        li.querySelector('.delete-task-btn').addEventListener('click', () => {
          tasks = tasks.filter((item) => item.id !== t.id);
          audio.pop();
          saveAndRender();
          showToast('Task removed', 'info', 1800);
        });

        listEl.appendChild(li);
      });
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;

    tasks.unshift({
      id: Date.now().toString(),
      title,
      category: catSelect.value,
      priority: prioSelect.value,
      completed: false,
      createdAt: new Date().toISOString()
    });

    titleInput.value = '';
    audio.success();
    saveAndRender();
    showToast(`Task added: "${title}"`, 'success');
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      audio.click();
      saveAndRender();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    saveAndRender();
  });

  clearCompletedBtn.addEventListener('click', () => {
    const before = tasks.length;
    tasks = tasks.filter((t) => !t.completed);
    if (tasks.length < before) {
      audio.pop();
      saveAndRender();
      showToast('Completed tasks cleared', 'info');
    }
  });

  // Initial seed tasks if empty
  if (tasks.length === 0) {
    tasks = [
      { id: '1', title: 'Learn Vanilla CSS Grid & Flexbox layouts', category: 'Development', priority: 'High', completed: true },
      { id: '2', title: 'Connect HTML5 Canvas with vector particle math', category: 'Design', priority: 'Medium', completed: false },
      { id: '3', title: 'Master Web Audio API synthesizers', category: 'Research', priority: 'Low', completed: false }
    ];
  }

  saveAndRender();
}

// Helper escape
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}

// ==========================================================================
// 8. LEVEL 2 (Intermediate): Accordion & Star Rating
// ==========================================================================
function initAccordionAndRating() {
  // Accordion
  const items = document.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach((i) => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        audio.click();
      }
    });
  });

  // Star Rating
  const stars = document.querySelectorAll('.star');
  const label = document.getElementById('rating-label');
  const submitBtn = document.getElementById('submit-feedback-btn');
  const feedbackInput = document.getElementById('feedback-input');
  let selectedRating = 0;

  const ratingDescriptions = [
    'Needs improvement',
    'Fair experience',
    'Good and functional',
    'Very well designed!',
    'Outstanding masterpiece! 🌟'
  ];

  stars.forEach((star) => {
    star.addEventListener('mouseenter', () => {
      const r = parseInt(star.getAttribute('data-rating'), 10);
      stars.forEach((s, idx) => {
        s.classList.toggle('selected', idx < r);
      });
      label.textContent = ratingDescriptions[r - 1] || '';
    });

    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'), 10);
      audio.success();
      showToast(`Selected ${selectedRating} Star${selectedRating > 1 ? 's' : ''}!`, 'success', 2000);
    });
  });

  document.getElementById('stars-container').addEventListener('mouseleave', () => {
    stars.forEach((s, idx) => {
      s.classList.toggle('selected', idx < selectedRating);
    });
    label.textContent = selectedRating > 0 ? ratingDescriptions[selectedRating - 1] : 'Select a star rating';
  });

  submitBtn.addEventListener('click', () => {
    if (selectedRating === 0) {
      showToast('Please select a star rating first.', 'warning');
      return;
    }
    audio.success();
    showToast(`Thank you! Feedback (${selectedRating} stars) recorded.`, 'success');
    feedbackInput.value = '';
    selectedRating = 0;
    stars.forEach((s) => s.classList.remove('selected'));
    label.textContent = 'Select a star rating';
  });
}

// ==========================================================================
// 9. LEVEL 3 (Advanced): Async/Await Quotes Engine
// ==========================================================================
function initQuotesEngine() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const quoteTags = document.getElementById('quote-tags');
  const fetchBtn = document.getElementById('fetch-quote-btn');
  const copyBtn = document.getElementById('copy-quote-btn');
  const spinner = document.getElementById('fetch-spinner');

  const fallbackQuotes = [
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra", tags: ["Architecture", "Code Quality"] },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", tags: ["Design", "Clean Code"] },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck", tags: ["Refactoring", "Agile"] },
    { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard", tags: ["Engineering", "Humor"] },
    { text: "The most damaging phrase in the language is: 'It's always been done that way.'", author: "Grace Hopper", tags: ["Innovation", "Leadership"] }
  ];

  let currentQuoteIndex = 0;

  const fetchQuote = async () => {
    spinner.style.display = 'inline-block';
    fetchBtn.disabled = true;

    try {
      // Simulate real async network latency with Promise
      await new Promise((res) => setTimeout(res, 400));
      currentQuoteIndex = (currentQuoteIndex + 1) % fallbackQuotes.length;
      const q = fallbackQuotes[currentQuoteIndex];

      quoteText.style.opacity = '0';
      quoteAuthor.style.opacity = '0';
      setTimeout(() => {
        quoteText.textContent = q.text;
        quoteAuthor.textContent = `— ${q.author}`;
        quoteTags.innerHTML = q.tags.map((t) => `<span class="badge">${t}</span>`).join('');
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
      }, 200);

      audio.pop();
    } catch (e) {
      showToast('Could not fetch advice.', 'warning');
    } finally {
      spinner.style.display = 'none';
      fetchBtn.disabled = false;
    }
  };

  fetchBtn.addEventListener('click', fetchQuote);

  copyBtn.addEventListener('click', () => {
    const textToCopy = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      audio.success();
      showToast('Quote copied to clipboard!', 'success');
    });
  });
}

// ==========================================================================
// 10. LEVEL 3 (Advanced): HTML5 Canvas Particle Network
// ==========================================================================
function initCanvasParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let numParticles = 45;
  let connectionDist = 110;
  let speedMultiplier = 2;
  let isPaused = false;

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * speedMultiplier;
      this.vy = (Math.random() - 0.5) * speedMultiplier;
      this.radius = 2 + Math.random() * 2;
    }

    update() {
      this.x += this.vx * (speedMultiplier / 2);
      this.y += this.vy * (speedMultiplier / 2);

      // Bounce on edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 4;
          this.y -= (dy / dist) * force * 4;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.65)' : 'rgba(37, 99, 235, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let particles = [];
  const createParticles = () => {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
    const countDisplay = document.getElementById('particle-count-display');
    const metricDisplay = document.getElementById('stat-particles-count');
    if (countDisplay) countDisplay.textContent = numParticles;
    if (metricDisplay) metricDisplay.textContent = numParticles;
  };
  createParticles();

  const animate = () => {
    if (!isPaused) {
      ctx.clearRect(0, 0, width, height);

      // Connect lines
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const baseLineColor = isDark ? '96, 165, 250' : '37, 99, 235';

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = 1 - dist / connectionDist;
            ctx.strokeStyle = `rgba(${baseLineColor}, ${alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
    }

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  // Sliders
  document.getElementById('particle-speed-slider')?.addEventListener('input', (e) => {
    speedMultiplier = parseFloat(e.target.value);
  });

  document.getElementById('particle-connect-slider')?.addEventListener('input', (e) => {
    connectionDist = parseInt(e.target.value, 10);
  });

  document.getElementById('particle-count-slider')?.addEventListener('input', (e) => {
    numParticles = parseInt(e.target.value, 10);
    createParticles();
  });

  // Shockwave burst
  document.getElementById('burst-particles-btn')?.addEventListener('click', () => {
    audio.playTone(880, 'sawtooth', 0.15, 0.1);
    particles.forEach((p) => {
      p.vx = (Math.random() - 0.5) * 14;
      p.vy = (Math.random() - 0.5) * 14;
    });
    showToast('⚡ Particle Shockwave Triggered!', 'info', 1800);
  });

  // Pause / Resume
  const toggleBtn = document.getElementById('toggle-canvas-btn');
  toggleBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    toggleBtn.textContent = isPaused ? 'Resume Physics' : 'Pause Physics';
    audio.click();
  });
}

// ==========================================================================
// 11. LEVEL 3 (Advanced): Dynamic SVG Telemetry Mini-Chart
// ==========================================================================
function initTelemetryChart() {
  const lineEl = document.getElementById('chart-line');
  const dotsEl = document.getElementById('chart-dots');
  const tickerEl = document.getElementById('chart-ticker');
  if (!lineEl || !dotsEl) return;

  const pointsCount = 10;
  const width = 700;
  const height = 180;
  let values = [88, 92, 90, 95, 93, 97, 94, 98, 96, 99];

  const updateChart = () => {
    // Add slightly randomized next score
    const last = values[values.length - 1];
    const next = Math.max(78, Math.min(100, last + (Math.random() - 0.45) * 4));
    values.shift();
    values.push(parseFloat(next.toFixed(1)));

    tickerEl.innerHTML = `Current Score: <strong>${next.toFixed(1)}%</strong>`;

    const stepX = width / (pointsCount - 1);
    let pathD = '';
    dotsEl.innerHTML = '';

    values.forEach((val, idx) => {
      const x = idx * stepX;
      // map val (70..100) to height (160..20)
      const y = height - ((val - 70) / 30) * (height - 40) - 20;

      if (idx === 0) {
        pathD += `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
      }

      // Add dot
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '4');
      circle.setAttribute('class', 'chart-dot');
      dotsEl.appendChild(circle);
    });

    lineEl.setAttribute('d', pathD);
  };

  updateChart();
  setInterval(updateChart, 2200);
}

// ==========================================================================
// 12. Main Initializer
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initThemeAndGlobal();
  initCounter();
  initTextAnalyzer();
  initPalette();
  initTaskManager();
  initAccordionAndRating();
  initQuotesEngine();
  initCanvasParticles();
  initTelemetryChart();

  console.log('%c⚡ DevCraft Studio initialized successfully.', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
});
