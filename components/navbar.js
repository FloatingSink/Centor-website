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

      // Map page to nav link index (0-5)
      const pageMap = {
        'index.html': 0, 'about.html': 1, 'products.html': 2,
        'services.html': 3, 'references.html': 4, 'contact.html': 5,
      };
      // Product detail pages highlight Products
      if (pageName.startsWith('product-')) pageMap[pageName] = 2;
      const activeIdx = pageMap[pageName] ?? -1;

      const t = isZh ? {
        links: ['首页', '关于我们', '产品', '服务', '项目参考', '联系我们'],
        hrefs: ['index.html', 'about.html', 'products.html', 'services.html', 'references.html', 'contact.html'],
        cta: '获取报价',
        burgerLabel: '打开菜单',
        langLabel: '中文',
      } : {
        links: ['Home', 'About Us', 'Products', 'Services', 'References', 'Contact'],
        hrefs: ['index.html', 'about.html', 'products.html', 'services.html', 'references.html', 'contact.html'],
        cta: 'Get a Quote',
        burgerLabel: 'Open menu',
        langLabel: 'EN',
      };

      // Language switcher: link to the same page in the other language
      const enHref = isZh ? '../' + pageName : pageName;
      const zhHref = isZh ? pageName : 'zh/' + pageName;

      const desktopLinks = t.hrefs.map((href, i) =>
        '<li><a href="' + href + '"' + (i === activeIdx ? ' class="active"' : '') + '>' + t.links[i] + '</a></li>'
      ).join('');

      const mobileLinks = t.hrefs.map((href, i) =>
        '<li><a href="' + href + '">' + t.links[i] + '</a></li>'
      ).join('');

      const globeSvg = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="7" r="6"/><path d="M7 1c-2 2.5-2 10.5 0 12M7 1c2 2.5 2 10.5 0 12M1 7h12"/></svg>';

      this.innerHTML =
        '<nav id="top-nav">\n' +
        '  <div class="nav-inner">\n' +
        '    <a href="index.html" class="nav-logo"><img src="' + imgBase + 'brand_assets/centor-logo-transparent.png" alt="CENTOR" /></a>\n' +
        '    <ul class="nav-links">' + desktopLinks + '</ul>\n' +
        '    <a href="contact.html" class="btn-nav desktop-only">' + t.cta + '</a>\n' +
        '    <div class="lang-switcher" id="lang-switcher">\n' +
        '      <button class="lang-btn" id="lang-btn" aria-label="Language / 语言" aria-expanded="false">\n' +
        '        ' + globeSvg + '\n' +
        '        ' + t.langLabel + '\n' +
        '      </button>\n' +
        '      <div class="lang-menu">\n' +
        '        <a href="' + enHref + '" class="lang-opt' + (!isZh ? ' active' : '') + '">English</a>\n' +
        '        <a href="' + zhHref + '" class="lang-opt' + (isZh ? ' active' : '') + '">中文</a>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <button class="nav-burger" id="nav-burger" aria-label="' + t.burgerLabel + '" aria-expanded="false"><span></span><span></span><span></span></button>\n' +
        '  </div>\n' +
        '</nav>\n' +
        '<div class="mobile-menu" id="mobile-menu">\n' +
        '  <ul>' + mobileLinks + '</ul>\n' +
        '  <div class="mobile-lang">\n' +
        '    <a href="' + enHref + '"' + (!isZh ? ' class="active"' : '') + '>English</a>' +
        '<a href="' + zhHref + '"' + (isZh ? ' class="active"' : '') + '>中文</a>\n' +
        '  </div>\n' +
        '  <a href="contact.html" class="mobile-cta">' + t.cta + '</a>\n' +
        '</div>';

      var burger = this.querySelector('#nav-burger');
      var mobileMenu = this.querySelector('#mobile-menu');
      var navEl = this.querySelector('#top-nav');
      var ls = this.querySelector('#lang-switcher');
      var lb = this.querySelector('#lang-btn');

      // Mobile menu burger toggle
      burger.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      // Global helper for any legacy onclick="closeMobile()" references
      window.closeMobile = function () {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      };

      // Close mobile menu when a nav link is clicked
      mobileMenu.querySelectorAll('ul a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });

      // Nav background on scroll
      window.addEventListener('scroll', function () {
        navEl.style.background = window.scrollY > 60
          ? 'rgba(215,216,219,0.96)'
          : 'rgba(225,226,229,0.90)';
      }, { passive: true });

      // Language switcher dropdown
      lb.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = ls.classList.toggle('open');
        lb.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('click', function () {
        ls.classList.remove('open');
        lb.setAttribute('aria-expanded', 'false');
      });
    }
  }

  customElements.define('site-navbar', SiteNavbar);
})();
