import re

with open('/Users/ruslanzlobin/Desktop/Global Dent/css/style.css', 'r') as f:
    content = f.read()

# 1. Update :root variables
root_replacement = """
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

  --font-body:    'Inter', sans-serif;
  --font-heading: 'Outfit', sans-serif;

  --shadow-xs: 0 1px 3px rgba(0,0,0,.08);
  --shadow-sm: 0 2px 8px rgba(0,0,0,.10);
  --shadow-md: 0 6px 20px rgba(0,0,0,.10);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.12);

  --r-sm:   8px;
  --r-md:  12px;
  --r-lg:  16px;
  --r-xl:  24px;
  --r-full: 9999px;

  --ease: 0.25s ease;
}"""
content = re.sub(r':root\s*\{[^}]+\}', root_replacement.strip(), content)

# Replace RGBA colors
content = re.sub(r'rgba\(27,\s*107,\s*147,\s*(\.[0-9]+|[0-9]+(?:\.[0-9]+)?)\)', r'rgba(201,169,110,\1)', content)
content = re.sub(r'rgba\(0,\s*191,\s*166,\s*(\.[0-9]+|[0-9]+(?:\.[0-9]+)?)\)', r'rgba(201,169,110,\1)', content)
content = re.sub(r'rgba\(77,\s*168,\s*218,\s*(\.[0-9]+|[0-9]+(?:\.[0-9]+)?)\)', r'rgba(201,169,110,\1)', content)

# 2. Logo
logo_old = """.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-primary);
}
.logo__icon { flex-shrink: 0; }
.logo__text strong { font-weight: 700; }
.logo--white { color: rgba(255,255,255,.9); }"""

logo_new = """.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.logo__icon { flex-shrink: 0; }
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
  color: var(--color-primary);
  text-transform: uppercase;
}
.logo--light .logo__text  { color: rgba(255,255,255,.9); }
.logo--light .logo__clinic { color: var(--color-primary); }"""
content = content.replace(logo_old, logo_new)

# 3. Hero Section
hero_bg_old = """.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(135deg, #e8f4f8 0%, #c8e6f4 40%, #a8d8ea 100%);
}
.hero__bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 50%, rgba(201,169,110,.25) 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(201,169,110,.12) 0%, transparent 50%);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(248,250,251,.97) 0%, rgba(248,250,251,.85) 55%, rgba(248,250,251,.3) 100%);
}"""
hero_bg_new = """.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, #F5F0EB 0%, #EDE5DA 50%, #E8DDD0 100%);
}
.hero__bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 50%, rgba(201,169,110,.15) 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(201,169,110,.08) 0%, transparent 50%);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(245,240,235,.98) 0%, rgba(245,240,235,.85) 55%, rgba(245,240,235,.3) 100%);
}"""
content = content.replace(hero_bg_old, hero_bg_new)

content = content.replace("background: linear-gradient(90deg,rgba(248,250,251,.96) 0%,rgba(248,250,251,.8) 45%,rgba(248,250,251,.1) 100%);", "background: linear-gradient(90deg, rgba(245,240,235,.98) 0%, rgba(245,240,235,.85) 55%, rgba(245,240,235,.3) 100%);")

hero_title_old = """.hero__title {
  font-size: clamp(32px, 5.5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 18px;
}

.hero__subtitle {"""
hero_title_new = """.hero__title {
  font-size: clamp(32px, 5.5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 18px;
  color: var(--color-navy);
}

.hero__subtitle {"""
content = content.replace(hero_title_old, hero_title_new)

# Add .text-gold
if ".text-gold" not in content:
    content = content.replace(".text-accent  { color: var(--color-accent); }\n.text-primary { color: var(--color-primary); }", ".text-accent  { color: var(--color-accent); }\n.text-primary { color: var(--color-primary); }\n.text-gold { color: var(--color-primary); }")

