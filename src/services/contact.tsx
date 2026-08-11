// contact.tsx
import React, { useMemo } from "react"
import { useToast } from "@chakra-ui/react"
import { sendTemplateMail } from "gatsby-jaen-emailwerk"
import { useIntl } from "react-intl"
import { useLocation } from "@reach/router"
import { ContactFormValues, ContactModal } from "../components/ContactModal/ContactModal"
import { useAuth } from "jaen"
import { useQueryRouter } from "../hooks/use-query-router"

export interface ContactModalContextProps {
  onOpen: (args?: { meta?: Record<string, any> }) => void
  onClose: () => void
}

export const ContactModalContext =
  React.createContext<ContactModalContextProps>({
    onOpen: () => {},
    onClose: () => {},
  })

export const useContactModal = () => {
  const context = React.useContext(ContactModalContext)
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider")
  }
  return context
}

export interface ContactModalDrawerProps {
  children: React.ReactNode
}

/**
 * The inline style the confirmation template gives its links.
 *
 * Email clients drop stylesheets, so it has to ride along on every anchor.
 * It lives here once because the sentence around the links is translated and
 * the word order moves with the language.
 */
const MAIL_LINK_STYLE =
  '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;' +
  'mso-line-height-rule:exactly;text-decoration:underline;' +
  'color:#5c68e2;font-size:14px;'

const mailLink = (href: string, label: string) =>
  `<a href="${href}" target="_new" style="${MAIL_LINK_STYLE}">${label}</a>`

/**
 * The confirmation mail, in the language the visitor filled the form in.
 *
 * emailwerk delivers the confirmation as a linked child of the contact
 * template and renders it server-side from the SAME values the contact send
 * carried, so the only way the sender's language reaches that mail is to send
 * the text with it. Each `t_` key matches a placeholder in the template, and
 * every placeholder there keeps the German original as its own fallback: an
 * older build that sends none of this still produces a correct German mail.
 */
const confirmationText = (intl: ReturnType<typeof useIntl>) => ({
  locale: intl.locale,
  t_subject: intl.formatMessage({
    id: 'MailConfirmSubject',
    defaultMessage: 'Ihre Anfrage auf netsnek.com',
  }),
  t_title: intl.formatMessage({
    id: 'MailConfirmTitle',
    defaultMessage: 'Ihre Anfrage',
  }),
  t_heading: intl.formatMessage({
    id: 'MailConfirmHeading',
    defaultMessage: 'Kontaktanfrage',
  }),
  t_thanks: intl.formatMessage({
    id: 'MailConfirmThanks',
    defaultMessage:
      'Vielen Dank für deine Kontaktanfrage. Ich melde mich so schnell wie möglich bei dir.',
  }),
  t_labelName: intl.formatMessage({
    id: 'MailConfirmLabelName',
    defaultMessage: 'Name:',
  }),
  t_labelEmail: intl.formatMessage({
    id: 'MailConfirmLabelEmail',
    defaultMessage: 'E-Mail:',
  }),
  t_labelPhone: intl.formatMessage({
    id: 'MailConfirmLabelPhone',
    defaultMessage: 'Telefonnummer:',
  }),
  t_labelMessage: intl.formatMessage({
    id: 'MailConfirmLabelMessage',
    defaultMessage: 'Nachricht:',
  }),
  // The only string that carries markup. The template renders it raw, so the
  // two links are built here rather than left as bare text.
  t_questions: intl.formatMessage(
    {
      id: 'MailConfirmQuestions',
      defaultMessage:
        'Hast du noch Fragen? Dann schick mir gerne eine E-Mail an {mail} oder rufe mich unter {phone} an.',
    },
    {
      mail: mailLink('mailto:office@netsnek.com', 'office@netsnek.com'),
      phone: mailLink('tel:+436508248811', '+43 650 824 88 11'),
    },
  ),
  t_rights: intl.formatMessage(
    {
      id: 'MailConfirmRights',
      defaultMessage: 'Alle Rechte vorbehalten. © {year} Netsnek',
    },
    // The year belongs inside the string, not around it: English and Japanese
    // both put the symbol first, and only the string knows its own order.
    { year: String(new Date().getFullYear()) },
  ),
  t_website: intl.formatMessage({
    id: 'MailConfirmWebsite',
    defaultMessage: 'Webseite',
  }),
  t_imprint: intl.formatMessage({
    id: 'MailConfirmImprint',
    defaultMessage: 'Impressum',
  }),
})

export const ContactModalProvider: React.FC<ContactModalDrawerProps> = ({ children }) => {
  // Use the current location from @reach/router.
  const location = useLocation()
  const { isCalled, paramValue } = useQueryRouter(location, "contact")

  const [meta, setMeta] = React.useState<Record<string, any> | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  // When the query parameter is present, open the modal.
  React.useEffect(() => {
    if (isCalled) {
      setIsOpen(true)
    }
  }, [isCalled])

  const toast = useToast()
  const intl = useIntl()
  const authentication = useAuth()

  const onOpen: ContactModalContextProps["onOpen"] = (args) => {
    const updatedMeta = {
      ...meta,
      url: window.location.href,
      ...args?.meta,
    }
    setMeta(updatedMeta)
    setIsOpen(true)
  }

  const onClose = () => {
    // Remove the "contact" query parameter from the URL without reloading the page.
    const url = new URL(window.location.href)
    url.searchParams.delete("contact")
    window.history.replaceState({}, '', url.toString())

    setIsOpen(false)
  }

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    const values = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      invokedOnUrl: meta?.url,
      ...confirmationText(intl),
    }

    // "Contact" template on emailwerk.com. One send, for visitors and logged-in
    // users alike: the template is flagged isPublic, so this posts anonymously
    // when there is no CMS session and emailwerk takes the public branch.
    //
    // Recipients come from the template's stored envelope (office@netsnek.com)
    // server-side and cannot be passed from here at all. The requester's own
    // address goes into replyTo, which is also what the server delivers the
    // linked "Contact Confirmation" child template to, exactly as mailpress
    // delivered linked templates. Sending that confirmation explicitly would
    // deliver it twice, so it is deliberately not sent here.
    const result = await sendTemplateMail('cmsmguuxh0038rb2pgsrpzhur', {
      envelope: {
        replyTo: data.email,
      },
      values,
    })

    if (!result.ok) {
      toast({
        title: intl.formatMessage({
          id: "ContactToastErrorTitle",
          defaultMessage: "Fehler",
        }),
        description: intl.formatMessage({
          id: "ContactToastErrorDescription",
          defaultMessage: "Es ist ein Fehler aufgetreten.",
        }),
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: intl.formatMessage({
          id: "ContactToastSuccessTitle",
          defaultMessage: "Erfolg",
        }),
        description: intl.formatMessage({
          id: "ContactToastSuccessDescription",
          defaultMessage: "Ihre Nachricht wurde erfolgreich versendet.",
        }),
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      onClose()
    }
  }

  const fixedValues = useMemo(() => {
    if (!authentication.user) {
      return undefined
    }
    return {
      firstName: authentication.user.profile?.given_name,
      lastName: authentication.user.profile?.family_name,
      email: authentication.user.profile?.email,
    }
  }, [authentication.user])

  const defaultValues = useMemo(() => {
    if (!isCalled) {
      return undefined
    }
    return {
      message: paramValue,
    }
  }, [isCalled, paramValue])

  return (
    <ContactModalContext.Provider value={{ onOpen, onClose }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fixedValues={fixedValues}
        defaultValues={defaultValues}
      />
    </ContactModalContext.Provider>
  )
}
