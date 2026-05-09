import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, Shield, Zap, Sparkles, Layers, Wand2, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Home() {
  return (
    <div className="bg-background relative overflow-hidden">
      <div className="radial-bg" />
      <div className="radial-bg-2" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-center mb-10">
               <span className="glass-panel px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-violet-400 bg-violet-600/5 border-violet-500/20">
                 Next-gen Frame Reconstruction
               </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              <span className="block italic">Remove</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-indigo-400">Subtitles</span>
            </h1>

            <div className="max-w-2xl mx-auto">
               <p className="text-lg md:text-xl text-slate-400 font-medium tracking-wide mb-12 leading-relaxed">
                 Clean hardcoded captions, and watermarks from videos in seconds. 
                 Our advanced AI inpainting restores frames with surgical accuracy.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link to="/dashboard">
                   <button className="neon-button px-10 rounded-xl h-16 text-sm font-black uppercase tracking-widest flex items-center gap-3">
                     Start Engine <ArrowRight className="w-5 h-5" />
                   </button>
                 </Link>
                 <button className="glass-panel px-10 rounded-xl h-16 text-sm font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-3">
                   <Play className="w-5 h-5 fill-current" /> Watch Demo
                 </button>
               </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <div className="mt-32 border-t border-white/10 pt-16">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12">Powering global creators at</p>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 invert hover:opacity-80 transition-all duration-700 hover:grayscale-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube" className="h-6" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_2022_logo.svg" alt="Instagram" className="h-8" />
               <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" className="h-8" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Netflix_2015_logo.svg" alt="Netflix" className="h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
               {[
                  { value: '400k+', label: 'Videos Cleaned', color: 'text-violet-500' },
                  { value: '99.9%', label: 'AI Accuracy', color: 'text-blue-500' },
                  { value: '< 2s', label: 'Detection Speed', color: 'text-emerald-500' },
               ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                     <span className={cn("text-6xl font-black italic tracking-tighter mb-2", stat.color)}>{stat.value}</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{stat.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24 text-center">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Engine Capabilities</h2>
             <div className="h-1.5 w-24 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Wand2 className="w-6 h-6 text-violet-400" />,
                title: 'AI Inpainting',
                tag: 'CORE ENGINE',
                description: 'Our deep learning models intelligently fill in missing areas by analyzing surrounding pixels and temporal data across frames.'
              },
              {
                icon: <Zap className="w-6 h-6 text-blue-400" />,
                title: 'Instant Detection',
                tag: 'AUTO-SCAN',
                description: 'Automatically identify text regions, logos, and hardcoded captions without manual selection using OCR and Computer Vision.'
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: 'High Resolution',
                tag: '8K READY',
                description: 'Process videos up to 8K resolution while maintaining original quality, frame rates, and color profiles.'
              },
              {
                icon: <Layers className="w-6 h-6 text-indigo-400" />,
                title: 'Batch Processing',
                tag: 'ENTERPRISE',
                description: 'Clean dozens of videos simultaneously. Perfect for localized content and large archives of legacy media.'
              },
              {
                icon: <Sparkles className="w-6 h-6 text-pink-400" />,
                title: 'Motion Tracking',
                tag: 'LOCK-FOCUSED',
                description: 'Smart tracking ensures that even when the camera moves, the reconstruction remains perfectly locked to the region.'
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-yellow-400" />,
                title: 'Live Preview',
                tag: 'REAL-TIME',
                description: 'Our revolutionary rendering engine allows you to see the cleaned result before committing to a full export.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 glass-panel bg-black/10 hover:bg-black/30 transition-all group border-white/5 hover:border-violet-500/30"
              >
                <div className="flex justify-between items-start mb-8">
                   <div className="p-4 rounded-xl glass-panel bg-black/40 text-white group-hover:scale-110 transition-transform">
                     {feature.icon}
                   </div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 border border-white/5 px-2 py-1 rounded">{feature.tag}</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-violet-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed tracking-wide group-hover:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto relative overflow-hidden p-16 md:p-32 rounded-[4rem] text-center glass-panel bg-gradient-to-br from-violet-900/40 via-background to-blue-900/40 border-white/10 shadow-3xl">
           <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 leading-none">Ready to Clear <br /><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">The Frame?</span></h2>
              <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto font-medium tracking-wide">
                Join thousands of editors, content creators, and businesses saving hours on video cleanup with CleanFrame AI.
              </p>
              <Link to="/dashboard">
                <button className="neon-button px-12 rounded-2xl h-20 text-lg font-black uppercase tracking-[0.2em] shadow-2xl">
                  Get Started Free
                </button>
              </Link>
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                 <CheckCircle2 size={12} className="text-emerald-500" /> No credit card required for standard cleanup
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-20">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                  <Video className="text-white w-6 h-6" />
               </div>
               <span className="text-xl font-black uppercase tracking-tighter">CleanFrame AI</span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium leading-relaxed tracking-wide mb-8">
               The worlds most advanced AI video processing engine. Restore your vision, frame by frame.
            </p>
            <div className="flex gap-4">
               {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-lg glass-panel hover:bg-white/10 cursor-pointer transition-colors" />)}
            </div>
          </div>
          
          {[
            { title: 'Product', links: ['Features', 'Enterprise', 'API Docs', 'Benchmarking'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Ethics', 'Contact'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'License', 'Security'] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-10">{col.title}</h4>
              <ul className="space-y-6">
                {col.links.map((link, j) => (
                  <li key={j} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-violet-400 cursor-pointer transition-colors">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">© 2026 CleanFrame AI Systems. All rights reserved.</p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
             <span className="hover:text-white cursor-pointer transition-colors">Twitter // X</span>
             <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
          </div>
        </div>
      </footer>
    </div>

  );
}
