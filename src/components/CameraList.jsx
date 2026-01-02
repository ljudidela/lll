import { Play } from 'lucide-react';

export default function CameraList({ cameras, onSelect, selectedId }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 pb-24 md:pb-4">
      {cameras.map((cam) => (
        <div 
          key={cam.id} 
          onClick={() => onSelect(cam)}
          className={`
            group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300
            border border-slate-700 hover:border-blue-400
            ${selectedId === cam.id ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-800'}
          `}
        >
          <div className="aspect-video relative overflow-hidden">
            <img 
              src={cam.thumbnail} 
              alt={cam.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors">
                {cam.title}
              </h3>
              <p className="text-slate-300 text-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                {cam.location}
              </p>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}