import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Play, 
  Pause, 
  Scan, 
  Wand2, 
  Download, 
  History, 
  Settings, 
  Maximize, 
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

export function Editor() {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!projectId) return;
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchProject();
  }, [projectId]);

  const handleProcess = async () => {
    if (!projectId) return;
    setIsProcessing(true);
    const toastId = toast.loading('AI is reconstructing frames...');

    try {
      // Simulate backend AI processing
      await new Promise(r => setTimeout(r, 4000));
      
      await updateDoc(doc(db, 'projects', projectId), {
        status: 'completed',
        progress: 100,
        processedVideoUrl: project.originalVideoUrl, // Mock
        updatedAt: serverTimestamp(),
      });
      
      setProject((prev: any) => ({ ...prev, status: 'completed', progress: 100 }));
      toast.success('Video cleaned successfully!', { id: toastId });
    } catch (error) {
      toast.error('AI processing failed. Try again.', { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!project) return <div className="pt-32 text-center">Loading project...</div>;

  return (
    <div className="pt-20 h-screen flex flex-col bg-background overflow-hidden relative">
      <div className="radial-bg" />
      <div className="radial-bg-2" />
      {/* Editor Header */}
      <div className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold tracking-tight uppercase">Project: <span className="text-slate-400 font-medium lowercase italic">{project.title}</span></h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-600/20 text-violet-400 uppercase tracking-[0.2em]">
              {project.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="ghost" size="sm" className="text-slate-400 text-[10px] uppercase font-bold tracking-wider hover:bg-white/5 gap-2">
             <History size={14} /> History
           </Button>
           <Button variant="ghost" size="sm" className="text-slate-400 text-[10px] uppercase font-bold tracking-wider hover:bg-white/5 gap-2">
             <Settings size={14} /> Config
           </Button>
           <div className="w-px h-6 bg-white/10 mx-2" />
           <button 
             onClick={handleProcess}
             disabled={isProcessing || project.status === 'completed'}
             className="neon-button px-6 rounded-lg h-9 text-[10px] uppercase font-black tracking-widest flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
           >
             {isProcessing ? <Zap size={14} className="animate-spin" /> : <Wand2 size={14} />}
             Auto-detect & Remove
           </button>
           <button className="glass-panel px-6 rounded-lg h-9 text-[10px] uppercase font-black tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2">
             <Download size={14} /> 4K Export
           </button>
        </div>
      </div>

      {/* Main Board */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Sidebar - Tools */}
        <div className="w-72 glass-panel flex flex-col overflow-hidden">
           <div className="p-4 border-b border-white/10">
              <h3 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">AI Toolshelf</h3>
           </div>
           
           <div className="p-4 flex-1 overflow-y-auto space-y-6">
              <div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="sidebar-item active rounded-xl border-l-4">
                       <div className="flex flex-col items-center gap-3 p-2">
                          <Scan size={24} className="text-white" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Detect</span>
                       </div>
                    </div>
                    <div className="sidebar-item rounded-xl hover:bg-white/5">
                       <div className="flex flex-col items-center gap-3 p-2 text-slate-400">
                          <Maximize size={24} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Logo</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Engine Features</h3>
                 <div className="space-y-2">
                    {[
                      { icon: <Sparkles size={14} />, label: 'Auto-Subtitle Detection', active: true, desc: 'Scans frames for hardcoded text overlays.' },
                      { icon: <Layers size={14} />, label: 'Temporal Smoothing', active: true, desc: 'Stabilizes fills across time.' },
                      { icon: <Zap size={14} />, label: 'Logo Removal Pro', active: false, desc: 'Removes corner logos using cloning.' },
                    ].map((tool, i) => (
                      <div key={i} className="group p-4 rounded-xl glass-panel bg-transparent hover:bg-white/5 transition-colors cursor-pointer border-transparent hover:border-white/10">
                         <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-white">
                               {tool.icon} {tool.label}
                            </div>
                            <div className={cn("w-2 h-2 rounded-full", tool.active ? "bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "bg-slate-800")} />
                         </div>
                         <p className="text-[9px] text-slate-500 leading-relaxed group-hover:text-slate-400">{tool.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-black uppercase tracking-widest">Tasks in Queue</span>
                 <span className="text-[10px] font-mono text-slate-500">2 ITEMS</span>
              </div>
              <div className="flex items-center gap-3 p-3 glass-panel bg-transparent">
                 <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center text-violet-400 text-[10px] font-bold">01</div>
                 <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                       <span className="text-[9px] font-black uppercase tracking-widest">Processing</span>
                       <span className="text-[9px] font-mono text-blue-400 animate-pulse">82%</span>
                    </div>
                    <div className="h-0.5 bg-slate-800 w-full rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[82%]" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Video Canvas Area */}
        <div className="flex-1 flex flex-col gap-4 relative">
          <div className="flex-1 glass-panel overflow-hidden relative group shadow-2xl flex items-center justify-center bg-black/40">
             <video 
               ref={videoRef}
               src={project.originalVideoUrl}
               className="max-w-[90%] max-h-[90%] object-contain rounded-lg border border-white/5 shadow-2xl"
               onTimeUpdate={() => setProgress((videoRef.current?.currentTime || 0) / (videoRef.current?.duration || 1) * 100)}
             />
             
             {/* Subtitle Detection Simulation Box */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: isProcessing ? 1 : 0 }}
               className="absolute bottom-12 left-1/2 -translate-x-1/2 w-2/3 h-16 border-2 border-dashed border-blue-500/50 bg-blue-500/10 backdrop-blur-xl rounded-lg flex items-center justify-center pointer-events-none"
             >
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">AI Region #01: Detection</span>
                </div>
             </motion.div>

             <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Timeline and other controls persist here but with new styling */}
                <div className="flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-6">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:scale-110 transition-transform">
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                      </button>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Time Elapsed</span>
                        <span className="text-xs font-mono text-blue-400">00:04 / 00:12</span>
                      </div>
                   </div>
                      <Maximize size={20} className="text-slate-400 hover:text-white cursor-pointer" />
                </div>
             </div>
          </div>

          {/* Timeline Panel */}
          <div className="h-24 glass-panel p-4 flex flex-col justify-between">
             <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">Inpainting Timeline</span>
                <span className="text-[10px] text-blue-400 font-mono tracking-wider">FRAME {Math.floor(progress * 24)} / 240</span>
             </div>
             <div className="relative h-1 w-full bg-slate-800/50 rounded-full cursor-pointer">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6] cursor-grab active:cursor-grabbing"
                  style={{ left: `${progress}%`, marginLeft: '-4px' }}
                />
             </div>
             <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <span>00:00:00:00</span>
                <div className="flex gap-1.5 items-end h-3">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className={cn("w-px bg-slate-800", i % 4 === 0 ? "h-3 bg-slate-600" : "h-1.5")} />
                   ))}
                </div>
                <span>00:00:12:00</span>
             </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <aside className="w-80 flex flex-col gap-6">
          <div className="glass-panel flex-1 flex flex-col overflow-hidden">
             <div className="p-4 border-b border-white/10">
                <h3 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em]">Object Properties</h3>
             </div>
             
             <div className="p-6 space-y-8">
                <div className="p-4 rounded-xl bg-violet-600/5 border border-violet-500/10 italic text-[10px] text-slate-500 text-center leading-relaxed">
                   Select a detected region on the canvas to refine AI Fill reconstruction parameters.
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Reconstruction Settings</h4>
                  
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-500">
                           <span>Threshold</span>
                           <span className="text-blue-400 font-mono">82%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full w-4/5 bg-violet-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-500">
                           <span>Sharpness</span>
                           <span className="text-slate-300">ULTRA</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full w-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-500">
                           <span>Refinement</span>
                           <span className="text-slate-300">3-PASS</span>
                        </div>
                        <div className="flex gap-1">
                           {[1, 2, 3, 4, 5].map(v => (
                             <div key={v} className={cn("h-1 flex-1 rounded-full", v <= 3 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-slate-800")} />
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="glass-panel p-5 bg-gradient-to-br from-violet-900/20 to-slate-900/20 border-violet-500/20">
             <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-white">Batch Processing</h3>
             <p className="text-[10px] text-slate-500 leading-relaxed">
                Add this project to your render queue to process multiple clips simultaneously using GPU acceleration.
             </p>
             <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
                Queue Project
             </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
