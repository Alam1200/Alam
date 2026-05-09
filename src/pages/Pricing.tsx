import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Star, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for quick individual cleanup.',
      features: [
        '5 AI Cleanup credits/mo',
        'Up to 720p HD exports',
        'Standard processing queue',
        'Storage for 24 hours',
        'Basic AI Watermark remover'
      ],
      buttonText: 'Start for Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '29' : '24',
      description: 'For professional creators and small studios.',
      features: [
        '100 AI Cleanup credits/mo',
        'Up to 4K Ultra HD exports',
        'Priority processing queue',
        'Permanent cloud storage',
        'Advanced frame reconstruction',
        'Batch processing (Up to 10 vids)'
      ],
      buttonText: 'Get Pro Access',
      highlight: true
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? '99' : '79',
      description: 'Scale your content machine with total power.',
      features: [
        'Unlimited AI credits',
        '8K support & Raw export',
        'Instant processing queue',
        'API & Webhook access',
        'Full Admin management',
        'Team collaboration features',
        'Whitelabel branding'
      ],
      buttonText: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black px-6 lg:px-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-16"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            Simple, Transparent <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Power Pricing</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-8">
             <div className="bg-zinc-900 border border-white/10 p-1 rounded-2xl flex items-center relative">
                <button 
                  onClick={() => setBillingCycle('monthly')}
                  className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all z-10", billingCycle === 'monthly' ? "text-black" : "text-zinc-500")}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setBillingCycle('yearly')}
                  className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all z-10", billingCycle === 'yearly' ? "text-black" : "text-zinc-500")}
                >
                  Yearly
                </button>
                <div 
                  className={cn(
                    "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl transition-all duration-300 shadow-xl",
                    billingCycle === 'yearly' ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                  )} 
                />
             </div>
             {billingCycle === 'yearly' && (
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest animate-pulse">Save 20%</span>
             )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative group p-1 rounded-[2.5rem] transition-all duration-500",
                plan.highlight ? "bg-gradient-to-b from-purple-500/50 to-blue-500/50 scale-105 z-10 shadow-2xl shadow-purple-500/20" : "bg-white/5 hover:bg-white/10"
              )}
            >
              <div className="bg-zinc-950 h-full w-full rounded-[2.3rem] p-8 sm:p-10 flex flex-col">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">{plan.name}</h3>
                    {plan.highlight && <Sparkles className="text-purple-400 w-5 h-5" />}
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold tracking-tight text-white">${plan.price}</span>
                    <span className="text-zinc-500 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <p className="text-zinc-400 text-sm">{plan.description}</p>
                </div>

                <div className="flex-1 space-y-4 mb-10 text-left">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="bg-white/10 p-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={cn(
                    "w-full h-14 rounded-2xl font-bold text-lg transition-all",
                    plan.highlight ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10"
                  )}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Footnote */}
        <div className="mt-24 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/5 pt-12">
           <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="text-purple-400 w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Secure Payments</span>
           </div>
           <div className="flex flex-col items-center gap-3">
              <Star className="text-yellow-400 w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Cancel Anytime</span>
           </div>
           <div className="flex flex-col items-center gap-3">
              <Globe className="text-blue-400 w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Global API</span>
           </div>
           <div className="flex flex-col items-center gap-3">
              <Zap className="text-emerald-400 w-6 h-6" />
              <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Express Queue</span>
           </div>
        </div>
      </div>
    </div>
  );
}