# Update .btn--outline
btn_outline_old = """.btn--outline {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.btn--outline:hover {
  background: var(--color-primary);
  color: #fff;
}"""
btn_outline_new = """.btn--outline {
  background: transparent;
  color: var(--color-navy);
  border-color: var(--color-navy);
}
.btn--outline:hover {
  background: var(--color-navy);
  color: #fff;
}"""
content = content.replace(btn_outline_old, btn_outline_new)

# Update hover styles
content = content.replace("border-color: var(--color-primary-light);", "border-color: var(--color-primary);")
content = content.replace("border-color: var(--color-accent);", "border-color: var(--color-primary);")

content = content.replace("background: rgba(201,169,110,.1);\n  color: var(--color-primary);\n  border: 1px solid rgba(201,169,110,.2);", "background: rgba(26,26,62,.1);\n  color: var(--color-navy);\n  border: 1px solid rgba(26,26,62,.2);")
content = content.replace("background: rgba(27,107,147,.1);\n  color: var(--color-primary)", "background: var(--color-navy);\n  color: #fff") 

# Fix appointment bg to navy instead of primary (gold)
appt_bg_old = """.appointment {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%);"""
appt_bg_new = """.appointment {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 60%, var(--color-navy) 100%);"""
content = content.replace(appt_bg_old, appt_bg_new)

content = content.replace("background: rgba(255,255,255,.92);", "background: rgba(255,255,255,.96);")

# 4-9: Append new sections
new_css = """
/* ==========================================================================
   About Section
   ========================================================================== */
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

/* ==========================================================================
   Advantages Section
   ========================================================================== */
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

/* ==========================================================================
   Certificates Section
   ========================================================================== */
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

/* ==========================================================================
   Branch Cards & Contacts
   ========================================================================== */
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

/* ==========================================================================
   Kaspi Badge
   ========================================================================== */
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
  margin-top: 10px;
  margin-bottom: -10px;
}
.kaspi-badge strong { color: #d00000; }
"""
content = content.replace("/* ==========================================================================\n   Utilities", new_css + "\n/* ==========================================================================\n   Utilities")

# Footer update
content = content.replace(".footer {\n  background: var(--color-text);", ".footer {\n  background: var(--color-navy);")
content = content.replace(
""".footer__nav a {
  font-size: 14px;
  color: rgba(255,255,255,.65);
  transition: color var(--ease);
}
.footer__nav a:hover { color: #fff; }""",
""".footer__nav a {
  font-size: 14px;
  color: rgba(255,255,255,.6);
  transition: color var(--ease);
}
.footer__nav a:hover { color: var(--color-primary); }""")

footer_soc_old = """.footer__soc {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.65);
  transition: color var(--ease), border-color var(--ease);
}
.footer__soc:hover { color: #fff; border-color: rgba(255,255,255,.5); }"""
footer_soc_new = """.footer__soc {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.55);
  transition: color var(--ease), border-color var(--ease);
}
.footer__soc:hover { color: var(--color-primary); border-color: var(--color-primary); }"""
content = content.replace(footer_soc_old, footer_soc_new)

# Footer branches
footer_branches_css = """
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
"""
if ".footer__branches {" not in content:
  content = content.replace(".footer__bottom {", footer_branches_css + "\n.footer__bottom {")

# Mobile CTA update
mcta_call_old = ".mobile-cta__call { background: var(--color-primary); color: #fff; }"
mcta_book_old = ".mobile-cta__book { background: var(--color-accent-warm); color: #fff; }"
mcta_call_new = ".mobile-cta__call { background: var(--color-navy); color: #fff; }"
mcta_book_new = ".mobile-cta__book { background: var(--color-primary); color: var(--color-navy); font-weight: 700; }"
content = content.replace(mcta_call_old, mcta_call_new)
content = content.replace(mcta_book_old, mcta_book_new)

with open('/Users/ruslanzlobin/Desktop/Global Dent/css/style.css', 'w') as f:
    f.write(content)
