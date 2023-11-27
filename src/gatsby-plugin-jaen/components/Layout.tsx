import { LayoutProps } from '@atsnek/jaen';
import AppLayout from "../../components/shared/containers/AppLayout";
import { useLocation } from '@reach/router';
import { CMSManagement} from 'gatsby-plugin-jaen';

const Layout: React.FC<LayoutProps> = ({ children, pageProps }) => {
  const path = useLocation().pathname;
  const hiddenTopNavPaths = ['/profile', '/blog-post'];

  const docsPaths = ['/blog'];


  if (path.startsWith('/admin') || path === '/') {
    return children;
  }

  return (
    <CMSManagement>
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
    </CMSManagement>
  );
};

export default Layout;