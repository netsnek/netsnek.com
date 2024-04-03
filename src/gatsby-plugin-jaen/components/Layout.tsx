import { LayoutProps } from '@atsnek/jaen';
import AppLayout from "../../liba/AppLayout";
import { useLocation } from '@reach/router';
import { CMSManagement} from 'gatsby-plugin-jaen';
import { ContactModalProvider } from "../../liba/services/contact";

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  const blogPaths = ['/blog'];
  const productPaths = ['/product'];


  // if (path.startsWith('/admin') || path === '/') {
  //   return children;
  // }

  return (
    <CMSManagement>
      <ContactModalProvider location={{ pathname: path, search: "" }}>
        <AppLayout
          isBlog={blogPaths.some(blogPaths => path.startsWith(blogPaths))}
          isProduct={productPaths.some(productPaths => path.startsWith(productPaths))}
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