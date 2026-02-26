// LAIFF Festival Configuration
// Update these values each festival season

export const FESTIVAL = {
  name: 'LAIFF',
  fullName: 'Los Angeles International Film Festival',
  year: 2025,
  tagline: 'Celebrating independent cinema with an edge',

  // Festival dates
  startDate: '2025-11-14',
  endDate: '2025-11-16',
  dateDisplay: 'November 14-16, 2025',

  // Main venue
  venue: {
    name: 'Million Dollar Theatre',
    address: '307 S Broadway, Los Angeles',
    shortName: 'Million Dollar',
    coordinates: [-118.2491, 34.0497] as [number, number],
  },

  // Links
  links: {
    website: 'https://laiff.org',
    filmFreeway: 'https://filmfreeway.com/LAIFF',
    donate: 'https://laiff.org/donate',
    email: 'info@laiff.org',
    volunteerEmail: 'volunteer@laiff.org',
    sponsorEmail: 'sponsors@laiff.org',
  },
} as const;
