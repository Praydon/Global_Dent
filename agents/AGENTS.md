# GLOBAL DENT — Агентная система

> **Разделение ответственности:**
> - **Gemini** — дизайн (CSS, цвета, стили, визуал). Редактирует `css/style.css` напрямую.
> - **Claude** — код (HTML-разметка, JS-логика, проверка). Работает по инструкциям ниже.
>
> **Источник истины:** `implementation_plan.md.resolved`
> **Координация:** через `handoff.md`

---

## Архитектура

```
 GEMINI (дизайн)              CLAUDE (код)
 ═══════════════              ═══════════════
 css/style.css                index.html
 - палитра                    js/main.js
 - стили компонентов          - HTML-разметка
 - анимации                   - JS-логика
 - адаптив                    - верификация
        │                           │
        └───────── handoff.md ──────┘
```

**Claude НЕ трогает `css/style.css`** — это файл Gemini.
**Gemini НЕ трогает `js/main.js`** — это файл Claude.
`index.html` — совместный: Gemini задаёт CSS-классы, Claude пишет разметку.

---

## Агент 1: MARKUP AGENT

**Файл:** `index.html`
**Роль:** Обновить HTML-контент, добавить новые секции, обновить существующие.
**CSS-классы:** использовать ТОЛЬКО те, что Gemini определил. Не придумывать свои.

