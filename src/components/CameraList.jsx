import { Play } from 'lucide-react';

export default function CameraList({ cameras, onSelect, selectedId }) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 pb-24">
      {cameras.map((cam) => (
        <div 
          key={cam.id} 
          onClick={() => onSelect(cam)}
          className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 border border-slate-700 hover:border-la-accent ${
            selectedId === cam.id ? 'ring-2 ring-la-accent ring-offset-2 ring-offset-slate-900' : ''
          }`}
        >
          {/* Thumbnail */}
          <div className="aspect-video w-full relative">
            <img 
              src={cam.thumbnail} 
              alt={cam.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
               <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={20} className="fill-white text-white ml-1" />
               </div>
            </div>
          </div>
          
          {/* Info */}
          <div className="p-3 bg-slate-800">
            <h3 className="font-semibold text-white truncate">{cam.title}</h3>
            <p className="text-xs text-slate-400">{cam.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}