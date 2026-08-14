# Salón krásy Prestiž — web

Statický web salonu krásy (Pardubice, ČR). Bez závislostí, bez build kroku —
stačí nahrát obsah složky na libovolný hosting se statickými soubory.

## Struktura

| Soubor | Popis |
|---|---|
| `index.html` | Hlavní stránka (hero, služby, ceník, akce, o salonu, kontakt) |
| `ochrana-osobnich-udaju.html` | Zásady zpracování osobních údajů (GDPR) |
| `podminky-uziti.html` | Podmínky užití, rezervace a storno |
| `cookies.html` | Zásady používání cookies |
| `legal.css` | Styly právních podstránek |
| `consent.js` | Lišta souhlasu s cookies (localStorage, bez sledování) |
| `robots.txt`, `sitemap.xml` | SEO |

## Co je potřeba doplnit (hledejte „DOPLNIT")

1. **Doména** — v souborech `index.html`, `ochrana-osobnich-udaju.html`,
   `podminky-uziti.html`, `cookies.html`, `robots.txt` a `sitemap.xml` je
   použit placeholder `https://www.salonkrasyprestiz.cz/`. Nahraďte jej
   skutečnou adresou (týká se `canonical`, Open Graph a sitemap — musí být
   **absolutní** URL).
2. **IČO** — na právních podstránkách je zástupný text „DOPLNIT IČO".
   Uvedení IČO je zákonná povinnost podnikatele.
3. **Ceny** — v ceníku na `index.html` upřesněte skutečné ceny.
4. **Obrázky** — vložte vedle HTML: `logo.png`, `favicon-32.png`,
   `logo-180.png`, `hero.jpg/.webp`, `hero-mobile.jpg/.webp`,
   `sluzba-vlasy/plet/nehty.jpg/.webp`, `promo.jpg/.webp`, `salon.jpg/.webp`,
   `cenik-bg.jpg/.webp`, `kontakt-bg.jpg/.webp`. Dokud logo chybí, zobrazí se
   zlatá SVG náhrada.

## Analytika

Web ve výchozím stavu **nikoho nesleduje**. Pokud zavedete Google Analytics
apod., vložte kód do funkce `loadAnalytics()` v `consent.js` — spustí se pouze
po souhlasu návštěvníka.
