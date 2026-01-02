import { useState } from 'react';
import { cameras } from './data/cameras';
import MapComponent from './components/Map';
import CameraList from './components/CameraList';
import ReactPlayer from 'react-player/lazy';
import { Map as MapIcon, List, X, Video, Camera } from 'lucide-react';

export default function App() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'map', 'list', 'both' (desktop)

  const handleCameraSelect = (cam) => {
    setSelectedCamera(cam);
  };

  return (
    <div className="flex h-screen w-screen bg-la-dark overflow-hidden relative">
      
      {/* Sidebar (List) */}
      <div className={`
        absolute md:relative z-20 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'w-full md:w-80 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:-translate-x-full'}
      `}>
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/95 backdrop-blur">
          <div className="flex items-center gap-2">
            <Camera className="text-la-accent" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              LA Cams
            </h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="md:hidden p-2 hover:bg-slate-800 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <CameraList 
          cameras={cameras} 
          onSelect={handleCameraSelect} 
          selectedId={selectedCamera?.id} 
        />
      </div>

      {/* Main Content (Map) */}
      <div className="flex-1 relative h-full">
        {/* Mobile Toggle & Header Overlay */}
        {!isSidebarOpen && (
          <div className="absolute top-4 left-4 z-[1000]">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-slate-900/90 text-white p-3 rounded-xl shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <List size={20} />
              <span className="font-medium">Cameras</span>
            </button>
          </div>
        )}

        <MapComponent 
          cameras={cameras} 
          onSelect={handleCameraSelect}
          selectedCamera={selectedCamera}
        />

        {/* Video Player Modal/Overlay */}
        {selectedCamera && (
          <div className="absolute bottom-0 left-0 right-0 z-[1001] p-4 md:p-6 pointer-events-none flex justify-center items-end md:items-center h-auto md:h-full md:bg-black/60 md:backdrop-blur-sm">
            <div className="bg-slate-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-700 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
              
              {/* Player Header */}
              <div className="flex items-center justify-between p-3 bg-black/40 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-white shadow-sm">LIVE</span>
                  <span className="text-sm text-slate-200 ml-2">{selectedCamera.title}</span>
                </div>
                <button 
                  onClick={() => setSelectedCamera(null)}
                  className="bg-black/50 hover:bg-white/20 p-1.5 rounded-full text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Player Wrapper */}
              <div className="aspect-video bg-black relative">
                <ReactPlayer
                  url={selectedCamera.url}
                  width="100%"
                  height="100%"
                  playing={true}
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1, autoplay: 1 }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}