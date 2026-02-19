import React from 'react';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Dự án thực tế</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Hồ sơ năng lực thông qua các công trình đã triển khai. Chúng tôi minh bạch về thông số và kết quả xử lý sự cố.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> {project.industry}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {project.location}
                  </span>
                  <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                    {project.kva}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-8">{project.title}</h2>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vấn đề ban đầu</h4>
                    <p className="text-slate-600 leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Giải pháp triển khai</h4>
                    <p className="text-slate-600 leading-relaxed">{project.solution}</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Kết quả vận hành
                    </h4>
                    <p className="text-emerald-900 font-medium leading-relaxed">{project.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
