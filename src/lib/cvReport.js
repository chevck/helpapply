const CRITERIA_LABELS = {
  FMT_PARSEABLE: 'Readable by parsers',
  FMT_LENGTH: 'Length fits the level',
  FMT_HEADINGS: 'Standard section headings',
  FMT_DATES: 'Consistent date format',
  FMT_CONTACT: 'Contact block complete',
  HYG_PERSONAL_DATA: 'No unnecessary personal data',
  HYG_PHOTO: 'No photo included',
  HYG_FILLER: 'No filler content',
  HYG_LANGUAGE: 'Clean writing',
  IMP_QUANTIFIED: 'Bullets carry numbers',
  IMP_WEAK_VERBS: 'Strong action verbs',
  IMP_VAGUE: 'Specific, not vague',
  POS_TOP_THIRD: 'Role is clear up top',
  POS_SUMMARY: 'Professional summary',
  LVL_OWNERSHIP: 'Ownership shown',
  LVL_SENIOR_SCOPE: 'Senior-level scope',
  LVL_STAFF_SCOPE: 'Org-level scope',
  LVL_TENURE: 'No unexplained short stints',
  LVL_GAPS: 'No unexplained gaps',
  LVL_EXTERNAL_PROOF: 'Verifiable external proof',
  LVL_EDUCATION_POSITION: 'Education positioned well',
}

const CATEGORY_LABELS = {
  FMT: 'Formatting',
  HYG: 'Hygiene',
  IMP: 'Impact',
  POS: 'Positioning',
  LVL: 'Seniority signals',
}

export function getCriterionLabel(id, improvementsById) {
  return improvementsById[id]?.title || CRITERIA_LABELS[id] || id
}

export function getCategory(id) {
  const prefix = id.split('_')[0]
  return CATEGORY_LABELS[prefix] || 'Other'
}

export function formatBand(band) {
  if (!band) return ''
  return band.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function formatLevel(level) {
  if (!level) return ''
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export function getVerdict(percent) {
  if (percent >= 0.85) {
    return {
      headline: 'Your CV is in strong shape',
      blurb: 'Most of what reviewers and ATS systems look for is already here.',
    }
  }
  if (percent >= 0.65) {
    return {
      headline: 'Your CV is close, but needs some polish',
      blurb: 'The foundation is solid. A few fixes will make a real difference.',
    }
  }
  if (percent >= 0.4) {
    return {
      headline: 'Your CV needs some rework',
      blurb: 'A handful of gaps are likely costing you interviews. Here is what to fix first.',
    }
  }
  return {
    headline: 'Your CV needs a substantial rewrite',
    blurb: 'Several core signals reviewers look for are missing. Start with the items below.',
  }
}
