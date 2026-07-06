(function () {
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';

      const isZh = window.location.pathname.includes('/zh/');
      const isDe = window.location.pathname.includes('/de/');
      const isEs = window.location.pathname.includes('/es/');
      const isAr = window.location.pathname.includes('/ar/');
      const base = isZh ? '/zh/' : isDe ? '/de/' : isEs ? '/es/' : isAr ? '/ar/' : '/';

      const t = isAr ? {
        desc: 'منتجات تشحيم وتكييف هندسية لأنظمة التبم والأعمال تحت الأرض. موثوق بها من قِبل كبرى المقاولين حول العالم.',
        navHead: 'التنقل',
        navLinks: [
          { href: base,                    label: 'الرئيسية' },
          { href: base + 'about.html',     label: 'من نحن' },
          { href: base + 'products/',      label: 'المنتجات' },
          { href: base + 'services.html',  label: 'الخدمات' },
          { href: base + 'references.html',label: 'المراجع' },
          { href: base + 'contact.html',   label: 'اتصل بنا' },
        ],
        prodHead: 'المنتجات',
        prodLinks: [
          { href: base + 'products/main-bearing-sealant.html',  label: 'مادة ختم المحمل الرئيسي' },
          { href: base + 'products/main-bearing-grease.html',   label: 'شحم المحمل الرئيسي' },
          { href: base + 'products/tail-seal-grease.html',      label: 'شحم ختم الذيل' },
          { href: base + 'products/tail-sealant-handcoat.html', label: 'طلاء يدوي لختم الذيل' },
          { href: base + 'products/foam-agents.html',           label: 'عوامل الرغوة' },
        ],
        contactHead: 'اتصل بنا',
        hqLabel:    'المقر الرئيسي',
        hqVal:      'سنغافورة · عالميًا',
        emailLabel: 'البريد الإلكتروني',
        phoneLabel: 'الهاتف',
        copy:       '© 2025 CENTOR Underground System Solutions. جميع الحقوق محفوظة.',
        privacy:    'سياسة الخصوصية',
        terms:      'شروط الاستخدام',
      } : isEs ? {
        desc: 'Productos de lubricación y acondicionamiento de grado industrial para TBM y sistemas subterráneos. Confiados por los principales contratistas del mundo.',
        navHead: 'Navegación',
        navLinks: [
          { href: base,                    label: 'Inicio' },
          { href: base + 'about.html',     label: 'Nosotros' },
          { href: base + 'products/',      label: 'Productos' },
          { href: base + 'services.html',  label: 'Servicios' },
          { href: base + 'references.html',label: 'Referencias' },
          { href: base + 'contact.html',   label: 'Contacto' },
        ],
        prodHead: 'Productos',
        prodLinks: [
          { href: base + 'products/main-bearing-sealant.html',  label: 'Sellante Rodamiento Principal' },
          { href: base + 'products/main-bearing-grease.html',   label: 'Grasa Rodamiento Principal' },
          { href: base + 'products/tail-seal-grease.html',      label: 'Grasa Sello de Cola' },
          { href: base + 'products/tail-sealant-handcoat.html', label: 'Sellante Manual de Cola' },
          { href: base + 'products/foam-agents.html',           label: 'Agentes Espumantes' },
        ],
        contactHead: 'Contacto',
        hqLabel:    'Sede Global',
        hqVal:      'Singapur · Global',
        emailLabel: 'Correo',
        phoneLabel: 'Teléfono',
        copy:       '© 2025 CENTOR Underground System Solutions. Todos los derechos reservados.',
        privacy:    'Política de Privacidad',
        terms:      'Términos de Uso',
      } : isZh ? {
        desc: '专为 TBM 及地下工程系统研制的工程级润滑与调节产品，深受全球领先承包商信赖。',
        navHead: '导航',
        navLinks: [
          { href: base,                    label: '首页' },
          { href: base + 'about.html',     label: '关于我们' },
          { href: base + 'products/',      label: '产品' },
          { href: base + 'services.html',  label: '服务' },
          { href: base + 'references.html',label: '项目参考', maintenance: true },
          { href: base + 'contact.html',   label: '联系我们' },
        ],
        prodHead: '产品',
        prodLinks: [
          { href: base + 'products/main-bearing-sealant.html',  label: '主轴承密封脂' },
          { href: base + 'products/tail-seal-grease.html',      label: '盾尾密封脂' },
          { href: base + 'products/tail-sealant-handcoat.html', label: '盾尾密封手涂剂' },
          { href: base + 'products/main-bearing-grease.html',   label: '主轴承润滑脂' },
          { href: base + 'products/foam-agents.html',           label: '泡沫剂' },
        ],
        contactHead: '联系我们',
        hqLabel:    '全球总部',
        hqVal:      '新加坡 · 全球',
        emailLabel: '邮箱',
        phoneLabel: '电话',
        copy:       '© 2025 CENTOR 地下系统解决方案。版权所有。',
        privacy:    '隐私政策',
        terms:      '使用条款',
      } : isDe ? {
        desc: 'Technische Schmier- und Konditionierungsprodukte für TBM und Untertagewerke. Vertraut bei führenden Auftragnehmern weltweit.',
        navHead: 'Navigation',
        navLinks: [
          { href: base,                    label: 'Startseite' },
          { href: base + 'about.html',     label: 'Über uns' },
          { href: base + 'products/',      label: 'Produkte' },
          { href: base + 'services.html',  label: 'Leistungen' },
          { href: base + 'references.html',label: 'Referenzen' },
          { href: base + 'contact.html',   label: 'Kontakt' },
        ],
        prodHead: 'Produkte',
        prodLinks: [
          { href: base + 'products/main-bearing-sealant.html',  label: 'Hauptlager-Dichtfett' },
          { href: base + 'products/main-bearing-grease.html',   label: 'Hauptlager-Schmierfett' },
          { href: base + 'products/tail-seal-grease.html',      label: 'Schildschwanzfett' },
          { href: base + 'products/tail-sealant-handcoat.html', label: 'Schildschwanz-Handabdichtung' },
          { href: base + 'products/foam-agents.html',           label: 'Schaumzusätze' },
        ],
        contactHead: 'Kontakt',
        hqLabel:    'Hauptsitz',
        hqVal:      'Singapur · Weltweit',
        emailLabel: 'E-Mail',
        phoneLabel: 'Telefon',
        copy:       '© 2025 CENTOR Underground System Solutions. Alle Rechte vorbehalten.',
        privacy:    'Datenschutzrichtlinie',
        terms:      'Nutzungsbedingungen',
      } : {
        desc: 'Engineering-grade lubrication and conditioning products for TBM and underground systems. Trusted by leading contractors worldwide.',
        navHead: 'Navigation',
        navLinks: [
          { href: base,                    label: 'Home' },
          { href: base + 'about.html',     label: 'About Us' },
          { href: base + 'products/',      label: 'Products' },
          { href: base + 'services.html',  label: 'Services' },
          { href: base + 'references.html',label: 'References', maintenance: true },
          { href: base + 'contact.html',   label: 'Contact' },
        ],
        prodHead: 'Products',
        prodLinks: [
          { href: base + 'products/main-bearing-sealant.html',  label: 'Main Bearing Sealant' },
          { href: base + 'products/main-bearing-grease.html',   label: 'Main Bearing Grease' },
          { href: base + 'products/tail-seal-grease.html',      label: 'Tail Seal Grease' },
          { href: base + 'products/tail-sealant-handcoat.html', label: 'Tail Sealant Hand-coat' },
          { href: base + 'products/foam-agents.html',           label: 'Foam Agents' },
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

      if (!document.getElementById('footer-maint-styles')) {
        var fs = document.createElement('style');
        fs.id = 'footer-maint-styles';
        fs.textContent = [
          '.footer-maint-wrap { position: relative; display: inline-block; }',
          '.footer-maint-tip {',
          '  display: none; position: absolute; bottom: calc(100% + 8px); left: 50%;',
          '  transform: translateX(-50%); white-space: nowrap;',
          '  background: #3a3d40; color: #f0f1f2;',
          '  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;',
          '  padding: 6px 12px; border-radius: 3px; z-index: 300; pointer-events: none;',
          '}',
          '.footer-maint-tip::after {',
          '  content: ""; position: absolute; top: 100%; left: 50%;',
          '  transform: translateX(-50%);',
          '  border: 5px solid transparent; border-top-color: #3a3d40;',
          '}',
          '.footer-maint-wrap:hover .footer-maint-tip { display: block; }',
        ].join(' ');
        document.head.appendChild(fs);
      }

      var maintTip = isZh ? '维护中' : 'Under Maintenance';
      const navLinksHtml  = t.navLinks.map(l => {
        if (l.maintenance) {
          return '<li><span class="footer-maint-wrap"><a href="' + l.href + '" style="color:rgba(20,22,26,0.22);pointer-events:none;cursor:default;">' + l.label + '</a><div class="footer-maint-tip">' + maintTip + '</div></span></li>';
        }
        return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
      }).join('');

      const prodLinksHtml = t.prodLinks.map(l =>
        '<li><a href="' + l.href + '">' + l.label + '</a></li>'
      ).join('');

      this.innerHTML =
        '<footer>\n' +
        '  <div class="container">\n' +
        '    <div class="footer-grid">\n' +
        '      <div class="footer-brand">\n' +
        '        <div class="footer-logo"><img src="/assets/brand/centor-full-logo.png" alt="CENTOR" /></div>\n' +
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
        '          <div class="contact-item"><div class="contact-label">' + t.phoneLabel + '</div><div class="contact-val"><a href="tel: ~ ">To be updated</a></div></div>\n' +
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
}());
