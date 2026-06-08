import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ExploreCTA from './components/ExploreCTA';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductsPage from './pages/products/ProductsPage';
import DownloadApp from './pages/DownloadApp';
import AgentLogin from './pages/AgentLogin';
import OurProducts from './pages/OurProducts';
import PartnerLeads from './pages/PartnerLeads';
import ServiceEnquiries from './pages/ServiceEnquiries';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [productCategory, setProductCategory] = useState('banking');

  const navigate = (page, category) => {
    setCurrentPage(page);
    if (category) setProductCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage === 'home') return <Home navigate={navigate} />;
    if (currentPage === 'about') return <AboutUs navigate={navigate} />;
    if (currentPage === 'our-products') return <OurProducts navigate={navigate} />;
    if (currentPage === 'products') return <ProductsPage category={productCategory} setCategory={setProductCategory} navigate={navigate} />;
    if (currentPage === 'download') return <DownloadApp navigate={navigate} />;
    if (currentPage === 'login') return <AgentLogin navigate={navigate} />;
    if (currentPage === 'partner-leads') return <PartnerLeads navigate={navigate} />;
    if (currentPage === 'service-enquiries') return <ServiceEnquiries navigate={navigate} />;
    return <Home navigate={navigate} />;
  };

  return (
    <>
      <Navbar currentPage={currentPage} navigate={navigate} />
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'partner-leads' && currentPage !== 'service-enquiries' && (
        <>
          <ExploreCTA navigate={navigate} />
          <Footer navigate={navigate} />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}