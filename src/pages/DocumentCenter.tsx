import React from 'react';
import { FileText, Download, Search, Lock, CheckCircle2, Table, FileCode, ShieldCheck } from 'lucide-react';
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
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Trung tâm tài liệu kỹ thuật</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Tải xuống Catalogue, Datasheet, Bản vẽ CAD và các tiêu chuẩn kỹ thuật mới nhất từ IPS.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-200 pb-6">
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
                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
                activeTab === tab.id ? "bg-slate-900 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-100"
              )}
            >
              <tab.icon className="h-4 w-4" /> {tab.name}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all shadow-sm group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {doc.type === 'drawing' ? <FileCode className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded">{doc.file_format}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{doc.title}</h3>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">{doc.category_name} | {doc.power_range}</div>
              
              <button
                onClick={() => handleDownload(doc)}
                className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" /> Tải xuống tài liệu
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl relative overflow-hidden">
            <button onClick={() => setShowGate(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
              <Search className="h-6 w-6 rotate-45" />
            </button>
            
            {leadStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Xác nhận thành công!</h3>
                <p className="text-slate-600">Tài liệu đang được tải xuống...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                    <Lock className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Tải xuống tài liệu</h3>
                  <p className="text-sm text-slate-500">Vui lòng để lại thông tin để nhận link tải trực tiếp và hỗ trợ kỹ thuật nếu cần.</p>
                </div>
                <form onSubmit={onLeadSubmit} className="space-y-4">
                  <input required name="company" type="text" placeholder="Tên công ty / Đơn vị" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500" />
                  <input required name="email" type="email" placeholder="Email nhận tài liệu" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500" />
                  <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
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
