import React from 'react';
import { FileText, Download, Lock, CheckCircle2, Table, FileCode, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function DocumentCenter() {
  const [docs, setDocs] = React.useState<any[]>([]);
  const [activeTab, setActiveTab] = React.useState('all');
  const [showGate, setShowGate] = React.useState<any>(null); // Store doc to download
  const [leadStatus, setLeadStatus] = React.useState<'idle' | 'success'>('idle');

  React.useEffect(() => {
    fetch('/api/documents').then(res => res.json()).then(setDocs);
  }, []);

  const filteredDocs = docs.filter(d => activeTab === 'all' || d.type === activeTab);

  const handleDownload = (doc: any) => {
    setShowGate(doc);
  };

  const onLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      type: 'download',
      company_name: formData.get('company'),
      email: formData.get('email'),
      document_id: showGate.id
    };

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      setLeadStatus('success');
      setTimeout(() => {
        window.open(showGate.file_url, '_blank');
        setShowGate(null);
        setLeadStatus('idle');
      }, 1500);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Trung tâm tài liệu kỹ thuật</h1>
          <p className="text-lg text-slate-600 max-w-3xl font-medium">
            Tải xuống Catalogue, Datasheet, Bản vẽ CAD và các tiêu chuẩn kỹ thuật mới nhất từ IPS. Tài liệu chuyên sâu dành cho kỹ sư thiết kế và vận hành.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-200 pb-8">
          {[
            { id: 'all', name: 'Tất cả tài liệu', icon: FileText },
            { id: 'catalogue', name: 'Catalogue', icon: FileText },
            { id: 'datasheet', name: 'Datasheet', icon: Table },
            { id: 'drawing', name: 'Bản vẽ CAD/PDF', icon: FileCode },
            { id: 'standard', name: 'Tiêu chuẩn', icon: ShieldCheck },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                activeTab === tab.id ? "bg-primary text-white shadow-xl" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              )}
            >
              <tab.icon className="h-4 w-4" /> {tab.name}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-accent hover:shadow-2xl transition-all shadow-sm group">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-orange-50 group-hover:text-accent transition-colors">
                  {doc.type === 'drawing' ? <FileCode className="h-8 w-8" /> : <FileText className="h-8 w-8" />}
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{doc.file_format}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">{doc.title}</h3>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-8">{doc.category_name} | {doc.power_range}</div>
              
              <button
                onClick={() => handleDownload(doc)}
                className="w-full py-4 bg-slate-950 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-3"
              >
                <Download className="h-4 w-4" /> Tải xuống tài liệu
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden border border-white/10">
            <button onClick={() => setShowGate(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
              <X className="h-6 w-6" />
            </button>
            
            {leadStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-orange-50 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Xác nhận thành công!</h3>
                <p className="text-slate-500 font-medium">Tài liệu đang được tải xuống máy tính của bạn...</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-8">
                    <Lock className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Tải xuống tài liệu</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Vui lòng để lại thông tin để nhận link tải trực tiếp và hỗ trợ kỹ thuật từ đội ngũ kỹ sư IPS.</p>
                </div>
                <form onSubmit={onLeadSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên công ty / Đơn vị</label>
                    <input required name="company" type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email nhận tài liệu</label>
                    <input required name="email" type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-bold" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-accent text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl shadow-orange-900/20 mt-6">
                    Xác nhận & Tải xuống
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
