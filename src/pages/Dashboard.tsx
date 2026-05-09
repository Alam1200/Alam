import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Plus, 
  Search, 
  Grid, 
  List as ListIcon, 
  MoreVertical, 
  Video, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileVideo,
  ArrowUpRight,
  Filter,
  Trash2,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'projects'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projs);
    });

    return () => unsubscribe();
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" />;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name}...`);

    try {
      // In a real app, upload to storage
      await new Promise(r => setTimeout(r, 2000));

      await addDoc(collection(db, 'projects'), {
        userId: user.uid,
        title: file.name,
        originalVideoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
        status: 'pending',
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success('Video uploaded successfully', { id: toastId });
    } catch (error) {
      toast.error('Upload failed', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen px-6 lg:px-12 bg-background relative overflow-hidden">
      <div className="radial-bg" />
      <div className="radial-bg-2" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Projects</h1>
            <p className="text-slate-500 font-medium tracking-wide">Manage and cleanup your video assets.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex glass-panel p-1 rounded-xl">
                <button 
                  onClick={() => setView('grid')}
                  className={cn("p-2 rounded-lg transition-all", view === 'grid' ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" : "text-slate-500 hover:text-white")}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={cn("p-2 rounded-lg transition-all", view === 'list' ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" : "text-slate-500 hover:text-white")}
                >
                  <ListIcon size={18} />
                </button>
             </div>
             <label className="cursor-pointer">
               <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} disabled={isUploading} />
               <button className="neon-button px-6 rounded-xl h-12 text-sm font-black uppercase tracking-widest flex items-center gap-2">
                 <Plus size={20} /> New Project
               </button>
             </label>
          </div>
        </header>

        {/* Filters & Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
           <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="SEARCH PROJECTS BY NAME..." 
                className="w-full glass-panel bg-black/20 border-white/5 py-3 pl-11 pr-4 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-600"
              />
           </div>
           <button className="glass-panel px-6 h-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
             <Filter size={18} /> Filters
           </button>
        </div>

        {/* Projects Grid/List */}
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 glass-panel border-dashed bg-black/20"
          >
            <div className="w-20 h-20 bg-slate-900 glass-panel rounded-2xl flex items-center justify-center mb-8">
              <Video className="text-slate-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-3">No projects found</h3>
            <p className="text-slate-500 mb-10 max-w-sm text-center font-medium">Start by uploading a video to automatically remove subtitles or watermarks.</p>
            <label className="cursor-pointer">
               <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} />
               <button className="neon-button px-10 rounded-full h-14 text-sm font-black uppercase tracking-widest">
                 Upload Your First Video
               </button>
            </label>
          </motion.div>
        ) : (
          <div className={cn(
            view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "flex flex-col gap-4"
          )}>
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} view={view} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>

  );
}

const ProjectCard: React.FC<{ project: any, view: 'grid' | 'list' }> = ({ project, view }) => {
  const statusColors = {
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    processing: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    completed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    failed: 'text-red-400 bg-red-400/10 border-red-400/20',
    uploading: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  };

  const statusIcons = {
    pending: <Clock size={14} />,
    processing: <Zap size={14} className="animate-pulse" />,
    completed: <CheckCircle2 size={14} />,
    failed: <AlertCircle size={14} />,
    uploading: <Upload size={14} className="animate-bounce" />,
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "group relative glass-panel bg-black/20 overflow-hidden hover:border-violet-500/30 transition-all",
        view === 'list' ? "flex items-center justify-between p-4" : "flex flex-col"
      )}
    >
      {view === 'list' ? (
        <>
          <Link to={`/dashboard/project/${project.id}`} className="flex items-center gap-4 flex-1">
             <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-violet-500/30 transition-all">
                <FileVideo className="text-slate-500 group-hover:text-violet-400" />
             </div>
             <div>
                <h4 className="font-bold text-sm tracking-tight uppercase group-hover:text-violet-400 transition-colors">{project.title}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {project.createdAt?.toDate ? new Date(project.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                </p>
             </div>
          </Link>
          
          <div className="flex items-center gap-6">
             <div className={cn("px-3 py-1 rounded text-[10px] uppercase font-black tracking-widest border", statusColors[project.status as keyof typeof statusColors])}>
                <span className="flex items-center gap-1.5">
                  {statusIcons[project.status as keyof typeof statusIcons]}
                  {project.status}
                </span>
             </div>
             <div className="flex items-center gap-2">
                <Link to={`/dashboard/project/${project.id}`}>
                  <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                    <ExternalLink size={18} />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-500">
                  <Trash2 size={18} />
                </Button>
             </div>
          </div>
        </>
      ) : (
        <Link to={`/dashboard/project/${project.id}`}>
          {/* Thumbnail */}
          <div className="aspect-[4/3] bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-x-3 bottom-3 z-10 flex justify-between items-center bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-lg">
               <div className={cn("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border", statusColors[project.status as keyof typeof statusColors])}>
                  <span className="flex items-center gap-1">
                    {statusIcons[project.status as keyof typeof statusIcons]}
                    {project.status}
                  </span>
               </div>
               <div className="text-[10px] text-blue-400 font-mono font-bold">
                  {project.status === 'processing' ? `${project.progress}%` : '4K HD'}
               </div>
            </div>
            <img 
              src={`https://picsum.photos/seed/${project.id}/640/480`} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="neon-button text-white font-black text-[10px] uppercase tracking-widest rounded-full h-10 px-6 flex items-center gap-2 scale-90 group-hover:scale-100 transition-all">
                 Open Project <ArrowUpRight className="w-4 h-4" />
               </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
             <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-black truncate text-slate-100 uppercase tracking-tight group-hover:text-violet-400 transition-colors">{project.title}</h4>
                <button className="text-slate-600 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); /* menu logic */ }}>
                  <MoreVertical size={16} />
                </button>
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>
                    {project.createdAt?.toDate ? new Date(project.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                  </span>
                </div>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <span className="text-blue-500/60">12.4 MB</span>
             </div>
          </div>
        </Link>
      )}
    </motion.div>
  );
}


