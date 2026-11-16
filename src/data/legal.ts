export interface LegalSection {
  heading: string
  body: string[]
}

export interface LegalDoc {
  slug: string
  title: string
  intro: string
  sections: LegalSection[]
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    intro:
      'DevWengi collects as little as possible. This page explains what we collect, why, and what you can do about it.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Newsletter subscriptions: your email address, submitted through our subscription forms.',
          'Join requests: the details you choose to share — name, email, city, experience level, goals, and any portfolio link.',
          'We do not ask for passwords, payment details, or government IDs. Please never send them.',
        ],
      },
      {
        heading: 'Why we collect it',
        body: [
          'To send the newsletter you subscribed to, and to respond to join requests with guidance on taking part.',
          'We do not sell personal data, run ads, or share your details with third parties for marketing.',
        ],
      },
      {
        heading: 'Where it lives',
        body: [
          'Form submissions are processed and stored by our hosting provider, Netlify, as part of its form-handling service.',
          'Emails you send us live in our mailbox until you ask us to delete them.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'Unsubscribe from the newsletter at any time using the link in any email, or by writing to dev.wengi.ke@gmail.com.',
          'Ask for a copy or deletion of your details at the same address and we will act promptly.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    intro:
      'Plain-language terms for taking part in DevWengi. By joining the community or using this site, you agree to the following.',
    sections: [
      {
        heading: 'A learning community',
        body: [
          'DevWengi is a community for learning and building together. Participation is not a promise of a job, a certificate, a dedicated mentor, or any particular outcome.',
          'Learning paths, briefs, and articles are educational starting points, not professional advice.',
        ],
      },
      {
        heading: 'How we show up',
        body: [
          'Be kind and respect different starting points. Give useful feedback, never personal criticism.',
          'Credit the work you share, protect private information, and ask thoughtfully.',
          'We may remove content or access for anyone who harasses others, spams, or misuses community spaces.',
        ],
      },
      {
        heading: 'Your content',
        body: [
          'You keep ownership of what you share — projects, questions, and stories stay yours.',
          'By posting in community spaces, you allow DevWengi to display that content as part of running the community.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'We may update these terms as the community grows. Material changes will be noted here with a new date.',
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    intro: 'Short version: this site does not set its own cookies.',
    sections: [
      {
        heading: 'Our cookies',
        body: [
          'DevWengi does not use cookies for tracking, advertising, or analytics. There is no cookie banner because there is nothing to consent to.',
        ],
      },
      {
        heading: 'Essential service cookies',
        body: [
          'Our hosting provider, Netlify, may set strictly necessary cookies to deliver pages and process form submissions securely.',
        ],
      },
      {
        heading: 'External links',
        body: [
          'Links to GitHub, Discord, documentation sites, and other external services are governed by those services’ own cookie policies once you leave this site.',
        ],
      },
    ],
  },
]
