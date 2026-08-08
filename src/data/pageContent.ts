// ============================================================
//  Central Page Content Data — All 32 sub-option pages
// ============================================================

// --- INFO PAGES (Know / Compare / Find Best) ---
export interface InfoSection {
  id: string;
  heading: string;
  content: string;
  bullets?: { label: string; desc: string }[];
  highlight?: string;
}
export interface InfoFaq { q: string; a: string; }
export interface InfoPageData {
  slug: string;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  readTime: string;
  image: string;
  tocItems: { id: string; label: string }[];
  sections: InfoSection[];
  faqs: InfoFaq[];
  keyStats: { value: string; label: string }[];
}

export const infoPages: Record<string, InfoPageData> = {
  'know-term': {
    slug: 'know-term', category: 'Term Insurance', tag: 'Guide',
    title: 'Know Term Insurance Like a Pro',
    subtitle: 'Understand every term, clause, benefit and trap before you buy.',
    readTime: '12 min', image: '/term_insurance.png',
    keyStats: [
      { value: '₹1 Cr', label: 'Cover from ₹500/mo' },
      { value: '99.5%', label: 'Avg. Claim Ratio' },
      { value: '30+', label: 'Insurers Available' },
    ],
    tocItems: [
      { id: 'what-is', label: 'What is Term Insurance?' },
      { id: 'why-need', label: 'Why Do You Need It?' },
      { id: 'how-works', label: 'How Does It Work?' },
      { id: 'types', label: 'Types of Term Plans' },
      { id: 'riders', label: 'Riders & Add-ons' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'what-is', heading: 'What is Term Insurance?',
        content: 'Term insurance is the simplest and most affordable form of life insurance. You pay a fixed premium for a fixed period (the "term"). If you pass away during this period, your nominees receive a large tax-free lump sum called the death benefit. If you survive the term, no money is paid back — which is exactly why it is so affordable.',
        highlight: 'A ₹1 Crore cover for a 30-year-old non-smoker can cost as little as ₹450 per month.',
      },
      {
        id: 'why-need', heading: 'Why Do You Need Term Insurance?',
        content: 'Term insurance is your family\'s income replacement. If something happens to you, your family can continue their lifestyle, repay home loans, fund children\'s education, and meet day-to-day expenses without financial stress.',
        bullets: [
          { label: 'Income Replacement', desc: 'Replaces your monthly income for your dependants for years.' },
          { label: 'Debt Clearance', desc: 'Helps family repay home loans, car loans and credit card dues.' },
          { label: 'Child\'s Future', desc: 'Secures higher education and marriage costs even in your absence.' },
          { label: 'Tax Savings', desc: 'Premiums are deductible under Section 80C (up to ₹1.5L per year).' },
        ],
      },
      {
        id: 'how-works', heading: 'How Does Term Insurance Work?',
        content: 'You choose a Sum Assured (e.g. ₹1 Crore), a policy term (e.g. 30 years), and a premium payment frequency. You pay premiums each year. If you die within the term, the insurer pays the death benefit directly to your nominee. The claim is usually settled within 3–5 working days.',
        highlight: 'Always buy a term plan that covers you until at least age 60-65, so your dependants are protected through your peak earning years.',
      },
      {
        id: 'types', heading: 'Types of Term Insurance Plans',
        content: 'Not all term plans are the same. Here are the main variants available in India:',
        bullets: [
          { label: 'Level Term Plan', desc: 'Death benefit remains constant throughout the policy term. Most popular type.' },
          { label: 'Increasing Term Plan', desc: 'Sum assured increases every year (usually by 5-10%) to beat inflation.' },
          { label: 'Decreasing Term Plan', desc: 'Cover reduces over time — ideal for home loan protection.' },
          { label: 'Return of Premium (TROP)', desc: 'All premiums returned if you survive the term. Higher cost.' },
          { label: 'Whole Life Plan', desc: 'Covers you for your entire lifetime (up to age 99-100).' },
        ],
      },
      {
        id: 'riders', heading: 'Key Riders & Add-ons',
        content: 'Riders are optional benefits you can add to your base term plan at a small additional premium:',
        bullets: [
          { label: 'Critical Illness Rider', desc: 'Pays lump sum on diagnosis of 40+ critical illnesses like cancer, heart attack.' },
          { label: 'Accidental Death Benefit', desc: 'Doubles or triples the payout if death is due to accident.' },
          { label: 'Waiver of Premium', desc: 'Future premiums waived if you become totally disabled.' },
          { label: 'Terminal Illness Rider', desc: 'Early payout if diagnosed with terminal illness.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is the right age to buy term insurance?', a: 'The earlier the better. Premiums are lowest when you are young and healthy. Ideally buy before 30.' },
      { q: 'How much cover do I need?', a: 'A common rule: 10-15x your annual income. If you earn ₹10L/year, aim for ₹1-1.5 Crore cover.' },
      { q: 'Does term insurance cover COVID-19 death?', a: 'Yes. Most term insurance policies cover death due to COVID-19, as it is treated as any other illness.' },
      { q: 'Can I buy term insurance for my spouse too?', a: 'Yes. Many insurers offer joint term plans, or you can buy separate plans for each spouse.' },
      { q: 'What happens if I miss a premium payment?', a: 'Most policies have a 30-day grace period. If you miss beyond that, the policy lapses but can usually be revived within 2 years.' },
    ],
  },

  'compare-term': {
    slug: 'compare-term', category: 'Term Insurance', tag: 'Comparison',
    title: 'Compare the Best Term Insurance Plans in India',
    subtitle: 'Side-by-side analysis of features, exclusions, claim ratios, and premiums.',
    readTime: '10 min', image: '/plans_compare.png',
    keyStats: [
      { value: '24+', label: 'Plans Compared' },
      { value: '99.5%', label: 'Best Claim Ratio' },
      { value: '₹450/mo', label: 'Starting Premium' },
    ],
    tocItems: [
      { id: 'top-plans', label: 'Top Plans 2024' },
      { id: 'claim-ratio', label: 'Claim Settlement Ratio' },
      { id: 'features', label: 'Feature Comparison' },
      { id: 'exclusions', label: 'What Is Not Covered' },
      { id: 'how-to-choose', label: 'How to Choose' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'top-plans', heading: 'Top Term Plans in India 2024',
        content: 'Based on our expert analysis of claim settlement ratios, premium affordability, coverage features, and customer service — here are the top term insurance plans:',
        bullets: [
          { label: 'LIC Tech Term', desc: 'Best for trust & government backing. Claim ratio: 98.8%.' },
          { label: 'HDFC Life Click 2 Protect Super', desc: 'Best for features. Life Stage Benefit option available. Claim ratio: 99.5%.' },
          { label: 'Max Life Smart Secure Plus', desc: 'Best for rider options. Return of premium variant available. Claim ratio: 99.5%.' },
          { label: 'ICICI Prudential iProtect Smart', desc: 'Best for online purchase. Lowest premiums for women. Claim ratio: 98.0%.' },
          { label: 'Tata AIA SRS Vitality', desc: 'Best for health-linked discounts. Rewards healthy lifestyle. Claim ratio: 98.5%.' },
        ],
        highlight: 'Always compare plans based on your specific age, income, health condition, and financial goals — not just premium.',
      },
      {
        id: 'claim-ratio', heading: 'Claim Settlement Ratios (2023-24)',
        content: 'The Claim Settlement Ratio (CSR) tells you what percentage of claims an insurer paid out. A higher CSR means greater reliability. Here are the top performers:',
        bullets: [
          { label: 'Max Life Insurance', desc: 'CSR: 99.51% — Highest in the industry.' },
          { label: 'HDFC Life Insurance', desc: 'CSR: 99.50% — Consistently top performer.' },
          { label: 'Tata AIA Life', desc: 'CSR: 99.01%' },
          { label: 'Axis Max Life', desc: 'CSR: 98.97%' },
          { label: 'LIC', desc: 'CSR: 98.8% — Most trusted government insurer.' },
        ],
      },
      {
        id: 'features', heading: 'Key Features to Compare',
        content: 'When comparing term plans, look beyond just the premium. Here are the features that matter most:',
        bullets: [
          { label: 'Claim Settlement Ratio', desc: 'Higher is better. Look for >98%.' },
          { label: 'Cover Amount Flexibility', desc: 'Can you increase cover at life milestones (marriage, childbirth)?' },
          { label: 'Premium Payment Modes', desc: 'Monthly, quarterly, annual. Choose what suits your cash flow.' },
          { label: 'Payout Options', desc: 'Lump sum, monthly income, or combination. Monthly income is better for family protection.' },
          { label: 'Rider Availability', desc: 'Critical illness, accidental death, waiver of premium.' },
        ],
      },
      {
        id: 'exclusions', heading: 'What Is NOT Covered',
        content: 'Every term plan has exclusions. Understanding these prevents claim rejections:',
        bullets: [
          { label: 'Suicide (first year)', desc: 'Most plans exclude death by suicide within the first year of policy.' },
          { label: 'Pre-existing Conditions (if undisclosed)', desc: 'Always disclose all health conditions at the time of buying. Non-disclosure = claim rejection.' },
          { label: 'War & Terrorism', desc: 'Death due to war, civil unrest, or terrorism is generally excluded.' },
          { label: 'Intoxication', desc: 'Death while under the influence of drugs or alcohol may be rejected.' },
        ],
      },
      {
        id: 'how-to-choose', heading: 'How to Choose the Right Term Plan',
        content: 'Follow this checklist when buying term insurance:',
        bullets: [
          { label: 'Step 1: Fix your cover amount', desc: '10-15x annual income + outstanding loans.' },
          { label: 'Step 2: Fix your policy term', desc: 'Cover until at least retirement age (60-65 years).' },
          { label: 'Step 3: Check claim settlement ratio', desc: 'Minimum 97%, ideally above 99%.' },
          { label: 'Step 4: Compare premiums', desc: 'Use our comparison tool for accurate quotes.' },
          { label: 'Step 5: Choose the right riders', desc: 'At minimum, add critical illness and accidental death riders.' },
        ],
      },
    ],
    faqs: [
      { q: 'Which is the best term plan in India?', a: 'There is no single "best" plan. HDFC Life Click 2 Protect Super and Max Life Smart Secure Plus are consistently top rated for their features and high claim ratios.' },
      { q: 'Should I buy term insurance online or offline?', a: 'Online is cheaper (no agent commission) and faster. Most reputable insurers have strong online platforms.' },
      { q: 'Can I have multiple term insurance policies?', a: 'Yes. You can own multiple policies from different insurers. All claims will be paid out, subject to each policy\'s terms.' },
    ],
  },

  'find-term': {
    slug: 'find-term', category: 'Term Insurance', tag: 'Tool',
    title: 'Find the Best Term Insurance Plan For You',
    subtitle: 'Answer 3 quick questions. Get personalized recommendations in minutes.',
    readTime: '5 min', image: '/consultation.png',
    keyStats: [
      { value: '3 min', label: 'To Get a Quote' },
      { value: '₹0', label: 'Consultation Fee' },
      { value: '500+', label: 'Experts Available' },
    ],
    tocItems: [
      { id: 'factors', label: 'What Affects Your Premium?' },
      { id: 'age', label: 'Best Plans by Age' },
      { id: 'income', label: 'Best Plans by Income' },
      { id: 'health', label: 'Best Plans by Health Condition' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'factors', heading: 'What Affects Your Term Insurance Premium?',
        content: 'Your premium is calculated based on several personal factors. Understanding these helps you find the most affordable plan:',
        bullets: [
          { label: 'Age', desc: 'Younger = cheaper. A 25-year-old pays ~30-40% less than a 40-year-old for the same cover.' },
          { label: 'Gender', desc: 'Women generally pay lower premiums due to higher life expectancy.' },
          { label: 'Smoker Status', desc: 'Smokers pay 50-100% higher premiums. Quitting for 12+ months qualifies you for lower rates.' },
          { label: 'Health Conditions', desc: 'Diabetes, hypertension, obesity add a loading (extra premium) of 10-50%.' },
          { label: 'Occupation', desc: 'Hazardous occupations (mining, defence) attract higher premiums.' },
          { label: 'Cover Amount & Term', desc: 'Higher cover = higher premium. Longer term = higher but more value.' },
        ],
        highlight: 'A non-smoking 30-year-old can get ₹1 Crore cover for just ₹450-500 per month.',
      },
      {
        id: 'age', heading: 'Best Term Plans by Age Group',
        content: 'Different age groups have different priorities when it comes to term insurance:',
        bullets: [
          { label: '25-30 years', desc: 'Priority: Maximum cover at minimum premium. Best picks: HDFC Click 2 Protect, Max Smart Secure Plus.' },
          { label: '31-40 years', desc: 'Priority: Riders for critical illness + income replacement. Best picks: Tata AIA, ICICI Prudential iProtect.' },
          { label: '41-50 years', desc: 'Priority: Whole life coverage + guaranteed income option. Best picks: LIC Tech Term, SBI Life eShield Next.' },
          { label: '50+ years', desc: 'Priority: Simplified underwriting, senior plans. Best picks: LIC Jeevan Umang, Bajaj Allianz Life Smart Protect Goal.' },
        ],
      },
      {
        id: 'income', heading: 'Recommended Cover Based on Income',
        content: 'The Human Life Value (HLV) method is the gold standard for calculating cover:',
        bullets: [
          { label: '₹5-10 L/year', desc: 'Recommended: ₹75L - ₹1 Crore cover.' },
          { label: '₹10-20 L/year', desc: 'Recommended: ₹1.5-2 Crore cover.' },
          { label: '₹20-50 L/year', desc: 'Recommended: ₹3-5 Crore cover.' },
          { label: '₹50L+/year', desc: 'Recommended: ₹5-10 Crore cover. Consider multi-policy strategy.' },
        ],
      },
      {
        id: 'health', heading: 'Best Plans for Specific Health Conditions',
        content: 'Have a pre-existing condition? Here are the most accommodating insurers:',
        bullets: [
          { label: 'Diabetes (controlled)', desc: 'HDFC Life, Max Life, and ICICI Prudential offer policies with loading. Disclose fully.' },
          { label: 'Hypertension', desc: 'Most insurers accept mild hypertension with a medical loading of 25-50%.' },
          { label: 'Obesity', desc: 'BMI above 30 attracts loading. LIC and Max Life are most flexible for obesity cases.' },
          { label: 'Ex-smokers', desc: 'Must be smoke-free for 12+ months. Then apply as non-smoker with HDFC or Max Life.' },
        ],
      },
    ],
    faqs: [
      { q: 'How do I check if I qualify for term insurance?', a: 'Most insurers require you to be between 18-65 years, be an Indian resident, and pass a medical exam for high sum assured.' },
      { q: 'What documents do I need to buy term insurance online?', a: 'Typically: Aadhaar, PAN, income proof (Form 16 / salary slip), address proof, and recent medical reports if applicable.' },
      { q: 'Can self-employed individuals buy term insurance?', a: 'Yes. You will need to provide your ITR (Income Tax Returns) for the last 2-3 years as income proof.' },
    ],
  },

  'know-health': {
    slug: 'know-health', category: 'Health Insurance', tag: 'Guide',
    title: 'Know Health Insurance Like a Pro',
    subtitle: 'From waiting periods to sub-limits — understand every clause before you sign.',
    readTime: '14 min', image: '/health_insurance.png',
    keyStats: [
      { value: '₹5L', label: 'Cover from ₹500/mo' },
      { value: '500+', label: 'Network Hospitals' },
      { value: '4 yr', label: 'Avg. Waiting Period' },
    ],
    tocItems: [
      { id: 'what-is', label: 'What is Health Insurance?' },
      { id: 'types', label: 'Types of Plans' },
      { id: 'what-covers', label: 'What Does It Cover?' },
      { id: 'exclusions', label: 'Common Exclusions' },
      { id: 'choose', label: 'How to Choose' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'what-is', heading: 'What is Health Insurance?',
        content: 'Health insurance is a contract where an insurer pays for your medical expenses in exchange for a regular premium. In India, medical inflation runs at 15-20% per year. A surgery that cost ₹2L in 2015 now costs ₹5L+. Health insurance protects your savings from being wiped out by medical emergencies.',
        highlight: 'Medical inflation in India is 3x higher than general inflation. Without health insurance, one hospitalization can set back your savings by years.',
      },
      {
        id: 'types', heading: 'Types of Health Insurance Plans',
        content: 'There are several types of health plans suited to different needs:',
        bullets: [
          { label: 'Individual Health Plan', desc: 'Covers one person. Sum insured dedicated entirely to that individual.' },
          { label: 'Family Floater Plan', desc: 'Single policy covers entire family. Sum insured shared. Cost-effective.' },
          { label: 'Senior Citizen Plan', desc: 'Designed for 60+ age group. Higher premiums, lower waiting periods.' },
          { label: 'Critical Illness Plan', desc: 'Lump sum payout on diagnosis of 40+ serious diseases.' },
          { label: 'Group Health Insurance', desc: 'Provided by employer. Limited coverage — supplement with personal plan.' },
          { label: 'Super Top-up Plan', desc: 'Activates after a deductible. Greatly increases your cover at low cost.' },
        ],
      },
      {
        id: 'what-covers', heading: 'What Does Health Insurance Cover?',
        content: 'A comprehensive health policy covers:',
        bullets: [
          { label: 'In-patient Hospitalisation', desc: 'Room rent, ICU charges, doctor fees, surgery costs for 24+ hour stays.' },
          { label: 'Pre & Post Hospitalisation', desc: 'Expenses 30-60 days before and 60-90 days after hospitalisation.' },
          { label: 'Daycare Procedures', desc: 'Surgeries needing less than 24 hours — cataract, chemotherapy, dialysis.' },
          { label: 'Ambulance Cover', desc: 'Emergency ambulance charges, typically ₹1,000-2,000 per hospitalisation.' },
          { label: 'Annual Health Check-ups', desc: 'Free preventive health check-ups, usually after 1-2 policy years.' },
          { label: 'AYUSH Cover', desc: 'Ayurvedic, Yoga, Unani, Siddha, Homeopathy treatments.' },
        ],
      },
      {
        id: 'exclusions', heading: 'Common Exclusions You Must Know',
        content: 'These situations are typically NOT covered under standard health plans:',
        bullets: [
          { label: 'Cosmetic Surgery', desc: 'Procedures purely for aesthetic purposes (Botox, liposuction) not covered.' },
          { label: 'Dental Treatment', desc: 'Routine dental care excluded. Dental due to accident may be covered.' },
          { label: 'Pre-existing Diseases', desc: 'Existing conditions have a waiting period of 2-4 years before coverage kicks in.' },
          { label: 'Specific Diseases (First 30 days)', desc: 'Hernia, cataracts, joint replacement may be excluded for first 1-2 years.' },
          { label: 'Maternity (Base Plan)', desc: 'Pregnancy and childbirth excluded in basic plans. Need maternity rider.' },
          { label: 'Self-inflicted Injuries', desc: 'Intentional injuries or suicide attempts not covered.' },
        ],
        highlight: 'Always read the "Exclusions" section of your policy document carefully. This is where most claim rejections originate.',
      },
      {
        id: 'choose', heading: 'How to Choose the Right Health Insurance',
        content: 'A simple framework to make the right choice:',
        bullets: [
          { label: 'Step 1: Decide Cover Amount', desc: 'Minimum ₹5-10L for individuals, ₹10-20L for families.' },
          { label: 'Step 2: Check Network Hospitals', desc: 'Ensure your preferred hospitals are in the insurer\'s cashless network.' },
          { label: 'Step 3: Check Sub-limits', desc: 'Avoid plans with room rent capping or disease-wise limits.' },
          { label: 'Step 4: Check Co-payment', desc: 'Prefer plans with 0% co-payment (you pay nothing at the hospital).' },
          { label: 'Step 5: Check Waiting Periods', desc: 'Shorter waiting periods for pre-existing diseases = better plan.' },
          { label: 'Step 6: Check Claim Settlement Ratio', desc: 'Insurer should have 95%+ CSR for health plans.' },
        ],
      },
    ],
    faqs: [
      { q: 'Is employer health insurance enough?', a: 'No. Employer group insurance covers only ₹2-5L and stops the moment you leave the job. Always have a personal plan.' },
      { q: 'What is a no-claim bonus?', a: 'If you don\'t make a claim in a year, many insurers increase your sum insured by 5-50% at no extra cost. This is the No-Claim Bonus.' },
      { q: 'Can I port my health insurance to another insurer?', a: 'Yes! IRDAI allows you to port your health policy to a new insurer at renewal, retaining your waiting period credits.' },
    ],
  },

  'compare-health': {
    slug: 'compare-health', category: 'Health Insurance', tag: 'Comparison',
    title: 'Compare the Best Health Insurance Plans in India',
    subtitle: 'Expert-reviewed plans ranked by benefits, claim experience, and value for money.',
    readTime: '10 min', image: '/plans_compare.png',
    keyStats: [
      { value: '30+', label: 'Plans Compared' },
      { value: '98%', label: 'Best Claim Ratio' },
      { value: '500+', label: 'Network Hospitals' },
    ],
    tocItems: [
      { id: 'top-plans', label: 'Top Plans 2024' },
      { id: 'features', label: 'Feature Comparison' },
      { id: 'for-family', label: 'Best for Families' },
      { id: 'for-senior', label: 'Best for Senior Citizens' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'top-plans', heading: 'Top Health Insurance Plans in India 2024',
        content: 'After comparing 30+ plans across features, network hospitals, claim ratios, and value — here are our top picks:',
        bullets: [
          { label: 'HDFC Ergo Optima Secure', desc: 'Best overall: No sub-limits, 0% co-pay, multiplier benefit. CSR: 98%.' },
          { label: 'Care Supreme', desc: 'Best for features: Unlimited restoration, 541 daycare procedures. CSR: 95.2%.' },
          { label: 'Niva Bupa Aspire', desc: 'Best for no waiting period: Instant maternity cover available. CSR: 96%.' },
          { label: 'Star Health Comprehensive', desc: 'Best network: 14,000+ hospitals. No-claim bonus up to 100%. CSR: 85.2%.' },
          { label: 'Tata AIG Medicare Premier', desc: 'Best for NRIs & overseas cover. Worldwide cashless in 190+ countries. CSR: 96%.' },
        ],
        highlight: 'We recommend HDFC Ergo Optima Secure for most Indians due to its zero-compromise feature set and high claim ratio.',
      },
      {
        id: 'features', heading: 'Feature Comparison: What Actually Matters',
        content: 'Do not get distracted by flashy marketing. Compare these 8 crucial features:',
        bullets: [
          { label: 'Room Rent Limit', desc: 'Best plans offer no room rent capping. Avoid plans that restrict to "single AC room".' },
          { label: 'Co-payment Clause', desc: 'Best plans have 0% co-payment. Avoid plans where you pay 10-30% of every bill.' },
          { label: 'Sum Insured Restoration', desc: 'Does the cover reset after a claim? Unlimited restoration is the gold standard.' },
          { label: 'Pre-Existing Disease Waiting Period', desc: 'Minimum 2 years (IRDAI mandated), some plans now offer 1-year waiting.' },
          { label: 'No-Claim Bonus', desc: 'Best plans offer 25-50% NCB per year, up to 100% of sum insured.' },
          { label: 'Network Hospital Count', desc: 'More is better. Look for 10,000+ cashless network hospitals.' },
        ],
      },
      {
        id: 'for-family', heading: 'Best Health Plans for Families',
        content: 'For a family of 4 (parents + 2 kids), we recommend a floater plan of ₹10-20L. Top family picks:',
        bullets: [
          { label: 'HDFC Ergo Optima Restore Family', desc: '₹10L family floater, full restoration, free annual checkup.' },
          { label: 'Care Supreme Family', desc: 'Strong maternity add-on, pediatric cover from Day 1 for newborns.' },
          { label: 'Niva Bupa ReAssure 2.0', desc: 'Lock the clock feature freezes your renewal premium forever.' },
        ],
      },
      {
        id: 'for-senior', heading: 'Best Health Plans for Senior Citizens (60+)',
        content: 'Seniors need plans with minimal co-payment, coverage for chronic conditions, and strong network hospitals:',
        bullets: [
          { label: 'Star Senior Citizen Red Carpet', desc: 'Covers pre-existing diseases from day 1 for an extra premium.' },
          { label: 'Care Senior', desc: 'No medical test required up to ₹10L for age 60-74. Low waiting period.' },
          { label: 'Niva Bupa Senior First', desc: 'Monthly premium payment option. Coverage up to age 99.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is the ideal sum insured for health insurance?', a: 'In metro cities, minimum ₹10L is recommended. In Tier 2/3 cities, ₹5L may suffice. Always factor in family size and medical history.' },
      { q: 'Should I buy individual policies or a family floater?', a: 'Floater is cost-effective but risky if multiple members need claims in the same year. Consider individual policies + super top-up for best protection.' },
    ],
  },

  'know-vehicle': {
    slug: 'know-vehicle', category: 'Vehicle Insurance', tag: 'Guide',
    title: 'Know Vehicle Insurance Like a Pro',
    subtitle: 'Understand every clause, add-on, and trap before you insure your car or bike.',
    readTime: '12 min', image: '/health_insurance.png',
    keyStats: [
      { value: '₹2,094', label: 'Avg. Car Premium/yr' },
      { value: '3rd Party', label: 'Legally Mandatory' },
      { value: '24 hrs', label: 'Claim Assistance' },
    ],
    tocItems: [
      { id: 'what-is', label: 'What is Vehicle Insurance?' },
      { id: 'types', label: 'Types of Plans' },
      { id: 'what-covers', label: 'What Does It Cover?' },
      { id: 'exclusions', label: 'Common Exclusions' },
      { id: 'addons', label: 'Key Add-ons' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'what-is', heading: 'What is Vehicle Insurance?',
        content: 'Vehicle insurance (also called motor insurance) is a policy that protects you financially against losses arising from accidents, theft, natural disasters, or third-party liabilities involving your vehicle. In India, at least third-party insurance is mandatory under the Motor Vehicles Act, 1988.',
        highlight: 'Driving without valid insurance in India can result in a fine of ₹2,000 for the first offence and ₹4,000 for subsequent offences, along with possible imprisonment.',
      },
      {
        id: 'types', heading: 'Types of Vehicle Insurance Plans',
        content: 'There are three main types of motor insurance in India:',
        bullets: [
          { label: 'Third-Party Insurance', desc: 'Legally mandatory. Covers damage or injury caused to a third party (person or property). Does NOT cover your own vehicle.' },
          { label: 'Comprehensive Insurance', desc: 'Covers both third-party liability AND own damage (accident, theft, fire, natural calamity). Recommended for all vehicles.' },
          { label: 'Own Damage (OD) Cover', desc: 'Covers only your own vehicle damage. Must be paired with third-party cover. Useful for older vehicles.' },
        ],
      },
      {
        id: 'what-covers', heading: 'What Does Vehicle Insurance Cover?',
        content: 'A comprehensive vehicle insurance policy covers:',
        bullets: [
          { label: 'Accidental Damage', desc: 'Repair costs for your vehicle after a collision or accident.' },
          { label: 'Theft', desc: 'Full IDV (Insured Declared Value) paid if your vehicle is stolen.' },
          { label: 'Natural Calamities', desc: 'Flood, earthquake, cyclone, hailstorm damage to your vehicle.' },
          { label: 'Fire & Explosion', desc: 'Damage due to fire, self-ignition, or explosion.' },
          { label: 'Third-Party Liability', desc: 'Legal liability for injury, death, or property damage to a third party.' },
          { label: 'Personal Accident Cover', desc: 'Compensation for owner-driver in case of accidental death or disability.' },
        ],
      },
      {
        id: 'exclusions', heading: 'Common Exclusions You Must Know',
        content: 'These situations are typically NOT covered:',
        bullets: [
          { label: 'Driving Without Valid Licence', desc: 'Claims rejected if driver did not hold a valid driving licence at the time of accident.' },
          { label: 'Drunk Driving', desc: 'Any accident while under the influence of alcohol or drugs is excluded.' },
          { label: 'Mechanical/Electrical Breakdown', desc: 'General wear and tear or mechanical failure is not covered.' },
          { label: 'Consequential Loss', desc: 'Damage that occurs as a result of the original damage (e.g., engine damage due to driving in flood water without hydrostatic lock cover).' },
          { label: 'Outside Geographical Limits', desc: 'Accidents outside India are not covered unless specifically mentioned.' },
        ],
        highlight: 'Always read the exclusions section carefully. Engine damage due to waterlogging is one of the most common rejected claims — add the Engine Protection add-on to avoid this.',
      },
      {
        id: 'addons', heading: 'Key Add-ons Worth Buying',
        content: 'Add-ons significantly enhance your coverage at a small extra premium:',
        bullets: [
          { label: 'Zero Depreciation Cover', desc: 'Insurer pays full repair cost without deducting depreciation on parts. Most recommended add-on.' },
          { label: 'Engine Protection Cover', desc: 'Covers engine damage due to water ingression or oil leakage. Essential in flood-prone areas.' },
          { label: 'Roadside Assistance', desc: '24x7 help for breakdown, flat tyre, fuel delivery, towing.' },
          { label: 'Return to Invoice', desc: 'In case of total loss or theft, you get the original invoice value — not the depreciated IDV.' },
          { label: 'No Claim Bonus Protection', desc: 'Protects your NCB discount even after one claim in a year.' },
          { label: 'Consumables Cover', desc: 'Covers cost of nuts, bolts, engine oil, coolant replaced during repairs.' },
        ],
      },
    ],
    faqs: [
      { q: 'Is vehicle insurance mandatory in India?', a: 'Yes. Third-party insurance is legally mandatory for all vehicles under the Motor Vehicles Act, 1988. Driving without it is a punishable offence.' },
      { q: 'What is IDV in vehicle insurance?', a: 'IDV (Insured Declared Value) is the current market value of your vehicle. It is the maximum amount the insurer will pay in case of total loss or theft.' },
      { q: 'What is No Claim Bonus (NCB)?', a: 'NCB is a discount on your renewal premium for every claim-free year. It starts at 20% and can go up to 50% after 5 consecutive claim-free years.' },
      { q: 'Should I buy zero depreciation cover?', a: 'Yes, especially for new vehicles (up to 5 years old). Without it, you pay the depreciated value of replaced parts out of pocket, which can be significant.' },
      { q: 'Can I transfer my NCB when I sell my car?', a: 'Yes! NCB belongs to the owner, not the vehicle. You can transfer it to your new vehicle or retain it for up to 3 years.' },
    ],
  },

  'compare-vehicle': {
    slug: 'compare-vehicle', category: 'Vehicle Insurance', tag: 'Comparison',
    title: 'Compare the Best Vehicle Insurance Plans in India',
    subtitle: 'Side-by-side analysis of premiums, claim ratios, add-ons, and cashless garages.',
    readTime: '10 min', image: '/plans_compare.png',
    keyStats: [
      { value: '20+', label: 'Plans Compared' },
      { value: '98.5%', label: 'Best Claim Ratio' },
      { value: '16,000+', label: 'Cashless Garages' },
    ],
    tocItems: [
      { id: 'top-plans', label: 'Top Plans 2024' },
      { id: 'claim-ratio', label: 'Claim Settlement Ratio' },
      { id: 'features', label: 'Feature Comparison' },
      { id: 'for-bike', label: 'Best for Two-Wheelers' },
      { id: 'how-to-choose', label: 'How to Choose' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'top-plans', heading: 'Top Vehicle Insurance Plans in India 2024',
        content: 'Based on claim settlement ratios, cashless garage network, add-on options, and customer service:',
        bullets: [
          { label: 'HDFC Ergo Car Insurance', desc: 'Best overall: 16,000+ cashless garages, 98% CSR, excellent add-on suite.' },
          { label: 'Bajaj Allianz Car Insurance', desc: 'Best for add-ons: 24x7 motor assistance, zero dep, engine protect. CSR: 98.5%.' },
          { label: 'ICICI Lombard Car Insurance', desc: 'Best digital experience: Instant policy, app-based claims. CSR: 97.8%.' },
          { label: 'Tata AIG Car Insurance', desc: 'Best for new cars: Return to invoice, strong brand. CSR: 97%.' },
          { label: 'New India Assurance', desc: 'Best government-backed: Widest acceptance, PSU trust. CSR: 96%.' },
        ],
        highlight: 'Always compare based on cashless garage network in your city, not just premium. A cheaper plan with no nearby cashless garage is a poor deal.',
      },
      {
        id: 'claim-ratio', heading: 'Claim Settlement Ratios (2023-24)',
        content: 'Motor insurance claim ratios indicate how reliably an insurer settles claims:',
        bullets: [
          { label: 'Bajaj Allianz General', desc: 'CSR: 98.5% — Consistently top performer.' },
          { label: 'HDFC Ergo General', desc: 'CSR: 98.0%' },
          { label: 'ICICI Lombard', desc: 'CSR: 97.8%' },
          { label: 'Tata AIG General', desc: 'CSR: 97.0%' },
          { label: 'New India Assurance', desc: 'CSR: 96.0% — Most trusted PSU insurer.' },
        ],
      },
      {
        id: 'features', heading: 'Key Features to Compare',
        content: 'Beyond premium, these features determine the real value of a vehicle insurance plan:',
        bullets: [
          { label: 'Cashless Garage Network', desc: 'More garages = easier repairs. Look for 10,000+ network garages.' },
          { label: 'Zero Depreciation', desc: 'Is it available? What is the extra cost? Essential for new vehicles.' },
          { label: 'Claim Settlement Speed', desc: 'How fast does the insurer settle? Look for 7-day settlement guarantee.' },
          { label: 'IDV Flexibility', desc: 'Can you set a higher IDV for better theft/total loss coverage?' },
          { label: 'Add-on Range', desc: 'Engine protect, RTI, consumables, tyre cover — more options = better.' },
          { label: 'NCB Carry-forward', desc: 'Does the insurer honour NCB from your previous insurer?' },
        ],
      },
      {
        id: 'for-bike', heading: 'Best Two-Wheeler Insurance Plans',
        content: 'For bikes and scooters, these plans offer the best value:',
        bullets: [
          { label: 'Bajaj Allianz Two-Wheeler Insurance', desc: 'Best overall for bikes. Zero dep available, 24x7 roadside assistance.' },
          { label: 'HDFC Ergo Two-Wheeler Insurance', desc: 'Strong cashless network, quick claim settlement.' },
          { label: 'ICICI Lombard Two-Wheeler', desc: 'Best digital experience, instant policy issuance.' },
          { label: 'Royal Sundaram Two-Wheeler', desc: 'Good value for older bikes, competitive premiums.' },
        ],
      },
      {
        id: 'how-to-choose', heading: 'How to Choose the Right Vehicle Insurance',
        content: 'Follow this checklist:',
        bullets: [
          { label: 'Step 1: Choose comprehensive over third-party', desc: 'Third-party is mandatory but comprehensive protects your own vehicle too.' },
          { label: 'Step 2: Set the right IDV', desc: 'Do not under-insure to save premium. IDV = what you get in total loss.' },
          { label: 'Step 3: Add zero depreciation', desc: 'For vehicles under 5 years old, zero dep is a must-have.' },
          { label: 'Step 4: Check cashless garages near you', desc: 'Verify your preferred garage is in the insurer\'s network.' },
          { label: 'Step 5: Compare total cost with add-ons', desc: 'A slightly higher premium with zero dep + engine protect is better value.' },
        ],
      },
    ],
    faqs: [
      { q: 'Which is the best car insurance in India?', a: 'HDFC Ergo and Bajaj Allianz are consistently top-rated for their claim ratios, cashless network, and add-on options.' },
      { q: 'Can I switch my vehicle insurance to another insurer?', a: 'Yes, at renewal you can port to any insurer. Your NCB will be transferred. Compare quotes 30 days before renewal.' },
      { q: 'Does vehicle insurance cover CNG/LPG kit?', a: 'Only if you declare the CNG/LPG kit to the insurer and pay the additional premium. Undeclared kits lead to claim rejection.' },
    ],
  },

  'find-vehicle': {
    slug: 'find-vehicle', category: 'Vehicle Insurance', tag: 'Tool',
    title: 'Find the Best Vehicle Insurance Plan For You',
    subtitle: 'Personalized recommendations for your car or bike based on age, usage, and budget.',
    readTime: '5 min', image: '/consultation.png',
    keyStats: [
      { value: '3 min', label: 'To Get a Quote' },
      { value: '₹0', label: 'Consultation Fee' },
      { value: '20+', label: 'Insurers Compared' },
    ],
    tocItems: [
      { id: 'by-vehicle', label: 'Plans by Vehicle Type' },
      { id: 'by-age', label: 'Plans by Vehicle Age' },
      { id: 'by-usage', label: 'Plans by Usage' },
      { id: 'checklist', label: 'Buying Checklist' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'by-vehicle', heading: 'Best Plans by Vehicle Type',
        content: 'Different vehicles have different insurance needs:',
        bullets: [
          { label: 'New Car (0-3 years)', desc: 'Comprehensive + Zero Dep + Engine Protect + RTI. Best picks: HDFC Ergo, Bajaj Allianz.' },
          { label: 'Used Car (3-7 years)', desc: 'Comprehensive + Zero Dep. Best picks: ICICI Lombard, Tata AIG.' },
          { label: 'Old Car (7+ years)', desc: 'Third-party or basic OD cover. Best picks: New India Assurance, Oriental Insurance.' },
          { label: 'Bike/Scooter', desc: 'Comprehensive + Zero Dep for new bikes. Best picks: Bajaj Allianz, HDFC Ergo.' },
          { label: 'Commercial Vehicle', desc: 'Specialized commercial vehicle policy. Best picks: New India Assurance, United India.' },
        ],
      },
      {
        id: 'by-age', heading: 'Recommended Cover Based on Vehicle Age',
        content: 'Vehicle age determines the right type and level of coverage:',
        bullets: [
          { label: '0-2 years old', desc: 'Full comprehensive + Zero Dep + Engine Protect + RTI + Consumables. Maximum protection.' },
          { label: '3-5 years old', desc: 'Comprehensive + Zero Dep + Engine Protect. Skip RTI (invoice value too old).' },
          { label: '5-7 years old', desc: 'Comprehensive + Zero Dep (if available). Focus on cashless garage network.' },
          { label: '7+ years old', desc: 'Third-party or basic OD. Premium savings outweigh comprehensive benefits for old vehicles.' },
        ],
      },
      {
        id: 'by-usage', heading: 'Best Plans by Usage Pattern',
        content: 'How you use your vehicle affects which plan and add-ons make sense:',
        bullets: [
          { label: 'Daily City Commuter', desc: 'High accident risk. Prioritize zero dep, roadside assistance, and large cashless network.' },
          { label: 'Occasional Weekend Driver', desc: 'Lower risk. Comprehensive cover with zero dep is sufficient.' },
          { label: 'Highway/Long Distance', desc: 'Roadside assistance and engine protection are critical. Tyre cover add-on recommended.' },
          { label: 'Flood-Prone City (Mumbai, Chennai)', desc: 'Engine protection cover is non-negotiable. Hydrostatic lock damage is very common.' },
        ],
      },
      {
        id: 'checklist', heading: 'Vehicle Insurance Buying Checklist',
        content: 'Use this before you buy or renew:',
        bullets: [
          { label: '✅ Choose comprehensive over third-party only', desc: 'Protects your own vehicle, not just third parties.' },
          { label: '✅ Set correct IDV', desc: 'Do not reduce IDV to save premium — it reduces your payout in total loss.' },
          { label: '✅ Add zero depreciation', desc: 'For vehicles under 5 years, this is the single most important add-on.' },
          { label: '✅ Add engine protection if in flood-prone area', desc: 'Engine damage from waterlogging is excluded without this add-on.' },
          { label: '✅ Check cashless garages near your home/office', desc: 'Verify on the insurer\'s website before buying.' },
          { label: '✅ Carry forward your NCB', desc: 'Ensure your NCB discount is applied at renewal or when switching insurers.' },
        ],
      },
    ],
    faqs: [
      { q: 'How is vehicle insurance premium calculated?', a: 'Premium depends on IDV (vehicle value), vehicle age, fuel type, city of registration, add-ons selected, and your NCB discount.' },
      { q: 'What documents do I need to buy vehicle insurance?', a: 'Vehicle Registration Certificate (RC), previous policy copy (for renewal/porting), driving licence, and Aadhaar/PAN for KYC.' },
      { q: 'Can I buy vehicle insurance online?', a: 'Yes. All major insurers offer instant online policies. You can compare, buy, and get the policy document within minutes.' },
    ],
  },

  'find-health': {
    slug: 'find-health', category: 'Health Insurance', tag: 'Tool',
    title: 'Find the Best Health Insurance Plan For You',
    subtitle: 'Personalized recommendations based on your family, health, and budget in just 3 minutes.',
    readTime: '5 min', image: '/claims_support.png',
    keyStats: [
      { value: '3 min', label: 'Quick Recommendations' },
      { value: '₹0', label: 'Free Expert Guidance' },
      { value: '30+', label: 'Plans Screened' },
    ],
    tocItems: [
      { id: 'by-budget', label: 'Plans by Budget' },
      { id: 'by-age', label: 'Plans by Age' },
      { id: 'by-city', label: 'Plans by City' },
      { id: 'checklist', label: 'Buying Checklist' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      {
        id: 'by-budget', heading: 'Best Health Plans by Monthly Budget',
        content: 'Find the right plan that matches your monthly budget:',
        bullets: [
          { label: '₹500-1,000/month', desc: 'Care Supreme (₹5L), Tata AIG Medicare (₹5L). Good starter plans.' },
          { label: '₹1,000-2,000/month', desc: 'HDFC Ergo Optima Secure (₹10L), Niva Bupa Aspire (₹10L). Best value.' },
          { label: '₹2,000-4,000/month', desc: 'HDFC Optima Restore (₹20L), Care Advantage (₹25L). Premium protection.' },
          { label: '₹4,000+/month', desc: 'Star Comprehensive (₹50L+), Niva Bupa ReAssure 2.0 (₹1 Cr). Max protection.' },
        ],
      },
      {
        id: 'by-age', heading: 'Recommended Plans by Age Group',
        content: 'Your age determines your health risks and the best plan structure:',
        bullets: [
          { label: '18-30 years', desc: 'Buy now! Cheapest premiums, no pre-existing conditions. HDFC Optima Secure or Care Supreme.' },
          { label: '30-45 years', desc: 'Family floater time. Consider plans with maternity cover and newborn coverage from Day 1.' },
          { label: '45-60 years', desc: 'Pre-existing disease waiting period matters most. Niva Bupa or Star Health for best terms.' },
          { label: '60+ years', desc: 'Star Senior Red Carpet or Care Senior. Expect 10-20% co-payment in most plans.' },
        ],
      },
      {
        id: 'by-city', heading: 'Plan Coverage by City Tier',
        content: 'Medical costs vary significantly by location. Here\'s what we recommend:',
        bullets: [
          { label: 'Metro Cities (Delhi, Mumbai, Bangalore)', desc: 'Minimum ₹10L cover. Room charges alone can be ₹5,000-15,000/day.' },
          { label: 'Tier-2 Cities (Pune, Hyderabad, Ahmedabad)', desc: 'Minimum ₹7L cover. Medical costs 30-40% lower than metros.' },
          { label: 'Tier-3 Cities & Rural Areas', desc: 'Minimum ₹5L cover. But always include a super top-up for unexpected events.' },
        ],
      },
      {
        id: 'checklist', heading: '10-Point Health Insurance Buying Checklist',
        content: 'Use this before you buy any health plan:',
        bullets: [
          { label: '✅ Sum insured adequate for your city', desc: 'Minimum ₹5L individual, ₹10L family.' },
          { label: '✅ No room rent sub-limits', desc: 'Avoid plans with "single AC room" restrictions.' },
          { label: '✅ Zero co-payment', desc: 'You should not pay anything extra at the hospital.' },
          { label: '✅ Sum insured restoration', desc: 'Cover resets after each claim within the year.' },
          { label: '✅ Network hospital includes your preferred hospital', desc: 'Check the insurer\'s cashless network before buying.' },
          { label: '✅ Pre-existing disease waiting period ≤ 2 years', desc: 'IRDAI has capped it at 3 years; look for plans with 2 years or less.' },
        ],
      },
    ],
    faqs: [
      { q: 'Can I buy health insurance without a medical test?', a: 'Yes, most insurers do not require medical tests up to age 45. Above 45 or for high sum insured, tests may be required.' },
      { q: 'What is a cashless claim?', a: 'You get treated at a network hospital and the insurer settles the bill directly with the hospital. You pay nothing (subject to the policy terms).' },
    ],
  },
};

// --- RESOURCE PAGES (Articles / Videos / eBook / Expert) ---
export interface ResourceItem {
  title: string;
  description: string;
  tag: string;
  readTime: string;
  image: string;
}
export interface ResourcePageData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  type: 'articles' | 'videos' | 'ebook' | 'expert';
  items: ResourceItem[];
}

export const resourcePages: Record<string, ResourcePageData> = {
  'articles-term': {
    slug: 'articles-term', category: 'Term Insurance', type: 'articles',
    title: 'Term Insurance Articles & Guides',
    subtitle: 'In-depth, unbiased articles written by insurance experts to help you make smarter decisions.',
    items: [
      { title: 'The Complete Guide to Buying Term Insurance in 2024', description: 'Everything from choosing a plan to filing a claim — in one comprehensive guide.', tag: 'Beginner', readTime: '15 min', image: '/term_insurance.png' },
      { title: 'Term Insurance Riders: Which Ones Are Worth It?', description: 'A detailed breakdown of every rider available and which ones actually add value.', tag: 'Intermediate', readTime: '8 min', image: '/consultation.png' },
      { title: '10 Common Term Insurance Mistakes to Avoid', description: 'Real mistakes real people make — and how to avoid them.', tag: 'Tips', readTime: '6 min', image: '/hero_advisor.png' },
      { title: 'How to Disclose Medical Conditions in Term Insurance', description: 'Why non-disclosure is dangerous and exactly what to disclose.', tag: 'Important', readTime: '7 min', image: '/plans_compare.png' },
      { title: 'Term Insurance for NRIs: Rules, Taxation & Best Plans', description: 'Can NRIs buy term insurance in India? All your questions answered.', tag: 'NRI', readTime: '9 min', image: '/hero_advisor.png' },
      { title: 'Best Term Insurance for Women in 2024', description: 'Women get lower premiums — but which plan gives the best value?', tag: 'Women', readTime: '7 min', image: '/health_insurance.png' },
    ],
  },
  'videos-term': {
    slug: 'videos-term', category: 'Term Insurance', type: 'videos',
    title: 'Term Insurance Video Guides',
    subtitle: 'Watch and learn. Our experts break down complex insurance concepts into simple videos.',
    items: [
      { title: 'Term Insurance Explained in 5 Minutes', description: 'The simplest explanation of term insurance you will ever watch.', tag: 'Beginner', readTime: '5 min', image: '/term_insurance.png' },
      { title: 'HDFC Life Click 2 Protect Super — Full Review', description: 'We analyze every feature, exclusion, and fine print of this popular plan.', tag: 'Review', readTime: '18 min', image: '/plans_compare.png' },
      { title: 'How to File a Term Insurance Claim', description: 'Step-by-step walkthrough of the claims process from death certificate to payout.', tag: 'How-to', readTime: '12 min', image: '/claims_support.png' },
      { title: 'Should You Buy Return of Premium Term Plans?', description: 'We crunch the numbers. Is TROP worth the extra premium?', tag: 'Analysis', readTime: '10 min', image: '/hero_advisor.png' },
    ],
  },
  'video-guides-term': {
    slug: 'video-guides-term', category: 'Term Insurance', type: 'videos',
    title: 'Term Insurance Video Tutorials',
    subtitle: 'Step-by-step video tutorials from application to claim settlement.',
    items: [
      { title: 'How to Buy Term Insurance Online — Step by Step', description: 'A complete screen-by-screen walkthrough of buying term insurance on an insurer\'s website.', tag: 'Tutorial', readTime: '15 min', image: '/consultation.png' },
      { title: 'How to Fill the Proposal Form Correctly', description: 'Common mistakes in proposal forms that lead to claim rejections later.', tag: 'Tutorial', readTime: '12 min', image: '/hero_advisor.png' },
      { title: 'Adding a Nominee: What You Must Know', description: 'Why nominee details matter and how to update them correctly.', tag: 'Tutorial', readTime: '8 min', image: '/term_insurance.png' },
      { title: 'Medical Examination for Term Insurance — What to Expect', description: 'What tests are done, what levels trigger rejection, and how to prepare.', tag: 'Tutorial', readTime: '10 min', image: '/health_insurance.png' },
    ],
  },
  'ebook-term': {
    slug: 'ebook-term', category: 'Term Insurance', type: 'ebook',
    title: 'Download: The Definitive Term Insurance eBook',
    subtitle: 'A 45-page comprehensive guide written by experts — completely free for you.',
    items: [
      { title: 'Chapter 1: Why Every Indian Needs Term Insurance', description: 'Understand the fundamental case for buying life cover in India today.', tag: 'Chapter 1', readTime: '8 pages', image: '/term_insurance.png' },
      { title: 'Chapter 2: How to Calculate the Right Cover Amount', description: 'Multiple methods to arrive at the exact cover amount suited to your life.', tag: 'Chapter 2', readTime: '10 pages', image: '/plans_compare.png' },
      { title: 'Chapter 3: The Top 15 Term Plans — Compared', description: 'A no-nonsense comparison table covering 15 leading plans.', tag: 'Chapter 3', readTime: '12 pages', image: '/hero_advisor.png' },
      { title: 'Chapter 4: How to Ensure Smooth Claim Settlement', description: 'What your family needs to know — in advance.', tag: 'Chapter 4', readTime: '8 pages', image: '/claims_support.png' },
    ],
  },
  'articles-health': {
    slug: 'articles-health', category: 'Health Insurance', type: 'articles',
    title: 'Health Insurance Articles & Guides',
    subtitle: 'Expert analysis, plan comparisons, and practical guides for smarter health cover decisions.',
    items: [
      { title: 'Complete Guide to Health Insurance in India 2024', description: 'The A-Z of buying, using, and claiming health insurance in India.', tag: 'Guide', readTime: '18 min', image: '/health_insurance.png' },
      { title: 'Why Your Company\'s Group Health Insurance Is Not Enough', description: 'Real data on why ₹2-5L employer cover falls woefully short.', tag: 'Must Read', readTime: '6 min', image: '/hero_advisor.png' },
      { title: 'Health Insurance vs Super Top-up: What to Choose?', description: 'A detailed comparison to help you build the best cover at the best price.', tag: 'Comparison', readTime: '9 min', image: '/plans_compare.png' },
      { title: 'How to Make a Successful Cashless Health Claim', description: 'Step-by-step guidance for stress-free cashless hospitalization.', tag: 'How-to', readTime: '7 min', image: '/claims_support.png' },
      { title: 'Best Health Insurance for Parents (Senior Citizens)', description: 'Specialized plans for parents aged 60+. Features, premiums, and expert picks.', tag: 'Senior', readTime: '10 min', image: '/consultation.png' },
    ],
  },
  'videos-health': {
    slug: 'videos-health', category: 'Health Insurance', type: 'videos',
    title: 'Health Insurance Video Guides',
    subtitle: 'Visual learning made easy. Complex health insurance concepts explained by our experts.',
    items: [
      { title: 'Health Insurance for Beginners — Everything in 10 Minutes', description: 'The fastest, clearest overview of how health insurance works in India.', tag: 'Beginner', readTime: '10 min', image: '/health_insurance.png' },
      { title: 'HDFC Ergo Optima Secure — Detailed Review 2024', description: 'Why this plan is consistently recommended by experts. Every feature analyzed.', tag: 'Review', readTime: '20 min', image: '/plans_compare.png' },
      { title: 'How Room Rent Capping Ruins Your Claim', description: 'Real example: how a ₹5L policy paid only ₹1L due to room rent restriction.', tag: 'Warning', readTime: '8 min', image: '/hero_advisor.png' },
      { title: 'Cashless vs Reimbursement Claims — Explained', description: 'The difference, the process, and when to use each type of claim.', tag: 'How-to', readTime: '12 min', image: '/claims_support.png' },
    ],
  },
  'ebook-health': {
    slug: 'ebook-health', category: 'Health Insurance', type: 'ebook',
    title: 'Critical Illness eBook: Download Free',
    subtitle: 'Understanding critical illness cover, riders, and standalone plans — 38 pages of expert guidance.',
    items: [
      { title: 'Chapter 1: What Is a Critical Illness?', description: '40+ critical illnesses defined — from cancer to organ failure.', tag: 'Chapter 1', readTime: '6 pages', image: '/health_insurance.png' },
      { title: 'Chapter 2: Critical Illness Insurance vs Health Insurance', description: 'Why they are different and why you likely need both.', tag: 'Chapter 2', readTime: '8 pages', image: '/plans_compare.png' },
      { title: 'Chapter 3: How to Choose a Critical Illness Plan', description: 'The 7 key factors to evaluate when comparing plans.', tag: 'Chapter 3', readTime: '10 pages', image: '/hero_advisor.png' },
      { title: 'Chapter 4: Best Critical Illness Plans in India', description: 'Our expert picks with detailed feature comparison.', tag: 'Chapter 4', readTime: '12 pages', image: '/consultation.png' },
    ],
  },
  'expert': {
    slug: 'expert', category: 'Ask an Expert', type: 'expert',
    title: 'Ask an Insurance Expert — Free',
    subtitle: 'Get personalized, unbiased answers to your insurance questions from 500+ verified experts.',
    items: [
      { title: 'Term Insurance Planning', description: 'Get the right cover amount, best plan, and rider recommendations for your situation.', tag: 'Free', readTime: '30 min call', image: '/hero_advisor.png' },
      { title: 'Health Insurance Review', description: 'Expert reviews your current plan and recommends gaps to fill or better alternatives.', tag: 'Free', readTime: '30 min call', image: '/health_insurance.png' },
      { title: 'Claims Assistance', description: 'Stuck with a claim rejection or delay? Our claims expert steps in to help.', tag: 'Free', readTime: '45 min call', image: '/claims_support.png' },
      { title: 'Policy Review & Optimization', description: 'Are you over-insured, under-insured, or paying too much? Get a free portfolio review.', tag: 'Free', readTime: '45 min call', image: '/consultation.png' },
    ],
  },
};

// --- DECODER PAGES (Brand plans) ---
export interface DecoderFeature { feature: string; value: string; good: boolean; }
export interface DecoderPageData {
  slug: string;
  brand: string;
  planName: string;
  category: 'health' | 'savings';
  brandColor: string;
  tagline: string;
  premiumRange: string;
  claimRatio: string;
  networkHospitals?: string;
  coverAmount: string;
  keyFeatures: DecoderFeature[];
  pros: string[];
  cons: string[];
  expertVerdict: string;
  rating: number;
}

export const decoderPages: Record<string, DecoderPageData> = {
  'decode-care': {
    slug: 'decode-care', brand: 'Care Health Insurance', planName: 'Care Insurance Ultimate Care + Key Add-ons',
    category: 'health', brandColor: '#eab308', tagline: 'Best for comprehensive cashless treatment',
    premiumRange: '₹12,000 - ₹28,000/year', claimRatio: '95.2%', networkHospitals: '8,700+',
    coverAmount: '₹5L - ₹1 Crore', rating: 4.2,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'No capping (any room)', good: true },
      { feature: 'Co-payment', value: '0% (no co-pay)', good: true },
      { feature: 'Sum Insured Restoration', value: '100% unlimited', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years', good: false },
      { feature: 'No Claim Bonus', value: '50% per year (max 100%)', good: true },
      { feature: 'Daycare Procedures', value: '541 procedures', good: true },
      { feature: 'OPD Cover', value: 'Available as add-on', good: true },
      { feature: 'Maternity Cover', value: 'Available as add-on (9-month wait)', good: true },
    ],
    pros: ['Unlimited restoration of sum insured', 'No room rent capping', 'Strong cashless network across India', '541 daycare procedures covered', 'Cancer treatment covered from day 1 (add-on)'],
    cons: ['3-year waiting period for pre-existing diseases (slightly above market average)', 'OPD cover is add-on, not included', 'Maternity cover requires additional premium', 'Claim settlement ratio slightly lower than HDFC and Niva Bupa'],
    expertVerdict: 'Care Ultimate Care is a strong, well-rounded health plan. Its unlimited restoration and zero co-pay make it reliable for hospitalizations. We recommend pairing it with the critical illness add-on. However, if claim ratio is your top priority, HDFC Ergo Optima Secure edges ahead.',
  },
  'decode-hdfc-ergo': {
    slug: 'decode-hdfc-ergo', brand: 'HDFC Ergo', planName: 'HDFC Ergo Optima Secure + Key Add-ons',
    category: 'health', brandColor: '#dc2626', tagline: 'Our top pick — best overall health plan in India',
    premiumRange: '₹10,000 - ₹25,000/year', claimRatio: '98.0%', networkHospitals: '13,000+',
    coverAmount: '₹5L - ₹2 Crore', rating: 4.8,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'No capping', good: true },
      { feature: 'Co-payment', value: '0%', good: true },
      { feature: 'Sum Insured Restoration', value: 'Unlimited (same illness too)', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years', good: false },
      { feature: 'No Claim Bonus', value: '50% per year (max 100%)', good: true },
      { feature: 'Network Hospitals', value: '13,000+', good: true },
      { feature: 'Multiplier Benefit', value: 'Yes (double sum insured in 2 years)', good: true },
      { feature: 'Claim Settlement Ratio', value: '98% — among the highest', good: true },
    ],
    pros: ['Highest claim settlement ratio in category (98%)', '13,000+ cashless hospitals', 'Unique multiplier benefit doubles your cover in 2 years', 'Restoration even for same illness', 'No sub-limits on any procedures'],
    cons: ['Slightly higher premium than competitors', 'Maternity not included — separate plan needed', '3-year PED waiting period (standard)'],
    expertVerdict: 'HDFC Ergo Optima Secure is our #1 pick for most Indians. Its 98% claim ratio, massive hospital network, and the unique multiplier benefit (which doubles your sum insured in 2 claim-free years) make it the gold standard in health insurance.',
  },
  'decode-tata-aig': {
    slug: 'decode-tata-aig', brand: 'Tata AIG', planName: 'Tata AIG MediCare Premier + Key Add-ons',
    category: 'health', brandColor: '#1d4ed8', tagline: 'Best for international and NRI coverage',
    premiumRange: '₹11,000 - ₹30,000/year', claimRatio: '96.0%', networkHospitals: '9,000+',
    coverAmount: '₹5L - ₹3 Crore', rating: 4.3,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'Single private AC room', good: false },
      { feature: 'Co-payment', value: '0%', good: true },
      { feature: 'International Cover', value: 'Yes — 190+ countries', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years', good: false },
      { feature: 'Air Ambulance', value: 'Up to ₹2.5L per hospitalisation', good: true },
      { feature: 'OPD Cover', value: 'Included (₹5,000-20,000)', good: true },
      { feature: 'Mental Health Cover', value: 'Yes', good: true },
      { feature: 'Claim Settlement Ratio', value: '96%', good: true },
    ],
    pros: ['Worldwide cashless cover in 190+ countries (unique in the market)', 'OPD cover included in base plan', 'Mental health treatment covered', 'Air ambulance coverage', 'Strong brand trust with Tata backing'],
    cons: ['Room rent restricted to single private AC room (not single room no limits)', 'International hospitalization involves complex documentation', 'Premiums are slightly higher for international features'],
    expertVerdict: 'Tata AIG MediCare Premier is ideal for frequent international travelers or NRIs who want Indian-priced insurance with global hospitalization cover. For India-only coverage, HDFC Optima Secure offers better value.',
  },
  'decode-niva': {
    slug: 'decode-niva', brand: 'Niva Bupa', planName: 'Niva Bupa Aspire (Titanium+) + Key Add-ons',
    category: 'health', brandColor: '#38bdf8', tagline: 'Best for flexibility and zero-wait maternity',
    premiumRange: '₹8,000 - ₹22,000/year', claimRatio: '96.5%', networkHospitals: '10,000+',
    coverAmount: '₹3L - ₹3 Crore', rating: 4.5,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'No capping', good: true },
      { feature: 'Co-payment', value: '0%', good: true },
      { feature: 'ReAssure Benefit', value: 'Unlimited restoration (same illness)', good: true },
      { feature: 'Maternity Cover', value: 'Available from Day 30', good: true },
      { feature: 'Lock the Clock', value: 'Freeze renewal premium (available)', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years (standard)', good: false },
      { feature: 'No Claim Bonus', value: '20% per year (max 100%)', good: true },
      { feature: 'OPD Cover', value: 'Add-on available', good: true },
    ],
    pros: ['Unique "Lock the Clock" freezes your renewal premium forever', 'Fastest maternity cover — available from Day 30', 'Unlimited restoration for same illness', 'Strong customer service reputation', 'No room rent cap'],
    cons: ['NCB percentage lower than some competitors (20% vs 50% for HDFC)', 'Premium on higher side for comparable cover', 'International coverage not included'],
    expertVerdict: 'Niva Bupa Aspire is excellent for young families planning for children. The near-instant maternity cover and the innovative "Lock the Clock" premium feature are unique in the Indian market. Highly recommended for 25-35 age group couples.',
  },
  'decode-star': {
    slug: 'decode-star', brand: 'Star Health', planName: 'Star Health Super Star + Key Add-ons',
    category: 'health', brandColor: '#f59e0b', tagline: 'Largest hospital network in India',
    premiumRange: '₹9,000 - ₹20,000/year', claimRatio: '85.2%', networkHospitals: '14,000+',
    coverAmount: '₹5L - ₹1 Crore', rating: 3.8,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'Single private AC room (some plans)', good: false },
      { feature: 'Co-payment', value: '0% (comprehensive plan)', good: true },
      { feature: 'Network Hospitals', value: '14,000+ — largest in India', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years', good: false },
      { feature: 'No Claim Bonus', value: 'Up to 100%', good: true },
      { feature: 'Claim Settlement Ratio', value: '85.2% (lower than average)', good: false },
      { feature: 'Outpatient Cover', value: 'Included in Super Star plan', good: true },
      { feature: 'Home Care Treatment', value: 'Yes', good: true },
    ],
    pros: ['14,000+ cashless hospitals — unmatched network', 'OPD cover included', 'Home care treatment covered', 'Strong brand with 20+ years in health insurance', 'Good no-claim bonus structure'],
    cons: ['Claim settlement ratio of 85.2% is below the industry average of ~94%', 'Multiple reports of claim complications and delays', 'Room rent sub-limits in some variants', 'Not our top recommendation due to CSR concerns'],
    expertVerdict: 'Star Health\'s biggest selling point is its 14,000+ hospital network. However, the 85.2% claim settlement ratio is a significant concern. If your hospital is only on Star\'s network and not others, it may make sense. Otherwise, we recommend HDFC or Niva Bupa for better claim reliability.',
  },
  'decode-zuno': {
    slug: 'decode-zuno', brand: 'Zuno (Edelweiss)', planName: 'Zuno Health Insurance (Gold)',
    category: 'health', brandColor: '#2dd4bf', tagline: 'Best digital-first health plan for young professionals',
    premiumRange: '₹6,000 - ₹18,000/year', claimRatio: '96.1%', networkHospitals: '11,000+',
    coverAmount: '₹5L - ₹1 Crore', rating: 4.1,
    keyFeatures: [
      { feature: 'Room Rent Limit', value: 'No capping', good: true },
      { feature: 'Co-payment', value: '0%', good: true },
      { feature: 'Restoration', value: '100% unlimited', good: true },
      { feature: 'Digital Claims', value: 'Fully paperless', good: true },
      { feature: 'Mental Health Cover', value: 'Yes', good: true },
      { feature: 'Pre-existing Disease Waiting', value: '3 years', good: false },
      { feature: 'No Claim Bonus', value: '50% per year', good: true },
      { feature: 'App-based Management', value: 'Full app control', good: true },
    ],
    pros: ['100% digital — buy and claim entirely via app', 'Competitive premiums for young buyers', 'Mental health and OPD covered', 'No room rent restrictions', 'Good 96.1% claim settlement ratio'],
    cons: ['Relatively newer brand — less track record', 'Smaller offline support network', 'Hospital network smaller than Star or HDFC'],
    expertVerdict: 'Zuno is a great choice for tech-savvy young professionals who prefer digital-first experiences. Strong features at competitive premiums. The 96.1% CSR is reassuring. Best for ages 25-40 who are comfortable with online processes.',
  },
  'decode-lic': {
    slug: 'decode-lic', brand: 'LIC', planName: 'LIC Bima Jyoti',
    category: 'savings', brandColor: '#eab308', tagline: 'Guaranteed returns backed by Government of India',
    premiumRange: '₹18,000 - ₹80,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Sum Assured + Bonus', rating: 4.0,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Non-participating (no bonus)', good: false },
      { feature: 'Guaranteed Returns', value: 'Yes — fixed at purchase', good: true },
      { feature: 'Policy Term', value: '15 or 20 years', good: true },
      { feature: 'Government Backing', value: 'Yes — 100% government owned', good: true },
      { feature: 'Loan Against Policy', value: 'Available after 2 years', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Maturity Benefit', value: 'Sum Assured + Guaranteed Additions', good: true },
      { feature: 'Returns vs FD', value: 'Slightly lower than bank FD', good: false },
    ],
    pros: ['100% government-backed — zero default risk', 'Guaranteed maturity amount — no market risk', 'Tax benefit under 80C and 10(10D)', 'Loan facility available', 'Trusted brand with 60+ year track record'],
    cons: ['Returns (4-5% IRR) are lower than market investments and even some FDs', 'Non-participating means no bonus — what you see is what you get', 'Lock-in period is long (15-20 years)', 'Surrender value is low in early years'],
    expertVerdict: 'LIC Bima Jyoti is suitable for risk-averse investors who want guaranteed, government-backed maturity amounts and life cover. If you\'re looking for wealth creation, pure mutual funds + term insurance is a better strategy. But for capital protection + life cover, LIC remains hard to beat.',
  },
  'decode-hdfc-life': {
    slug: 'decode-hdfc-life', brand: 'HDFC Life', planName: 'HDFC Life Sanchay Fixed Maturity',
    category: 'savings', brandColor: '#dc2626', tagline: 'Best for guaranteed income stream planning',
    premiumRange: '₹25,000 - ₹1,50,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Up to 11x Annual Premium', rating: 4.3,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Non-linked, Non-participating', good: true },
      { feature: 'Guaranteed Returns', value: 'Yes — up to 7.25% IRR', good: true },
      { feature: 'Income Payout Option', value: 'Lump sum or regular income', good: true },
      { feature: 'Premium Payment Term', value: '5 or 10 years', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Tax-free Maturity (10(10D))', value: 'Yes (subject to conditions)', good: true },
      { feature: 'Life Cover', value: '7-11x annual premium', good: true },
      { feature: 'Early Exit Penalty', value: 'High in first 5 years', good: false },
    ],
    pros: ['Guaranteed returns up to 7.25% IRR — beats most fixed deposits', 'Multiple payout options (lump sum or income)', 'Tax-free maturity amount under 10(10D)', 'Limited premium paying term (pay for 5-10 years, receive for 30+)', 'Strong brand credibility'],
    cons: ['High early surrender charges', 'Returns are guaranteed but still lower than equity over long term', 'Limited flexibility after policy start'],
    expertVerdict: 'HDFC Life Sanchay Fixed Maturity is excellent for retirement income planning. Paying for 10 years and receiving guaranteed regular income for 25-30 years is a compelling proposition. Best for conservative investors in the 35-50 age bracket planning for retirement.',
  },
  'decode-bajaj': {
    slug: 'decode-bajaj', brand: 'Bajaj Allianz', planName: 'Bajaj Life Goal Suraksha',
    category: 'savings', brandColor: '#1d4ed8', tagline: 'Best for goal-based savings with life cover',
    premiumRange: '₹12,000 - ₹60,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Sum Assured + Bonuses', rating: 4.0,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Participating endowment plan', good: true },
      { feature: 'Bonus', value: 'Simple reversionary bonus (not guaranteed)', good: false },
      { feature: 'Policy Term', value: '10-35 years', good: true },
      { feature: 'Premium Flexibility', value: 'Monthly, quarterly, half-yearly, annual', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Accidental Cover', value: 'Yes — included', good: true },
      { feature: 'Surrender', value: 'After 3 years', good: true },
      { feature: 'Liquidity', value: 'Loan after 3 years', good: true },
    ],
    pros: ['Participating plan — shares in company profits via bonuses', 'Flexible premium payment terms', 'Accidental death benefit included', 'Good for long-term goal planning (child\'s education, marriage)', 'Bajaj Allianz\'s strong claim settlement for life insurance'],
    cons: ['Bonus is not guaranteed — depends on insurer performance', 'IRR typically 4-5.5% — lower than dedicated investments', 'Not ideal for pure wealth creation'],
    expertVerdict: 'Bajaj Life Goal Suraksha is a solid traditional endowment plan for goal-based saving. Best suited for people who want a "forced savings" mechanism with insurance cover. For pure wealth creation, combine a term plan with mutual funds instead.',
  },
  'decode-sbi': {
    slug: 'decode-sbi', brand: 'SBI Life', planName: 'SBI Life Smart Platina Assure',
    category: 'savings', brandColor: '#38bdf8', tagline: 'Best for short premium term with long benefit period',
    premiumRange: '₹20,000 - ₹1,00,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Sum Assured + Guaranteed Additions', rating: 4.2,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Non-linked guaranteed savings', good: true },
      { feature: 'Premium Paying Term', value: '6 or 10 years only', good: true },
      { feature: 'Guaranteed Additions', value: '5-7% of sum assured per year', good: true },
      { feature: 'Policy Term', value: '12 or 20 years', good: true },
      { feature: 'SBI Brand', value: 'Backed by State Bank of India', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Loan Facility', value: 'Yes — after 3 years', good: true },
      { feature: 'Returns vs Market', value: 'Lower but guaranteed', good: false },
    ],
    pros: ['Backed by SBI — one of India\'s most trusted brands', 'Short premium payment term (6-10 years)', 'Guaranteed additions every year give clarity on returns', 'Good for people who want to stop paying premiums early but keep the plan long', 'Easy documentation through SBI branches nationwide'],
    cons: ['Effective returns of ~5-6% IRR are below equity-linked products', 'Surrender value in early years is low', 'Limited flexibility to alter plan post-purchase'],
    expertVerdict: 'SBI Life Smart Platina Assure is a strong choice for those who value the SBI brand and want short premium payment terms. The guaranteed additions provide transparency. A good choice for conservative investors aged 35-50.',
  },
  'decode-absli': {
    slug: 'decode-absli', brand: 'Aditya Birla Sun Life', planName: 'ABSLI Assured Savings Plan',
    category: 'savings', brandColor: '#dc2626', tagline: 'Best for guaranteed income with flexibility',
    premiumRange: '₹15,000 - ₹75,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Sum Assured + Guaranteed Income', rating: 4.1,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Non-linked, Non-participating', good: true },
      { feature: 'Guaranteed Income', value: 'Regular payouts post premium term', good: true },
      { feature: 'Premium Paying Term', value: '5-12 years', good: true },
      { feature: 'Income Payout Duration', value: '20-30 years', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Aditya Birla Brand', value: 'One of India\'s largest conglomerates', good: true },
      { feature: 'Loan Facility', value: 'Available', good: true },
      { feature: 'Guaranteed Returns', value: '5-6.5% IRR', good: true },
    ],
    pros: ['Long guaranteed income payout period (20-30 years)', 'Strong Aditya Birla Group brand credibility', 'Clear guaranteed returns — no market dependency', 'Good for retirement income planning', 'Flexible premium payment terms'],
    cons: ['Income payouts are taxable above ₹1L annual premium (post-budget changes)', 'Returns lower than market-linked products over same term', 'Early exit charges are significant'],
    expertVerdict: 'ABSLI Assured Savings is excellent for retirement income planning. The long payout period (20-30 years) and guaranteed amounts give peace of mind. However, always verify the current tax-free maturity limit based on your premium amount.',
  },
  'decode-tata-aia': {
    slug: 'decode-tata-aia', brand: 'TATA AIA', planName: 'TATA AIA Diamond Savings Plan',
    category: 'savings', brandColor: '#1d4ed8', tagline: 'Best savings plan with built-in life cover and bonuses',
    premiumRange: '₹20,000 - ₹1,20,000/year', claimRatio: 'N/A (Savings)', networkHospitals: undefined,
    coverAmount: 'Sum Assured + Bonuses + Terminal Bonus', rating: 4.2,
    keyFeatures: [
      { feature: 'Plan Type', value: 'Participating endowment plan', good: true },
      { feature: 'Bonus Type', value: 'Simple Reversionary + Terminal Bonus', good: true },
      { feature: 'Guaranteed Additions', value: 'None (participating)', good: false },
      { feature: 'Loyalty Additions', value: 'From 10th year onward', good: true },
      { feature: 'Policy Term', value: '10-30 years', good: true },
      { feature: 'TATA & AIA Brand', value: 'TATA Group + AIA Group (Asia\'s largest)', good: true },
      { feature: 'Tax Benefit (80C)', value: 'Yes', good: true },
      { feature: 'Claim Settlement Ratio', value: '99.01%', good: true },
    ],
    pros: ['Participating in insurer\'s profits — higher upside potential', 'TATA AIA has 99.01% claim settlement ratio — among the best', 'Loyalty additions reward long-term policyholders', 'Terminal bonus at maturity adds significant value', 'Strong dual brand trust (TATA + AIA)'],
    cons: ['No guaranteed additions — bonus depends on insurer performance', 'Less transparent than non-participating plans', 'Effective returns can vary year to year'],
    expertVerdict: 'TATA AIA Diamond Savings Plan is our top pick among participating savings plans, primarily because of TATA AIA\'s exceptional 99.01% claim settlement ratio. The participating structure means higher potential returns in good years. Best for long-term (20+ year) horizon investors.',
  },
};

