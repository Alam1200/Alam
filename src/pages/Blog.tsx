import { motion } from 'motion/react';
import { Search, ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Blog() {
  const posts = [
    {
      title: 'How to Remove Subtitles From Videos Using AI in 2026',
      slug: 'how-to-remove-subtitles',
      excerpt: 'Struggling with hardcoded captions? Our new frame reconstruction technology makes it easier than ever to clean your footage.',
      category: 'Tutorial',
      author: 'AI Review',
      date: 'May 12, 2026',
      readTime: '5 min read',
      image: 'https://picsum.photos/seed/blog1/800/600'
    },
    {
      title: 'The Rise of AI Frame Reconstruction in Modern Cinema',
      slug: 'ai-frame-reconstruction-cinema',
      excerpt: 'Cinematographers are adopting AI inpainting tools to restore legacy archives and fix production errors on the fly.',
      category: 'Insights',
      author: 'CleanFrame Lab',
      date: 'May 10, 2026',
      readTime: '8 min read',
      image: 'https://picsum.photos/seed/blog2/800/600'
    },
    {
      title: 'Removing TikTok & Reels Text: A Creators Guide',
      slug: 'remove-tiktok-text-guide',
      excerpt: 'Reposting content to other platforms? Learn how to automatically remove platform-specific overlays while preserving pixels.',
      category: 'Strategy',
      author: 'Content Guru',
      date: 'May 08, 2026',
      readTime: '6 min read',
      image: 'https://picsum.photos/seed/blog3/800/600'
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl sm:text-7xl font-bold tracking-tight mb-8"
           >
             The <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Frame Lab</span> Blog
           </motion.h1>
           <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              Everything you need to know about AI video processing, 
              cinematic restoration, and cutting-edge creator tools.
           </p>

           <div className="mt-12 max-w-xl mx-auto relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="Search articles, guides, tutorials..." 
                className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-5 pl-14 pr-6 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
              />
           </div>
        </header>

        {/* Featured Post */}
        <div className="mb-24 px-1 group">
           <Link to={`/blog/${posts[0].slug}`} className="relative block h-[500px] rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900 hover:border-blue-500/30 transition-all duration-500">
             <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
             <div className="absolute inset-0 p-12 flex flex-col justify-end max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest">{posts[0].category}</span>
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <Clock size={16} /> <span>{posts[0].readTime}</span>
                  </div>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white group-hover:text-blue-400 transition-colors leading-tight">{posts[0].title}</h2>
                <p className="text-zinc-400 text-lg line-clamp-2 mb-8">{posts[0].excerpt}</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-zinc-800" />
                   <span className="text-white font-bold">{posts[0].author}</span>
                </div>
             </div>
           </Link>
        </div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {posts.slice(1).map((post) => (
             <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-8 border border-white/5 bg-zinc-900 relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{post.category}</span>
                     <span className="text-zinc-600 font-bold">•</span>
                     <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{post.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-zinc-500 text-lg line-clamp-3 mb-8 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                     <span className="text-zinc-400 font-bold text-sm">{post.author}</span>
                     <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight size={18} />
                     </div>
                  </div>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
