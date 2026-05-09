import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { Auth } from './pages/Auth';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/project/:projectId" element={<Editor />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}
