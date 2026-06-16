(function () {
  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';

      const path = window.location.pathname;
      const isZh = path.includes('/zh/');
      const imgBase = isZh ? '../' : '';

      // Determine current page filename
      const pathParts = path.split('/');
      let pageName = pathParts[pathParts.length - 1];
      if (!pageName || !pageName.endsWith('.html')) pageName = 'index.html';

      // Nav structure — items with `subs` render a dropdown
      const navDef = [
        { en: 'Home', zh: '首页', href: 'index.html' },
        {
          en: 'About Us', zh: '关于我们', href: 'about.html',
          subs: [
            { en: 'Who We Are',       zh: '公司介绍',  href: 'about.html#who-we-are' },
            { en: 'Mission & Vision', zh: '使命与愿景', href: 'about.html#mission-vision' },
            { en: 'Our Values',       zh: '核心价值观', href: 'about.html#values' },
          ]
        },
        {
          en: 'Products', zh: '产品', href: 'products.html',
          subs: [
            { en: 'Sealing Materials', zh: '密封材料', href: 'products.html#sealing-materials' },
            { en: 'Soil Conditioning', zh: '土体改良', href: 'products.html#soil-conditioning' },
          ]
        },
        {
          en: 'Services', zh: '服务', href: 'services.html',
          subs: [
            { en: 'Technical Partnership', zh: '技术合作', href: 'services.html#overview' },
            { en: 'What We Deliver',       zh: '服务内容', href: 'services.html#what-we-deliver' },
            { en: 'Our Process',           zh: '合作流程', href: 'services.html#process' },
          ]
        },
        {
          en: 'References', zh: '项目参考', href: 'references.html',
          subs: [
            { en: 'Featured Project',    zh: '精选案例', href: 'references.html#featured-project' },
            { en: 'Project Portfolio',   zh: '项目组合', href: 'references.html#portfolio' },
            { en: 'Client Testimonials', zh: '客户评价', href: 'references.html#testimonials' },
          ]
        },
        { en: 'Contact', zh: '联系我们', href: 'contact.html' },
      ];

      // Map page filename to top-level nav index
      const pageMap = {
        'index.html': 0, 'about.html': 1, 'products.html': 2,
        'services.html': 3, 'references.html': 4, 'contact.html': 5,
      };
      if (pageName.startsWith('product-')) pageMap[pageName] = 2;
      const activeIdx = pageMap[pageName] ?? -1;

      const lbl         = function (item) { return isZh ? item.zh : item.en; };
      const cta         = isZh ? '获取报价' : 'Get a Quote';
      const burgerLabel = isZh ? '打开菜单' : 'Open menu';

      const enHref = isZh ? '../' + pageName : pageName;
      const zhHref = isZh ? pageName : 'zh/' + pageName;

      // Chevron SVG — embedded inside <a> for desktop, inside <button> for mobile
      const chevronSvg = '<svg class="chevron" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg>';

      // Desktop: chevron lives inside the <a> — no separate button, so all items align identically
      const desktopLinks = navDef.map(function (item, i) {
        var isActive    = i === activeIdx;
        var activeClass = isActive ? ' class="active"' : '';
        if (item.subs) {
          var dropId   = 'nav-drop-' + i;
          var subLinks = item.subs.map(function (sub) {
            return '<li><a href="' + sub.href + '">' + lbl(sub) + '</a></li>';
          }).join('');
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

      // Mobile: separate chevron button so the main link still navigates on tap
      const mobileLinks = navDef.map(function (item, i) {
        if (item.subs) {
          var mDropId  = 'mob-drop-' + i;
          var subLinks = item.subs.map(function (sub) {
            return '<li><a href="' + sub.href + '">' + lbl(sub) + '</a></li>';
          }).join('');
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
        '    <a href="index.html" class="nav-logo"><img src="' + imgBase + 'brand_assets/centor-logo-transparent.png" alt="CENTOR" /></a>\n' +
        '    <ul class="nav-links">' + desktopLinks + '</ul>\n' +
        '    <a href="contact.html" class="btn-nav desktop-only">' + cta + '</a>\n' +
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
        '  <a href="contact.html" class="mobile-cta">' + cta + '</a>\n' +
        '</div>';

      var burger     = this.querySelector('#nav-burger');
      var mobileMenu = this.querySelector('#mobile-menu');
      var navEl      = this.querySelector('#top-nav');

      // ── Desktop dropdowns ──────────────────────────────────────
      function closeAllDesktopDropdowns(except) {
        document.querySelectorAll('.nav-links .has-dropdown.open').forEach(function (li) {
          if (li !== except) {
            li.classList.remove('open');
            var a = li.querySelector('a');
            if (a) a.setAttribute('aria-expanded', 'false');
          }
        });
      }

      this.querySelectorAll('.nav-links .has-dropdown').forEach(function (li) {
        var trigger  = li.querySelector('a');
        var dropdown = li.querySelector('.nav-dropdown');
        var items    = dropdown ? Array.prototype.slice.call(dropdown.querySelectorAll('a')) : [];

        function openDrop() {
          closeAllDesktopDropdowns(li);
          li.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        function closeDrop() {
          li.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }

        // Hover: CSS :hover handles visibility; JS keeps aria-expanded in sync
        li.addEventListener('mouseenter', function () {
          trigger.setAttribute('aria-expanded', 'true');
        });
        li.addEventListener('mouseleave', function () {
          if (!li.classList.contains('open')) {
            trigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Keyboard — Arrow Down on the trigger opens the dropdown and moves focus in
        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            openDrop();
            if (items[0]) items[0].focus();
          }
        });

        // Keyboard — Escape anywhere inside the <li> closes and returns focus
        li.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && li.classList.contains('open')) {
            closeDrop();
            trigger.focus();
          }
        });
      });

      // ── Mobile dropdowns ───────────────────────────────────────
      mobileMenu.querySelectorAll('.has-dropdown').forEach(function (li) {
        var btn = li.querySelector('.mobile-dropdown-toggle');
        var sub = li.querySelector('.mobile-sub');

        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          var open = li.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          sub.setAttribute('aria-hidden', open ? 'false' : 'true');
        });
      });

      // ── Mobile burger ──────────────────────────────────────────
      burger.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      window.closeMobile = function () {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      };

      mobileMenu.querySelectorAll('ul a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });

      // ── Outside click: close mobile menu + all desktop dropdowns
      document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
        closeAllDesktopDropdowns(null);
      });

      // ── Language switcher: preserve scroll position ───────────
      this.querySelectorAll('.lang-switcher .lang-pill, .mobile-lang a').forEach(function (a) {
        a.addEventListener('click', function () {
          sessionStorage.setItem('restoreScroll', window.scrollY);
        });
      });

      var savedScroll = sessionStorage.getItem('restoreScroll');
      if (savedScroll !== null) {
        sessionStorage.removeItem('restoreScroll');
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
      }

      // ── Nav background on scroll ───────────────────────────────
      window.addEventListener('scroll', function () {
        navEl.style.background = window.scrollY > 60
          ? 'rgba(215,216,219,0.96)'
          : 'rgba(225,226,229,0.90)';
      }, { passive: true });

    }
  }

  customElements.define('site-navbar', SiteNavbar);
})();