```
Ты — HTML Markup Agent.
Твоя задача — обновить index.html, сохраняя BEM-именование.
CSS-классы для новых компонентов тебе предоставит Gemini через handoff.md.
Если нужного класса нет — запиши запрос в handoff.md → ISSUES.

### Порядок выполнения:

#### 1. Логотип (header + footer)

Замени SVG-логотип на круглую эмблему с буквами GD:

<svg class="logo__icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="20" cy="20" r="19" fill="#1A1A3E" stroke="#C9A96E" stroke-width="1.5"/>
  <path d="M20 8C16.5 8 13 11 13 15c0 2 .6 3.2 1.4 4.8C15.5 22 16 25 16.3 27.5c.2 1.2.8 1.5 1.4 1.5.6 0 1.1-.4 1.4-1.5L20 24l.9 3.5c.3 1.1.8 1.5 1.4 1.5.6 0 1.2-.3 1.4-1.5.3-2.5.8-5.5 1.9-7.7.8-1.6 1.4-2.8 1.4-4.8 0-4-3.5-7-7-7z" fill="#C9A96E"/>
  <text x="12.5" y="19" font-family="serif" font-size="7" font-weight="bold" fill="#C9A96E" opacity="0.6">G</text>
  <text x="22" y="19" font-family="serif" font-size="7" font-weight="bold" fill="#C9A96E" opacity="0.6">D</text>
</svg>
<span class="logo__text">GLOBAL DENT <span class="logo__clinic">clinic</span></span>

В footer — тот же логотип, но с классом logo--light.

#### 2. Навигация в Header

Замени nav__list на:
  О нас (#about) · Услуги (#services) · Врачи (#doctors) · Контакты (#contacts)

Обнови телефон во ВСЕХ местах:
  href="tel:+77473631709"
  Текст: +7 747 363 17 09

#### 3. Hero (замена контента, секция #hero)

Замени содержимое .hero__content:
  - Убрать: badge--license, hero__promo, hero__subtitle с рейтингом
  - h1: "Ваша здоровая улыбка —<br>наша <span class="text-gold">миссия</span>"
  - p.hero__subtitle: "Стоматологическая клиника в Алматы с 2016 года"
  - Одна кнопка: "Бесплатная консультация" (класс: btn btn--primary btn--lg)

Убрать блок .hero__trust целиком.

#### 4. Новая секция «О нас» (вставить ПОСЛЕ #hero, ПЕРЕД #services)

Секция id="about". Класс секции: section about
5 карточек с фактами (класс fact-card):
  1. icon: calendar    | "С 2016 года" / "на рынке стоматологических услуг"
  2. icon: users       | "25 000+" / "довольных клиентов"
  3. icon: heart       | "Наша миссия" / "Мы улучшаем качество жизни"
  4. icon: check-circle| "Бесплатная консультация" / "у всех врачей-терапевтов"
  5. icon: map-pin     | "2 филиала" / "в удобных районах города"

SVG-иконки: width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"

#### 5. Новая секция «Преимущества» (вставить ПОСЛЕ #about, ПЕРЕД #services)

Секция id="advantages". Класс: section advantages
4 карточки (класс advantage-card):
  1. icon: map-pin    | "Расположение" | "2 филиала в удобных районах города"
  2. icon: award      | "Опытнейшие специалисты" | "Врачи со стажем в среднем от 13 лет, которые решат любую проблему в полости рта"
  3. icon: grid       | "Полный спектр услуг" | "Лечение заболеваний любой сложности, красивая здоровая улыбка"
  4. icon: user-check | "Личный куратор" | "У каждого пациента будет личный куратор, который отслеживает и заботится о пациенте на каждом этапе лечения"

#### 6. Обновить услуги (#services)

Добавить карточки:
  - В "Взрослая стоматология": "Терапия" (desc: Лечение кариеса, пульпита, периодонтита) data-service="Терапия"
  - В "Специализация": "All-on-4" (desc: Полная реабилитация за 1 день) data-service="All-on-4"
  - В "Специализация": "All-on-6/8" (desc: Максимальная стабильность протеза) data-service="All-on-6/8"

Добавить эти услуги в <select id="fService">:
  <option value="Терапия">Терапия</option>
  <option value="All-on-4">Имплантация All-on-4</option>
  <option value="All-on-6/8">Имплантация All-on-6/8</option>

#### 7. Добавить врача (#doctors)

Добавить 5-ю карточку doctor-card для:
  Имя: Абибулла А.Ж.
  Специализация: Хирург-имплантолог
  Стаж: 10+ лет
  data-service="Имплантация"

#### 8. Новая секция «Подарочные сертификаты» (после #prices, перед #appointment)

Секция id="certificates". Класс: section certificates
Заголовок: "Подарочные сертификаты" (класс section__title--light)
Подзаголовок: "Подарочные сертификаты на стоматологические услуги доступны в нашей клинике" (класс section__subtitle--light)
3 карточки cert-card:
  - 30 000 ₸ (btn btn--gold btn--sm → href="#appointment")
  - 40 000 ₸
  - 50 000 ₸

#### 9. Обновить форму записи (#appointment)

Добавить ПОСЛЕ select#fService:
  <div class="form__field form__field--select">
    <select id="fBranch" name="branch" class="form__select">
      <option value="">Выберите филиал</option>
      <option value="Кожабекова">Кожабекова 17/2, ЖК Braun</option>
      <option value="Сулейменова">Сулейменова 24а</option>
    </select>
    <label class="form__label form__label--sel" for="fBranch">Филиал</label>
  </div>

Добавить ПЕРЕД кнопкой submit:
  <div class="kaspi-badge">
    <span>💳</span> Доступна рассрочка <strong>Kaspi RED</strong>
  </div>

#### 10. Контакты — два филиала (#contacts)

Заменить содержимое .contacts__grid на ДВЕ карточки branch-card:

Филиал Кожабекова:
  Адрес: Кожабекова 17/2, ЖК Braun
  График: Каждый день, без выходных, 9:00–19:00
  Телефон: +7 747 363 1709 (tel:+77473631709)
  WhatsApp: +7 747 363 1709 (wa.me/77473631709)
  Кнопки: Позвонить (btn--primary) + WhatsApp (btn--outline)

Филиал Сулейменова:
  Адрес: Сулейменова 24а
  График: Пн–Пт 9:00–19:00, Сб 9:00–15:00, Вс — выходной
  Телефон: +7 707 311 7322 (tel:+77073117322)
  WhatsApp: +7 747 363 1709 (wa.me/77473631709)
  Кнопки: Позвонить (btn--primary) + WhatsApp (btn--outline)

Убрать: map-stub, payment-methods (перенести оплату в форму или оставить).

#### 11. Footer

Обновить:
  - Навигация: О нас · Услуги · Врачи · Контакты
  - Добавить блок footer__branches с контактами обоих филиалов
  - Instagram: href="https://instagram.com/global_dent_almaty"
  - Добавить: <a href="#">Taplink</a> в footer__social
  - Номера телефонов — реальные

#### 12. Mobile CTA

  Телефон: tel:+77473631709

### Правила:
- .animate-in на КАЖДЫЙ новый блок (для IntersectionObserver)
- aria-hidden="true" на декоративные SVG
- data-service на все кнопки "Записаться"
- Все SVG-иконки: width="20" height="20" stroke="currentColor" stroke-width="2"
- НЕ добавлять inline-стили
- НЕ создавать новые CSS-классы — только те, что перечислены выше
```

