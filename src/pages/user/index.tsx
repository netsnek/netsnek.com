import { PageConfig, PageProps } from '@atsnek/jaen';
import UserProfileContent from '../../contents/UserProfileContent';

const Page: React.FC<PageProps> = () => {
  return <UserProfileContent />;
};

export default Page;

export const pageConfig: PageConfig = {
  label: 'User'
};