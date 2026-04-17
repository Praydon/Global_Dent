# GLOBAL DENT — HANDOFF

## SOURCE OF TRUTH
`/Users/ruslanzlobin/Desktop/Global Dent/implementation_plan.md.resolved`

---

## STATUS
🟢 **CSS готов. Сайт готов к визуальному ревью.**

---

## CLAUDE — СДЕЛАНО (2026-04-11)

### Markup Agent ✅
- Новый логотип: navy (#1A1A3E) круг + золотой зуб + текст "GLOBAL DENT clinic"
- Навигация: О нас · Услуги · Врачи · Контакты | Телефон: +7 747 363 17 09
- Hero: «Ваша здоровая улыбка — наша миссия» + подзаголовок «с 2016 года» + 1 CTA кнопка
- Секция #about: 5 fact-card (2016, 25000+, миссия, консультация, 2 филиала)
- Секция #advantages: 4 advantage-card (расположение, специалисты, услуги, куратор)
- Услуги: добавлены Терапия, All-on-4, All-on-6/8
- Врачи: добавлен 5-й — Абибулла А.Ж. (хирург-имплантолог, 10+ лет)
- Секция #certificates: navy-блок, 3 cert-card (30k/40k/50k ₸)
- Форма: добавлены fBranch (выбор филиала), kaspi-badge, All-on опции
- Контакты: 2 branch-card (Кожабекова + Сулейменова) с реальными данными
- Footer: navy + gold, оба филиала, Instagram @global_dent_almaty, Taplink, 2ГИС

### Logic Agent ✅
- Добавлен `branch` в объект `data` при отправке формы

### Verifier Agent ✅
Все 13 проверок пройдены:
- 0 старых цветов (#1B6B93 и др.) в HTML
- 8× телефон +77473631709
- 3× телефон +77073117322
- 1× Абибулла
- 9× cert-card
- 12× branch-card
- 1× kaspi-badge
- id="about" ✅, id="advantages" ✅
- fBranch в HTML ✅, в JS ✅
- @global_dent_almaty ✅
- 10 секций </section> ✅

---

## ЗАДАЧА ДЛЯ GEMINI 🎨

**Файл для редактирования:** `css/style.css`

Выполни задачи в порядке приоритета:

---

### 🔴 ПРИОРИТЕТ 1: CSS Custom Properties (палитра)

Полностью замени переменные в `:root {}` на новую тему:

```css
:root {
  /* === Новая палитра === */
  --color-primary:       #C9A96E;   /* Золотой */
  --color-primary-light: #D4BA8A;
  --color-primary-dark:  #B8944F;
  --color-navy:          #1A1A3E;
  --color-navy-light:    #2A2A5E;
  --color-bg:            #F5F0EB;   /* Тёплый бежевый */
  --color-surface:       #FFFFFF;
  --color-text:          #2D2D2D;
  --color-muted:         #7A756E;
  --color-border:        #E5DFD8;
  --color-success:       #22C55E;
  --color-emergency:     #EF4444;
  /* Остальные переменные (шрифты, тени, радиусы) — оставить как есть */
}
```

Обнови все `rgba()` в стилях, где использовался старый `#1B6B93` → заменить на `#C9A96E` (золотой).
Пример: `rgba(27,107,147,.08)` → `rgba(201,169,110,.1)`

---

### 🔴 ПРИОРИТЕТ 2: Логотип

```css
.logo__text { 
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-navy);
  line-height: 1.2;
}
.logo__clinic {
  display: block;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 3px;
  color: var(--color-primary); /* золотой */
  text-transform: uppercase;
}
.logo--light .logo__text  { color: rgba(255,255,255,.9); }
.logo--light .logo__clinic { color: var(--color-primary); }
```

---

### 🔴 ПРИОРИТЕТ 3: Hero Section

```css
.hero__bg {
  background: linear-gradient(135deg, #F5F0EB 0%, #EDE5DA 50%, #E8DDD0 100%);
}
.hero__overlay {
  background: linear-gradient(90deg, rgba(245,240,235,.98) 0%, rgba(245,240,235,.85) 55%, rgba(245,240,235,.3) 100%);
}
.hero__title { color: var(--color-navy); }
.hero__subtitle { color: var(--color-muted); }
.text-gold { color: var(--color-primary); }  /* золотой акцент */
```

---

### 🟡 ПРИОРИТЕТ 4: Секция «О нас» (.about)

```css
.about { background: var(--color-surface); }

.about__facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (min-width: 768px)  { .about__facts { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .about__facts { grid-template-columns: repeat(5, 1fr); } }

.fact-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--r-lg);
  transition: box-shadow var(--ease), transform var(--ease);
}
.fact-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }

.fact-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: var(--r-md);
  background: rgba(201,169,110,.12);
  color: var(--color-primary);
  flex-shrink: 0;
}
.fact-card__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fact-card__text strong {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-navy);
}
.fact-card__text span { font-size: 13px; color: var(--color-muted); line-height: 1.4; }
```

---

### 🟡 ПРИОРИТЕТ 5: Секция «Преимущества» (.advantages)

```css
.advantages { background: var(--color-bg); }

.advantages__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 640px)  { .advantages__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .advantages__grid { grid-template-columns: repeat(4, 1fr); } }

.advantage-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--r-xl);
  padding: 28px 24px;
  transition: box-shadow var(--ease), transform var(--ease), border-color var(--ease);
}
.advantage-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary);
}
.advantage-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px; height: 48px;
  border-radius: var(--r-md);
  background: rgba(201,169,110,.12);
  color: var(--color-primary);
  margin-bottom: 16px;
}
.advantage-card__title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-navy);
  margin-bottom: 8px;
}
.advantage-card__text {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.65;
}
```

---

### 🟡 ПРИОРИТЕТ 6: Секция «Сертификаты» (.certificates)

```css
.certificates {
  background: var(--color-navy);
  padding: 72px 0;
}
@media (min-width: 1024px) { .certificates { padding: 96px 0; } }

/* Заголовки на тёмном фоне */
.section__title--light   { color: #fff; }
.section__subtitle--light { color: rgba(255,255,255,.65); }

.certificates__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}
@media (min-width: 640px) { .certificates__grid { grid-template-columns: repeat(3, 1fr); } }

.cert-card {
  background: rgba(255,255,255,.05);
  border: 1.5px solid rgba(201,169,110,.4);
  border-radius: var(--r-xl);
  padding: 32px 24px;
  text-align: center;
  transition: border-color var(--ease), background var(--ease), transform var(--ease);
}
.cert-card:hover {
  border-color: var(--color-primary);
  background: rgba(201,169,110,.08);
  transform: translateY(-4px);
}
.cert-card--featured {
  border-color: var(--color-primary);
  background: rgba(201,169,110,.08);
}
.cert-card__value {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}
.cert-card__desc {
  font-size: 14px;
  color: rgba(255,255,255,.6);
  margin-bottom: 20px;
}

/* Золотая кнопка */
.btn--gold {
  background: var(--color-primary);
  color: var(--color-navy);
  border-color: var(--color-primary);
  font-weight: 700;
}
.btn--gold:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  transform: translateY(-2px);
}
```

---

### 🟡 ПРИОРИТЕТ 7: Контакты — 2 филиала (.branch-card)

```css
.contacts { background: var(--color-bg); }

.contacts__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 1024px) { .contacts__grid { grid-template-columns: repeat(2, 1fr); } }

.branch-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--r-xl);
  overflow: hidden;
  transition: box-shadow var(--ease), transform var(--ease);
}
.branch-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

.branch-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--color-navy);
  padding: 20px 24px;
}
.branch-card__num {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 1px;
  opacity: .7;
}
.branch-card__name {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}
.branch-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.branch-card__actions {
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
}
.branch-card__actions .btn { flex: 1; }
```

---

### 🟡 ПРИОРИТЕТ 8: Footer — navy + gold

```css
.footer { background: var(--color-navy); }

/* Все ссылки в footer — на rgba белого */
.footer__nav a    { color: rgba(255,255,255,.6); }
.footer__nav a:hover { color: var(--color-primary); }
.footer__soc      { border-color: rgba(255,255,255,.15); color: rgba(255,255,255,.55); }
.footer__soc:hover { color: var(--color-primary); border-color: var(--color-primary); }

.footer__branches {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,.08);
}
@media (min-width: 640px) { .footer__branches { grid-template-columns: repeat(2, 1fr); } }

.footer__branch {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer__branch strong { color: rgba(255,255,255,.85); font-size: 14px; }
.footer__branch a      { color: var(--color-primary); font-size: 14px; }
.footer__branch a:hover { color: var(--color-primary-light); }
.footer__branch span   { color: rgba(255,255,255,.45); font-size: 13px; }
```

---

### 🟢 ПРИОРИТЕТ 9: Kaspi бейдж

```css
.kaspi-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255,0,0,.05);
  border: 1px solid rgba(255,0,0,.15);
  border-radius: var(--r-md);
  font-size: 14px;
  color: var(--color-text);
}
.kaspi-badge strong { color: #d00000; }
```

---

### 🟢 ПРИОРИТЕТ 10: Mobile CTA — gold + navy вместо blue + orange

```css
.mobile-cta__call { background: var(--color-navy); }
.mobile-cta__book { background: var(--color-primary); color: var(--color-navy); font-weight: 700; }
```

---

### 🟢 ПРИОРИТЕТ 11: Обновить цвета кнопок, карточек, hover-эффектов

Везде где `color: var(--color-primary)` и иконки — теперь золото (`#C9A96E`).
Везде где navy-акценты (шапка сайта при скролле, badge--trust) — `var(--color-navy)`.

Проверь `.service-card:hover`, `.doctor-card:hover`, `.review-card:hover` — рамка при hover должна быть `var(--color-primary)` (золото).

Обнови `.btn--outline`:
```css
.btn--outline {
  color: var(--color-navy);
  border-color: var(--color-navy);
}
.btn--outline:hover {
  background: var(--color-navy);
  color: #fff;
}
```

---

## ПОСЛЕ ВЫПОЛНЕНИЯ CSS

Обнови этот файл:
```
## STATUS
🟢 CSS готов. Сайт готов к визуальному ревью.
```

И открой `index.html` в браузере:
- Desktop 1440px: палитра, логотип, все секции
- Mobile 375px: бургер, CTA-панель, форма, два филиала
- Проверь контраст на navy-блоках (.certificates, .footer, .branch-card__header)

---

## ISSUES (открытые вопросы)
- Форма отправляет в `console.log` — нужен webhook/CRM (жду данных клиента)
- Фото врачей — SVG-плейсхолдеры. Gemini: создать placeholder-аватары или скоординировать получение реальных фото
- Hero BG — сейчас CSS-градиент. Gemini: при наличии фото кабинета — добавить `<img>` в `.hero__bg`
