const isInCharactersFolder = window.location.pathname.includes('/characters/');
const pathPrefix = isInCharactersFolder ? '../' : '';

function resolveAssetPath(assetPath) {
  return `${pathPrefix}${assetPath}`;
}

function resolveHref(link) {
  const href = link.getAttribute('href');
  if (!href) return null;

  if (link.getAttribute('data-link') === 'characters') {
    return isInCharactersFolder ? 'index.html' : 'characters/';
  }

  if (link.classList.contains('nav-brand')) {
    return isInCharactersFolder ? '../index.html' : 'index.html';
  }

  return resolveAssetPath(href);
}

function loadPartial(targetId, fileName) {
  const element = document.getElementById(targetId) || document.getElementById(targetId === 'site-nav' ? 'site-header' : targetId);
  if (!element) return Promise.resolve();

  return fetch(`${pathPrefix}partials/${fileName}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      element.innerHTML = html;

      element.querySelectorAll('[data-link]').forEach((link) => {
        const resolvedHref = resolveHref(link);
        if (resolvedHref) {
          link.setAttribute('href', resolvedHref);
        }
      });

      element.querySelectorAll('.nav-brand img').forEach((img) => {
        img.setAttribute('src', resolveAssetPath('Images/logo/rat_fighter_logo.png'));
      });
    })
    .catch((error) => {
      console.error(`Could not load ${fileName}`, error);
    });
}

function normalizePath(path) {
  return String(path || '')
    .replace(/^\.\//, '')
    .replace(/\/$/, '');
}

function highlightActiveNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const currentPath = window.location.pathname.replace(/\/$/, '');
  const currentName = currentPath.split('/').pop() || 'index.html';
  const isCharactersPage = currentPath.includes('/characters');

  nav.querySelectorAll('a').forEach((link) => {
    const target = normalizePath(link.getAttribute('href'));
    const matches =
      target === currentName ||
      (target === 'index.html' && currentName === 'index.html') ||
      (target === 'characters/' && isCharactersPage);

    link.classList.toggle('active', matches);
    if (matches) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function applyUtilityClasses() {
  document.querySelectorAll('.section, .page-title-shell').forEach((element) => {
    element.classList.add('u-panel', 'u-transition');
  });

  document.querySelectorAll('.card').forEach((element) => {
    element.classList.add('u-surface', 'u-transition', 'u-hover-lift');
  });

  document.querySelectorAll('.button, .nav a, .fighter-card, .back-button, .footer a').forEach((element) => {
    element.classList.add('u-transition');
  });
}

function buildPageTitle() {
  const main = document.querySelector('main');
  if (!main) return;

  if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
    return;
  }

  const titleWrapper = document.getElementById('page-title') || document.createElement('div');
  titleWrapper.id = 'page-title';
  titleWrapper.className = 'page-title-wrapper';

  if (!titleWrapper.parentNode) {
    main.parentNode.insertBefore(titleWrapper, main);
  }

  const pageKey = window.location.pathname.includes('/characters/')
    ? 'characters/'
    : (window.location.pathname.split('/').pop() || 'index.html');

  const pageMeta = {
    'story.html': {
      kicker: 'Tournament Lore',
      title: 'Story',
      intro: 'The hidden history behind the King of Fists Tournament and the fighters who enter it.'
    },
    'moves.html': {
      kicker: 'Combat System',
      title: 'Moves',
      intro: 'A shared move framework designed to keep the game readable and exciting.'
    },
    'stages.html': {
      kicker: 'World Stages',
      title: 'Stages',
      intro: 'Each fighter steps into a stage shaped by their story, rivalries and roots.'
    },
    'world.html': {
      kicker: 'Global Setting',
      title: 'World',
      intro: 'A living document for the broader Rat Fighter universe, factions and history.'
    },
        'art-gallery.html': {
      kicker: 'Visual Identity',
      title: 'Art Gallery',
      intro: 'The visual language of Rat Fighter - King Of Fists.'
    },
    'dev-log.html': {
      kicker: 'Development Progress',
      title: 'Dev Log',
      intro: 'A timeline of updates, technical challenges, and milestones in the development of Rat Fighter.'
    },
    'ideas.html': {
      kicker: 'Development Notes',
      title: 'Dev Notes',
      intro: 'Sketches, ideas and concepts for the next evolution of the game.'
    },
    'characters/': {
      kicker: 'Character Select',
      title: 'Characters',
      intro: 'Browse the cast and jump into each fighter profile.'
    },
    'characters/index.html': {
      kicker: 'Character Select',
      title: 'Characters',
      intro: 'Browse the cast and jump into each fighter profile.'
    }
  };

  const meta = pageMeta[pageKey] || {
    kicker: 'Rat Fighter - King of Fists',
    title: document.title.split('|')[0].trim(),
    intro: 'A polished companion site for the Rat Fighter universe.'
  };

  titleWrapper.innerHTML = `
    <section class="page-title-shell">
      <div class="kicker">${meta.kicker}</div>
      <h1>${meta.title}</h1>
      <p class="page-title-intro">${meta.intro}</p>
    </section>
  `;
}

function loadSharedLayout() {
  Promise.all([
    loadPartial('site-nav', 'header.html'),
    loadPartial('site-footer', 'footer.html')
  ]).then(() => {
    highlightActiveNav();
    buildPageTitle();
    applyUtilityClasses();
    document.body.classList.add('page-ready');
  });
}

window.addEventListener('DOMContentLoaded', loadSharedLayout);
