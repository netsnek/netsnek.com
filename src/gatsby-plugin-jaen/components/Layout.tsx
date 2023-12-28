import { LayoutProps } from '@atsnek/jaen';
import AppLayout from "../../liba/AppLayout";
import { useLocation } from '@reach/router';
import { CMSManagement} from 'gatsby-plugin-jaen';
import { ContactModalProvider } from "../../liba/services/contact";

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  const docsPaths = ['/blog'];


  // if (path.startsWith('/admin') || path === '/') {
  //   return children;
  // }

  return (
    <CMSManagement>
      <ContactModalProvider location={{ pathname: path, search: "" }}>
        <AppLayout
          isBlog={docsPaths.some(docsPath => path.startsWith(docsPath))}
          isCommunity={path.startsWith('/community')}
          path={path}
          // topNavProps={{
          //   isVisible: !hiddenTopNavPaths.some(hiddenPath =>
          //     path.startsWith(hiddenPath)
          //   )
          // }}
        >
          {children}
        </AppLayout>
      </ContactModalProvider>
    </CMSManagement>
  );
};

export default Layout;