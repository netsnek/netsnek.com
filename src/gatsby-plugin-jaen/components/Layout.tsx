import { LayoutProps } from 'jaen';
import { useLocation } from '@reach/router';
import { FaFlask } from '@react-icons/all-files/fa/FaFlask';
import { CMSManagement, useJaenFrameMenuContext } from 'gatsby-plugin-jaen';
import { useEffect } from 'react';
import AppLayout from '../../components/AppLayout';
import Footer from '../../components/sections/Footer';
import { usePageLocale } from '../../contexts/locale';
import { ContactModalProvider } from '../../services/contact';
import { stripLocalePrefix } from '../../utils/navigation';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;
  const { prefix } = usePageLocale();

  const docsPaths = ['/docs'];

  const jaenFrame = useJaenFrameMenuContext();

  // useEffect(() => {
  //   jaenFrame.extendAddMenu({
  //     experimentNew: {
  //       label: 'New experiment',
  //       icon: FaFlask,
  //       path: '/new/experiment'
  //     }
  //   });
  // }, []);

  // Docs pages of prefixed locales live under /<locale>/docs, so the
  // locale prefix has to go before the docs paths can match.
  const canonicalPath = stripLocalePrefix(path, prefix);
  const isDocs = docsPaths.some(docsPath => canonicalPath.startsWith(docsPath));

  if (path.startsWith('/admin')) {
    return children;
  }

  return (
    <CMSManagement>
      <ContactModalProvider location={{ pathname: path, search: '' }}>
        <AppLayout footer={Footer} isDocs={isDocs} path={path}>
          {children}
        </AppLayout>
      </ContactModalProvider>
    </CMSManagement>
  );
};

export default Layout;
