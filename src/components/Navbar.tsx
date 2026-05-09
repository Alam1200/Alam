import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, Video, Shield, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-black/60 backdrop-blur-md border-white/10 py-4' 
          : 'bg-transparent border-transparent py-8'
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all">
            <Video className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-white">
            CleanFrame <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2" />
          
          {user && user.email === 'nadimalam1203@gmail.com' && (
            <Link to="/admin" className="text-[10px] font-black text-violet-400 hover:text-violet-300 tracking-widest bg-violet-600/10 px-2 py-1 rounded">ADMIN</Link>
          )}

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard">
                <button className="neon-button px-6 rounded-lg h-10 text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2 rounded-lg glass-panel hover:bg-white/10 text-slate-500 hover:text-white transition-colors shadow-sm"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="neon-button px-8 rounded-lg h-10 text-[10px] font-black uppercase tracking-widest shadow-lg">
                Log in
              </button>
            </Link>
          )}
        </nav>


        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-medium text-zinc-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-zinc-400">
                Log in
              </Button>
            </Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-white text-black rounded-full">
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
