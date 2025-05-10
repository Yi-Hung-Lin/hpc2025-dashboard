import { useEffect, useState } from 'react';
import { logs } from '../data/logs-data';
import LogCard from '../components/ProjectCard';
import { useDynamicBackground } from '../hooks/useDynamicBackground'

export default function LogPage() {
  const [mounted, setMounted] = useState(false);
  const { backgroundElement } = useDynamicBackground()

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full px-4 py-12 bg-black text-white font-zen">
      {backgroundElement}

      <div className="z-10 relative max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#f9f6f1]">HPC Logs Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {logs.map((log, i) => (
            <LogCard
              key={i}
              title={log.name}
              description={log.latest}
              tags={[log.title]}
              link={''}
              repo={log.github || ''}
              progress={log.progress}
              fullLog={log.fullLog}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
