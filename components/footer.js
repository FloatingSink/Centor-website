(function () {
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';

      var path = window.location.pathname;
      var isZh = path.includes('/zh/');
      var imgBase = isZh ? '../' : '';

      var t = isZh ? {
        desc: '专为 TBM 及地下工程系统研制的工程级润滑与调节产品，深受全球领先承包商信赖。',
        navHead: '导航',
        navLinks: [
          { href: 'index.html',      label: '首页' },
          { href: 'about.html',      label: '关于我们' },
          { href: 'products.html',   label: '产品' },
          { href: 'services.html',   label: '服务' },
          { href: 'references.html', label: '项目参考' },
          { href: 'contact.html',    label: '联系我们' },
        ],
        prodHead: '产品',
        prodLinks: [
          { href: 'product-main-bearing-sealant.html',  label: '主轴承密封脂' },
          { href: 'product-tail-seal-grease.html',      label: '盾尾密封脂' },
          { href: 'product-tail-sealant-handcoat.html', label: '盾尾密封手涂剂' },
          { href: 'product-main-bearing-grease.html',   label: '主轴承润滑脂' },
          { href: 'product-foam-agents.html',           label: '泡沫剂' },
        ],
        contactHead: '联系我们',
        hqLabel:    '全球总部',
        hqVal:      '新加坡 · 全球',
        emailLabel: '邮箱',
        phoneLabel: '电话',
        copy:       '© 2025 CENTOR 地下系统解决方案。版权所有。',
        privacy:    '隐私政策',
        terms:      '使用条款',
      } : {
        desc: 'Engineering-grade lubrication and conditioning products for TBM and underground systems. Trusted by leading contractors worldwide.',
        navHead: 'Navigation',
        navLinks: [
          { href: 'index.html',      label: 'Home' },
          { href: 'about.html',      label: 'About Us' },
          { href: 'products.html',   label: 'Products' },
          { href: 'services.html',   label: 'Services' },
          { href: 'references.html', label: 'References' },
          { href: 'contact.html',    label: 'Contact' },
        ],
        prodHead: 'Products',
        prodLinks: [
          { href: 'product-main-bearing-sealant.html',  label: 'Main Bearing Sealant' },
          { href: 'product-tail-seal-grease.html',      label: 'Tail Seal Grease' },
          { href: 'product-tail-sealant-handcoat.html', label: 'Tail Sealant Hand-coat' },
          { href: 'product-main-bearing-grease.html',   label: 'Main Bearing Grease' },
          { href: 'product-foam-agents.html',           label: 'Foam Agents' },
        ],
        contactHead: 'Contact',
        hqLabel:    'Global HQ',
        hqVal:      'Singapore · Global',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        copy:       '© 2025 CENTOR Underground System Solutions. All rights reserved.',
        privacy:    'Privacy Policy',
        terms:      'Terms of Use',
      };

      var navLinksHtml = t.navLinks.map(function (l) {
        return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
      }).join('');

      var prodLinksHtml = t.prodLinks.map(function (l) {
        return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
      }).join('');

      this.innerHTML =
        '<footer>\n' +
        '  <div class="container">\n' +
        '    <div class="footer-grid">\n' +
        '      <div class="footer-brand">\n' +
        '        <div class="footer-logo"><img src="' + imgBase + 'brand_assets/centor-logo-transparent.png" alt="CENTOR" /></div>\n' +
        '        <p class="footer-desc">' + t.desc + '</p>\n' +
        '        <div class="footer-socials"><a href="#" class="social-btn" aria-label="LinkedIn">in</a></div>\n' +
        '      </div>\n' +
        '      <div>\n' +
        '        <div class="footer-col-head">' + t.navHead + '</div>\n' +
        '        <ul class="footer-links">' + navLinksHtml + '</ul>\n' +
        '      </div>\n' +
        '      <div>\n' +
        '        <div class="footer-col-head">' + t.prodHead + '</div>\n' +
        '        <ul class="footer-links">' + prodLinksHtml + '</ul>\n' +
        '      </div>\n' +
        '      <div>\n' +
        '        <div class="footer-col-head">' + t.contactHead + '</div>\n' +
        '        <div class="footer-contact">\n' +
        '          <div class="contact-item"><div class="contact-label">' + t.hqLabel + '</div><div class="contact-val">' + t.hqVal + '</div></div>\n' +
        '          <div class="contact-item"><div class="contact-label">' + t.emailLabel + '</div><div class="contact-val"><a href="mailto:info@centorglobal.com">info@centorglobal.com</a></div></div>\n' +
        '          <div class="contact-item"><div class="contact-label">' + t.phoneLabel + '</div><div class="contact-val"><a href="tel:+6562221800">+65 6222 1800</a></div></div>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '    <div class="footer-bottom">\n' +
        '      <p class="footer-copy">' + t.copy + '</p>\n' +
        '      <ul class="footer-legal"><li><a href="#">' + t.privacy + '</a></li><li><a href="#">' + t.terms + '</a></li></ul>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</footer>';
    }
  }

  customElements.define('site-footer', SiteFooter);
})();
