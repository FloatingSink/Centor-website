(function () {
  class ContactGlobe extends HTMLElement {
    async connectedCallback() {
      this.style.display = 'contents';

      const path = window.location.pathname;
      const isAr = path.includes('/ar/');
      const lang = path.includes('/zh/') ? 'zh'
                 : path.includes('/de/') ? 'de'
                 : path.includes('/es/') ? 'es'
                 : isAr ? 'ar' : 'en';
      const t = obj => obj[lang] !== undefined ? obj[lang] : obj.en;

      /* ── Translations ── */
      const STR = {
        eyebrow: { en: 'Global Presence',   zh: '全球业务布局',    de: 'Globale Präsenz',  es: 'Presencia Global',  ar: 'الحضور العالمي' },
        h2:      { en: 'Our <em>Offices</em>', zh: '我们的<em>办公室</em>', de: 'Unsere <em>Büros</em>', es: 'Nuestras <em>Oficinas</em>', ar: 'مكاتبنا <em>حول العالم</em>' },
        lede:    { en: 'Singapore · Hong Kong · Tokyo · Dubai · Panama · Germany', zh: '新加坡 · 香港 · 东京 · 迪拜 · 巴拿马 · 德国', de: 'Singapur · Hongkong · Tokio · Dubai · Panama · Deutschland', es: 'Singapur · Hong Kong · Tokio · Dubái · Panamá · Alemania', ar: 'سنغافورة · هونغ كونغ · طوكيو · دبي · بنما · ألمانيا' },
        lContact:{ en: 'Contact Person', zh: '联系人',   de: 'Ansprechpartner',   es: 'Persona de Contacto', ar: 'شخص الاتصال' },
        lAddr:   { en: 'Address',        zh: '地址',     de: 'Adresse',           es: 'Dirección',           ar: 'العنوان' },
        lPhone:  { en: 'Phone',          zh: '电话',     de: 'Telefon',           es: 'Teléfono',            ar: 'الهاتف' },
        lEmail:  { en: 'Email',          zh: '电子邮箱', de: 'E-Mail',            es: 'Email',               ar: 'البريد الإلكتروني' },
        sgHead:  { en: 'Singapore — Global Headquarters', zh: '新加坡 — 全球总部', de: 'Singapur — Hauptsitz', es: 'Singapur — Sede Global', ar: 'سنغافورة — المقر الرئيسي العالمي' },
        sgName:  { en: 'Yu Jia Long', zh: '于嘉龙', de: 'Jia Long Yu', es: 'Yu Jia Long', ar: 'يو جيا لونغ' },
        sgPhone: { en: 'To be updated', zh: '待更新', de: 'Wird aktualisiert', es: 'Por actualizar', ar: 'سيتم التحديث' },
        hkHead:  { en: 'Hong Kong — Asia Pacific', zh: '香港 — 亚太区', de: 'Hongkong — Asien-Pazifik', es: 'Hong Kong — Asia Pacífico', ar: 'هونغ كونغ — آسيا والمحيط الهادئ' },
        toHead:  { en: 'Tokyo — Northeast Asia', zh: '东京 — 东北亚', de: 'Tokio — Nordostasien', es: 'Tokio — Noreste de Asia', ar: 'طوكيو — شمال شرق آسيا' },
        paHead:  { en: 'Panama — Latin America', zh: '巴拿马 — 拉丁美洲', de: 'Panama — Lateinamerika', es: 'Panamá — Latinoamérica', ar: 'بنما — أمريكا اللاتينية' },
        deHead:  { en: 'Germany — Europe', zh: '德国 — 欧洲', de: 'Deutschland — Europa', es: 'Alemania — Europa', ar: 'ألمانيا — أوروبا' },
        offHead: { en: 'Global Offices', zh: null, de: null, es: 'Oficinas Globales', ar: 'المكاتب العالمية' },
        offHq:   { en: 'Singapore HQ',  zh: null, de: null, es: 'Singapur HQ',       ar: 'سنغافورة — المقر' },
        offHk:   { en: 'Hong Kong',     zh: null, de: null, es: 'Hong Kong',         ar: 'هونغ كونغ' },
        offTo:   { en: 'Tokyo',         zh: null, de: null, es: 'Tokio',             ar: 'طوكيو' },
        offPa:   { en: 'Panama',        zh: null, de: null, es: 'Panamá',             ar: 'بنما' },
        offDe:   { en: 'Germany',       zh: null, de: null, es: 'Alemania',           ar: 'ألمانيا' },
      };

      /* ── Office data per language ── */
      const OFFICES = {
        en: [
          { id: 'sg', lat:  1.290270, lng: 103.851959, label: 'Singapore',   region: 'Global HQ',       address: '151 Chin Swee Road, #09-08\nManhattan House\nSingapore 169876' },
          { id: 'hk', lat: 22.302711, lng: 114.177216, label: 'Hong Kong',   region: 'Asia Pacific',    address: 'Room 1101, 11/F., David House\n8-20 Nanking Street, Jordan\nHong Kong' },
          { id: 'to', lat: 35.625200, lng: 139.729400, label: 'Tokyo',       region: 'Northeast Asia',  address: 'Shinagawa-ku\nTokyo, Japan' },
          { id: 'du', lat: 25.276987, lng:  55.296249, label: 'Dubai',       region: 'Middle East',     address: 'Dubai\nUnited Arab Emirates' },
          { id: 'pa', lat:  8.990000, lng: -79.520000, label: 'Panama',      region: 'Latin America',   address: 'P.H. BICSA Financial Center\nOficina 4007\nPanamá City' },
          { id: 'de', lat: 48.330000, lng:   7.870000, label: 'Germany',     region: 'Europe',          address: 'Schlittengasse 17\n77933 Lahr\nDeutschland' },
        ],
        zh: [
          { id: 'sg', lat:  1.290270, lng: 103.851959, label: '新加坡', region: '全球总部',  address: '151 Chin Swee Road, #09-08\n曼哈顿大厦\n新加坡 169876' },
          { id: 'hk', lat: 22.302711, lng: 114.177216, label: '香港',   region: '亚太区',    address: 'Room 1101, 11/F., David House\n8-20 Nanking Street, Jordan\n中国香港' },
          { id: 'to', lat: 35.625200, lng: 139.729400, label: '东京',   region: '东北亚',    address: '品川区\n东京\n日本' },
          { id: 'du', lat: 25.276987, lng:  55.296249, label: '迪拜',   region: '中东',      address: '迪拜\n阿拉伯联合酋长国' },
          { id: 'pa', lat:  8.990000, lng: -79.520000, label: '巴拿马', region: '拉丁美洲',  address: 'P.H. BICSA金融中心\n4007室\n巴拿马城' },
          { id: 'de', lat: 48.330000, lng:   7.870000, label: '德国',   region: '欧洲',      address: 'Schlittengasse 17\n77933 Lahr\n德国' },
        ],
        de: [
          { id: 'sg', lat:  1.290270, lng: 103.851959, label: 'Singapur',    region: 'Hauptsitz',       address: '151 Chin Swee Road, #09-08\nManhattan House\nSingapur 169876' },
          { id: 'hk', lat: 22.302711, lng: 114.177216, label: 'Hongkong',    region: 'Asien-Pazifik',   address: 'Room 1101, 11/F., David House\n8-20 Nanking Street, Jordan\nHongkong' },
          { id: 'to', lat: 35.625200, lng: 139.729400, label: 'Tokio',       region: 'Nordostasien',    address: 'Shinagawa-ku\nTokio, Japan' },
          { id: 'du', lat: 25.276987, lng:  55.296249, label: 'Dubai',       region: 'Naher Osten',     address: 'Dubai\nVereinigte Arabische Emirate' },
          { id: 'pa', lat:  8.990000, lng: -79.520000, label: 'Panama',      region: 'Lateinamerika',   address: 'P.H. BICSA Financial Center\nOfficina 4007\nPanama-Stadt' },
          { id: 'de', lat: 48.330000, lng:   7.870000, label: 'Deutschland', region: 'Europa',          address: 'Schlittengasse 17\n77933 Lahr\nDeutschland' },
        ],
        es: [
          { id: 'sg', lat:  1.290270, lng: 103.851959, label: 'Singapur',  region: 'Sede Global',   address: '151 Chin Swee Road, #09-08\nManhattan House\nSingapur 169876' },
          { id: 'hk', lat: 22.302711, lng: 114.177216, label: 'Hong Kong', region: 'Asia Pacífico', address: 'Room 1101, 11/F., David House\n8-20 Nanking Street, Jordan\nHong Kong' },
          { id: 'to', lat: 35.625200, lng: 139.729400, label: 'Tokio',     region: 'Noreste de Asia', address: 'Shinagawa-ku\nTokio, Japón' },
          { id: 'du', lat: 25.276987, lng:  55.296249, label: 'Dubái',     region: 'Oriente Medio', address: 'Dubái\nEmirates Árabes Unidos' },
          { id: 'pa', lat:  8.990000, lng: -79.520000, label: 'Panamá',    region: 'Latinoamérica', address: 'P.H. BICSA Financial Center\nOficina 4007\nCiudad de Panamá' },
          { id: 'de', lat: 48.330000, lng:   7.870000, label: 'Alemania',  region: 'Europa',        address: 'Schlittengasse 17\n77933 Lahr\nAlemania' },
        ],
        ar: [
          { id: 'sg', lat:  1.290270, lng: 103.851959, label: 'سنغافورة',  region: 'المقر الرئيسي',      address: '151 Chin Swee Road, #09-08\nManhattan House\nسنغافورة 169876' },
          { id: 'hk', lat: 22.302711, lng: 114.177216, label: 'هونغ كونغ', region: 'آسيا-المحيط الهادئ', address: 'Room 1101, 11/F., David House\n8-20 Nanking Street, Jordan\nهونغ كونغ' },
          { id: 'to', lat: 35.625200, lng: 139.729400, label: 'طوكيو',     region: 'شمال شرق آسيا',      address: 'Shinagawa-ku\nطوكيو، اليابان' },
          { id: 'du', lat: 25.276987, lng:  55.296249, label: 'دبي',        region: 'الشرق الأوسط',        address: 'دبي\nالإمارات العربية المتحدة' },
          { id: 'pa', lat:  8.990000, lng: -79.520000, label: 'بنما',       region: 'أمريكا اللاتينية',    address: 'P.H. BICSA Financial Center\nOficina 4007\nمدينة بنما' },
          { id: 'de', lat: 48.330000, lng:   7.870000, label: 'ألمانيا',    region: 'أوروبا',              address: 'Schlittengasse 17\n77933 Lahr\nDeutschland' },
        ],
      };

      const offices = OFFICES[lang];
      const showOfficesGrid = lang === 'en' || lang === 'es' || lang === 'ar';

      /* ── Legend HTML ── */
      const legendHtml = offices.map((o, i) =>
        `<div class="gleg">` +
          `<span class="gleg-dot${i === 0 ? ' gleg-hq' : ''}"></span>` +
          `<div><div class="gleg-city">${o.label}</div><div class="gleg-reg">${o.region}</div></div>` +
        `</div>`
      ).join('');

      /* ── Optional offices grid ── */
      const officesGridHtml = showOfficesGrid
        ? `<div class="ib offices-panel">` +
            `<div class="ib-head">${t(STR.offHead)}</div>` +
            `<div class="offices">` +
              `<div class="office active" data-slide="0">${t(STR.offHq)}</div>` +
              `<div class="office" data-slide="1">${t(STR.offHk)}</div>` +
              `<div class="office" data-slide="2">${t(STR.offTo)}</div>` +
              `<div class="office" data-slide="3">${t(STR.offPa)}</div>` +
              `<div class="office" data-slide="4">${t(STR.offDe)}</div>` +
            `</div>` +
          `</div>`
        : '';

      /* ── Arabic-specific CSS overrides ── */
      const arCss = isAr
        ? `[data-cg-ar] .globe-lbl{font-family:'Cairo',sans-serif;letter-spacing:0;text-transform:none;}` +
          `[data-cg-ar] .globe-card{text-align:right;}` +
          `[data-cg-ar] .gleg-city{font-family:'Cairo',sans-serif;letter-spacing:0;}` +
          `[data-cg-ar] .gleg-reg{letter-spacing:0;text-transform:none;}` +
          `[data-cg-ar] .gcard-city{letter-spacing:0;text-transform:none;}` +
          `[data-cg-ar] .gcard-region{letter-spacing:0;}` +
          `[data-cg-ar] .gcard-addr{font-family:'Cairo',sans-serif;}` +
          `[data-cg-ar] .ib-head{font-family:'Cairo',sans-serif;letter-spacing:0;text-transform:none;}` +
          `[data-cg-ar] .ib-label{letter-spacing:0;text-transform:none;}`
        : '';

      /* ── Inject HTML ── */
      this.innerHTML =
        `<style>` +
          `.globe-section{background:var(--bg);background-image:var(--metal-lines);border-top:1px solid var(--border);}` +
          `.globe-info-layout{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}` +
          `@media(max-width:960px){.globe-info-layout{grid-template-columns:1fr;gap:48px;}}` +
          `.globe-hd{margin-bottom:44px;}` +
          `.globe-stage{background:var(--bg);background-image:linear-gradient(145deg,rgba(0,0,0,0.015) 0%,transparent 55%);border:1px solid var(--gold-border);box-shadow:0 12px 48px rgba(0,0,0,0.10),inset 0 1px 0 rgba(255,255,255,0.90);padding:52px 40px 40px;display:flex;flex-direction:column;align-items:center;}` +
          `@media(max-width:600px){.globe-stage{padding:32px 20px 28px;}}` +
          `.globe-cvs-wrap{width:100%;max-width:440px;}` +
          `#cobe-canvas{display:block;width:100%;aspect-ratio:1;border-radius:50%;touch-action:none;cursor:grab;}` +
          `.globe-lbl{position:absolute;translate:-50% 0;margin-bottom:8px;padding:3px 9px;background:rgba(255,255,255,0.94);color:var(--charcoal);font-family:var(--font-ui);font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;white-space:nowrap;pointer-events:none;border:1px solid rgba(184,138,60,0.30);transition:opacity 0.25s ease;}` +
          `.globe-legend{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:30px;}` +
          `.gleg{display:flex;align-items:center;gap:10px;cursor:pointer;transition:opacity 0.18s ease;}.gleg:hover{opacity:0.72;}` +
          `.gleg-dot{width:8px;height:8px;border-radius:50%;background:rgba(184,138,60,0.85);flex:none;}` +
          `.gleg-hq{background:var(--gold);box-shadow:0 0 0 3px rgba(184,138,60,0.22);}` +
          `.gleg-city{font-family:var(--font-ui);font-size:12px;font-weight:600;color:rgba(30,32,36,0.88);letter-spacing:0.06em;}` +
          `.gleg-reg{font-size:10px;color:rgba(58,61,66,0.55);letter-spacing:0.15em;text-transform:uppercase;margin-top:2px;}` +
          `.globe-lbl:hover{z-index:10;}` +
          `.globe-card{position:absolute;bottom:calc(100% + 6px);left:50%;translate:-50% 0;width:172px;padding:12px 14px;background:rgba(255,255,255,0.98);border:1px solid rgba(184,138,60,0.38);box-shadow:0 8px 28px rgba(0,0,0,0.14);opacity:0;transition:opacity 0.18s ease;pointer-events:none;text-align:left;white-space:normal;font-weight:400;letter-spacing:normal;text-transform:none;}` +
          `.globe-lbl:hover .globe-card{opacity:1;}` +
          `.gcard-city{font-size:11px;font-weight:700;color:rgba(30,32,36,0.92);letter-spacing:0.10em;text-transform:uppercase;margin-bottom:2px;}` +
          `.gcard-region{font-size:9px;color:#B88A3C;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:8px;}` +
          `.gcard-rule{height:1px;background:rgba(184,138,60,0.20);margin-bottom:8px;}` +
          `.gcard-addr{font-size:11px;color:rgba(30,32,36,0.50);line-height:1.6;font-family:var(--font-b);}` +
          `.carousel-wrap{position:relative;overflow:hidden;}` +
          `.carousel-track{transition:transform 0.6s cubic-bezier(0.4,0,0.2,1);}` +
          `.carousel-track .ib{overflow-y:auto;box-sizing:border-box;}` +
          `.offices-panel{margin-top:6px;}` +
          `.ib{padding:26px 24px;background-color:var(--bg-2);background-image:var(--metal-sheen),var(--metal-lines-strong);border:1px solid var(--border);box-shadow:inset 0 1px 0 rgba(255,255,255,0.50);}` +
          `.ib-head{font-family:var(--font-ui);font-weight:600;font-size:10px;color:var(--gold);letter-spacing:0.20em;text-transform:uppercase;margin-bottom:16px;}` +
          `.ib-row{display:flex;flex-direction:column;gap:3px;margin-bottom:14px;}` +
          `.ib-row:last-child{margin-bottom:0;}` +
          `.ib-label{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--text-faint);font-weight:600;}` +
          `.ib-val{font-size:14px;color:var(--charcoal-2);line-height:1.5;}` +
          `.ib-val a{color:var(--charcoal-2);text-decoration:none;transition:color 0.18s ease;}` +
          `.ib-val a:hover{color:var(--gold);}` +
          `.ib-note{font-size:11.5px;color:var(--text-dim);margin-top:3px;}` +
          `.ib-badge{display:inline-flex;align-items:center;gap:7px;font-size:10.5px;color:var(--gold);background:var(--gold-dim);border:1px solid var(--gold-border);padding:5px 14px;margin-top:10px;font-weight:600;}` +
          `.offices{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}` +
          `.office{padding:10px 12px;background-color:var(--bg-1);background-image:var(--metal-lines);border:1px solid var(--border);font-size:12.5px;color:var(--charcoal-2);text-align:center;box-shadow:inset 0 1px 0 rgba(255,255,255,0.5);cursor:pointer;transition:background-color 0.2s,color 0.2s,border-color 0.2s;}` +
          `.office.hq,.office.active{border-color:var(--gold-border);color:var(--gold);background-color:var(--gold-dim);}` +
          `.office.inactive{opacity:0.4;}` +
          arCss +
        `</style>` +
        `<section class="globe-section sp"${isAr ? ' data-cg-ar' : ''}>` +
          `<div class="container">` +
            `<div class="globe-hd">` +
              `<div class="eyebrow"><span class="eyebrow-num">01</span><span class="eyebrow-line"></span><span class="eyebrow-label">${t(STR.eyebrow)}</span></div>` +
              `<h2 class="section-h">${t(STR.h2)}</h2>` +
              `<p class="section-lede">${t(STR.lede)}</p>` +
            `</div>` +
            `<div id="offices" class="globe-info-layout" style="grid-template-columns:3.5fr 6.5fr;scroll-margin-top:calc(var(--nav-h, 80px) + 16px);">` +
              `<div class="carousel-outer fade-up" style="transition-delay:0.1s">` +
                `<div class="carousel-wrap">` +
                  `<div class="carousel-track">` +
                    `<div class="ib">` +
                      `<div class="ib-head">${t(STR.sgHead)}</div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lContact)}</div><div class="ib-val">${t(STR.sgName)}</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lAddr)}</div><div class="ib-val">151 Chin Swee Road, #09-08<br>Manhattan House<br>Singapore 169876</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lPhone)}</div><div class="ib-val">${t(STR.sgPhone)}</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lEmail)}</div><div class="ib-val"><a href="mailto:info@centorglobal.com">info@centorglobal.com</a></div></div>` +
                    `</div>` +
                    `<div class="ib">` +
                      `<div class="ib-head">${t(STR.hkHead)}</div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lContact)}</div><div class="ib-val">Felix</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lAddr)}</div><div class="ib-val">Room 1101, 11/F., David House<br>8-20 Nanking Street, Jordan<br>Hong Kong</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lPhone)}</div><div class="ib-val"><a href="tel:+8618601768395">+86 18601768395</a></div></div>` +
                    `</div>` +
                    `<div class="ib">` +
                      `<div class="ib-head">${t(STR.toHead)}</div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lContact)}</div><div class="ib-val">キム・ソヨン</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lAddr)}</div><div class="ib-val">Shinagawa-ku<br>Tokyo, Japan</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lPhone)}</div><div class="ib-val"><a href="tel:+817091833737">+81 70-9183-3737</a></div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lEmail)}</div><div class="ib-val"><a href="mailto:ip-link@soyon-sowon.com">ip-link@soyon-sowon.com</a></div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lEmail)}</div><div class="ib-val"><a href="mailto:info@centorglobal.com">info@centorglobal.com</a></div></div>` +
                    `</div>` +
                    `<div class="ib">` +
                      `<div class="ib-head">${t(STR.paHead)}</div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lContact)}</div><div class="ib-val">Felipe</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lAddr)}</div><div class="ib-val">P.H. BICSA Financial Center, Oficina 4007<br>Aquilino de la Guardia<br>Panamá City, Panamá</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lPhone)}</div><div class="ib-val"><a href="tel:+50767383230">+507 6738 3230</a></div></div>` +
                    `</div>` +
                    `<div class="ib">` +
                      `<div class="ib-head">${t(STR.deHead)}</div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lContact)}</div><div class="ib-val">Gebhard Lehmann</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lAddr)}</div><div class="ib-val">Schlittengasse 17<br>77933 Lahr, Deutschland</div></div>` +
                      `<div class="ib-row"><div class="ib-label">${t(STR.lPhone)}</div><div class="ib-val"><a href="tel:+491714311744">+49 171 431 17 44</a></div></div>` +
                    `</div>` +
                  `</div>` +
                `</div>` +
                officesGridHtml +
              `</div>` +
              `<div class="fade-up">` +
                `<div class="globe-stage" style="transition-delay:0.1s">` +
                  `<div class="globe-cvs-wrap"><canvas id="cobe-canvas"></canvas></div>` +
                  `<div class="globe-legend">${legendHtml}</div>` +
                `</div>` +
              `</div>` +
            `</div>` +
          `</div>` +
        `</section>`;

      /* ── Carousel ── */
      let carouselGoTo = null;
      const officeIdToSlide = { sg: 0, hk: 1, to: 2, pa: 3, de: 4 };

      requestAnimationFrame(() => {
        const outer      = this.querySelector('.carousel-outer');
        const wrap       = this.querySelector('.carousel-wrap');
        const track      = this.querySelector('.carousel-track');
        const globeStage = this.querySelector('.globe-stage');
        const offPanel   = this.querySelector('.offices-panel');
        const offTabs    = [...this.querySelectorAll('.offices-panel .office')];
        const cards      = [...this.querySelectorAll('.carousel-track .ib')];
        const n          = cards.length;

        let cur = 0;

        function recalc() {
          const isDesktop = window.innerWidth > 960;
          const globeH    = globeStage.offsetHeight;
          const offH      = offPanel ? offPanel.offsetHeight + 6 : 0; // 6 = margin-top

          let wrapH;
          if (isDesktop && globeH) {
            wrapH = globeH - offH;
          } else {
            cards.forEach(c => { c.style.height = ''; });
            wrapH = Math.max(...cards.map(c => c.scrollHeight), 200);
          }

          if (wrapH <= 0) return;
          wrap.style.height = wrapH + 'px';
          cards.forEach(c => { c.style.height = wrapH + 'px'; });

          const saved = track.style.transition;
          track.style.transition = 'none';
          track.style.transform = `translateY(-${cur * wrapH}px)`;
          requestAnimationFrame(() => { track.style.transition = saved; });
        }

        function goTo(i) {
          cur = i;
          const h = wrap.clientHeight || 0;
          track.style.transform = `translateY(-${i * h}px)`;
          offTabs.forEach((t, j) => t.classList.toggle('active', j === i));
        }

        carouselGoTo = goTo;

        new ResizeObserver(recalc).observe(globeStage);
        window.addEventListener('resize', recalc);

        offTabs.forEach((tab, i) => tab.addEventListener('click', () => goTo(i)));

        // Jump the carousel to the office named in the ?office= query param
        const officeParam = new URLSearchParams(window.location.search).get('office');
        if (officeParam && officeIdToSlide[officeParam] !== undefined) {
          goTo(officeIdToSlide[officeParam]);
        }
      });

      /* ── Globe initialisation ── */
      const { default: createGlobe } = await import('/assets/js/cobe.esm.js');

      const GOLD    = [0.72, 0.54, 0.24];
      const SIZE    = 600;
      const ROT_SPD = 0.003;

      const canvas = this.querySelector('#cobe-canvas');
      const dpr    = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.height = SIZE * dpr;

      let baseRotation = 1.81;
      let springR = 0, springV = 0, springTgt = 0;
      let pointerX = null;
      let isHovering = false, isJumping = false;
      let legendPaused = false, legendLeaveTimer = null;

      function tickSpring() {
        springV = (springV + (springTgt - springR) * 0.14) * 0.78;
        springR += springV;
      }

      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width:         SIZE * dpr,
        height:        SIZE * dpr,
        phi:           baseRotation,
        theta:         0.22,
        dark:          0,
        diffuse:       1.2,
        scale:         1,
        mapSamples:    16000,
        mapBrightness: 3.5,
        baseColor:     [0.84, 0.87, 0.94],
        markerColor:   GOLD,
        glowColor:     [0.72, 0.54, 0.24],
        markers: offices.map(o => ({ id: o.id, location: [o.lat, o.lng], size: 0.06 })),
      });

      const cobeWrap = canvas.parentElement;
      offices.forEach(({ id, label, region, address }) => {
        const el = document.createElement('div');
        el.className = 'globe-lbl';
        el.textContent = label;
        el.setAttribute('style', [
          `position-anchor: --cobe-${id}`,
          `bottom: anchor(top)`,
          `left: anchor(center)`,
          `opacity: var(--cobe-visible-${id}, 0)`,
          `pointer-events: var(--cobe-visible-${id}, none)`,
        ].join('; '));
        const card = document.createElement('div');
        card.className = 'globe-card';
        card.innerHTML =
          `<div class="gcard-city">${label}</div>` +
          `<div class="gcard-region">${region}</div>` +
          `<div class="gcard-rule"></div>` +
          `<div class="gcard-addr">${address.replace(/\n/g, '<br>')}</div>`;
        el.appendChild(card);
        cobeWrap.appendChild(el);
      });

      function flyTo(office) {
        const current = baseRotation + springR;
        const target  = 3 * Math.PI / 2 - office.lng * Math.PI / 180;
        let diff = ((target - current) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff > Math.PI) diff -= Math.PI * 2;
        baseRotation += springR;
        springR = springV = 0;
        springTgt = diff;
        isJumping = true;
      }

      // Rotate globe to the ?office= param once flyTo is safe to call
      const officeParamGlobe = new URLSearchParams(window.location.search).get('office');
      if (officeParamGlobe && officeIdToSlide[officeParamGlobe] !== undefined) {
        flyTo(offices[officeIdToSlide[officeParamGlobe]]);
      }

      (function frame() {
        if (!isHovering && pointerX === null && !isJumping && !legendPaused) baseRotation += ROT_SPD;
        tickSpring();
        if (isJumping && Math.abs(springV) < 0.0002 && Math.abs(springTgt - springR) < 0.001) {
          baseRotation += springR;
          springR = springV = springTgt = 0;
          isJumping = false;
        }
        globe.update({ phi: baseRotation + springR });
        requestAnimationFrame(frame);
      })();

      cobeWrap.addEventListener('pointerenter', () => { isHovering = true; });
      cobeWrap.addEventListener('pointerleave', () => { isHovering = false; });

      canvas.addEventListener('pointerdown', e => {
        isJumping = false;
        baseRotation += springR;
        springR = springV = springTgt = 0;
        pointerX = e.clientX;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      });

      canvas.addEventListener('pointermove', e => {
        if (pointerX === null) return;
        springTgt = (e.clientX - pointerX) / 200;
      });

      canvas.addEventListener('pointerup', () => {
        pointerX = null;
        canvas.style.cursor = 'grab';
      });

      const legendEl = this.querySelector('.globe-legend');
      legendEl.addEventListener('mouseenter', () => {
        clearTimeout(legendLeaveTimer);
      });
      legendEl.addEventListener('mouseleave', () => {
        if (legendPaused) {
          legendLeaveTimer = setTimeout(() => { legendPaused = false; }, 1000);
        }
      });

      this.querySelectorAll('.globe-legend .gleg').forEach((el, i) => {
        el.addEventListener('click', () => {
          legendPaused = true;
          clearTimeout(legendLeaveTimer);
          flyTo(offices[i]);
          const slideIdx = officeIdToSlide[offices[i].id];
          if (carouselGoTo && slideIdx !== undefined) carouselGoTo(slideIdx);
        });
      });
    }
  }

  customElements.define('contact-globe', ContactGlobe);
})();
