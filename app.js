/* ===================================================================
   Quick Links Hub — Application Logic
   =================================================================== */

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // Placeholder Data
  // ──────────────────────────────────────────────
  const PLACEHOLDER_LINKS = [
    {
      id: '1',
      title: 'Google Workspace',
      url: 'https://workspace.google.com',
      description: 'Gmail, Docs, Drive, Calendar — your productivity suite in one place.',
      category: 'work',
      icon: '📧',
      color: '#4285F4'
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com',
      description: 'Code repositories, pull requests, and collaboration for developers.',
      category: 'dev',
      icon: '🐙',
      color: '#7c8aff'
    },
    {
      id: '3',
      title: 'YouTube',
      url: 'https://youtube.com',
      description: 'Watch, share, and discover videos on every topic imaginable.',
      category: 'media',
      icon: '▶️',
      color: '#FF0000'
    },
    {
      id: '4',
      title: 'Twitter / X',
      url: 'https://x.com',
      description: 'Stay updated with real-time news, trends, and conversations.',
      category: 'social',
      icon: '🐦',
      color: '#1DA1F2'
    },
    {
      id: '5',
      title: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      description: 'Community-driven Q&A for programming and software development.',
      category: 'dev',
      icon: '📚',
      color: '#F48024'
    },
    {
      id: '6',
      title: 'Notion',
      url: 'https://notion.so',
      description: 'All-in-one workspace for notes, docs, wikis, and project management.',
      category: 'work',
      icon: '📝',
      color: '#000000'
    },
    {
      id: '7',
      title: 'Spotify',
      url: 'https://open.spotify.com',
      description: 'Stream music, podcasts, and audiobooks with curated playlists.',
      category: 'media',
      icon: '🎵',
      color: '#1DB954'
    },
    {
      id: '8',
      title: 'LinkedIn',
      url: 'https://linkedin.com',
      description: 'Professional networking, job hunting, and industry insights.',
      category: 'social',
      icon: '💼',
      color: '#0A66C2'
    },
    {
      id: '9',
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      description: 'Comprehensive reference for HTML, CSS, JavaScript, and Web APIs.',
      category: 'learn',
      icon: '🦊',
      color: '#83D0CB'
    },
    {
      id: '10',
      title: 'Figma',
      url: 'https://figma.com',
      description: 'Collaborative design tool for interfaces, prototypes, and design systems.',
      category: 'dev',
      icon: '🎨',
      color: '#A259FF'
    },
    {
      id: '11',
      title: 'Coursera',
      url: 'https://coursera.org',
      description: 'Online courses from top universities and companies worldwide.',
      category: 'learn',
      icon: '🎓',
      color: '#0056D2'
    }
  ];

  const CATEGORIES = {
    all:    { label: 'All',        emoji: '✦' },
    work:   { label: 'Work',       emoji: '💼' },
    social: { label: 'Social',     emoji: '💬' },
    dev:    { label: 'Dev Tools',  emoji: '🛠️' },
    media:  { label: 'Media',      emoji: '🎬' },
    learn:  { label: 'Learning',   emoji: '📚' }
  };

  const BADGE_CLASS_MAP = {
    work:   'badge-work',
    social: 'badge-social',
    dev:    'badge-dev',
    media:  'badge-media',
    learn:  'badge-learn'
  };

  // ──────────────────────────────────────────────
  // State
  // ──────────────────────────────────────────────
  let links = loadLinks();
  let activeFilter = 'all';
  let searchQuery = '';
  let selectedCategory = 'work';
  let editingLinkId = null;       // null = add mode, string = edit mode
  let pendingDeleteId = null;     // id of link awaiting delete confirmation
  let lastAddedId = null;         // id of the most recently added link (for highlight)
  let dragSrcIndex = null;        // index of card being dragged
  let adminMode = false;          // whether editing features are unlocked

  // ──────────────────────────────────────────────
  // Admin Password (SHA-256 hash)
  // Default password is "admin" — change the hash below to use your own.
  // To generate a new hash, run in the browser console:
  //   crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD'))
  //     .then(h => console.log([...new Uint8Array(h)].map(b => b.toString(16).padStart(2,'0')).join('')))
  // ──────────────────────────────────────────────
  const ADMIN_PASSWORD_HASH = '071e8751b7ae658ed7dcc9a52434ef7a17fe54a7af5b87f71363ab544750bd64';

  // ──────────────────────────────────────────────
  // DOM Refs
  // ──────────────────────────────────────────────
  const navbar        = document.getElementById('navbar');
  const searchInput   = document.getElementById('searchInput');
  const filterBar     = document.getElementById('filterBar');
  const linksGrid     = document.getElementById('linksGrid');
  const emptyState    = document.getElementById('emptyState');
  const emptyMessage  = document.getElementById('emptyMessage');
  const statTotal     = document.getElementById('statTotal');
  const statTotalLabel= document.getElementById('statTotalLabel');
  const statCategories= document.getElementById('statCategories');

  const btnAddDesktop = document.getElementById('btnAddDesktop');
  const fabAdd        = document.getElementById('fabAdd');
  const modalOverlay  = document.getElementById('modalOverlay');
  const modalClose    = document.getElementById('modalClose');
  const modalTitle    = document.getElementById('modalTitle');
  const btnCancel     = document.getElementById('btnCancel');
  const btnSubmit     = document.getElementById('btnSubmit');
  const addLinkForm   = document.getElementById('addLinkForm');
  const categorySelector = document.getElementById('categorySelector');

  const inputUrl      = document.getElementById('inputUrl');
  const inputTitle    = document.getElementById('inputTitle');
  const inputDesc     = document.getElementById('inputDesc');

  const toast         = document.getElementById('toast');
  const toastMessage  = document.getElementById('toastMessage');

  // Delete confirmation modal
  const deleteOverlay   = document.getElementById('deleteOverlay');
  const deleteClose     = document.getElementById('deleteClose');
  const deleteName      = document.getElementById('deleteName');
  const deleteCancelBtn = document.getElementById('deleteCancelBtn');
  const deleteConfirmBtn= document.getElementById('deleteConfirmBtn');

  // Settings dropdown
  const btnSettings   = document.getElementById('btnSettings');
  const settingsMenu  = document.getElementById('settingsMenu');
  const btnExport     = document.getElementById('btnExport');
  const btnImport     = document.getElementById('btnImport');
  const fileImport    = document.getElementById('fileImport');

  // Admin mode
  const btnAdminToggle = document.getElementById('btnAdminToggle');
  const adminOverlay   = document.getElementById('adminOverlay');
  const adminClose     = document.getElementById('adminClose');
  const adminForm      = document.getElementById('adminForm');
  const adminPin       = document.getElementById('adminPin');
  const adminError     = document.getElementById('adminError');
  const adminCancelBtn = document.getElementById('adminCancelBtn');

  // ──────────────────────────────────────────────
  // Persistence (localStorage)
  // ──────────────────────────────────────────────
  function loadLinks() {
    try {
      const stored = localStorage.getItem('quicklinks_data');
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return [...PLACEHOLDER_LINKS];
  }

  function saveLinks() {
    try {
      localStorage.setItem('quicklinks_data', JSON.stringify(links));
    } catch (e) { /* ignore */ }
  }

  // ──────────────────────────────────────────────
  // Utility: extract hostname
  // ──────────────────────────────────────────────
  function extractHost(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  }

  // ──────────────────────────────────────────────
  // Utility: generate unique id
  // ──────────────────────────────────────────────
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  // ──────────────────────────────────────────────
  // Utility: validate hex color (#10 XSS fix)
  // ──────────────────────────────────────────────
  function sanitizeColor(color) {
    if (typeof color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(color)) {
      return color;
    }
    return '#7c8aff'; // fallback to primary
  }

  // ──────────────────────────────────────────────
  // Utility: debounce (#11)
  // ──────────────────────────────────────────────
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ──────────────────────────────────────────────
  // Escape HTML
  // ──────────────────────────────────────────────
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ──────────────────────────────────────────────
  // Favicon fetching (#4)
  // ──────────────────────────────────────────────
  function getFaviconUrl(url) {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return null;
    }
  }

  // ──────────────────────────────────────────────
  // Admin: SHA-256 hashing via Web Crypto
  // ──────────────────────────────────────────────
  async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function isAdmin() {
    return adminMode;
  }

  function setAdminMode(enabled) {
    adminMode = enabled;
    document.body.classList.toggle('admin-mode', enabled);
    btnAdminToggle.textContent = enabled ? '🔓' : '🔒';
    btnAdminToggle.classList.toggle('unlocked', enabled);
    btnAdminToggle.title = enabled ? 'Lock (exit admin mode)' : 'Admin login';
    // Re-render grid to show/hide admin-only elements within cards
    renderGrid();
  }

  // ──────────────────────────────────────────────
  // Pick emoji for a new link based on category
  // ──────────────────────────────────────────────
  function pickEmoji(category) {
    const map = {
      work:   ['💼', '📊', '📋', '📁', '🗂️'],
      social: ['💬', '👥', '🌐', '📱', '🤝'],
      dev:    ['🛠️', '⚙️', '💻', '🧑‍💻', '🔧'],
      media:  ['🎬', '🎵', '📺', '🎮', '📷'],
      learn:  ['📚', '🎓', '✏️', '🧠', '💡']
    };
    const options = map[category] || ['🔗'];
    return options[Math.floor(Math.random() * options.length)];
  }

  function pickColor(category) {
    const map = {
      work:   '#7c8aff',
      social: '#ff6b9d',
      dev:    '#4dd9b4',
      media:  '#ffb347',
      learn:  '#bcc4ff'
    };
    return map[category] || '#7c8aff';
  }

  // ──────────────────────────────────────────────
  // Render: Filter Chips
  // ──────────────────────────────────────────────
  function renderFilterChips() {
    filterBar.innerHTML = '';

    const counts = { all: links.length };
    for (const link of links) {
      counts[link.category] = (counts[link.category] || 0) + 1;
    }

    for (const [key, cat] of Object.entries(CATEGORIES)) {
      const chip = document.createElement('button');
      chip.className = `filter-chip${key === activeFilter ? ' active' : ''}`;
      chip.dataset.filter = key;
      chip.setAttribute('role', 'tab');
      chip.setAttribute('aria-selected', key === activeFilter ? 'true' : 'false');
      chip.innerHTML = `
        ${cat.emoji} ${cat.label}
        <span class="chip-count">${counts[key] || 0}</span>
      `;
      chip.addEventListener('click', () => {
        activeFilter = key;
        renderFilterChips();
        renderGrid();
      });
      filterBar.appendChild(chip);
    }
  }

  // ──────────────────────────────────────────────
  // Get filtered links (shared by grid + stats)
  // ──────────────────────────────────────────────
  function getFilteredLinks() {
    const query = searchQuery.toLowerCase().trim();
    let filtered = links;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(l => l.category === activeFilter);
    }

    if (query) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(query) ||
        l.url.toLowerCase().includes(query) ||
        (l.description && l.description.toLowerCase().includes(query)) ||
        l.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  // ──────────────────────────────────────────────
  // Render: Links Grid
  // ──────────────────────────────────────────────
  function renderGrid() {
    const filtered = getFilteredLinks();

    // Clear grid
    linksGrid.innerHTML = '';

    // Empty state (#13 — covers both search and filter-only cases)
    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      if (searchQuery.trim()) {
        emptyMessage.textContent = 'No links match your search. Try a different keyword or add a new link.';
      } else if (activeFilter !== 'all') {
        emptyMessage.textContent = `No links in the "${CATEGORIES[activeFilter]?.label || activeFilter}" category yet. Add one!`;
      } else {
        emptyMessage.textContent = 'No links yet. Click "Add Link" to get started!';
      }
    } else {
      emptyState.style.display = 'none';
    }

    // Render cards
    filtered.forEach((link, i) => {
      const card = createLinkCard(link, i);
      linksGrid.appendChild(card);
    });

    // Add the "Add Link" dashed card
    const addCard = document.createElement('div');
    addCard.className = 'add-link-card';
    addCard.addEventListener('click', () => openModal());
    addCard.style.animationDelay = `${filtered.length * 50}ms`;
    addCard.innerHTML = `
      <div class="add-icon">＋</div>
      <div class="add-text">Add a new link</div>
    `;
    linksGrid.appendChild(addCard);

    // Update stats
    updateStats(filtered);
  }

  // ──────────────────────────────────────────────
  // Create a single link card element
  // ──────────────────────────────────────────────
  function createLinkCard(link, index) {
    const card = document.createElement('a');
    card.className = 'link-card';
    card.href = link.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = `${index * 50}ms`;
    card.dataset.linkId = link.id;

    // Highlight newly-added card (#12 pulse-glow)
    if (link.id === lastAddedId) {
      card.classList.add('just-added');
      lastAddedId = null; // only highlight once
    }

    // Drag-and-drop attributes (#2) — only in admin mode
    if (isAdmin()) {
      card.draggable = true;
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragover', handleDragOver);
      card.addEventListener('dragenter', handleDragEnter);
      card.addEventListener('dragleave', handleDragLeave);
      card.addEventListener('drop', handleDrop);
      card.addEventListener('dragend', handleDragEnd);
    }

    const safeColor = sanitizeColor(link.color);
    const badgeClass = BADGE_CLASS_MAP[link.category] || 'badge-work';
    const catLabel = CATEGORIES[link.category]?.label || link.category;
    const hostname = extractHost(link.url);
    const faviconUrl = getFaviconUrl(link.url);

    card.innerHTML = `
      <div class="link-card-header">
        <div class="link-card-icon">
          ${faviconUrl
            ? `<img src="${escapeHtml(faviconUrl)}" alt="" loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
               <div class="icon-placeholder" style="display:none; background: ${safeColor}22; color: ${safeColor};">
                 ${link.icon || '🔗'}
               </div>`
            : `<div class="icon-placeholder" style="background: ${safeColor}22; color: ${safeColor};">
                 ${link.icon || '🔗'}
               </div>`
          }
        </div>
        <div class="link-card-header-right">
          <span class="category-badge ${badgeClass}">${catLabel}</span>
          <div class="card-actions">
            <button class="card-actions-btn" aria-label="Link options" title="Options">⋯</button>
            <div class="card-actions-menu" role="menu">
              <button class="card-action-item" data-action="edit" role="menuitem">✏️ Edit</button>
              <button class="card-action-item danger" data-action="delete" role="menuitem">🗑️ Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div class="link-card-body">
        <div class="link-card-title">${escapeHtml(link.title)}</div>
        <div class="link-card-desc">${escapeHtml(link.description || '')}</div>
      </div>
      <div class="link-card-footer">
        <span class="link-card-url">${escapeHtml(hostname)}</span>
        <span class="link-card-arrow">→</span>
      </div>
    `;

    // Wire up card action menu
    const actionsBtn = card.querySelector('.card-actions-btn');
    const actionsMenu = card.querySelector('.card-actions-menu');

    actionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllCardMenus();
      actionsMenu.classList.add('open');
    });

    actionsMenu.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = e.target.closest('.card-action-item');
      if (!item) return;
      actionsMenu.classList.remove('open');

      if (item.dataset.action === 'edit') {
        openModal(link.id);
      } else if (item.dataset.action === 'delete') {
        openDeleteConfirm(link.id);
      }
    });

    return card;
  }

  // ──────────────────────────────────────────────
  // Close all card action menus
  // ──────────────────────────────────────────────
  function closeAllCardMenus() {
    document.querySelectorAll('.card-actions-menu.open').forEach(m => m.classList.remove('open'));
  }

  // ──────────────────────────────────────────────
  // Update Stats (#6 — show filtered vs total)
  // ──────────────────────────────────────────────
  function updateStats(filtered) {
    const total = links.length;
    const shown = filtered.length;

    if (activeFilter !== 'all' || searchQuery.trim()) {
      statTotal.textContent = `${shown} / ${total}`;
      statTotalLabel.textContent = 'links shown';
    } else {
      statTotal.textContent = total;
      statTotalLabel.textContent = 'links';
    }

    const cats = new Set(links.map(l => l.category));
    statCategories.textContent = cats.size;
  }

  // ──────────────────────────────────────────────
  // Modal Controls (#1 — Add & Edit modes)
  // ──────────────────────────────────────────────
  function openModal(linkId) {
    if (!isAdmin()) return; // Guard: viewer cannot open modal
    editingLinkId = linkId || null;

    if (editingLinkId) {
      // Edit mode — pre-fill form
      const link = links.find(l => l.id === editingLinkId);
      if (!link) return;
      modalTitle.textContent = 'Edit Link';
      btnSubmit.textContent = 'Save Changes';
      inputUrl.value = link.url;
      inputTitle.value = link.title;
      inputDesc.value = link.description || '';
      selectedCategory = link.category;
    } else {
      // Add mode
      modalTitle.textContent = 'Add New Link';
      btnSubmit.textContent = 'Add Link';
      addLinkForm.reset();
      selectedCategory = 'work';
    }

    // Sync category selector pills
    categorySelector.querySelectorAll('.category-option').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.category === selectedCategory);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inputUrl.focus(), 300);
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    addLinkForm.reset();
    editingLinkId = null;
    selectedCategory = 'work';
    categorySelector.querySelectorAll('.category-option').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.category === 'work');
    });
  }

  // ──────────────────────────────────────────────
  // Delete Confirmation (#1)
  // ──────────────────────────────────────────────
  function openDeleteConfirm(linkId) {
    if (!isAdmin()) return; // Guard: viewer cannot delete
    const link = links.find(l => l.id === linkId);
    if (!link) return;
    pendingDeleteId = linkId;
    deleteName.textContent = link.title;
    deleteOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    deleteConfirmBtn.focus();
  }

  function closeDeleteConfirm() {
    deleteOverlay.classList.remove('active');
    document.body.style.overflow = '';
    pendingDeleteId = null;
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    const link = links.find(l => l.id === pendingDeleteId);
    const title = link ? link.title : 'Link';
    links = links.filter(l => l.id !== pendingDeleteId);
    saveLinks();
    closeDeleteConfirm();
    renderFilterChips();
    renderGrid();
    showToast(`"${title}" deleted.`, 'error');
  }

  // ──────────────────────────────────────────────
  // Toast
  // ──────────────────────────────────────────────
  let toastTimer;
  function showToast(message, type = 'success') {
    clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ──────────────────────────────────────────────
  // Drag-and-Drop (#2)
  // ──────────────────────────────────────────────
  function getCardIndex(card) {
    // Map card's link id back to index in master `links` array
    const id = card.dataset.linkId;
    return links.findIndex(l => l.id === id);
  }

  function handleDragStart(e) {
    dragSrcIndex = getCardIndex(this);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.linkId);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
  }

  function handleDragLeave() {
    this.classList.remove('drag-over');
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('drag-over');

    const targetIndex = getCardIndex(this);
    if (dragSrcIndex === null || targetIndex === -1 || dragSrcIndex === targetIndex) return;

    // Reorder
    const [moved] = links.splice(dragSrcIndex, 1);
    links.splice(targetIndex, 0, moved);
    saveLinks();
    renderGrid();
  }

  function handleDragEnd() {
    this.classList.remove('dragging');
    document.querySelectorAll('.link-card.drag-over').forEach(c => c.classList.remove('drag-over'));
    dragSrcIndex = null;
  }

  // ──────────────────────────────────────────────
  // Export / Import (#3)
  // ──────────────────────────────────────────────
  function exportLinks() {
    const data = JSON.stringify(links, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quicklinks-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Links exported successfully!');
  }

  function importLinks(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) throw new Error('Invalid format');

        // Validate and sanitize each link
        const valid = imported.filter(l =>
          l && typeof l.title === 'string' && typeof l.url === 'string'
        ).map(l => ({
          id: l.id || uid(),
          title: l.title,
          url: l.url,
          description: l.description || '',
          category: CATEGORIES[l.category] ? l.category : 'work',
          icon: l.icon || pickEmoji(l.category || 'work'),
          color: sanitizeColor(l.color)
        }));

        if (valid.length === 0) {
          showToast('No valid links found in file.', 'error');
          return;
        }

        // Merge: skip duplicates by URL
        const existingUrls = new Set(links.map(l => l.url.toLowerCase()));
        let addedCount = 0;
        for (const link of valid) {
          if (!existingUrls.has(link.url.toLowerCase())) {
            links.push(link);
            existingUrls.add(link.url.toLowerCase());
            addedCount++;
          }
        }

        saveLinks();
        renderFilterChips();
        renderGrid();
        showToast(`Imported ${addedCount} new link${addedCount !== 1 ? 's' : ''} (${valid.length - addedCount} skipped as duplicates).`);
      } catch (err) {
        showToast('Failed to import: invalid JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  }

  // ──────────────────────────────────────────────
  // Settings Dropdown
  // ──────────────────────────────────────────────
  function toggleSettingsMenu() {
    const isOpen = settingsMenu.classList.contains('open');
    settingsMenu.classList.toggle('open', !isOpen);
    btnSettings.setAttribute('aria-expanded', !isOpen);
  }

  function closeSettingsMenu() {
    settingsMenu.classList.remove('open');
    btnSettings.setAttribute('aria-expanded', 'false');
  }

  // ──────────────────────────────────────────────
  // Focus Trapping for Modals (#9)
  // ──────────────────────────────────────────────
  function trapFocus(overlayEl) {
    const focusable = overlayEl.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    overlayEl._focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    overlayEl.addEventListener('keydown', overlayEl._focusTrapHandler);
  }

  function releaseFocusTrap(overlayEl) {
    if (overlayEl._focusTrapHandler) {
      overlayEl.removeEventListener('keydown', overlayEl._focusTrapHandler);
      delete overlayEl._focusTrapHandler;
    }
  }

  // Observe modal open/close to manage focus trap
  const modalObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName !== 'class') continue;
      const el = m.target;
      if (el.classList.contains('active')) {
        trapFocus(el);
      } else {
        releaseFocusTrap(el);
      }
    }
  });
  modalObserver.observe(modalOverlay, { attributes: true });
  modalObserver.observe(deleteOverlay, { attributes: true });
  modalObserver.observe(adminOverlay, { attributes: true });

  // ──────────────────────────────────────────────
  // Admin Mode: open/close/submit
  // ──────────────────────────────────────────────
  function openAdminModal() {
    adminError.style.display = 'none';
    adminPin.value = '';
    adminOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => adminPin.focus(), 300);
  }

  function closeAdminModal() {
    adminOverlay.classList.remove('active');
    document.body.style.overflow = '';
    adminPin.value = '';
    adminError.style.display = 'none';
  }

  btnAdminToggle.addEventListener('click', () => {
    if (isAdmin()) {
      // Logout
      setAdminMode(false);
      showToast('Admin mode locked.', 'success');
    } else {
      // Prompt for password
      openAdminModal();
    }
  });

  adminClose.addEventListener('click', closeAdminModal);
  adminCancelBtn.addEventListener('click', closeAdminModal);
  adminOverlay.addEventListener('click', (e) => {
    if (e.target === adminOverlay) closeAdminModal();
  });

  adminForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputHash = await sha256(adminPin.value);
    if (inputHash === ADMIN_PASSWORD_HASH) {
      closeAdminModal();
      setAdminMode(true);
      showToast('Admin mode unlocked! 🔓');
    } else {
      adminError.style.display = 'block';
      adminPin.value = '';
      adminPin.focus();
    }
  });

  // ──────────────────────────────────────────────
  // Event Listeners
  // ──────────────────────────────────────────────

  // Navbar scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Search with debounce (#11)
  searchInput.addEventListener('input', debounce((e) => {
    searchQuery = searchInput.value;
    renderGrid();
  }, 150));

  // Open modal
  btnAddDesktop.addEventListener('click', () => openModal());
  fabAdd.addEventListener('click', () => openModal());

  // Close modal
  modalClose.addEventListener('click', closeModal);
  btnCancel.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Delete confirmation modal
  deleteClose.addEventListener('click', closeDeleteConfirm);
  deleteCancelBtn.addEventListener('click', closeDeleteConfirm);
  deleteConfirmBtn.addEventListener('click', confirmDelete);
  deleteOverlay.addEventListener('click', (e) => {
    if (e.target === deleteOverlay) closeDeleteConfirm();
  });

  // Escape key — close modals, menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (deleteOverlay.classList.contains('active')) {
        closeDeleteConfirm();
      } else if (modalOverlay.classList.contains('active')) {
        closeModal();
      } else if (adminOverlay.classList.contains('active')) {
        closeAdminModal();
      }
      closeAllCardMenus();
      closeSettingsMenu();
    }
  });

  // Keyboard shortcuts (#7)
  document.addEventListener('keydown', (e) => {
    // Ctrl+K / Cmd+K → focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      return;
    }

    // Only trigger shortcuts when not focused in an input/textarea
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'n' || e.key === 'N') {
      // N → open add link modal (admin only)
      if (isAdmin() && !modalOverlay.classList.contains('active') && !deleteOverlay.classList.contains('active')) {
        e.preventDefault();
        openModal();
      }
    }
  });

  // Category selector in modal
  categorySelector.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-option');
    if (!btn) return;
    selectedCategory = btn.dataset.category;
    categorySelector.querySelectorAll('.category-option').forEach(b => {
      b.classList.toggle('selected', b === btn);
    });
  });

  // Submit new/edited link
  addLinkForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (editingLinkId) {
      // Edit mode
      const idx = links.findIndex(l => l.id === editingLinkId);
      if (idx === -1) return;
      links[idx] = {
        ...links[idx],
        title: inputTitle.value.trim(),
        url: inputUrl.value.trim(),
        description: inputDesc.value.trim(),
        category: selectedCategory,
        color: pickColor(selectedCategory)
      };
      saveLinks();
      closeModal();
      renderFilterChips();
      renderGrid();
      showToast(`"${links[idx].title}" updated!`);
    } else {
      // Add mode
      const newLink = {
        id: uid(),
        title: inputTitle.value.trim(),
        url: inputUrl.value.trim(),
        description: inputDesc.value.trim(),
        category: selectedCategory,
        icon: pickEmoji(selectedCategory),
        color: pickColor(selectedCategory)
      };

      lastAddedId = newLink.id;
      links.unshift(newLink);
      saveLinks();
      closeModal();
      renderFilterChips();
      renderGrid();
      showToast(`"${newLink.title}" added successfully!`);
    }
  });

  // Settings dropdown
  btnSettings.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettingsMenu();
  });

  btnExport.addEventListener('click', () => {
    closeSettingsMenu();
    exportLinks();
  });

  btnImport.addEventListener('click', () => {
    closeSettingsMenu();
    fileImport.click();
  });

  fileImport.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      importLinks(e.target.files[0]);
      fileImport.value = ''; // reset so same file can be re-imported
    }
  });

  // Close menus when clicking outside
  document.addEventListener('click', () => {
    closeAllCardMenus();
    closeSettingsMenu();
  });

  // ──────────────────────────────────────────────
  // Init
  // ──────────────────────────────────────────────
  renderFilterChips();
  renderGrid();

})();
