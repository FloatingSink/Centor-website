(function () {
  class LangBubble extends HTMLElement {
    connectedCallback() {
      this.style.display = 'contents';

      // Detect the current language prefix so the contact link stays on the same site version
      const path = window.location.pathname;
      const langPrefix = path.startsWith('/zh/') ? '/zh'
                       : path.startsWith('/de/') ? '/de'
                       : path.startsWith('/es/') ? '/es'
                       : path.startsWith('/ar/') ? '/ar'
                       : '';
      const contactBase = langPrefix + '/contact.html';

      // Each language tag deep-links to the current site's contact page at the right office
      // sg = Singapore, to = Tokyo, de = Germany
      const LANGS = [
        { flag: '🇬🇧', name: 'English',    office: 'sg' },
        { flag: '🇨🇳', name: '中文',        office: 'sg' },
        { flag: '🇰🇷', name: '한국어',      office: 'to' },
        { flag: '🇯🇵', name: '日本語',      office: 'to' },
        { flag: '🇪🇸', name: 'Español',    office: 'sg' },
        { flag: '🇫🇷', name: 'Français',   office: 'de' },
        { flag: '🇩🇪', name: 'Deutsch',    office: 'de' },
        { flag: '🇳🇱', name: 'Nederlands', office: 'sg' },
        { flag: '🇸🇦', name: 'العربية',    office: 'sg' },
      ];

      const tagsHtml = LANGS.map(l =>
        `<a class="lb-tag" href="${contactBase}?office=${l.office}#offices"><span class="lb-flag">${l.flag}</span>${l.name}</a>`
      ).join('');

      this.innerHTML =
        `<style>
          .lb-wrap{position:fixed;bottom:28px;right:28px;z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:10px;}
          .lb-panel{position:relative;width:290px;background:var(--bg,#fff);border:1px solid rgba(184,138,60,0.35);box-shadow:0 12px 40px rgba(0,0,0,0.13),0 2px 8px rgba(0,0,0,0.07);padding:18px 20px 16px;opacity:0;transform:translateY(8px) scale(0.97);transition:opacity 0.22s ease,transform 0.22s ease;pointer-events:none;}
          .lb-panel.lb-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}
          .lb-eyebrow{font-family:var(--font-ui,'Inter',sans-serif);font-size:9px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:var(--gold,#B88A3C);margin-bottom:7px;}
          .lb-title{font-size:13.5px;font-weight:600;color:var(--charcoal,#1e2024);line-height:1.4;margin-bottom:12px;}
          .lb-tags{display:flex;flex-wrap:wrap;gap:6px;}
          .lb-tag{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--charcoal-2,#3a3d42);background:var(--bg-2,#f5f4f2);border:1px solid var(--border,rgba(0,0,0,0.10));padding:4px 9px;line-height:1;text-decoration:none;transition:border-color 0.15s,color 0.15s,background-color 0.15s;}
          .lb-tag:hover{border-color:rgba(184,138,60,0.55);color:var(--gold,#B88A3C);background-color:var(--gold-dim,rgba(184,138,60,0.07));}
          .lb-flag{font-size:13px;line-height:1;}
          .lb-trigger{display:flex;align-items:center;gap:9px;background:var(--bg,#fff);border:1px solid rgba(184,138,60,0.45);box-shadow:0 4px 18px rgba(0,0,0,0.13);padding:11px 16px;cursor:pointer;font-family:var(--font-ui,'Inter',sans-serif);font-size:12px;font-weight:600;color:var(--charcoal,#1e2024);letter-spacing:0.04em;transition:border-color 0.18s,box-shadow 0.18s;}
          .lb-trigger:hover{border-color:var(--gold,#B88A3C);box-shadow:0 6px 24px rgba(184,138,60,0.18);}
          .lb-trigger-icon{font-size:18px;line-height:1;flex:none;}
          .lb-close{position:absolute;top:10px;right:12px;background:none;border:none;cursor:pointer;font-size:15px;color:var(--text-faint,rgba(58,61,66,0.45));line-height:1;padding:2px 4px;transition:color 0.15s;}
          .lb-close:hover{color:var(--charcoal,#1e2024);}
          @media(max-width:480px){.lb-wrap{bottom:16px;right:16px;}.lb-panel{width:calc(100vw - 32px);}}
        </style>
        <div class="lb-wrap">
          <div class="lb-panel lb-open" id="lb-panel" role="region" aria-label="Multilingual support">
            <button class="lb-close" id="lb-close" aria-label="Close">&#x2715;</button>
            <div class="lb-eyebrow">Multilingual Support</div>
            <div class="lb-title">Our agents cater to clients in 9 languages</div>
            <div class="lb-tags">${tagsHtml}</div>
          </div>
          <button class="lb-trigger" id="lb-trigger" aria-expanded="true" aria-controls="lb-panel">
            <span class="lb-trigger-icon">&#127760;</span>
            <span>We speak your language</span>
          </button>
        </div>`;

      const panel   = this.querySelector('#lb-panel');
      const trigger = this.querySelector('#lb-trigger');
      const close   = this.querySelector('#lb-close');

      let open = true;

      function show() {
        open = true;
        panel.classList.add('lb-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function hide() {
        open = false;
        panel.classList.remove('lb-open');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', () => open ? hide() : show());
      close.addEventListener('click', hide);
    }
  }

  customElements.define('lang-bubble', LangBubble);
})();
