/**
 * Localizable chrome strings for netsnek.com.
 *
 * Flat PascalCase keys, one catalog per locale. The German catalog is the
 * source of truth and collects every hardcoded string of the site: chrome
 * (hero, navigation, footer titles, services cards, contact modal, toasts,
 * 404, search, product availability, docs feedback link), the defaults of
 * the jaen CMS fields that fan out per locale, the image alternatives and
 * the per-page metadata defaults.
 *
 * Jaen CMS fields keep their field names; the catalog only carries their
 * `defaultValue`, so an unedited locale renders in its own language while
 * every locale stays editable in the CMS.
 *
 * The components consume the catalog through react-intl (see
 * gatsby-browser/gatsby-ssr wrapPageElement); src/components/Head.tsx reads
 * it directly because gatsby's Head API renders outside the page providers.
 * Keys missing from a locale fall back to the German value.
 */

export const messagesDe = {
  HeroShowcasePreview: 'Prototyp',
  HeroShowcaseCode: 'Open Source',
  // Hero (src/components/sections/Hero.tsx)
  HeroTitle: 'INNOVATIV. EFFEKTIV.',
  HeroSubtitle: 'Professionelle Softwareentwicklung.',
  HeroText:
    'Ihre Softwareagentur in Österreich. Wir verhelfen Ihnen zu maßgeschneiderten Softwarelösungen.',
  HeroButtonContact: 'Kontakt',
  HeroButtonProjects: 'Projekte ansehen',

  // Animated logo headings (src/gatsby-plugin-jaen/components/Netsnek.tsx
  // and the same mark inside the hero playground).
  // The trailing accent dot is painted by a mask of its own.
  LogoHeadingIdea: 'Ihre Idee.',
  LogoHeadingKnowHow: 'Unser Know-How.',

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

  // Office block of the fullscreen nav overlay
  // (src/components/navigation/AltTopNav.tsx). The street line stays
  // hardcoded: a postal address is not translated.
  AltNavOfficeHeading: 'Im Herzen von Wien',
  AltNavOfficeHeadquarters: 'Hauptquartier',
  AltNavOfficeCityCountry: '1030 Wien, Österreich',

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
    "Wir unterstützen<br/> <span style='color:var(--chakra-colors-brand-500)'>Ihr Unternehmen</span><br/> im digitalen Zeitalter<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsHeading2:
    "Wir lösen<br/> <span style='color:var(--chakra-colors-brand-500)'>Ihre Probleme</span><br/> zur Not mit Quantencomputern<span style='color:var(--chakra-colors-brand-500)'>.</span>",
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

  // The confirmation mail the sender receives (src/services/contact.tsx).
  //
  // These do not render on the site. They travel to emailwerk as send values
  // and are rendered there into the "Contact Confirmation" template, which is
  // a linked child of the contact template and goes out server-side. The
  // template carries the German text of every one of these as its own
  // fallback, so it stays correct on its own; what these add is the sender's
  // own language.
  //
  // Deliberately only this mail. The notification to the office stays German,
  // whatever language the enquiry arrived in.
  MailConfirmSubject: 'Ihre Anfrage auf netsnek.com',
  MailConfirmTitle: 'Ihre Anfrage',
  MailConfirmHeading: 'Kontaktanfrage',
  MailConfirmThanks:
    'Vielen Dank für deine Kontaktanfrage. Ich melde mich so schnell wie möglich bei dir.',
  MailConfirmLabelName: 'Name:',
  MailConfirmLabelEmail: 'E-Mail:',
  MailConfirmLabelPhone: 'Telefonnummer:',
  MailConfirmLabelMessage: 'Nachricht:',
  // {mail} and {phone} become links. Their position may move freely, which is
  // the whole reason the sentence is one string rather than three fragments.
  MailConfirmQuestions:
    'Hast du noch Fragen? Dann schick mir gerne eine E-Mail an {mail} oder rufe mich unter {phone} an.',
  MailConfirmRights: 'Alle Rechte vorbehalten. © {year} Netsnek',
  MailConfirmWebsite: 'Webseite',
  MailConfirmImprint: 'Impressum',

  // 404 (src/pages/404.tsx)
  NotFoundTitle: 'Seite nicht gefunden',
  NotFoundText: 'Diese Seite existiert nicht.',
  NotFoundBackHome: 'Zurück zur Startseite',

  // Search (src/components/search-menu/)
  SearchInputPlaceholder: 'Suche',
  SearchModalPlaceholder: 'Suche',
  SearchButtonLabel: 'Suche',

  // Trailing hint of a search result row
  // (src/components/search-menu/SearchResultItem.tsx). The branch is
  // picked from the result's canonical path.
  SearchResultGotoArticle: 'Zum Artikel',
  SearchResultGotoRecipe: 'Zum Rezept',
  SearchResultGotoPage: 'Zur Seite',

  // Products (src/components/ProductContent.tsx)
  ProductAvailable: 'Verfügbar',
  ProductNotAvailable: 'Derzeit nicht verfügbar',
  ProductNameDefault: 'Produkt Name',
  ProductArticleNumberLabel: 'Artikelnummer:',
  ProductAddToCart: 'In den Warenkorb',

  // Product page and card (src/components/ProductContent.tsx,
  // src/components/ProductCard.tsx). ProductCardBadgeNew is the DISPLAY
  // label only; the tag that marks a product as new is the untranslated
  // sentinel NEW_PRODUCT_TAG in src/utils/products.ts.
  ProductShare: 'Teilen',
  ProductShareCopied: '(Kopiert!)',
  ProductImageSectionLabel: 'Inhalt',
  ProductImageAlt: 'Produktbild',
  ProductCardNoImage: 'Kein Bild',
  ProductCardBadgeNew: 'Neu',

  // Docs (src/pages/docs.tsx)
  DocsFeedbackLink: 'Fragen? Geben Sie uns Feedback',

  // Docs chrome: right-hand table of contents
  // (src/components/navigation/TableOfContent.tsx), the docs breadcrumb
  // root and the left-nav sections (src/components/AppLayout/DocsLayout.tsx,
  // src/utils/navigation/index.ts, src/components/navigation/page-directory/
  // PageDirectory.tsx). createPageTree is a plain util, so its section label
  // is passed in by the calling component.
  DocsEditPageLink: 'Diese Seite in Jaen bearbeiten',
  TocHeading: 'Inhaltsverzeichnis',
  DocsBreadcrumbArticles: 'Artikel',
  DocsMenuSectionArticles: 'Blog Artikel',
  DocsMenuSectionRecipes: 'Rezept Entwicklung',
  DocsMenuRecipes: 'Rezepte',
  DocsMenuSectionMore: 'Mehr',
  DocsMenuHome: 'Hauptseite',
  PageDirectorySectionNavigation: 'Navigation',

  // Services heading and image alternatives
  // (src/components/sections/Services.tsx). The heading stays a jaen field;
  // the catalog only carries its message default (HTML preserved).
  ServicesHeading:
    "Wir verwirklichen in Wochen,<br/> <span style='color:var(--chakra-colors-brand-500)'>nicht Monaten.</span>",
  ServicesCardConsultingImageAlt: 'Beratung',
  ServicesCardDevelopmentImageAlt: 'Entwicklung',

  // Blog section on the homepage (src/components/sections/Blog.tsx). It
  // surfaces the sections of /docs; the heading stays a jaen field, the
  // catalog only carries its message default (HTML preserved).
  BlogHeading:
    "Geschichten aus unseren Projekten<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  BlogAllLink: 'Alle Themen ansehen',
  BlogReadMore: 'Weiterlesen',

  // Open-source section on the homepage (src/components/sections/Open.tsx).
  // The heading stays a jaen field, the catalog only carries its message
  // default (HTML preserved); the three pillars are plain strings.
  OpenHeading:
    "Wir geben zurück, was uns trägt<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  OpenSourceTitle: 'Offener Code',
  OpenSourceText:
    'Jaen, das CMS hinter dieser Seite, ist Open Source, und qtamp samt der Skin-Engine qtWasabi steht unter der MIT-Lizenz. Wer wissen will, wie etwas gebaut ist, liest den Quellcode selbst nach.',
  OpenKnowledgeTitle: 'Offenes Wissen',
  OpenKnowledgeText:
    'In unserer Dokumentation veröffentlichen wir, was wir gelernt haben, von den Quantencomputing-Kapiteln aus PhotonQ über die Linux- und RPM-Notizen bis zu den Security-Berichten. Unser RPM-Repository stellt dazu die gepatchten Pakete bereit, die dabei entstanden sind. Frei zugänglich ist auch colorpedia.org, unser Nachschlagewerk für benannte Farben, ohne Konto und ohne Tracking.',
  OpenCommunityTitle: 'Community vor Ort',
  OpenCommunityText:
    'Netsnek ist Silber-Sponsor des Kärntner Linuxtags und hilft mit, die Linuxtage nach Kärnten zu bringen. Beim Linux-Stammtisch sind wir regelmäßig dabei.',
  OpenDocsLink: 'Zur Dokumentation',
  OpenTuxImageAlt:
    'Tux mit dem Kärntner Wappen, das Logo des Carinthian Linuxday',

  // Associates (src/components/sections/Associates.tsx)
  AssociatesHeading: 'Wir entwickeln für Sie in Österreich.',
  AssociatesAustriaImageAlt: 'Austria',
  AssociatesNetworkLink: 'Experten aus unserem Netzwerk',

  // Contact section (src/components/sections/Contact.tsx). Heading and
  // contact details stay jaen fields; the catalog carries their defaults
  // with the inline HTML exactly as the fields render it.
  ContactHeading:
    "Erzählen Sie uns<br> von Ihrer Idee<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ContactDetails:
    '<b>E-Mail</b><br> <a href="mailto:office@netsnek.com">office@netsnek.com</a><br> <br> <b>Telefon</b><br> <a href="tel:+43 650 834 88 11">+43 650 834 88 11</a><br> <br> <span style="font-weight: 700;">Oder besuchen Sie uns?</span><br> Löwengasse 14 / Lokal 2<br> 1030, Wien<br> Österreich',
  ContactSubmitButton: 'Kontaktiere Uns',
  ContactProjectsLink: 'Lassen Sie sich inspirieren',

  // Footer (src/components/sections/Footer.tsx,
  // src/components/AppLayout/Footer.tsx)
  FooterLinkImprint: 'Impressum',
  FooterCopyright:
    'Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.',
  AppLayoutFooterCopyright:
    'Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved.',

  // Page metadata (src/components/Head.tsx). Defaults only: a title or
  // description edited in the CMS still wins. SiteDescription replaces the
  // single German sentence the CMS site metadata serves to every locale.
  SiteDescription:
    'Erzählen Sie uns von Ihrer Idee oder besuchen Sie uns in unserem Büro in Wien. Wir entwickeln für Sie in Österreich und verhelfen Ihnen zu maßgeschneiderten Softwarelösungen. Webentwicklung von professionellen Web Apps, SaaS und Ecommerce Lösungen.',
  PageTitleHome: 'Netsnek | Software und Security',
  PageDescriptionHome:
    'Erzählen Sie uns von Ihrer Idee oder besuchen Sie uns in unserem Büro in Wien. Wir entwickeln für Sie in Österreich und verhelfen Ihnen zu maßgeschneiderten Softwarelösungen. Webentwicklung von professionellen Web Apps, SaaS und Ecommerce Lösungen.',
  PageTitleDocs: 'Dokumentation | Netsnek',
  PageDescriptionDocs:
    'Anleitungen, Referenzen und Hintergrundwissen zu den Produkten und Frameworks von Netsnek.',
  PageTitleProducts: 'Produkte | Netsnek',
  PageDescriptionProducts:
    'Unsere Produkte und Lösungen für Web, SaaS und Ecommerce.',
  PageTitleImprint: 'Impressum | Netsnek',
  PageDescriptionImprint:
    'Impressum und Offenlegung von Netsnek e.U. in Wien, Österreich.',
  PageTitlePrivacyPolicy: 'Datenschutzerklärung | Netsnek',
  PageDescriptionPrivacyPolicy:
    'Wie Netsnek personenbezogene Daten verarbeitet, speichert und schützt.',
  PageTitleTermsOfService: 'Nutzungsbedingungen | Netsnek',
  PageDescriptionTermsOfService:
    'Die Nutzungsbedingungen für die Websites und Dienste von Netsnek.',
  PageTitleNotFound: 'Seite nicht gefunden | Netsnek',
  PageDescriptionNotFound: 'Diese Seite existiert nicht.',

  // Google Maps cookie-consent fallback (src/components/GoogleMaps.tsx),
  // shown wherever the map is embedded when analytics cookies are
  // declined. The German title had a typo ("is" for "ist").
  MapsUnavailableTitle: 'Google Maps ist nicht verfügbar',
  MapsUnavailableText:
    'Bitte aktivieren Sie Cookies, um Google Maps anzuzeigen.',
  MapsEnableCookiesAction: 'Analyse Cookies aktivieren',

  // Docs body components (src/components/main-content/). The heading
  // anchor label repeats on every heading of every MDX page, so it takes
  // the heading text as a {title} placeholder.
  HeadingAnchorLabel: 'Link zu {title}',
  DocsIndexUntitledPage: 'Seite lesen',
  CodeResultNotRunYet: 'Noch nicht ausgeführt',
  CodePlaygroundPreviewHeader: 'Code-Vorschau',
  CodePlaygroundEditorHeader: 'Bearbeitbarer Code',
  CodePlaygroundPlaceholderCode: 'Das ist eine Code-Spielwiese',

  // Shared controls: colour-mode menu (src/components/ThemeChooser.tsx),
  // the inline editable control (src/components/TextControl.tsx) and the
  // language switcher (src/components/LanguageSwitcher.tsx). The switcher
  // captions are autonyms and stay untranslated by design; only its
  // accessible name is a message.
  ThemeLight: 'Hell',
  ThemeDark: 'Dunkel',
  ThemeSystem: 'System',
  EditableSubmitAriaLabel: 'Speichern',
  EditableCancelAriaLabel: 'Abbrechen',
  EditableEditAriaLabel: 'Bearbeiten',
  LanguageSwitcherLabel: 'Sprache'
} as const;

