import Wrapper from '@/components/common/container-wrapper';
import { Navbar } from '@/components/common/navbar';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
