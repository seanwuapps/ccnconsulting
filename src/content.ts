export default {
  slogan: '',
  hero: {
    img: '/img/hero.svg',
    imgAlt: 'Hero section illustration',
    heading: 'Impactful collaboration',
    description: `
Outcome driven consulting services for digital projects

<go-button variant="primary" flat round href="#contact-us">Start a conversation</go-button>
`,
  },
  about: `
We provide full-stack digital consulting services to help you deliver successful projects. We work with our clients from start to finish, guiding them through the process of developing a project's strategy and delivering the final product.
  `,
  services: [
    {
      img: '/img/puzzle.svg',
      imgAlt: 'people working together',
      heading: 'Project management',
      text: `We have been working in the field for years across government and private sector. Our team of experienced project managers have helped our clients to identify their objectives and develop a strategy that enables them to achieve these goals.

We know how important it is to deliver quality work on time and we're committed to doing just that. We have a strong track record with delivering high-quality work on time, every time.`,
    },
    {
      img: '/img/ui.svg',
      imgAlt: 'team building illustration',
      heading: 'Digital delivery',
      text: "Our multidisciplinary team of specialists bring a wealth of knowledge and expertise to help our clients creating more effective teams. Our outcome driven approach builds a collaborative environment for the delivery team to ensure the client's vision can be realised.",
    },
    {
      img: '/img/design.svg',
      imgAlt: 'person building an interface',
      heading: 'Design system consulting',
      text: 'We help organisations create design systems to unify their branding and user experiences across multiple teams and products, by bringing the technical expertise and real-world experiences on every step of their design system lifecycle.',
    },
    {
      img: '/img/code.svg',
      imgAlt: 'coding',
      heading: 'Full-stack development',
      text: `We build scalable solutions that are future-ready, easy to maintain and provides long-term value. We're passionate about delivering quality results for our client's projects.`,
    },
  ],
  contact: {
    text: `
**Email:** <a href="mailto:hello@ccnconsulting.com.au">hello@ccnconsulting.com.au</a>

**Location:** Canberra, Australia
`,
  },
  join: {
    text: `
Connect with us and we will be in touch with you to see how we can empower you to do great things.

<go-button variant="primary" round block="tablet" target="_blank" href="https://form.jotform.com/230490537104045">
Start a conversation
<svg slot="prefix" xmlns="http://www.w3.org/2000/svg" style="fill:currentColor" viewBox="0 0 24 24"><path d="M20.56 3.34a1 1 0 0 0-1-.08l-17 8a1 1 0 0 0-.57.92 1 1 0 0 0 .6.9L8 15.45v6.72L13.84 18l4.76 2.08a.93.93 0 0 0 .4.09 1 1 0 0 0 .52-.15 1 1 0 0 0 .48-.79l1-15a1 1 0 0 0-.44-.89ZM18.1 17.68l-5.27-2.31L16 9.17l-7.65 4.25-2.93-1.29 13.47-6.34Z"/></svg>
</go-button>`,
  },
  footer: {
    copyright: `&copy; ${new Date().getFullYear()} CCN Consulting Pty Ltd`,
  },
  abn: '81 664 592 698',
};