export type MessageKey = keyof typeof messagesDe;
export type MessageCatalog = Record<MessageKey, string>;
export type PartialMessageCatalog = Partial<MessageCatalog>;

export const locales = ['de', 'en', 'sl', 'it', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export const messagesEn: MessageCatalog = {
  HeroShowcasePreview: 'Prototype',
  HeroShowcaseCode: 'Open Source',
  HeroTitle: "INNOVATIVE. EFFECTIVE.",
  HeroSubtitle: "Professional software development.",
  HeroText: "Your software agency in Austria. We build custom software solutions tailored to your needs.",
  HeroButtonContact: "Contact",
  HeroButtonProjects: "View projects",
  LogoHeadingIdea: "Your idea.",
  LogoHeadingKnowHow: "Our know-how.",
  NavHome: "Home",
  NavDocs: "Documentation",
  NavSignIn: "Sign in",
  NavSignUp: "Sign up",
  AltNavServices: "Our services",
  AltNavDocs: "Documentation",
  AltNavPortfolio: "Our portfolio",
  AltNavBlog: "Blog",
  AltNavFollowUs: "Follow us on",
  AltNavRequestNow: "Get in touch",
  AltNavOfficeHeading: "In the heart of Vienna",
  AltNavOfficeHeadquarters: "Headquarters",
  AltNavOfficeCityCountry: "1030 Vienna, Austria",
  FooterLinksTitle: "Links",
  FooterPartnerTitle: "Partners",
  FooterDesignedByTitle: "Designed by",
  ServicesCardConsultingTitle: "Consulting",
  ServicesCardConsultingText: "We advise you on every aspect of digital transformation.",
  ServicesCardDevelopmentTitle: "Development",
  ServicesCardDevelopmentText: "We develop custom software solutions for your business.",
  ServiceDetailsHeading1: "We support<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>your business</span><br/>\n  in the digital age<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsHeading2: "We solve<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>your problems</span><br/>\n  with quantum computers if need be<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsItemUxTitle: "UX design",
  ServiceDetailsItemUxText: "Using modern UX methods, we craft user-friendly and intuitive interfaces.",
  ServiceDetailsItemWebTitle: "Web development",
  ServiceDetailsItemWebText: "We create modern websites and web applications tailored precisely to your individual needs.",
  ServiceDetailsItemBackendTitle: "Backend development",
  ServiceDetailsItemBackendText: "Our custom backend solutions are built around your specific requirements and are based on the Pylon framework.",
  ServiceDetailsItemCmsTitle: "Content management",
  ServiceDetailsItemCmsText: "With Jaen as your content management system, you can manage your website entirely on your own.",
  ContactModalHeading: "Contact us",
  ContactModalIntro: "We look forward to your message and will get back to you as soon as possible.",
  ContactModalFirstNameLabel: "First name",
  ContactModalFirstNamePlaceholder: "John",
  ContactModalLastNameLabel: "Last name",
  ContactModalLastNamePlaceholder: "Doe",
  ContactModalEmailLabel: "Email",
  ContactModalEmailPlaceholder: "john.doe@example.com",
  ContactModalPhoneLabel: "Phone number",
  ContactModalPhonePlaceholder: "+43 123 456 789",
  ContactModalMessageLabel: "How can we help you?",
  ContactModalMessagePlaceholder: "Message",
  ContactModalTerms: "I agree that my details may be stored for the purpose of contacting me and handling follow-up questions.",
  ContactModalTermsRequired: "Please accept the contact terms",
  ContactModalSubmit: "Send",
  ContactToastErrorTitle: "Error",
  ContactToastErrorDescription: "An error has occurred.",
  ContactToastSuccessTitle: "Success",
  ContactToastSuccessDescription: "Your message has been sent successfully.",
  MailConfirmSubject: "Your enquiry via netsnek.com",
  MailConfirmTitle: "Your enquiry",
  MailConfirmHeading: "Enquiry received",
  MailConfirmThanks: "Thanks for getting in touch. I'll get back to you as soon as I can.",
  MailConfirmLabelName: "Name:",
  MailConfirmLabelEmail: "Email:",
  MailConfirmLabelPhone: "Phone:",
  MailConfirmLabelMessage: "Message:",
  MailConfirmQuestions: "Any other questions? Just email me at {mail} or give me a call on {phone}.",
  MailConfirmRights: "© {year} Netsnek. All rights reserved.",
  MailConfirmWebsite: "Website",
  MailConfirmImprint: "Legal notice",
  NotFoundTitle: "Page not found",
  NotFoundText: "This page does not exist.",
  NotFoundBackHome: "Back to homepage",
  SearchInputPlaceholder: "Search",
  SearchModalPlaceholder: "Search",
  SearchButtonLabel: "Search",
  SearchResultGotoArticle: "Go to article",
  SearchResultGotoRecipe: "Go to recipe",
  SearchResultGotoPage: "Go to page",
  ProductAvailable: "Available",
  ProductNotAvailable: "Currently unavailable",
  ProductNameDefault: "Product name",
  ProductArticleNumberLabel: "Item number:",
  ProductAddToCart: "Add to cart",
  ProductShare: "Share",
  ProductShareCopied: "(Copied!)",
  ProductImageSectionLabel: "Content",
  ProductImageAlt: "Product image",
  ProductCardNoImage: "No image",
  ProductCardBadgeNew: "New",
  DocsFeedbackLink: "Questions? Give us feedback",
  DocsEditPageLink: "Edit this page on Jaen",
  TocHeading: "Table of contents",
  DocsBreadcrumbArticles: "Articles",
  DocsMenuSectionArticles: "Blog articles",
  DocsMenuSectionRecipes: "Recipe development",
  DocsMenuRecipes: "Recipes",
  DocsMenuSectionMore: "More",
  DocsMenuHome: "Main page",
  PageDirectorySectionNavigation: "Navigation",
  ServicesHeading: "We deliver in weeks,<br/> <span style='color:var(--chakra-colors-brand-500)'>not months.</span>",
  ServicesCardConsultingImageAlt: "Consulting",
  ServicesCardDevelopmentImageAlt: "Development",
  BlogHeading: "Stories from our projects<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  BlogAllLink: "Browse all topics",
  BlogReadMore: "Read more",
  OpenHeading: "We give back what carries us<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  OpenSourceTitle: "Open Source",
  OpenSourceText: "Jaen, the CMS this site runs on, is open source, and qtamp together with its skin engine qtWasabi is MIT licensed. Anyone who wants to know how something is built can read the source themselves.",
  OpenKnowledgeTitle: "Open Knowledge",
  OpenKnowledgeText: "Our documentation publishes what we have learned, from the quantum computing chapters out of PhotonQ to the Linux and RPM notes and the security write-ups. Our RPM repository provides the patched packages that came out of that work. Freely available as well is colorpedia.org, our reference for named colours, with no account and no tracking.",
  OpenCommunityTitle: "Local Community",
  OpenCommunityText: "Netsnek is a silver sponsor of the Kärntner Linuxtag and helps bring the Linux days to Carinthia. You will find us at the Linux-Stammtisch on a regular basis.",
  OpenDocsLink: "Read the documentation",
  OpenTuxImageAlt: "Tux holding the Carinthian coat of arms, the logo of the Carinthian Linuxday",
  AssociatesHeading: "We build your software in Austria.",
  AssociatesAustriaImageAlt: "Austria",
  AssociatesNetworkLink: "Experts from our network",
  ContactHeading: "Tell us<br> about your idea<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ContactDetails: "<b>Email</b><br> <a href=\"mailto:office@netsnek.com\">office@netsnek.com</a><br> <br> <b>Phone</b><br> <a href=\"tel:+43 650 834 88 11\">+43 650 834 88 11</a><br> <br> <span style=\"font-weight: 700;\">Or visit us in person?</span><br> Löwengasse 14 / Lokal 2<br> 1030, Vienna<br> Austria",
  ContactSubmitButton: "Contact us",
  ContactProjectsLink: "Get inspired",
  FooterLinkImprint: "Legal notice",
  FooterCopyright: "Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.",
  AppLayoutFooterCopyright: "Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved.",
  SiteDescription: "Tell us about your idea or visit our office in Vienna. We build custom software in Austria: professional web apps, SaaS and ecommerce solutions.",
  PageTitleHome: "Netsnek | Software and Security",
  PageDescriptionHome: "Tell us about your idea or visit our office in Vienna. We build custom software in Austria: professional web apps, SaaS and ecommerce solutions.",
  PageTitleDocs: "Documentation | Netsnek",
  PageDescriptionDocs: "Guides, references and background knowledge on the products and frameworks built by Netsnek.",
  PageTitleProducts: "Products | Netsnek",
  PageDescriptionProducts: "Our products and solutions for web, SaaS and ecommerce.",
  PageTitleImprint: "Legal notice | Netsnek",
  PageDescriptionImprint: "Legal notice and company disclosure for Netsnek e.U. in Vienna, Austria.",
  PageTitlePrivacyPolicy: "Privacy policy | Netsnek",
  PageDescriptionPrivacyPolicy: "How Netsnek processes, stores and protects personal data.",
  PageTitleTermsOfService: "Terms of service | Netsnek",
  PageDescriptionTermsOfService: "The terms of service for the websites and services of Netsnek.",
  PageTitleNotFound: "Page not found | Netsnek",
  PageDescriptionNotFound: "This page does not exist.",
  MapsUnavailableTitle: "Google Maps is unavailable",
  MapsUnavailableText: "Please enable cookies to display Google Maps.",
  MapsEnableCookiesAction: "Enable analytics cookies",
  HeadingAnchorLabel: "Link to {title}",
  DocsIndexUntitledPage: "Read page",
  CodeResultNotRunYet: "Not run yet",
  CodePlaygroundPreviewHeader: "Code preview",
  CodePlaygroundEditorHeader: "Editable code",
  CodePlaygroundPlaceholderCode: "This is a code playground",
  ThemeLight: "Light",
  ThemeDark: "Dark",
  ThemeSystem: "System",
  EditableSubmitAriaLabel: "Save",
  EditableCancelAriaLabel: "Cancel",
  EditableEditAriaLabel: "Edit",
  LanguageSwitcherLabel: "Language"
};

export const messagesSl: MessageCatalog = {
  HeroShowcasePreview: 'Prototip',
  HeroShowcaseCode: 'Open Source',
  HeroTitle: "INOVATIVNO. UČINKOVITO.",
  HeroSubtitle: "Profesionalen razvoj programske opreme.",
  HeroText: "Vaša agencija za razvoj programske opreme v Avstriji. Pomagamo vam do programskih rešitev po meri.",
  HeroButtonContact: "Kontakt",
  HeroButtonProjects: "Oglejte si projekte",
  LogoHeadingIdea: "Vaša ideja.",
  LogoHeadingKnowHow: "Naše znanje.",
  NavHome: "Domov",
  NavDocs: "Dokumentacija",
  NavSignIn: "Prijava",
  NavSignUp: "Registracija",
  AltNavServices: "Naše storitve",
  AltNavDocs: "Dokumentacija",
  AltNavPortfolio: "Naš portfelj",
  AltNavBlog: "Blog",
  AltNavFollowUs: "Sledite nam na",
  AltNavRequestNow: "Pošljite povpraševanje",
  AltNavOfficeHeading: "V srcu Dunaja",
  AltNavOfficeHeadquarters: "Sedež podjetja",
  AltNavOfficeCityCountry: "1030 Dunaj, Avstrija",
  FooterLinksTitle: "Povezave",
  FooterPartnerTitle: "Partnerji",
  FooterDesignedByTitle: "Oblikovanje",
  ServicesCardConsultingTitle: "Svetovanje",
  ServicesCardConsultingText: "Svetujemo vam pri vseh vprašanjih v zvezi z digitalizacijo.",
  ServicesCardDevelopmentTitle: "Razvoj",
  ServicesCardDevelopmentText: "Razvijamo programske rešitve po meri vašega podjetja.",
  ServiceDetailsHeading1: "Podpiramo<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>vaše podjetje</span><br/>\n  v digitalni dobi<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsHeading2: "Rešujemo<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>vaše težave</span><br/>\n  po potrebi tudi s kvantnimi računalniki<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsItemUxTitle: "Zasnova UX",
  ServiceDetailsItemUxText: "Z uporabo sodobnih UX-metod oblikujemo uporabniku prijazne in intuitivne vmesnike.",
  ServiceDetailsItemWebTitle: "Web development",
  ServiceDetailsItemWebText: "Ustvarjamo sodobna spletna mesta in spletne aplikacije, natančno prilagojene vašim individualnim potrebam.",
  ServiceDetailsItemBackendTitle: "Backend development",
  ServiceDetailsItemBackendText: "Naše backend rešitve po meri so posebej prilagojene vašim zahtevam in temeljijo na ogrodju Pylon.",
  ServiceDetailsItemCmsTitle: "Content management",
  ServiceDetailsItemCmsText: "Z Jaen kot sistemom za upravljanje vsebin vam omogočamo, da svoje spletno mesto upravljate samostojno.",
  ContactModalHeading: "Kontaktirajte nas",
  ContactModalIntro: "Veselimo se vašega sporočila in se vam bomo oglasili v najkrajšem možnem času.",
  ContactModalFirstNameLabel: "Ime",
  ContactModalFirstNamePlaceholder: "Janez",
  ContactModalLastNameLabel: "Priimek",
  ContactModalLastNamePlaceholder: "Novak",
  ContactModalEmailLabel: "E-pošta",
  ContactModalEmailPlaceholder: "janez.novak@example.com",
  ContactModalPhoneLabel: "Telefonska številka",
  ContactModalPhonePlaceholder: "+43 123 456 789",
  ContactModalMessageLabel: "Kako vam lahko pomagamo?",
  ContactModalMessagePlaceholder: "Sporočilo",
  ContactModalTerms: "Strinjam se, da se moji podatki shranijo za namen vzpostavitve stika in morebitnih dodatnih vprašanj.",
  ContactModalTermsRequired: "Prosimo, potrdite pogoje za vzpostavitev stika",
  ContactModalSubmit: "Pošlji",
  ContactToastErrorTitle: "Napaka",
  ContactToastErrorDescription: "Prišlo je do napake.",
  ContactToastSuccessTitle: "Uspešno",
  ContactToastSuccessDescription: "Vaše sporočilo je bilo uspešno poslano.",
  MailConfirmSubject: "Tvoje povpraševanje na netsnek.com",
  MailConfirmTitle: "Tvoje povpraševanje",
  MailConfirmHeading: "Povpraševanje",
  MailConfirmThanks: "Najlepša hvala za tvoje povpraševanje. Javil se ti bom čim prej.",
  MailConfirmLabelName: "Ime in priimek:",
  MailConfirmLabelEmail: "E-pošta:",
  MailConfirmLabelPhone: "Telefonska številka:",
  MailConfirmLabelMessage: "Sporočilo:",
  MailConfirmQuestions: "Imaš še kakšno vprašanje? Kar mi piši na {mail} ali me pokliči na {phone}.",
  MailConfirmRights: "Vse pravice pridržane. © {year} Netsnek",
  MailConfirmWebsite: "Spletna stran",
  MailConfirmImprint: "Impresum",
  NotFoundTitle: "Stran ni bila najdena",
  NotFoundText: "Ta stran ne obstaja.",
  NotFoundBackHome: "Nazaj na domačo stran",
  SearchInputPlaceholder: "Iskanje",
  SearchModalPlaceholder: "Iskanje",
  SearchButtonLabel: "Iskanje",
  SearchResultGotoArticle: "Na članek",
  SearchResultGotoRecipe: "Na recept",
  SearchResultGotoPage: "Na stran",
  ProductAvailable: "Na voljo",
  ProductNotAvailable: "Trenutno ni na voljo",
  ProductNameDefault: "Ime izdelka",
  ProductArticleNumberLabel: "Šifra artikla:",
  ProductAddToCart: "V košarico",
  ProductShare: "Deli",
  ProductShareCopied: "(Kopirano!)",
  ProductImageSectionLabel: "Vsebina",
  ProductImageAlt: "Slika izdelka",
  ProductCardNoImage: "Ni slike",
  ProductCardBadgeNew: "Novo",
  DocsFeedbackLink: "Vprašanja? Pošljite nam povratne informacije",
  DocsEditPageLink: "Uredi to stran v Jaenu",
  TocHeading: "Kazalo vsebine",
  DocsBreadcrumbArticles: "Članki",
  DocsMenuSectionArticles: "Članki bloga",
  DocsMenuSectionRecipes: "Razvoj receptov",
  DocsMenuRecipes: "Recepti",
  DocsMenuSectionMore: "Več",
  DocsMenuHome: "Glavna stran",
  PageDirectorySectionNavigation: "Navigacija",
  ServicesHeading: "Uresničimo v tednih,<br/> <span style='color:var(--chakra-colors-brand-500)'>ne v mesecih.</span>",
  ServicesCardConsultingImageAlt: "Svetovanje",
  ServicesCardDevelopmentImageAlt: "Razvoj",
  BlogHeading: "Zgodbe iz naših projektov<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  BlogAllLink: "Oglejte si vse teme",
  BlogReadMore: "Preberite več",
  OpenHeading: "Vračamo tisto, kar nas nosi<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  OpenSourceTitle: "Odprta koda",
  OpenSourceText: "Jaen, sistem CMS, na katerem teče ta stran, je odprtokoden, qtamp in njegov pogon za preobleke qtWasabi pa sta pod licenco MIT. Kdor želi vedeti, kako je kaj zgrajeno, lahko izvorno kodo prebere sam.",
  OpenKnowledgeTitle: "Odprto znanje",
  OpenKnowledgeText: "V naši dokumentaciji objavljamo, kar smo se naučili, od poglavij o kvantnem računalništvu iz projekta PhotonQ do zapiskov o Linuxu in RPM ter varnostnih analiz. Naš repozitorij RPM ob tem ponuja popravljene pakete, ki so pri tem nastali. colorpedia.org, naš priročnik za poimenovane barve, je prav tako prosto dostopen, brez računa in brez sledenja.",
  OpenCommunityTitle: "Skupnost v regiji",
  OpenCommunityText: "Netsnek je srebrni sponzor Kärntner Linuxtaga in pomaga, da linuxovi dnevi pridejo na Koroško. Redno se udeležujemo tudi srečanja Linux-Stammtisch.",
  OpenDocsLink: "Preberite dokumentacijo",
  OpenTuxImageAlt: "Tux z grbom Koroške, logotip prireditve Carinthian Linuxday",
  AssociatesHeading: "Za vas razvijamo v Avstriji.",
  AssociatesAustriaImageAlt: "Avstrija",
  AssociatesNetworkLink: "Strokovnjaki iz naše mreže",
  ContactHeading: "Zaupajte nam<br> svojo idejo<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ContactDetails: "<b>E-pošta</b><br> <a href=\"mailto:office@netsnek.com\">office@netsnek.com</a><br> <br> <b>Telefon</b><br> <a href=\"tel:+43 650 834 88 11\">+43 650 834 88 11</a><br> <br> <span style=\"font-weight: 700;\">Ali nas raje obiščete?</span><br> Löwengasse 14 / Lokal 2<br> 1030, Dunaj<br> Avstrija",
  ContactSubmitButton: "Kontaktirajte nas",
  ContactProjectsLink: "Pustite se navdihniti",
  FooterLinkImprint: "Impresum",
  FooterCopyright: "Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.",
  AppLayoutFooterCopyright: "Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved.",
  SiteDescription: "Zaupajte nam svojo idejo ali nas obiščite na Dunaju. Za vas razvijamo v Avstriji: spletne aplikacije, rešitve SaaS in e-trgovino po meri.",
  PageTitleHome: "Netsnek | Programska oprema in varnost",
  PageDescriptionHome: "Zaupajte nam svojo idejo ali nas obiščite na Dunaju. Za vas razvijamo v Avstriji: spletne aplikacije, rešitve SaaS in e-trgovino po meri.",
  PageTitleDocs: "Dokumentacija | Netsnek",
  PageDescriptionDocs: "Navodila, reference in poglobljeno znanje o izdelkih in ogrodjih Netsnek.",
  PageTitleProducts: "Izdelki | Netsnek",
  PageDescriptionProducts: "Naši izdelki in rešitve za splet, SaaS in e-trgovino.",
  PageTitleImprint: "Impresum | Netsnek",
  PageDescriptionImprint: "Impresum in razkritje podatkov podjetja Netsnek e.U. na Dunaju v Avstriji.",
  PageTitlePrivacyPolicy: "Izjava o varstvu podatkov | Netsnek",
  PageDescriptionPrivacyPolicy: "Kako Netsnek obdeluje, shranjuje in varuje osebne podatke.",
  PageTitleTermsOfService: "Pogoji uporabe | Netsnek",
  PageDescriptionTermsOfService: "Pogoji uporabe spletnih mest in storitev Netsnek.",
  PageTitleNotFound: "Stran ni bila najdena | Netsnek",
  PageDescriptionNotFound: "Ta stran ne obstaja.",
  MapsUnavailableTitle: "Google Zemljevidi niso na voljo",
  MapsUnavailableText: "Za prikaz Google Zemljevidov omogočite piškotke.",
  MapsEnableCookiesAction: "Omogoči analitične piškotke",
  HeadingAnchorLabel: "Povezava do {title}",
  DocsIndexUntitledPage: "Preberi stran",
  CodeResultNotRunYet: "Še ni zagnano",
  CodePlaygroundPreviewHeader: "Predogled kode",
  CodePlaygroundEditorHeader: "Koda za urejanje",
  CodePlaygroundPlaceholderCode: "To je igrišče za kodo",
  ThemeLight: "Svetla",
  ThemeDark: "Temna",
  ThemeSystem: "Sistemska",
  EditableSubmitAriaLabel: "Shrani",
  EditableCancelAriaLabel: "Prekliči",
  EditableEditAriaLabel: "Uredi",
  LanguageSwitcherLabel: "Jezik"
};

export const messagesIt: MessageCatalog = {
  HeroShowcasePreview: 'Prototipo',
  HeroShowcaseCode: 'Open Source',
  HeroTitle: "INNOVATIVI. EFFICACI.",
  HeroSubtitle: "Sviluppo software professionale.",
  HeroText: "La vostra agenzia software in Austria. Vi aiutiamo a realizzare soluzioni software su misura.",
  HeroButtonContact: "Contatti",
  HeroButtonProjects: "Scopri i progetti",
  LogoHeadingIdea: "La vostra idea.",
  LogoHeadingKnowHow: "Il nostro know-how.",
  NavHome: "Home",
  NavDocs: "Documentazione",
  NavSignIn: "Accedi",
  NavSignUp: "Registrati",
  AltNavServices: "I nostri servizi",
  AltNavDocs: "Documentazione",
  AltNavPortfolio: "Il nostro portfolio",
  AltNavBlog: "Blog",
  AltNavFollowUs: "Seguici su",
  AltNavRequestNow: "Richiedi ora",
  AltNavOfficeHeading: "Nel cuore di Vienna",
  AltNavOfficeHeadquarters: "Sede centrale",
  AltNavOfficeCityCountry: "1030 Vienna, Austria",
  FooterLinksTitle: "Link",
  FooterPartnerTitle: "Partner",
  FooterDesignedByTitle: "Progettato da",
  ServicesCardConsultingTitle: "Consulenza",
  ServicesCardConsultingText: "Vi affianchiamo in tutte le questioni legate alla digitalizzazione.",
  ServicesCardDevelopmentTitle: "Sviluppo",
  ServicesCardDevelopmentText: "Sviluppiamo soluzioni software personalizzate per la vostra azienda.",
  ServiceDetailsHeading1: "Sosteniamo<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>la vostra azienda</span><br/>\n  nell'era digitale<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsHeading2: "Risolviamo<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>i vostri problemi</span><br/>\n  all'occorrenza anche con i computer quantistici<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ServiceDetailsItemUxTitle: "Progettazione UX",
  ServiceDetailsItemUxText: "Grazie all'impiego di moderni metodi UX progettiamo interfacce intuitive e facili da usare.",
  ServiceDetailsItemWebTitle: "Web development",
  ServiceDetailsItemWebText: "Creiamo siti web e applicazioni web moderni, perfettamente su misura per le vostre esigenze individuali.",
  ServiceDetailsItemBackendTitle: "Backend development",
  ServiceDetailsItemBackendText: "Le nostre soluzioni backend su misura vengono calibrate specificamente sulle vostre esigenze e si basano sul framework Pylon.",
  ServiceDetailsItemCmsTitle: "Content management",
  ServiceDetailsItemCmsText: "Con Jaen come content management system vi diamo la possibilità di gestire il vostro sito web in piena autonomia.",
  ContactModalHeading: "Contattateci",
  ContactModalIntro: "Saremo lieti di ricevere il vostro messaggio e vi risponderemo il prima possibile.",
  ContactModalFirstNameLabel: "Nome",
  ContactModalFirstNamePlaceholder: "Mario",
  ContactModalLastNameLabel: "Cognome",
  ContactModalLastNamePlaceholder: "Rossi",
  ContactModalEmailLabel: "E-mail",
  ContactModalEmailPlaceholder: "mario.rossi@example.com",
  ContactModalPhoneLabel: "Numero di telefono",
  ContactModalPhonePlaceholder: "+43 123 456 789",
  ContactModalMessageLabel: "Come possiamo aiutarvi?",
  ContactModalMessagePlaceholder: "Messaggio",
  ContactModalTerms: "Acconsento alla memorizzazione dei miei dati per essere ricontattato e per eventuali richieste di chiarimento.",
  ContactModalTermsRequired: "Si prega di accettare le condizioni per essere ricontattati",
  ContactModalSubmit: "Invia",
  ContactToastErrorTitle: "Errore",
  ContactToastErrorDescription: "Si è verificato un errore.",
  ContactToastSuccessTitle: "Successo",
  ContactToastSuccessDescription: "Il vostro messaggio è stato inviato correttamente.",
  MailConfirmSubject: "La tua richiesta su netsnek.com",
  MailConfirmTitle: "La tua richiesta",
  MailConfirmHeading: "Richiesta di contatto",
  MailConfirmThanks: "Grazie per avermi contattato. Ti rispondo appena possibile.",
  MailConfirmLabelName: "Nome e cognome:",
  MailConfirmLabelEmail: "E-mail:",
  MailConfirmLabelPhone: "Telefono:",
  MailConfirmLabelMessage: "Messaggio:",
  MailConfirmQuestions: "Hai altre domande? Scrivimi pure a {mail} o chiamami al {phone}.",
  MailConfirmRights: "Tutti i diritti riservati. © {year} Netsnek",
  MailConfirmWebsite: "Sito web",
  MailConfirmImprint: "Note legali",
  NotFoundTitle: "Pagina non trovata",
  NotFoundText: "Questa pagina non esiste.",
  NotFoundBackHome: "Torna alla homepage",
  SearchInputPlaceholder: "Cerca",
  SearchModalPlaceholder: "Cerca",
  SearchButtonLabel: "Cerca",
  SearchResultGotoArticle: "Vai all'articolo",
  SearchResultGotoRecipe: "Vai alla ricetta",
  SearchResultGotoPage: "Vai alla pagina",
  ProductAvailable: "Disponibile",
  ProductNotAvailable: "Al momento non disponibile",
  ProductNameDefault: "Nome prodotto",
  ProductArticleNumberLabel: "Codice articolo:",
  ProductAddToCart: "Aggiungi al carrello",
  ProductShare: "Condividi",
  ProductShareCopied: "(Copiato!)",
  ProductImageSectionLabel: "Contenuto",
  ProductImageAlt: "Immagine del prodotto",
  ProductCardNoImage: "Nessuna immagine",
  ProductCardBadgeNew: "Nuovo",
  DocsFeedbackLink: "Domande? Inviateci il vostro feedback",
  DocsEditPageLink: "Modifica questa pagina su Jaen",
  TocHeading: "Indice dei contenuti",
  DocsBreadcrumbArticles: "Articoli",
  DocsMenuSectionArticles: "Articoli del blog",
  DocsMenuSectionRecipes: "Sviluppo delle ricette",
  DocsMenuRecipes: "Ricette",
  DocsMenuSectionMore: "Altro",
  DocsMenuHome: "Pagina principale",
  PageDirectorySectionNavigation: "Navigazione",
  ServicesHeading: "Realizziamo in settimane,<br/> <span style='color:var(--chakra-colors-brand-500)'>non in mesi.</span>",
  ServicesCardConsultingImageAlt: "Consulenza",
  ServicesCardDevelopmentImageAlt: "Sviluppo",
  BlogHeading: "Storie dai nostri progetti<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  BlogAllLink: "Vedi tutti gli argomenti",
  BlogReadMore: "Continua a leggere",
  OpenHeading: "Restituiamo ciò che ci sostiene<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  OpenSourceTitle: "Codice aperto",
  OpenSourceText: "Jaen, il CMS su cui gira questo sito, è open source, e qtamp insieme al suo motore di skin qtWasabi è rilasciato con licenza MIT. Chi vuole sapere come è fatta una cosa può leggerne direttamente il codice.",
  OpenKnowledgeTitle: "Conoscenza aperta",
  OpenKnowledgeText: "Nella nostra documentazione pubblichiamo ciò che abbiamo imparato, dai capitoli sul calcolo quantistico nati con PhotonQ alle note su Linux e RPM fino alle analisi di sicurezza. Il nostro repository RPM mette a disposizione i pacchetti con le patch nati da quel lavoro. Anche colorpedia.org, il nostro repertorio dei colori con nome, è liberamente accessibile, senza account e senza tracciamento.",
  OpenCommunityTitle: "Comunità sul territorio",
  OpenCommunityText: "Netsnek è sponsor argento del Kärntner Linuxtag e contribuisce a portare le giornate Linux in Carinzia. Al Linux-Stammtisch ci trovate regolarmente.",
  OpenDocsLink: "Vai alla documentazione",
  OpenTuxImageAlt: "Tux con lo stemma della Carinzia, il logo del Carinthian Linuxday",
  AssociatesHeading: "Sviluppiamo per voi in Austria.",
  AssociatesAustriaImageAlt: "Austria",
  AssociatesNetworkLink: "Gli esperti della nostra rete",
  ContactHeading: "Raccontateci<br> la vostra idea<span style='color:var(--chakra-colors-brand-500)'>.</span>",
  ContactDetails: "<b>E-mail</b><br> <a href=\"mailto:office@netsnek.com\">office@netsnek.com</a><br> <br> <b>Telefono</b><br> <a href=\"tel:+43 650 834 88 11\">+43 650 834 88 11</a><br> <br> <span style=\"font-weight: 700;\">Oppure venite a trovarci?</span><br> Löwengasse 14 / Lokal 2<br> 1030, Vienna<br> Austria",
  ContactSubmitButton: "Contattateci",
  ContactProjectsLink: "Lasciatevi ispirare",
  FooterLinkImprint: "Note legali",
  FooterCopyright: "Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.",
  AppLayoutFooterCopyright: "Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved.",
  SiteDescription: "Raccontateci la vostra idea o venite a trovarci a Vienna: sviluppiamo in Austria soluzioni software su misura, web app professionali, SaaS ed e-commerce.",
  PageTitleHome: "Netsnek | Software e sicurezza",
  PageDescriptionHome: "Raccontateci la vostra idea o venite a trovarci a Vienna: sviluppiamo in Austria soluzioni software su misura, web app professionali, SaaS ed e-commerce.",
  PageTitleDocs: "Documentazione | Netsnek",
  PageDescriptionDocs: "Guide, riferimenti tecnici e approfondimenti sui prodotti e sui framework di Netsnek.",
  PageTitleProducts: "Prodotti | Netsnek",
  PageDescriptionProducts: "I nostri prodotti e le nostre soluzioni per web, SaaS ed e-commerce.",
  PageTitleImprint: "Note legali | Netsnek",
  PageDescriptionImprint: "Note legali e informazioni societarie di Netsnek e.U. a Vienna, Austria.",
  PageTitlePrivacyPolicy: "Informativa sulla privacy | Netsnek",
  PageDescriptionPrivacyPolicy: "Come Netsnek tratta, conserva e protegge i dati personali.",
  PageTitleTermsOfService: "Condizioni d'uso | Netsnek",
  PageDescriptionTermsOfService: "Le condizioni d'uso dei siti web e dei servizi di Netsnek.",
  PageTitleNotFound: "Pagina non trovata | Netsnek",
  PageDescriptionNotFound: "Questa pagina non esiste.",
  MapsUnavailableTitle: "Google Maps non è disponibile",
  MapsUnavailableText: "Attiva i cookie per visualizzare Google Maps.",
  MapsEnableCookiesAction: "Attiva i cookie di analisi",
  HeadingAnchorLabel: "Link a {title}",
  DocsIndexUntitledPage: "Leggi la pagina",
  CodeResultNotRunYet: "Non ancora eseguito",
  CodePlaygroundPreviewHeader: "Anteprima del codice",
  CodePlaygroundEditorHeader: "Codice modificabile",
  CodePlaygroundPlaceholderCode: "Questo è un playground di codice",
  ThemeLight: "Chiaro",
  ThemeDark: "Scuro",
  ThemeSystem: "Sistema",
  EditableSubmitAriaLabel: "Salva",
  EditableCancelAriaLabel: "Annulla",
  EditableEditAriaLabel: "Modifica",
  LanguageSwitcherLabel: "Lingua"
};

export const messagesJa: MessageCatalog = {
  HeroShowcasePreview: 'プロトタイプ',
  HeroShowcaseCode: 'オープンソース',
  HeroTitle: "革新的に。効果的に。",
  HeroSubtitle: "プロフェッショナルなソフトウェア開発。",
  HeroText: "オーストリアのソフトウェアエージェンシー。お客様に最適なオーダーメイドのソフトウェアソリューションをご提供します。",
  HeroButtonContact: "お問い合わせ",
  HeroButtonProjects: "プロジェクトを見る",
  LogoHeadingIdea: "あなたのアイデア。",
  LogoHeadingKnowHow: "私たちのノウハウ。",
  NavHome: "ホーム",
  NavDocs: "ドキュメント",
  NavSignIn: "ログイン",
  NavSignUp: "新規登録",
  AltNavServices: "サービス",
  AltNavDocs: "ドキュメント",
  AltNavPortfolio: "制作実績",
  AltNavBlog: "ブログ",
  AltNavFollowUs: "フォローはこちら",
  AltNavRequestNow: "今すぐお問い合わせ",
  AltNavOfficeHeading: "ウィーンの中心で",
  AltNavOfficeHeadquarters: "本社",
  AltNavOfficeCityCountry: "オーストリア ウィーン 1030",
  FooterLinksTitle: "リンク",
  FooterPartnerTitle: "パートナー",
  FooterDesignedByTitle: "デザイン制作",
  ServicesCardConsultingTitle: "コンサルティング",
  ServicesCardConsultingText: "デジタル化に関するあらゆるご相談を承ります。",
  ServicesCardDevelopmentTitle: "開発",
  ServicesCardDevelopmentText: "お客様の企業に合わせた個別のソフトウェアソリューションを開発します。",
  ServiceDetailsHeading1: "デジタル時代の<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>お客様のビジネス</span><br/>\n  を私たちが支えます<span style='color:var(--chakra-colors-brand-500)'>。</span>",
  ServiceDetailsHeading2: "私たちは<br/>\n  <span style='color:var(--chakra-colors-brand-500)'>お客様の課題</span><br/>\n  を、必要とあらば量子コンピューターでも解決します<span style='color:var(--chakra-colors-brand-500)'>。</span>",
  ServiceDetailsItemUxTitle: "UX設計",
  ServiceDetailsItemUxText: "モダンなUX手法を活用し、使いやすく直感的なインターフェースをデザインします。",
  ServiceDetailsItemWebTitle: "Web開発",
  ServiceDetailsItemWebText: "お客様の個別のニーズに正確に合わせた、モダンなWebサイトとWebアプリケーションを制作します。",
  ServiceDetailsItemBackendTitle: "バックエンド開発",
  ServiceDetailsItemBackendText: "オーダーメイドのバックエンドソリューションを、フレームワークPylonをベースにお客様の要件に合わせて構築します。",
  ServiceDetailsItemCmsTitle: "コンテンツ管理",
  ServiceDetailsItemCmsText: "コンテンツ管理システムJaenにより、お客様ご自身でWebサイトを管理していただけます。",
  ContactModalHeading: "お問い合わせ",
  ContactModalIntro: "お気軽にメッセージをお送りください。できるだけ早くご返信いたします。",
  ContactModalFirstNameLabel: "名",
  ContactModalFirstNamePlaceholder: "太郎",
  ContactModalLastNameLabel: "姓",
  ContactModalLastNamePlaceholder: "山田",
  ContactModalEmailLabel: "メールアドレス",
  ContactModalEmailPlaceholder: "taro.yamada@example.com",
  ContactModalPhoneLabel: "電話番号",
  ContactModalPhonePlaceholder: "+43 123 456 789",
  ContactModalMessageLabel: "どのようなお手伝いができますか？",
  ContactModalMessagePlaceholder: "メッセージ",
  ContactModalTerms: "お問い合わせ対応および確認のご連絡のために、入力した情報が保存されることに同意します。",
  ContactModalTermsRequired: "お問い合わせに関する条件への同意をご確認ください",
  ContactModalSubmit: "送信",
  ContactToastErrorTitle: "エラー",
  ContactToastErrorDescription: "エラーが発生しました。",
  ContactToastSuccessTitle: "送信完了",
  ContactToastSuccessDescription: "メッセージが正常に送信されました。",
  MailConfirmSubject: "netsnek.com へのお問い合わせを受け付けました",
  MailConfirmTitle: "お問い合わせ",
  MailConfirmHeading: "お問い合わせを受け付けました",
  MailConfirmThanks: "お問い合わせいただき、ありがとうございます。できるだけ早くご連絡いたします。",
  MailConfirmLabelName: "お名前：",
  MailConfirmLabelEmail: "メールアドレス：",
  MailConfirmLabelPhone: "電話番号：",
  MailConfirmLabelMessage: "お問い合わせ内容：",
  MailConfirmQuestions: "ご不明な点があれば、お気軽に {mail} までメールをお送りいただくか、{phone} までお電話ください。",
  MailConfirmRights: "© {year} Netsnek All Rights Reserved.",
  MailConfirmWebsite: "ウェブサイト",
  MailConfirmImprint: "運営者情報",
  NotFoundTitle: "ページが見つかりません",
  NotFoundText: "このページは存在しません。",
  NotFoundBackHome: "トップページへ戻る",
  SearchInputPlaceholder: "検索",
  SearchModalPlaceholder: "検索",
  SearchButtonLabel: "検索",
  SearchResultGotoArticle: "記事へ",
  SearchResultGotoRecipe: "レシピへ",
  SearchResultGotoPage: "ページへ",
  ProductAvailable: "提供中",
  ProductNotAvailable: "現在ご利用いただけません",
  ProductNameDefault: "商品名",
  ProductArticleNumberLabel: "商品番号：",
  ProductAddToCart: "カートに入れる",
  ProductShare: "共有",
  ProductShareCopied: "(コピーしました)",
  ProductImageSectionLabel: "コンテンツ",
  ProductImageAlt: "製品画像",
  ProductCardNoImage: "画像なし",
  ProductCardBadgeNew: "新着",
  DocsFeedbackLink: "ご不明な点はありますか？フィードバックをお寄せください",
  DocsEditPageLink: "このページを Jaen で編集",
  TocHeading: "目次",
  DocsBreadcrumbArticles: "記事",
  DocsMenuSectionArticles: "ブログ記事",
  DocsMenuSectionRecipes: "レシピ開発",
  DocsMenuRecipes: "レシピ",
  DocsMenuSectionMore: "その他",
  DocsMenuHome: "メインページ",
  PageDirectorySectionNavigation: "ナビゲーション",
  ServicesHeading: "形にするのは数週間、<br/> <span style='color:var(--chakra-colors-brand-500)'>数か月ではありません。</span>",
  ServicesCardConsultingImageAlt: "コンサルティング",
  ServicesCardDevelopmentImageAlt: "開発",
  BlogHeading: "プロジェクトの物語<span style='color:var(--chakra-colors-brand-500)'>。</span>",
  BlogAllLink: "すべてのトピックを見る",
  BlogReadMore: "続きを読む",
  OpenHeading: "私たちを支えるものに、還元します<span style='color:var(--chakra-colors-brand-500)'>。</span>",
  OpenSourceTitle: "オープンソース",
  OpenSourceText: "このサイトが動いているCMSのJaenはオープンソースで、qtampとスキンエンジンのqtWasabiはMITライセンスです。どう作られているかを知りたい方は、ソースコードをそのまま読めます。",
  OpenKnowledgeTitle: "オープンな知識",
  OpenKnowledgeText: "ドキュメントでは、PhotonQから生まれた量子コンピューティングの章からLinuxとRPMのメモ、セキュリティの記録まで、学んだことを公開しています。RPMリポジトリでは、その過程で生まれたパッチ適用済みパッケージを提供しています。名前付きの色をまとめた colorpedia.org も、アカウント不要かつトラッキングなしで自由に利用できます。",
  OpenCommunityTitle: "地域のコミュニティ",
  OpenCommunityText: "NetsnekはKärntner Linuxtagのシルバースポンサーとして、Linuxの祭典をケルンテン州に根づかせる取り組みを支えています。Linux-Stammtischにも定期的に参加しています。",
  OpenDocsLink: "ドキュメントを見る",
  OpenTuxImageAlt: "ケルンテン州の紋章を持つTux、Carinthian Linuxdayのロゴ",
  AssociatesHeading: "お客様のためのソフトウェアを、オーストリアで開発しています。",
  AssociatesAustriaImageAlt: "オーストリア",
  AssociatesNetworkLink: "ネットワークの専門家をご紹介",
  ContactHeading: "アイデアを<br> ぜひお聞かせください<span style='color:var(--chakra-colors-brand-500)'>。</span>",
  ContactDetails: "<b>メールアドレス</b><br> <a href=\"mailto:office@netsnek.com\">office@netsnek.com</a><br> <br> <b>電話番号</b><br> <a href=\"tel:+43 650 834 88 11\">+43 650 834 88 11</a><br> <br> <span style=\"font-weight: 700;\">オフィスへお越しになりませんか？</span><br> Löwengasse 14 / Lokal 2<br> 1030 ウィーン<br> オーストリア",
  ContactSubmitButton: "お問い合わせはこちら",
  ContactProjectsLink: "制作実績からインスピレーションを",
  FooterLinkImprint: "運営者情報",
  FooterCopyright: "Copyright © 2024 Netsnek, Florian Herbert Kleber IT & Werbeagentur Nico Schett. All rights reserved.",
  AppLayoutFooterCopyright: "Copyright © 2023 Florian H. Kleber, Florian Herbert Kleber IT. All rights reserved.",
  SiteDescription: "Netsnekはオーストリアのソフトウェアエージェンシーです。アイデアをお聞かせください。ウィーンのオフィスへのご来訪も歓迎します。お客様に合わせたオーダーメイドのソフトウェアソリューションを開発し、本格的なWebアプリケーション、SaaS、Eコマースサイトの構築まで一貫して手がけます。",
  PageTitleHome: "Netsnek | ソフトウェアとセキュリティ",
  PageDescriptionHome: "Netsnekはオーストリアのソフトウェアエージェンシーです。アイデアをお聞かせください。ウィーンのオフィスへのご来訪も歓迎します。お客様に合わせたオーダーメイドのソフトウェアソリューションを開発し、本格的なWebアプリケーション、SaaS、Eコマースサイトの構築まで一貫して手がけます。",
  PageTitleDocs: "ドキュメント | Netsnek",
  PageDescriptionDocs: "Netsnekのプロダクトとフレームワークに関するガイド、リファレンス、背景知識をまとめたドキュメントです。PylonやJaenの導入から実装まで、開発に必要な情報をご覧いただけます。",
  PageTitleProducts: "製品 | Netsnek",
  PageDescriptionProducts: "Web、SaaS、Eコマースのための製品とソリューションをご紹介します。Netsnekが開発・提供するプロダクトの概要と特長をまとめました。",
  PageTitleImprint: "運営者情報 | Netsnek",
  PageDescriptionImprint: "オーストリア・ウィーンに拠点を置くNetsnek e.U.の運営者情報と法定開示事項を掲載しています。",
  PageTitlePrivacyPolicy: "プライバシーポリシー | Netsnek",
  PageDescriptionPrivacyPolicy: "Netsnekが個人データをどのように取得・処理・保存し、保護しているかをご説明します。",
  PageTitleTermsOfService: "利用規約 | Netsnek",
  PageDescriptionTermsOfService: "NetsnekのWebサイトおよびサービスをご利用いただく際の利用規約です。",
  PageTitleNotFound: "ページが見つかりません | Netsnek",
  PageDescriptionNotFound: "このページは存在しません。",
  MapsUnavailableTitle: "Google マップを表示できません",
  MapsUnavailableText: "Google マップを表示するには Cookie を有効にしてください。",
  MapsEnableCookiesAction: "分析 Cookie を有効にする",
  HeadingAnchorLabel: "{title} へのリンク",
  DocsIndexUntitledPage: "ページを読む",
  CodeResultNotRunYet: "まだ実行していません",
  CodePlaygroundPreviewHeader: "コードプレビュー",
  CodePlaygroundEditorHeader: "編集可能なコード",
  CodePlaygroundPlaceholderCode: "これはコードプレイグラウンドです",
  ThemeLight: "ライト",
  ThemeDark: "ダーク",
  ThemeSystem: "システム",
  EditableSubmitAriaLabel: "保存",
  EditableCancelAriaLabel: "キャンセル",
  EditableEditAriaLabel: "編集",
  LanguageSwitcherLabel: "言語"
};

const catalogs: Record<Locale, MessageCatalog> = {
  de: messagesDe,
  en: messagesEn,
  sl: messagesSl,
  it: messagesIt,
  ja: messagesJa
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
