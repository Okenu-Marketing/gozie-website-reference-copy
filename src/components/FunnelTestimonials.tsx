import { Play, Star } from "lucide-react";

export default function FunnelTestimonials() {
  return (
    <div className="max-w-3xl mx-auto mt-16 space-y-8">
      {/* Large Testimonial (Frank) */}
      <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-neutral-900 rounded-[24px] overflow-hidden relative shadow-2xl border-2 border-neutral-800 group cursor-pointer">
        {/* Placeholder background, will be replaced with real video or thumbnail later */}
        <div 
          className="absolute inset-0 opacity-60 mix-blend-overlay"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-yellow-500/90 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-yellow-400 group-hover:scale-110 transition-all">
            <Play className="w-10 h-10 text-neutral-950 ml-1 fill-current" />
          </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <p className="text-xl font-bold text-white mb-3">
            <span className="bg-yellow-600/80 px-2 py-1 rounded">Yeah, I just wanted to give a quick</span><br/>
            <span className="bg-yellow-600/80 px-2 py-1 rounded inline-block mt-1">shout out to Gozie.</span>
          </p>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
          </div>
          <p className="text-white font-bold">Frank</p>
        </div>
      </div>

      {/* Two Small Testimonials Side-by-Side */}
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Testimonial 2 (Ryan) */}
        <div className="w-full aspect-[9/16] bg-neutral-900 rounded-[24px] overflow-hidden relative shadow-xl border-2 border-neutral-800 group cursor-pointer">
          <div 
            className="absolute inset-0 opacity-60 mix-blend-overlay"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-yellow-500/90 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-yellow-400 group-hover:scale-110 transition-all">
              <Play className="w-6 h-6 text-neutral-950 ml-1 fill-current" />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <p className="text-sm font-bold text-white mb-2">
              <span className="bg-yellow-600/80 px-1.5 py-0.5 rounded">Into their platform</span>
            </p>
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
            </div>
            <p className="text-white font-bold text-sm">Ryan</p>
          </div>
        </div>

        {/* Testimonial 3 (Manny) */}
        <div className="w-full aspect-[9/16] bg-neutral-900 rounded-[24px] overflow-hidden relative shadow-xl border-2 border-neutral-800 group cursor-pointer">
          <div 
            className="absolute inset-0 opacity-60 mix-blend-overlay"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-yellow-500/90 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-yellow-400 group-hover:scale-110 transition-all">
              <Play className="w-6 h-6 text-neutral-950 ml-1 fill-current" />
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
            <p className="text-sm font-bold text-white mb-2">
              <span className="bg-yellow-600/80 px-1.5 py-0.5 rounded">We were instantly getting</span><br/>
              <span className="bg-yellow-600/80 px-1.5 py-0.5 rounded inline-block mt-0.5">new calls</span>
            </p>
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
            </div>
            <p className="text-white font-bold text-sm">Manny</p>
          </div>
        </div>
      </div>
    </div>
  );
}
