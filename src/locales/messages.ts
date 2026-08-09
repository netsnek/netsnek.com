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
 * All five catalogs are complete; the chrome components consume them
 * through react-intl (see gatsby-browser/gatsby-ssr wrapPageElement).
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

export const messagesEn: MessageCatalog = {
  HeroTitle: "INNOVATIVE. EFFECTIVE.",
  HeroSubtitle: "Professional software development.",
  HeroText: "Your software agency in Austria. We build custom software solutions tailored to your needs.",
  HeroButtonContact: "Contact",
  HeroButtonProjects: "View projects",
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
  NotFoundTitle: "Page not found",
  NotFoundText: "This page does not exist.",
  NotFoundBackHome: "Back to homepage",
  SearchInputPlaceholder: "Search",
  SearchModalPlaceholder: "Search",
  SearchButtonLabel: "Search",
  ProductAvailable: "Available",
  ProductNotAvailable: "Currently unavailable",
  DocsFeedbackLink: "Questions? Give us feedback"
};

export const messagesSl: MessageCatalog = {
  HeroTitle: "INOVATIVNO. UČINKOVITO.",
  HeroSubtitle: "Profesionalen razvoj programske opreme.",
  HeroText: "Vaša agencija za razvoj programske opreme v Avstriji. Pomagamo vam do programskih rešitev po meri.",
  HeroButtonContact: "Kontakt",
  HeroButtonProjects: "Oglejte si projekte",
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
  NotFoundTitle: "Stran ni bila najdena",
  NotFoundText: "Ta stran ne obstaja.",
  NotFoundBackHome: "Nazaj na domačo stran",
  SearchInputPlaceholder: "Iskanje",
  SearchModalPlaceholder: "Iskanje",
  SearchButtonLabel: "Iskanje",
  ProductAvailable: "Na voljo",
  ProductNotAvailable: "Trenutno ni na voljo",
  DocsFeedbackLink: "Vprašanja? Pošljite nam povratne informacije"
};

export const messagesIt: MessageCatalog = {
  HeroTitle: "INNOVATIVI. EFFICACI.",
  HeroSubtitle: "Sviluppo software professionale.",
  HeroText: "La vostra agenzia software in Austria. Vi aiutiamo a realizzare soluzioni software su misura.",
  HeroButtonContact: "Contatti",
  HeroButtonProjects: "Scopri i progetti",
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
  NotFoundTitle: "Pagina non trovata",
  NotFoundText: "Questa pagina non esiste.",
  NotFoundBackHome: "Torna alla homepage",
  SearchInputPlaceholder: "Cerca",
  SearchModalPlaceholder: "Cerca",
  SearchButtonLabel: "Cerca",
  ProductAvailable: "Disponibile",
  ProductNotAvailable: "Al momento non disponibile",
  DocsFeedbackLink: "Domande? Inviateci il vostro feedback"
};

export const messagesJa: MessageCatalog = {
  HeroTitle: "革新的に。効果的に。",
  HeroSubtitle: "プロフェッショナルなソフトウェア開発。",
  HeroText: "オーストリアのソフトウェアエージェンシー。お客様に最適なオーダーメイドのソフトウェアソリューションをご提供します。",
  HeroButtonContact: "お問い合わせ",
  HeroButtonProjects: "プロジェクトを見る",
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
  NotFoundTitle: "ページが見つかりません",
  NotFoundText: "このページは存在しません。",
  NotFoundBackHome: "トップページへ戻る",
  SearchInputPlaceholder: "検索",
  SearchModalPlaceholder: "検索",
  SearchButtonLabel: "検索",
  ProductAvailable: "提供中",
  ProductNotAvailable: "現在ご利用いただけません",
  DocsFeedbackLink: "ご不明な点はありますか？フィードバックをお寄せください"
};

const catalogs: { de: MessageCatalog } & Record<
  Exclude<Locale, 'de'>,
  PartialMessageCatalog
> = {
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