// --- CLAIMS PAGES ---
export interface ClaimStep { step: number; title: string; description: string; icon: string; }
export interface ClaimsPageData {
  slug: string;
  title: string;
  subtitle: string;
  type: 'understand' | 'intimate' | 'support';
  steps: ClaimStep[];
  tips: string[];
  faqs: InfoFaq[];
}

export const claimsPages: Record<string, ClaimsPageData> = {
  'claims-understand': {
    slug: 'claims-understand', type: 'understand',
    title: 'Understand the Insurance Claim Process',
    subtitle: 'A clear, step-by-step guide to what happens from the moment you raise a claim to when the money lands.',
    steps: [
      { step: 1, icon: '📞', title: 'Intimate the Claim Immediately', description: 'Notify your insurer within 24-48 hours of the event (death, hospitalization, accident). Call the 24x7 helpline or use the app. Delay can lead to complications or rejection.' },
      { step: 2, icon: '📋', title: 'Submit Required Documents', description: 'Gather and submit: Death certificate (for life), Hospital bills and discharge summary (for health), FIR/Police report (for accident), Policy document, ID proof of claimant, Bank account details for payment.' },
      { step: 3, icon: '🔍', title: 'Claim Investigation', description: 'The insurer assigns a surveyor or claim investigator. They verify the claim against policy terms. For health: they check if the illness/treatment is covered. For life: they verify the cause of death and policy standing.' },
      { step: 4, icon: '✅', title: 'Claim Approval or Query', description: 'Insurer approves the claim or raises a query for additional documents. IRDAI mandates response within 15 days of receiving all documents. Always respond to queries promptly.' },
      { step: 5, icon: '💰', title: 'Payment Settlement', description: 'Once approved, payment is made within 30 days. Health cashless claims are settled directly with the hospital. Life/reimbursement claims are transferred to your registered bank account.' },
    ],
    tips: [
      'Never delay claim intimation — most policies require it within 24-48 hours.',
      'Keep physical copies of all submitted documents.',
      'Always get a unique Claim Reference Number when you intimate a claim.',
      'If a claim is rejected, you have the right to escalate to the Insurance Ombudsman.',
      'Document everything — take photos of bills, hospital records, and correspondence.',
      'Use a InsuranceShiva advisor — we help you through the entire process for free.',
    ],
    faqs: [
      { q: 'How long does an insurance claim take to settle?', a: 'IRDAI mandates settlement within 30 days of receiving all documents. Simple claims often settle in 3-7 working days.' },
      { q: 'What if my claim is rejected?', a: 'You can dispute within 6 months. First, request the rejection reason in writing. Then escalate to the Grievance Cell, Insurance Ombudsman, or IRDAI (Bima Bharosa portal).' },
      { q: 'Can I file a claim without a broker?', a: 'Yes. But a InsuranceShiva advisor can handle documentation, follow-ups, and escalations — for free. We help 1,200+ people with claims every month.' },
    ],
  },
  'claims-intimate': {
    slug: 'claims-intimate', type: 'intimate',
    title: 'Intimate a Claim',
    subtitle: 'Raise a new insurance claim with step-by-step assistance from our claims experts.',
    steps: [
      { step: 1, icon: '📱', title: 'Choose Claim Type', description: 'Select the type: Health (Cashless), Health (Reimbursement), Life Insurance Death Claim, Accidental Claim, or Critical Illness Claim. Each has a different process and document list.' },
      { step: 2, icon: '📞', title: 'Call or Click to Intimate', description: 'For cashless health: Call insurer\'s TPA before hospitalization. For reimbursement: Intimate within 24 hours of discharge. For life: Call within 24 hours of death. Our team can do this on your behalf.' },
      { step: 3, icon: '📂', title: 'Collect Documents', description: 'We will send you a customized checklist based on your claim type and insurer. Common documents: Hospital bills, discharge summary, medical reports, death certificate, FIR (if accident).' },
      { step: 4, icon: '📤', title: 'Submit via Digital or Physical Mode', description: 'Upload documents on the insurer\'s portal or via our InsuranceShiva app. Physical submission at insurer branch is also accepted. Our team verifies documents before submission to prevent rejection.' },
      { step: 5, icon: '🔔', title: 'Track Your Claim', description: 'Use the insurer\'s app or our tracking system. Our claims advisor follows up every 3 days on your behalf until settlement.' },
    ],
    tips: [
      'Have your policy number, health card, and ID proof handy before calling.',
      'For planned hospitalization, intimate the insurer 3 days in advance for cashless approval.',
      'For emergency hospitalization, intimate within 24 hours and apply for cashless within 48 hours.',
      'Don\'t sign blank claim forms at the hospital. Read everything before signing.',
      'Our InsuranceShiva claims team is available 24x7 for claim emergencies.',
    ],
    faqs: [
      { q: 'What is the difference between cashless and reimbursement claims?', a: 'In cashless, the insurer pays the hospital directly. In reimbursement, you pay the hospital and then claim the money back from the insurer.' },
      { q: 'What if my hospital is not in the cashless network?', a: 'You will need to pay the bills and file a reimbursement claim. Save all original bills, discharge summary, and medical reports.' },
      { q: 'Can I claim for pre-hospitalization expenses?', a: 'Yes, most plans cover pre-hospitalization (30-60 days before) and post-hospitalization (60-90 days after) expenses. Keep all prescriptions, test reports, and bills.' },
    ],
  },
  'claims-support': {
    slug: 'claims-support', type: 'support',
    title: 'Claims Support & Escalations',
    subtitle: 'Claim delayed or rejected? We fight for your rightful settlement — completely free of cost.',
    steps: [
      { step: 1, icon: '📝', title: 'Document the Issue', description: 'Write down: Your claim reference number, Date of intimation, Documents submitted, Rejection/delay reason given by insurer (get this in writing).' },
      { step: 2, icon: '📧', title: 'Write to Insurer Grievance Cell', description: 'Every insurer has a mandatory Grievance Redressal Officer. Write a formal complaint email/letter. IRDAI mandates resolution within 14 days. Keep a copy of all correspondence.' },
      { step: 3, icon: '🏢', title: 'Insurance Ombudsman', description: 'If not resolved within 30 days, file with the Insurance Ombudsman in your region. The process is free. Covers disputes up to ₹50 Lakh. Decision is legally binding on the insurer.' },
      { step: 4, icon: '🌐', title: 'IRDAI Bima Bharosa Portal', description: 'Lodge a complaint on irdai.gov.in\'s Bima Bharosa portal. IRDAI monitors insurer behaviour. Your complaint creates an official record that insurers take seriously.' },
      { step: 5, icon: '⚖️', title: 'Consumer Court / NCDRC', description: 'For unresolved cases or amounts above ₹50L, file in Consumer Court (District Forum, State Commission, or NCDRC). Our team can refer you to insurance legal specialists.' },
    ],
    tips: [
      'Always get the rejection reason in writing — verbal rejections hold no legal weight.',
      'Do not accept settlement below your entitled amount without legal advice.',
      'The Insurance Ombudsman process is free and usually faster than courts.',
      'InsuranceShiva\'s claims support team handles escalations for our clients at no charge.',
      'Keep all documents — policy, bills, correspondence — for at least 5 years.',
    ],
    faqs: [
      { q: 'My claim was rejected. What are my options?', a: '1. Request written rejection reason. 2. Reply with counter-evidence within 30 days. 3. Escalate to insurer Grievance Cell. 4. File with Insurance Ombudsman if unresolved in 30 days. 5. Consumer Court for large amounts.' },
      { q: 'How long does the Ombudsman process take?', a: 'The Ombudsman is mandated to resolve within 3 months. Most cases resolve in 30-60 days. The process is free and legally binding on the insurer.' },
      { q: 'Can InsuranceShiva help with claim escalations?', a: 'Absolutely. Our claims support team handles the entire escalation process on your behalf — from writing to the insurer to filing with the Ombudsman — completely free for our clients.' },
    ],
  },
};

