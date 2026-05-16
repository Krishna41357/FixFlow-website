import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BotExplanation from './pages/BotExplanation';
import Walkthrough from './pages/Walkthrough';
import Docs from './pages/Docs';
import Integrations from './pages/Integrations';
import EarlyAccess from './pages/EarlyAccess';

function App() {
  const [isDark, setIsDark] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="flex-1 w-full relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bot" element={<BotExplanation />} />
          <Route path="/walkthrough" element={<Walkthrough />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/early-access" element={<EarlyAccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
