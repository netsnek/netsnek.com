/**
 * Localizable chrome strings for netsnek.com.
 *
 * Flat PascalCase keys, one catalog per locale. The German catalog is the
 * source of truth and collects every hardcoded chrome string of the site
 * (hero, navigation, footer titles, services cards, contact modal, toasts,
 * 404, search, product availability, docs feedback link). Jaen CMS fields
 * keep their field names; for the ServiceDetails/Services headings the
 * catalog only carries the message defaults.
 *
 * Components are NOT wired to this catalog yet. Wiring happens in a later
 * phase once the remaining translations exist.
 */

export const messagesDe = {
  // Hero (src/components/sections/Hero.tsx)
  HeroTitle: 'INNOVATIV. EFFEKTIV.',
  HeroSubtitle: 'Professionelle Softwareentwicklung.',
  HeroText:
    'Ihre Softwareagentur in Österreich. Wir verhelfen Ihnen zu maßgeschneiderten Softwarelösungen.',
  HeroButtonContact: 'Kontakt',
  HeroButtonProjects: 'Projekte ansehen',

  // TopNav (src/components/navigation/TopNav.tsx)
  NavHome: 'Home',
  NavDocs: 'Dokumentation',
  NavSignIn: 'Anmelden',
  NavSignUp: 'Registrieren',

  // AltTopNav (src/components/navigation/AltTopNav.tsx)
  AltNavServices: 'Unsere Services',
  AltNavDocs: 'Dokumentation',
  AltNavPortfolio: 'Unser Portfolio',
  AltNavBlog: 'Blog',
  AltNavFollowUs: 'Folge uns auf',
  AltNavRequestNow: 'Jetzt anfragen',

  // Footer link-group titles (src/components/sections/Footer.tsx)
  FooterLinksTitle: 'Links',
  FooterPartnerTitle: 'Partner',
  FooterDesignedByTitle: 'Gestaltet von',

  // Services cards (src/components/sections/Services.tsx)
  ServicesCardConsultingTitle: 'Beratung',
  ServicesCardConsultingText:
    'Wir beraten Sie in allen Fragen rund um die Digitalisierung.',
  ServicesCardDevelopmentTitle: 'Entwicklung',
  ServicesCardDevelopmentText:
    'Wir entwickeln individuelle Softwarelösungen für Ihr Unternehmen.',

  // ServiceDetails (src/components/sections/ServiceDetails.tsx)
  // The two headings stay jaen fields; these strings are the message
  // defaults (HTML preserved as used by Field.Text defaultValue).
  ServiceDetailsHeading1:
    "Wir unterstützen<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>Ihr Unternehmen</span><br/>\n  im digitalen Zeitalter<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsHeading2:
    "Wir lösen<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>Ihr Probleme</span><br/>\n  zur Not mit Quantencomputern<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsItemUxTitle: 'UX-Konzeption',
  ServiceDetailsItemUxText:
    'Durch den Einsatz moderner UX-Methoden gestalten wir benutzerfreundliche und intuitive Oberflächen.',
  ServiceDetailsItemWebTitle: 'Web development',
  ServiceDetailsItemWebText:
    'Wir kreieren moderne Websites und Webanwendungen, die exakt auf Ihre individuellen Bedürfnisse zugeschnitten sind.',
  ServiceDetailsItemBackendTitle: 'Backend development',
  ServiceDetailsItemBackendText:
    'Unsere maßgeschneiderten Backend-Lösungen werden speziell auf Ihre Anforderungen abgestimmt und basieren auf dem Framework Pylon.',
  ServiceDetailsItemCmsTitle: 'Content management',
  ServiceDetailsItemCmsText:
    'Mit Jaen als Content-Management-System ermöglichen wir es Ihnen, Ihre Website eigenständig zu verwalten.',

  // ContactModal (src/components/ContactModal/ContactModal.tsx)
  ContactModalHeading: 'Kontaktieren Sie uns',
  ContactModalIntro:
    'Wir freuen uns über Ihre Nachricht und werden uns schnellstmöglich bei Ihnen melden.',
  ContactModalFirstNameLabel: 'Vorname',
  ContactModalFirstNamePlaceholder: 'Max',
  ContactModalLastNameLabel: 'Nachname',
  ContactModalLastNamePlaceholder: 'Mustermann',
  ContactModalEmailLabel: 'E-Mail',
  ContactModalEmailPlaceholder: 'max.mustermann@example.com',
  ContactModalPhoneLabel: 'Telefonnummer',
  ContactModalPhonePlaceholder: '+43 123 456 789',
  ContactModalMessageLabel: 'Wie können wir Ihnen helfen?',
  ContactModalMessagePlaceholder: 'Nachricht',
  ContactModalTerms:
    'Ich bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme und für Rückfragen gespeichert werden.',
  ContactModalTermsRequired:
    'Bitte bestätigen Sie die Bedingungen zur Kontaktaufnahme',
  ContactModalSubmit: 'Senden',

  // Contact toasts (src/services/contact.tsx)
  ContactToastErrorTitle: 'Fehler',
  ContactToastErrorDescription: 'Es ist ein Fehler aufgetreten.',
  ContactToastSuccessTitle: 'Erfolg',
  ContactToastSuccessDescription:
    'Ihre Nachricht wurde erfolgreich versendet.',

  // 404 (src/pages/404.tsx)
  NotFoundTitle: 'Seite nicht gefunden',
  NotFoundText: 'Diese Seite existiert nicht.',
  NotFoundBackHome: 'Zurück zur Startseite',

  // Search (src/components/search-menu/)
  SearchInputPlaceholder: 'Suche',
  SearchModalPlaceholder: 'Suche',
  SearchButtonLabel: 'Suche',

  // Products (src/components/ProductContent.tsx)
  ProductAvailable: 'Verfügbar',
  ProductNotAvailable: 'Derzeit nicht verfügbar',

  // Docs (src/pages/docs.tsx)
  DocsFeedbackLink: 'Fragen? Geben Sie uns Feedback'
} as const;

export type MessageKey = keyof typeof messagesDe;
export type MessageCatalog = Record<MessageKey, string>;
export type PartialMessageCatalog = Partial<MessageCatalog>;

export const locales = ['de', 'en', 'sl', 'it', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

const catalogs: { de: MessageCatalog } & Record<
  Exclude<Locale, 'de'>,
  PartialMessageCatalog
> = {
  de: messagesDe,
  // TODO: translations arrive in the next phase (en, sl, it, ja).
  en: {},
  sl: {},
  it: {},
  ja: {}
};

/**
 * Resolves the message catalog for a locale. Region subtags are ignored
 * ("de-AT" resolves to "de"). Unknown locales and missing keys fall back
 * to the German default catalog.
 */
export const getMessages = (locale: string): MessageCatalog => {
  const base = (locale || defaultLocale)
    .toLowerCase()
    .split(/[-_]/)[0] as Locale;

  if (base === defaultLocale || !locales.includes(base)) {
    return catalogs.de;
  }

  return { ...catalogs.de, ...catalogs[base] };
};

export default catalogs;
