import Container from './Container';

const sections = [
  {
    title: 'Maison',
    links: [
      { label: 'About', href: '/(marketing)/about' },
      { label: 'Artisans', href: '/catalog?tag=artisan' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: 'mailto:hello@heritageatelier.example' },
      { label: 'Shipping & Returns', href: '#' }
    ]
  },
  {
    title: 'Policies',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-fog/60 py-16">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <span className="font-display text-lg uppercase tracking-[0.4em]">Heritage Atelier</span>
          <p className="text-sm text-charcoal/70">
            Luxury crafted slowly. Discover heirlooms from India’s most gifted artisans.
          </p>
        </div>
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-charcoal/60">{section.title}</h3>
            <ul className="space-y-2 text-sm text-charcoal/70">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="mt-12 flex flex-col gap-2 border-t border-charcoal/10 pt-6 text-xs text-charcoal/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Heritage Atelier. All rights reserved.</p>
        <p>Crafted in collaboration with master artisans across India.</p>
      </Container>
    </footer>
  );
}
