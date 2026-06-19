import { Header } from '../components/ui/Header';
import { Footer } from '../components/ui/Footer';

export const PageLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
