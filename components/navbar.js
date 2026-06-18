(function () {
  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';

      const path = window.location.pathname;
      const isZh = path.includes('/zh/');
      const base = isZh ? '/zh/' : '/';

      // Strip /zh prefix for depth-agnostic path comparisons
      const cleanPath = path.replace(/^\/zh/, '') || '/';

      const navDef = [
        { en: 'Home', zh: '首页', href: base },
        {
          en: 'About Us', zh: '关于我们', href: base + 'about.html',
          subs: [
            { en: 'Who We Are',       zh: '公司介绍',  href: base + 'about.html#who-we-are' },
            { en: 'Mission & Vision', zh: '使命与愿景', href: base + 'about.html#mission-vision' },
            { en: 'Our Values',       zh: '核心价值观', href: base + 'about.html#values' },
          ]
        },
        {
          en: 'Products', zh: '产品', href: base + 'products/',
          subs: [
            { en: 'Sealing Materials', zh: '密封材料', href: base + 'products/#sealing-materials' },
            { en: 'Soil Conditioning', zh: '土体改良', href: base + 'products/#soil-conditioning' },
          ]
        },
        {
          en: 'Services', zh: '服务', href: base + 'services.html',
          subs: [
            { en: 'Technical Partnership', zh: '技术合作', href: base + 'services.html#overview' },
            { en: 'What We Deliver',       zh: '服务内容', href: base + 'services.html#what-we-deliver' },
            { en: 'Our Process',           zh: '合作流程', href: base + 'services.html#process' },
          ]
        },
        {
          en: 'References', zh: '项目参考', href: base + 'references.html',
          subs: [
            { en: 'Featured Project',    zh: '精选案例', href: base + 'references.html#featured-project' },
            { en: 'Project Portfolio',   zh: '项目组合', href: base + 'references.html#portfolio' },
            { en: 'Client Testimonials', zh: '客户评价', href: base + 'references.html#testimonials' },
          ]
        },
        { en: 'Contact', zh: '联系我们', href: base + 'contact.html' },
      ];

      // Determine active nav item from the path, regardless of page depth
      let activeIdx = -1;
      if (cleanPath === '/' || cleanPath === '/index.html') activeIdx = 0;
      else if (cleanPath.startsWith('/about'))      activeIdx = 1;
      else if (cleanPath.startsWith('/products'))   activeIdx = 2;
      else if (cleanPath.startsWith('/services'))   activeIdx = 3;
      else if (cleanPath.startsWith('/references')) activeIdx = 4;
      else if (cleanPath.startsWith('/contact'))    activeIdx = 5;

      const lbl         = item => isZh ? item.zh : item.en;
      const cta         = isZh ? '获取报价' : 'Get a Quote';
      const burgerLabel = isZh ? '打开菜单' : 'Open menu';

      // Language switcher: map current page to its counterpart in the other language
      const enHref = cleanPath;
      const zhHref = '/zh' + cleanPath;

      const chevronSvg = '<svg class="chevron" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>';

      const desktopLinks = navDef.map((item, i) => {
        const isActive    = i === activeIdx;
        const activeClass = isActive ? ' class="active"' : '';
        if (item.subs) {
          const dropId   = 'nav-drop-' + i;
          const subLinks = item.subs.map(sub =>
            '<li><a href="' + sub.href + '">' + lbl(sub) + '</a></li>'
          ).join('');
          return (
            '<li class="has-dropdown">' +
              '<a href="' + item.href + '"' + activeClass +
                ' aria-haspopup="true" aria-expanded="false" aria-controls="' + dropId + '">' +
                lbl(item) + chevronSvg +
              '</a>' +
              '<ul class="nav-dropdown" id="' + dropId + '" role="list">' + subLinks + '</ul>' +
            '</li>'
          );
        }
        return '<li><a href="' + item.href + '"' + activeClass + '>' + lbl(item) + '</a></li>';
      }).join('');

      const mobileLinks = navDef.map((item, i) => {
        if (item.subs) {
          const mDropId  = 'mob-drop-' + i;
          const subLinks = item.subs.map(sub =>
            '<li><a href="' + sub.href + '">' + lbl(sub) + '</a></li>'
          ).join('');
          return (
            '<li class="has-dropdown">' +
              '<div class="mobile-item-row">' +
                '<a href="' + item.href + '">' + lbl(item) + '</a>' +
                '<button class="mobile-dropdown-toggle" aria-expanded="false" aria-controls="' + mDropId + '" aria-label="' + lbl(item) + ' submenu">' + chevronSvg + '</button>' +
              '</div>' +
              '<ul class="mobile-sub" id="' + mDropId + '" aria-hidden="true">' + subLinks + '</ul>' +
            '</li>'
          );
        }
        return '<li><a href="' + item.href + '">' + lbl(item) + '</a></li>';
      }).join('');

      this.innerHTML =
        '<nav id="top-nav">\n' +
        '  <div class="nav-inner">\n' +
        '    <a href="' + base + '" class="nav-logo"><img src="/assets/brand/CENTOR%20Full%20Logo.png" alt="CENTOR" /></a>\n' +
        '    <ul class="nav-links">' + desktopLinks + '</ul>\n' +
        '    <a href="' + base + 'contact.html" class="btn-nav desktop-only">' + cta + '</a>\n' +
        '    <div class="lang-switcher" style="display:none">\n' +
        '      <a href="' + enHref + '" class="lang-pill' + (!isZh ? ' active' : '') + '">EN</a>\n' +
        '      <a href="' + zhHref + '" class="lang-pill' + (isZh ? ' active' : '') + '">中文</a>\n' +
        '    </div>\n' +
        '    <button class="nav-burger" id="nav-burger" aria-label="' + burgerLabel + '" aria-expanded="false"><span></span><span></span><span></span></button>\n' +
        '  </div>\n' +
        '</nav>\n' +
        '<div class="mobile-menu" id="mobile-menu">\n' +
        '  <ul>' + mobileLinks + '</ul>\n' +
        '  <div class="mobile-lang" style="display:none">\n' +
        '    <a href="' + enHref + '"' + (!isZh ? ' class="active"' : '') + '>English</a>' +
        '<a href="' + zhHref + '"' + (isZh ? ' class="active"' : '') + '>中文</a>\n' +
        '  </div>\n' +
        '  <a href="' + base + 'contact.html" class="mobile-cta">' + cta + '</a>\n' +
        '</div>';

      const burger     = this.querySelector('#nav-burger');
      const mobileMenu = this.querySelector('#mobile-menu');
      const navEl      = this.querySelector('#top-nav');

      // ── Desktop dropdowns ──────────────────────────────────────
      const closeAllDesktopDropdowns = (except) => {
        document.querySelectorAll('.nav-links .has-dropdown.open').forEach(li => {
          if (li !== except) {
            li.classList.remove('open');
            const a = li.querySelector('a');
            if (a) a.setAttribute('aria-expanded', 'false');
          }
        });
      };

      this.querySelectorAll('.nav-links .has-dropdown').forEach(li => {
        const trigger  = li.querySelector('a');
        const dropdown = li.querySelector('.nav-dropdown');
        const items    = dropdown ? Array.from(dropdown.querySelectorAll('a')) : [];

        const openDrop = () => {
          closeAllDesktopDropdowns(li);
          li.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        };
        const closeDrop = () => {
          li.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        };

        li.addEventListener('mouseenter', () => {
          trigger.setAttribute('aria-expanded', 'true');
        });
        li.addEventListener('mouseleave', () => {
          if (!li.classList.contains('open')) {
            trigger.setAttribute('aria-expanded', 'false');
          }
        });

        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            openDrop();
            if (items[0]) items[0].focus();
          }
        });

        li.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && li.classList.contains('open')) {
            closeDrop();
            trigger.focus();
          }
        });
      });

      // ── Mobile dropdowns ───────────────────────────────────────
      mobileMenu.querySelectorAll('.has-dropdown').forEach(li => {
        const btn = li.querySelector('.mobile-dropdown-toggle');
        const sub = li.querySelector('.mobile-sub');

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = li.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          sub.setAttribute('aria-hidden', open ? 'false' : 'true');
        });
      });

      // ── Mobile burger ──────────────────────────────────────────
      burger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      window.closeMobile = function () {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      };

      mobileMenu.querySelectorAll('ul a').forEach(a => {
        a.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
        closeAllDesktopDropdowns(null);
      });

      this.querySelectorAll('.lang-switcher .lang-pill, .mobile-lang a').forEach(a => {
        a.addEventListener('click', () => {
          sessionStorage.setItem('restoreScroll', window.scrollY);
        });
      });

      const savedScroll = sessionStorage.getItem('restoreScroll');
      if (savedScroll !== null) {
        sessionStorage.removeItem('restoreScroll');
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
      }

      window.addEventListener('scroll', () => {
        navEl.style.background = window.scrollY > 60
          ? 'rgba(215,216,219,0.96)'
          : 'rgba(225,226,229,0.90)';
      }, { passive: true });
    }
  }

  customElements.define('site-navbar', SiteNavbar);
}());
