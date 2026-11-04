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
