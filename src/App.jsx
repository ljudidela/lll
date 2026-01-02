import { useState } from 'react';
import ReactPlayer from 'react-player';
import { X, Map as MapIcon, List, Video, Radio } from 'lucide-react';
import Map from './components/Map';
import CameraList from './components/CameraList';
import { cameras } from './data/cameras';

export default function App() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [viewMode, setViewMode] = useState('both'); // 'map', 'list', 'both'

  return (
    <div className="flex flex-col h-screen bg-la-dark overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/90 backdrop-blur-md z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <Radio className="text-red-500 animate-pulse" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            LA Live Cams
          </h1>
        </div>
        
        <div className="flex md:hidden bg-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            <List size={20} />
          </button>
          <button 
            onClick={() => setViewMode('map')} 
            className={`p-2 rounded ${viewMode === 'map' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            <MapIcon size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar List */}
        <div className={`
          w-full md:w-[400px] bg-slate-900 border-r border-slate-800 overflow-y-auto custom-scrollbar
          ${viewMode === 'map' ? 'hidden md:block' : 'block'}
        `}>
          <div className="p-4">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4">Available Cameras</h2>
            <CameraList 
              cameras={cameras} 
              onSelect={setSelectedCamera} 
              selectedId={selectedCamera?.id} 
            />
          </div>
        </div>

        {/* Map Area */}
        <div className={`
          flex-1 relative
          ${viewMode === 'list' ? 'hidden md:block' : 'block'}
        `}>
          <Map 
            cameras={cameras} 
            onSelect={setSelectedCamera}
            selectedCamera={selectedCamera}
          />
        </div>
      </div>

      {/* Video Modal/Overlay */}
      {selectedCamera && (
        <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Video className="text-blue-400" size={20} />
                  {selectedCamera.title}
                </h2>
                <p className="text-slate-400 text-sm">{selectedCamera.location}</p>
              </div>
              <button 
                onClick={() => setSelectedCamera(null)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-black relative">
              <ReactPlayer 
                url={selectedCamera.url} 
                width="100%" 
                height="100%" 
                playing={true}
                controls={true}
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}