---

## Агент 2: LOGIC AGENT

**Файл:** `js/main.js`
**Роль:** Минимальные изменения JS для поддержки нового функционала.

```
Ты — JavaScript Logic Agent.
Минимальные изменения. НЕ ломай существующий функционал.

### Изменение 1: Добавь branch в form data

В секции "9. Form validation & submit" (≈строка 262-268),
в объект data добавь:

  branch: document.getElementById('fBranch') ? document.getElementById('fBranch').value : '',

### Изменение 2: Обнови smooth scroll offset

Навигация изменилась (меньше пунктов), но логика та же.
Убедись, что секция #about корректно скроллится.

### НЕ ТРОГАЙ:
- Phone mask (работает)
- Carousel (работает)
- IntersectionObserver (автоматически подхватит новые .animate-in)
- Mobile CTA (работает)
- Count-up (код безопасен — если элементов нет, просто не сработает)
```

---

## Агент 3: VERIFIER AGENT

**Роль:** Финальная проверка после всех изменений.

```
Ты — Verifier Agent.
Проверяй ТОЛЬКО код. Визуальную проверку делает Gemini.

### Команды для проверки:

# 1. Старые цвета НЕ должны быть в HTML (в CSS — ОК, это зона Gemini)
grep "#1B6B93\|#4DA8DA\|#00BFA6\|#114B67" index.html
# Ожидание: 0 результатов (кроме SVG inline-цветов если есть)

# 2. Новые телефоны присутствуют
grep -c "77473631709" index.html
# Ожидание: ≥ 5

grep -c "77073117322" index.html
# Ожидание: ≥ 2

# 3. Новый врач
grep -c "Абибулла" index.html
# Ожидание: 1

# 4. Сертификаты
grep -c "cert-card" index.html
# Ожидание: ≥ 3

# 5. Филиалы
grep -c "branch-card" index.html
# Ожидание: ≥ 2

# 6. Kaspi
grep -c "kaspi-badge" index.html
# Ожидание: 1

# 7. Секция "О нас"
grep -c 'id="about"' index.html
# Ожидание: 1

# 8. Секция "Преимущества"
grep -c 'id="advantages"' index.html
# Ожидание: 1

# 9. Поле филиала в форме
grep -c 'id="fBranch"' index.html
# Ожидание: 1

# 10. JS — поле branch
grep -c "fBranch" js/main.js
# Ожидание: ≥ 1

# 11. Проверить HTML-валидность (базовая)
grep -c "</section>" index.html
# Ожидание: ≥ 9 (hero, about, advantages, services, doctors, reviews, prices, certificates, appointment, contacts)

# 12. Instagram
grep -c "global_dent_almaty" index.html
# Ожидание: ≥ 1

### После проверки:
Обнови handoff.md:
  STATUS: Код готов. Ожидание визуального ревью от Gemini.
  ISSUES: [перечислить найденные проблемы, если есть]
```

---

## Порядок запуска

```
1. Claude → MARKUP AGENT   (обновить index.html)
2. Claude → LOGIC AGENT    (обновить main.js)
3. Claude → VERIFIER AGENT (проверить)
4. Claude → обновить handoff.md
5. Gemini → CSS стили для всех новых компонентов
6. Gemini → визуальная проверка в браузере
```

> **Важно:** Claude запускает агентов 1-4 последовательно.
> После завершения — пишет в handoff.md, что готов.
> Gemini подключается только после.
