import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Load articles from src/data/bakingJournalData.ts using tsx or dynamic parse
const journalDataFile = fs.readFileSync(path.resolve(rootDir, 'src/data/bakingJournalData.ts'), 'utf-8');
const arrayStart = journalDataFile.indexOf('export const BAKING_JOURNAL_ARTICLES');
const bracketStart = journalDataFile.indexOf('[', arrayStart);
const arraySource = journalDataFile.slice(bracketStart).replace(/;\s*$/, '');
const articles = Function(`"use strict"; return (${arraySource});`)();

const STATIC_ROUTES = [
  {
    path: '/baking-journal',
    title: 'The Artisanal Baking Journal - Pastry Chemistry & Cake Engineering | DAOS Cakes',
    description: 'In-depth technical guides on Swiss meringue buttercream emulsions, multi-tier cake structural engineering, chocolate ganache ratios, and scratch baking science.',
    heading: 'The Artisanal Baking Journal & Pastry Compendium',
    lead: 'Original technical articles, pastry chemistry tutorials, structural cake engineering blueprints, and field-tested kitchen protocols from DAOS Cakes in Smyrna, Georgia.',
    bodyHtml: `
      <section style="margin: 32px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 26px; color: #1c1917;">Complete Technical Article Library</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-top: 20px;">
          ${articles
            .map(
              (a) => `
            <article style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 14px; padding: 24px;">
              <span style="font-size: 12px; font-weight: 700; color: #92400e; text-transform: uppercase;">${escapeHtml(a.category)} • ${a.readTimeMinutes} min read</span>
              <h3 style="font-family: Georgia, serif; font-size: 20px; margin: 10px 0;">
                <a href="/baking-journal/${escapeHtml(a.slug)}" style="color: #1c1917; text-decoration: none;">${escapeHtml(a.title)}</a>
              </h3>
              <p style="font-size: 14px; line-height: 1.6; color: #57534e;">${escapeHtml(a.summary)}</p>
              <a href="/baking-journal/${escapeHtml(a.slug)}" style="font-size: 13px; font-weight: 700; color: #b45309;">Read Full Technical Article &rarr;</a>
            </article>`
            )
            .join('\n')}
        </div>
      </section>
    `
  },
  {
    path: '/baking-calculators',
    title: 'Interactive Baker’s Calculators - Pan Converter, Baker’s % & Ganache Ratios | DAOS Cakes',
    description: 'Free interactive pastry calculators for cake pan surface area scaling, scratch recipe Baker’s Percentages in grams, and couverture chocolate ganache ratios.',
    heading: 'Interactive Pastry & Cake Engineering Calculators',
    lead: 'Precision kitchen calculators for converting cake pan surface areas ($A = \\pi r^2$), scaling scratch sponge formulas via Baker’s Percentages (Flour = 100%), and formulating couverture chocolate ganache ratios.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">1. Cake Pan Surface Area &amp; Batter Weight Reference Table</h2>
        <p style="line-height: 1.7; color: #57534e;">When scaling any scratch cake recipe between different pan diameters at a constant 2-inch batter depth, multiply all ingredient gram weights by the ratio of the target pan surface area to the original pan surface area:</p>
        <ul style="line-height: 1.8; color: #44403c;">
          <li><strong>6-Inch Round Pan:</strong> 28.27 sq. in. surface area • 380g batter per layer (1,140g for 3 layers) • Bake at 335°F for 26–30 mins</li>
          <li><strong>8-Inch Round Pan:</strong> 50.27 sq. in. surface area • 675g batter per layer (2,025g for 3 layers) • Bake at 335°F for 30–35 mins</li>
          <li><strong>9-Inch Round Pan:</strong> 63.62 sq. in. surface area • 850g batter per layer (2,550g for 3 layers) • Bake at 335°F for 32–37 mins</li>
          <li><strong>10-Inch Round Pan:</strong> 78.54 sq. in. surface area • 1,050g batter per layer (3,150g for 3 layers) • Bake at 325°F for 36–42 mins</li>
          <li><strong>12-Inch Round Pan:</strong> 113.10 sq. in. surface area • 1,510g batter per layer (4,530g for 3 layers) • Bake at 325°F for 40–48 mins</li>
        </ul>
        <h2 style="font-family: Georgia, serif; font-size: 24px; margin-top: 28px;">2. Professional Baker’s Percentage Standards (Flour = 100%)</h2>
        <p style="line-height: 1.7; color: #57534e;">In professional pastry formulation, every ingredient is weighed in grams relative to total soft winter wheat cake flour (100%): Superfine Cane Sugar (95%–100%), Unsalted Sweet Cream Butter (68%–72%), Whole Cage-Free Eggs (65%), Cultured Whole Buttermilk (78%–85%), Double-Acting Baking Powder (3.5%–4%), Fine Sea Salt (1.5%), and Pure Madagascar Bourbon Vanilla Extract (3.5%).</p>
      </section>
    `
  },
  {
    path: '/flavor-guide',
    title: 'Artisanal Cake Flavor & Filling Pairing Guide | DAOS Cakes Smyrna, GA',
    description: 'Explore our scratch-baked sponge flavors, Swiss meringue buttercreams, Belgian chocolate ganaches, and housemade fresh fruit compotes.',
    heading: 'Artisanal Cake Flavor & Pairing Compendium',
    lead: 'Discover our signature scratch-baked sponges—including Madagascar Bourbon Vanilla Bean, Belgian Dark Chocolate Fudge, Southern Cultured Red Velvet, Meyer Lemon Poppyseed, and Spiced Georgia Pecan Carrot—paired with Swiss Meringue Buttercream and housemade fruit compotes.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Signature Scratch Sponge Profiles &amp; Fillings</h2>
        <p style="line-height: 1.7; color: #57534e;">Every cake at DAOS Cakes is baked from scratch to order in Smyrna, Georgia using unbleached soft winter wheat cake flour, Grade-AA sweet cream butter, cage-free eggs, and pure botanical extracts. We pair our sponges with low-sugar Swiss Meringue Buttercream, 54% Belgian dark chocolate ganache, scratch-simmered strawberry and raspberry compotes, and tangy Meyer lemon curd.</p>
      </section>
    `
  },
  {
    path: '/cake-care-guide',
    title: 'Cake Care, Storage & Hot-Weather Vehicle Transport Guide | DAOS Cakes',
    description: 'Essential guidelines for transporting delicate buttercream celebration cakes on a flat vehicle floorboard, refrigeration, and room-temperature tempering before slicing.',
    heading: 'Cake Care, Refrigeration & Safe Vehicle Transport Guide',
    lead: 'Step-by-step instructions for transporting multi-layer buttercream celebration cakes safely in Georgia humidity, storing your cake in the refrigerator, and tempering slices to 68°F–72°F before serving.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Golden Rules of Safe Cake Transport &amp; Tempering</h2>
        <p style="line-height: 1.7; color: #57534e;">Always place your cake box flat on the level front passenger floorboard or flat rear SUV cargo floor with maximum air conditioning running. Never transport a tiered or tall celebration cake on a sloped vehicle seat, in a passenger's lap, or inside an uncooled trunk. Keep refrigerated at 36°F–38°F until 60–90 minutes prior to slicing.</p>
      </section>
    `
  },
  {
    path: '/wedding-guide',
    title: 'Multi-Tier Wedding & Milestone Celebration Cake Guide | DAOS Cakes',
    description: 'Comprehensive guide to wedding cake tier sizing, guest serving calculations, internal structural doweling, and flavor consultations in Smyrna & Greater Atlanta.',
    heading: 'Wedding & Multi-Tiered Celebration Cake Planning Guide',
    lead: 'Everything couples and event planners in Cobb County and Greater Atlanta need to know about tier architecture, guest serving math, internal structural doweling, and custom botanical palettes.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Tier Sizing &amp; Structural Engineering for Weddings</h2>
        <p style="line-height: 1.7; color: #57534e;">Our two-tier (6"+8" serving 40–45 guests) and three-tier (6"+8"+10" serving 75–85 guests) wedding cakes are engineered with independent cake boards, internal polypropylene load-bearing dowels, and a full-height central locking rod for safe transport and pristine reception display.</p>
      </section>
    `
  },
  {
    path: '/baking-craft',
    title: 'Our Scratch-Baking Craft, Ingredients & Culinary Standards | DAOS Cakes',
    description: 'Discover how DAOS Cakes formulates every sponge from scratch using sweet cream butter, cage-free eggs, Madagascar vanilla, and Georgia Cottage Food safety protocols.',
    heading: 'The DAOS Scratch-Baking Craft & Ingredient Standards',
    lead: 'Why we reject commercial box mixes, artificial shortening, and frozen bulk sponges in favor of small-batch French and Southern pastry craftsmanship.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Small-Batch Culinary Integrity</h2>
        <p style="line-height: 1.7; color: #57534e;">We weigh every batch to the gram on digital scales, whip pasteurized egg whites over a bain-marie for silky Swiss Meringue Buttercream, and reduce real whole berries with cane sugar and fresh lemon juice for vibrant, authentic flavor.</p>
      </section>
    `
  },
  {
    path: '/pricing-estimator',
    title: 'Interactive Custom Cake Price & Serving Size Estimator | DAOS Cakes',
    description: 'Calculate estimated pricing, tier dimensions, and serving counts for custom celebration and wedding cakes in Smyrna, Georgia.',
    heading: 'Interactive Custom Cake Price & Serving Estimator',
    lead: 'Select your guest count, tier architecture, sponge flavor, gourmet filling, and artistic finishes to calculate an instant transparent estimate for your custom cake.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Transparent Artisanal Pricing Guide</h2>
        <p style="line-height: 1.7; color: #57534e;">Custom 3-layer celebration cakes start with 6-inch rounds (12–15 servings), 8-inch rounds (20–25 servings), 10-inch rounds (35–40 servings), and multi-tiered architectural cakes for weddings and milestone galas.</p>
      </section>
    `
  },
  {
    path: '/how-it-works',
    title: 'How Custom Cake Ordering & Local Smyrna Pickup Works | DAOS Cakes',
    description: 'Learn our 4-step custom cake ordering process, advance booking timelines, design consultation, and in-person cash pickup in Smyrna, GA.',
    heading: 'How Custom Cake Ordering Works at DAOS Cakes',
    lead: 'Our simple 4-step process from initial flavor and design consultation to fresh small-batch baking and scheduled in-person pickup in Smyrna, Georgia.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">4 Steps from Inquiry to Celebration</h2>
        <ol style="line-height: 1.8; color: #44403c;">
          <li><strong>Step 1 — Estimate &amp; Design:</strong> Use our interactive estimator or browse our Flavor Guide to choose your size, sponge, and filling.</li>
          <li><strong>Step 2 — Submit Your Order Request:</strong> Complete our online order form at least 7–14 days before your event date.</li>
          <li><strong>Step 3 — Personal Confirmation:</strong> We review your design specifications and confirm your pickup window in Smyrna, GA.</li>
          <li><strong>Step 4 — In-Person Inspection &amp; Cash Pickup:</strong> Inspect your freshly baked cake in person at pickup and complete payment in cash.</li>
        </ol>
      </section>
    `
  },
  {
    path: '/order',
    title: 'Request a Custom Celebration Cake Order | DAOS Cakes Smyrna, GA',
    description: 'Submit your custom cake design, flavor pairing, guest count, and pickup date request for in-person pickup in Smyrna, Georgia.',
    heading: 'Custom Celebration Cake Order Request Form',
    lead: 'Submit your event date, guest count, flavor selections, and design notes. All orders are baked fresh to order for in-person pickup in Smyrna, Georgia (Cash Only at Pickup).',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Reserve Your Date on Our Baking Calendar</h2>
        <p style="line-height: 1.7; color: #57534e;">Because every sponge, fruit compote, and Swiss meringue buttercream batch is crafted from scratch for your specific event, weekly availability is limited. No online credit card payment is collected—payment is strictly in person in cash upon inspecting and picking up your cake in Smyrna, GA.</p>
      </section>
    `
  },
  {
    path: '/about',
    title: 'About the Baker & Our Smyrna Artisanal Pastry Studio | DAOS Cakes',
    description: 'Meet the artisan baker behind DAOS Cakes in Smyrna, Georgia. Learn about our scratch-baking heritage, quality commitments, and local community roots.',
    heading: 'About DAOS Cakes — Artisanal Cottage Bakery in Smyrna, Georgia',
    lead: 'Dedicated to scratch-baked celebration cakes, honest whole ingredients, and timeless pastry craftsmanship for families across Smyrna, Cobb County, and Greater Atlanta.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Our Story &amp; Culinary Philosophy</h2>
        <p style="line-height: 1.7; color: #57534e;">Founded in Smyrna, Georgia and operated by DAOS Florida LLC, DAOS Cakes was born from a passion for real pastry science—where pure Madagascar bourbon vanilla, European-style butter, fresh citrus curds, and architectural precision come together to mark life’s most meaningful milestones.</p>
      </section>
    `
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) - Ordering, Transport & Policies | DAOS Cakes',
    description: 'Answers to common questions about ordering custom cakes, lead times, allergen disclosures, safe car transport, and in-person cash payment at pickup.',
    heading: 'Frequently Asked Questions (FAQ)',
    lead: 'Complete answers regarding custom cake lead times, Smyrna pickup scheduling, cash-on-pickup payment policies, allergen disclosures, and cake storage.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Ordering, Payment &amp; Care FAQs</h2>
        <p style="line-height: 1.7; color: #57534e;"><strong>How far in advance should I order?</strong> We recommend 7 to 14 days notice for custom celebration cakes and 4 to 8 weeks for multi-tiered wedding cakes.<br /><br /><strong>How does payment work?</strong> We never ask for online credit card payments. Payment is strictly Cash Only in person when you inspect and pick up your finished cake in Smyrna, Georgia.</p>
      </section>
    `
  },
  {
    path: '/contact',
    title: 'Contact DAOS Cakes - Smyrna, Georgia Custom Bakery Inquiries',
    description: 'Get in touch with DAOS Cakes in Smyrna, GA by phone at (470) 476-1631 / (678) 235-8462 or email at daoscakes2@gmail.com.',
    heading: 'Contact DAOS Cakes in Smyrna, Georgia',
    lead: 'Reach out to our pastry studio by telephone, email, or online inquiry form for custom cake consultations and pickup scheduling.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Direct Studio Contact Information</h2>
        <p style="line-height: 1.8; color: #57534e;">
          <strong>Location:</strong> Smyrna, Georgia 30080 (Serving Cobb County &amp; Greater Atlanta)<br />
          <strong>Primary Telephone:</strong> <a href="tel:4704761631">(470) 476-1631</a><br />
          <strong>Secondary Telephone:</strong> <a href="tel:6782358462">(678) 235-8462</a><br />
          <strong>Email:</strong> <a href="mailto:daoscakes2@gmail.com">daoscakes2@gmail.com</a>
        </p>
      </section>
    `
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy & Google AdSense Cookie Disclosures | DAOS Cakes',
    description: 'Official Privacy Policy for DAOS Cakes detailing Google AdSense advertising cookies, DoubleClick DART cookies, opt-out controls, GDPR/CCPA rights, and contact info.',
    heading: 'Privacy Policy & Google AdSense Disclosures',
    lead: 'Comprehensive privacy disclosures covering Google AdSense third-party cookies, DoubleClick DART cookies, personalized ad opt-out portals, GDPR/CCPA rights, and COPPA compliance.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Google AdSense &amp; Third-Party Cookie Policy (pub-3796452050933185)</h2>
        <p style="line-height: 1.7; color: #57534e;">We use Google AdSense (Publisher ID: pub-3796452050933185) to display advertisements. Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve ads based on a user's prior visits to this website or other websites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/">https://adssettings.google.com/</a> or <a href="https://www.aboutads.info/choices/">https://www.aboutads.info/choices/</a>.</p>
      </section>
    `
  },
  {
    path: '/terms',
    title: 'Terms of Service & Custom Order Policies | DAOS Cakes',
    description: 'Terms of Service governing custom cake inquiries, lead times, allergen advisories, vehicle transport responsibility, and in-person pickup in Smyrna, GA.',
    heading: 'Terms of Service & Custom Bakery Policies',
    lead: 'Legal terms governing custom cake inquiries, appointment pickup windows, allergen disclosures, and cash-on-pickup payment in Smyrna, Georgia.',
    bodyHtml: `
      <section style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 32px; margin: 28px 0;">
        <h2 style="font-family: Georgia, serif; font-size: 24px;">Order Confirmation, Transport &amp; Allergen Terms</h2>
        <p style="line-height: 1.7; color: #57534e;">All cakes are handcrafted from scratch in a home kitchen operating under Georgia Cottage Food regulations where wheat, eggs, milk, soy, peanuts, and tree nuts are present. Payment is due in cash upon physical inspection and pickup in Smyrna, Georgia.</p>
      </section>
    `
  }
];

