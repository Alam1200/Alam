import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Video, Lock, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Auth() {
  const { user, signInWithGoogle } = useAuth();

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 overflow-hidden relative">
      <div className="radial-bg" />
      <div className="radial-bg-2" />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-1 border border-white/10 rounded-[3rem] bg-black/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="p-10">
          <div className="flex justify-center mb-12">
            <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
              <Video className="text-white w-10 h-10" />
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-black uppercase tracking-tight mb-4">Initialize Access</h1>
            <p className="text-slate-500 font-medium tracking-wide leading-relaxed">
              Unlock the most advanced AI video processing engine in the industry.
            </p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={signInWithGoogle}
              className="w-full neon-button h-16 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-4 group"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>
            
            <div className="relative my-10">
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-white/5" />
               <div className="relative flex justify-center"><span className="bg-black/20 px-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">Enterprise Protocol</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl glass-panel bg-transparent border-white/5 flex flex-col items-center gap-3">
                  <Lock className="text-slate-500 w-5 h-5" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">AES-256 Bit</span>
               </div>
               <div className="p-5 rounded-2xl glass-panel bg-transparent border-white/5 flex flex-col items-center gap-3">
                  <Shield className="text-slate-500 w-5 h-5" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">Verified ID</span>
               </div>
            </div>
          </div>

          <p className="mt-12 text-center text-[9px] font-black uppercase tracking-widest text-slate-600 px-8 leading-relaxed">
            Continuance indicates acceptance of <span className="text-slate-400">Terms</span> and <span className="text-slate-400">Privacy</span> parameters.
          </p>
        </div>
      </motion.div>
    </div>

  );
}