// --- BEST PLANS PAGE ---
export const bestPlansData = {
  title: 'Best Insurance Plans in India 2024',
  subtitle: 'Expert-curated. Unbiased. Updated monthly. Find the best plan across term, health, and savings.',
  categories: [
    {
      id: 'term', label: 'Best Term Plans', icon: '🛡️',
      plans: [
        { rank: 1, name: 'HDFC Life Click 2 Protect Super', badge: 'Editor\'s Choice', premium: '₹450/month', cover: '₹1 Crore', claimRatio: '99.5%', highlight: 'Best features + highest claim ratio' },
        { rank: 2, name: 'Max Life Smart Secure Plus', badge: 'Best Value', premium: '₹480/month', cover: '₹1 Crore', claimRatio: '99.5%', highlight: 'Excellent rider options + TROP variant' },
        { rank: 3, name: 'Tata AIA SRS Vitality', badge: 'Best for Health-Conscious', premium: '₹490/month', cover: '₹1 Crore', claimRatio: '99.01%', highlight: 'Reward program reduces premiums' },
        { rank: 4, name: 'LIC Tech Term', badge: 'Most Trusted', premium: '₹520/month', cover: '₹1 Crore', claimRatio: '98.8%', highlight: 'Government backing, most trusted brand' },
        { rank: 5, name: 'ICICI Prudential iProtect Smart', badge: 'Best Online Price', premium: '₹430/month', cover: '₹1 Crore', claimRatio: '98.0%', highlight: 'Lowest premium for women' },
      ],
    },
    {
      id: 'health', label: 'Best Health Plans', icon: '❤️',
      plans: [
        { rank: 1, name: 'HDFC Ergo Optima Secure', badge: 'Editor\'s Choice', premium: '₹900/month', cover: '₹10L', claimRatio: '98%', highlight: 'Best claim ratio + 13,000 hospitals' },
        { rank: 2, name: 'Niva Bupa Aspire Titanium+', badge: 'Best for Families', premium: '₹1,100/month', cover: '₹10L', claimRatio: '96.5%', highlight: 'Lock the Clock + instant maternity' },
        { rank: 3, name: 'Care Supreme', badge: 'Best Features', premium: '₹850/month', cover: '₹10L', claimRatio: '95.2%', highlight: 'Unlimited restoration + 541 daycare' },
        { rank: 4, name: 'Tata AIG Medicare Premier', badge: 'Best for NRIs', premium: '₹1,200/month', cover: '₹10L', claimRatio: '96%', highlight: 'International cover in 190+ countries' },
        { rank: 5, name: 'Zuno Health Gold', badge: 'Best Digital', premium: '₹750/month', cover: '₹10L', claimRatio: '96.1%', highlight: '100% app-based, best for tech users' },
      ],
    },
    {
      id: 'savings', label: 'Best Savings Plans', icon: '💰',
      plans: [
        { rank: 1, name: 'HDFC Life Sanchay Fixed Maturity', badge: 'Best Returns', premium: '₹5,000/month', cover: 'Life Cover Included', claimRatio: 'Up to 7.25% IRR', highlight: 'Highest guaranteed returns' },
        { rank: 2, name: 'TATA AIA Diamond Savings', badge: 'Best Brand Trust', premium: '₹4,500/month', cover: 'Life Cover Included', claimRatio: 'Bonus-linked', highlight: '99.01% claim ratio' },
        { rank: 3, name: 'LIC Bima Jyoti', badge: 'Government Backed', premium: '₹3,800/month', cover: 'Life Cover Included', claimRatio: '4.5% IRR guaranteed', highlight: 'Zero default risk, Govt. of India backed' },
        { rank: 4, name: 'SBI Life Smart Platina Assure', badge: 'Short Premium Term', premium: '₹6,000/month', cover: 'Life Cover Included', claimRatio: '~6% IRR', highlight: 'Pay for 6 years, get returns for 20+' },
        { rank: 5, name: 'ABSLI Assured Savings Plan', badge: 'Best Income Plan', premium: '₹4,000/month', cover: 'Life Cover Included', claimRatio: '5-6.5% IRR', highlight: 'Regular guaranteed income for 30 years' },
      ],
    },
  ],
};