// Build article routes from BAKING_JOURNAL_ARTICLES
const articleRoutes = articles.map((article) => {
  const sectionsHtml = article.sections
    .map((sec) => {
      const paragraphsHtml = sec.paragraphs
        .map((p) => `<p style="font-size: 16px; line-height: 1.75; color: #44403c; margin: 12px 0;">${escapeHtml(p)}</p>`)
        .join('\n');

      const bulletsHtml =
        sec.bulletPoints && sec.bulletPoints.length > 0
          ? `<ul style="line-height: 1.75; color: #44403c; background: #fafaf9; padding: 20px 20px 20px 36px; border-radius: 12px; border: 1px solid #e7e5e4;">
              ${sec.bulletPoints.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>`
          : '';

      const tableHtml = sec.table
        ? `<div style="overflow-x: auto; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #d6d3d1; font-size: 14px;">
              <thead>
                <tr style="background: #1c1917; color: #fef3c7;">
                  ${sec.table.headers.map((h) => `<th style="padding: 12px; text-align: left; border: 1px solid #44403c;">${escapeHtml(h)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${sec.table.rows
                  .map(
                    (row) => `
                  <tr style="border-bottom: 1px solid #e7e5e4;">
                    ${row.map((cell) => `<td style="padding: 12px; border: 1px solid #e7e5e4; color: #44403c;">${escapeHtml(cell)}</td>`).join('')}
                  </tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </div>`
        : '';

      const proTipHtml = sec.proTip
        ? `<blockquote style="margin: 16px 0; padding: 18px 24px; background: #1c1917; color: #f5f5f4; border-radius: 12px;">
            <strong style="color: #fbbf24;">Pastry Chef Pro-Tip:</strong> ${escapeHtml(sec.proTip)}
          </blockquote>`
        : '';

      return `
        <section style="margin: 28px 0;">
          <h2 style="font-family: Georgia, serif; font-size: 24px; color: #1c1917; margin-bottom: 12px;">${escapeHtml(sec.heading)}</h2>
          ${paragraphsHtml}
          ${bulletsHtml}
          ${tableHtml}
          ${proTipHtml}
        </section>
      `;
    })
    .join('\n');

  const faqHtml =
    article.faq && article.faq.length > 0
      ? `<section style="margin-top: 32px; border-top: 1px solid #e7e5e4; padding-top: 24px;">
          <h2 style="font-family: Georgia, serif; font-size: 22px; color: #1c1917;">Frequently Asked Technical Questions</h2>
          ${article.faq
            .map(
              (f) => `
            <div style="margin: 16px 0; padding: 16px; background: #fafaf9; border-radius: 10px; border: 1px solid #e7e5e4;">
              <h3 style="font-size: 16px; color: #1c1917; margin: 0 0 6px 0;">${escapeHtml(f.question)}</h3>
              <p style="font-size: 14px; line-height: 1.65; color: #57534e; margin: 0;">${escapeHtml(f.answer)}</p>
            </div>`
            )
            .join('')}
        </section>`
      : '';

  return {
    path: `/baking-journal/${article.slug}`,
    title: `${article.title} | DAOS Cakes Baking Journal`,
    description: article.summary,
    heading: article.title,
    lead: article.subtitle,
    bodyHtml: `
      <article style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 36px; margin: 24px 0;">
        <div style="font-size: 13px; color: #78716c; margin-bottom: 20px;">
          <span>Category: <strong>${escapeHtml(article.category)}</strong></span> •
          <span>Author: <strong>${escapeHtml(article.author)} (${escapeHtml(article.authorRole)})</strong></span> •
          <span>Updated: ${escapeHtml(article.updatedDate)}</span> •
          <span>${article.readTimeMinutes} min read</span>
        </div>
        <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
          <strong style="display: block; color: #92400e; margin-bottom: 8px;">Key Technical Takeaways:</strong>
          <ul style="margin: 0; padding-left: 20px; color: #44403c; line-height: 1.7;">
            ${article.keyTakeaways.map((k) => `<li>${escapeHtml(k)}</li>`).join('')}
          </ul>
        </div>
        ${sectionsHtml}
        ${faqHtml}
      </article>
    `
  };
});

const allRoutes = [...STATIC_ROUTES, ...articleRoutes];

function generateRouteHtml(route) {
  const canonicalUrl = `https://daoscakes.pages.dev${route.path}`;
  let html = baseHtml;

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // Replace canonical URL
  html = html.replace(
    /<link\s+id="canonical-url"\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link id="canonical-url" rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace og:url, og:title, og:description, twitter:title, twitter:description
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  // Replace the inner content of <div id="root">...</div> with route-specific semantic HTML
  const routeRootHtml = `
    <div id="root">
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #292524; background-color: #fafaf9; margin: 0; padding: 0;">
        <header style="background: #ffffff; border-bottom: 1px solid #e7e5e4; padding: 16px 24px;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <a href="/" style="text-decoration: none; color: #78350f; font-size: 22px; font-weight: bold; font-family: Georgia, serif;">🎂 DAOS Cakes</a>
            <nav style="display: flex; gap: 14px; flex-wrap: wrap; font-size: 14px; font-weight: 500;">
              <a href="/" style="color: #44403c; text-decoration: none;">Home</a>
              <a href="/baking-journal" style="color: #78350f; text-decoration: none; font-weight: 700;">Baking Journal</a>
              <a href="/baking-calculators" style="color: #44403c; text-decoration: none;">Calculators</a>
              <a href="/flavor-guide" style="color: #44403c; text-decoration: none;">Flavor Guide</a>
              <a href="/cake-care-guide" style="color: #44403c; text-decoration: none;">Cake Care</a>
              <a href="/wedding-guide" style="color: #44403c; text-decoration: none;">Wedding Guide</a>
              <a href="/baking-craft" style="color: #44403c; text-decoration: none;">Baking Craft</a>
              <a href="/pricing-estimator" style="color: #44403c; text-decoration: none;">Price Estimator</a>
              <a href="/about" style="color: #44403c; text-decoration: none;">About</a>
              <a href="/faq" style="color: #44403c; text-decoration: none;">FAQ</a>
              <a href="/contact" style="color: #44403c; text-decoration: none;">Contact</a>
              <a href="/privacy-policy" style="color: #44403c; text-decoration: none;">Privacy Policy</a>
            </nav>
          </div>
        </header>
        <main style="max-width: 1000px; margin: 0 auto; padding: 40px 24px;">
          <h1 style="font-family: Georgia, serif; font-size: 36px; line-height: 1.25; color: #1c1917; margin-bottom: 14px;">${escapeHtml(route.heading)}</h1>
          <p style="font-size: 18px; line-height: 1.65; color: #57534e; margin-bottom: 28px;">${escapeHtml(route.lead)}</p>
          ${route.bodyHtml}
        </main>
        <footer style="background: #1c1917; color: #d6d3d1; padding: 36px 24px; text-align: center; font-size: 13px;">
          <p>&copy; 2026 DAOS Cakes • Smyrna, Georgia • <a href="/privacy-policy" style="color: #fef3c7;">Privacy Policy</a> • <a href="/terms" style="color: #fef3c7;">Terms of Service</a></p>
        </footer>
      </div>
    </div>`;

  html = html.replace(/<div id="root">[\s\S]*?<\/footer>\s*<\/div>\s*<\/div>/i, routeRootHtml);

  const targetFolder = path.join(distDir, route.path.replace(/^\/+/, ''));
  fs.mkdirSync(targetFolder, { recursive: true });
  fs.writeFileSync(path.join(targetFolder, 'index.html'), html, 'utf-8');
}

for (const route of allRoutes) {
  generateRouteHtml(route);
}

console.log(`Pre-rendered ${allRoutes.length} static routes with unique canonical URLs and semantic content.`);
