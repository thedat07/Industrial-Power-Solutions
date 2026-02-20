import React, { useMemo, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type PowerInputs = {
  voltage: number;
  current: number;
  cosPhi: number;
  loadType: 'motor' | 'heater' | 'mixed';
};

type DropInputs = {
  voltage: number;
  current: number;
  length: number;
  wireSize: number;
};

export function Calculators() {
  const [type, setType] = useState<'power' | 'voltage-drop'>('power');

  const [powerInputs, setPowerInputs] = useState<PowerInputs>({
    voltage: 380,
    current: 20,
    cosPhi: 0.85,
    loadType: 'motor'
  });

  const [dropInputs, setDropInputs] = useState<DropInputs>({
    voltage: 380,
    current: 20,
    length: 50,
    wireSize: 6
  });

  const powerResult = useMemo(() => {
    if (type !== 'power') return null;
    const { voltage: v, current: i, cosPhi: cos, loadType } = powerInputs;

    const kva = (Math.sqrt(3) * v * i) / 1000;
    const kw = kva * cos;
    const safetyFactor = loadType === 'motor' ? 2 : 1.5;
    const recommended = Math.ceil((kva * safetyFactor) / 5) * 5;

    return {
      kva: kva.toFixed(2),
      kw: kw.toFixed(2),
      recommended,
      explanation:
        loadType === 'motor'
          ? 'Tải motor có dòng khởi động lớn (3-5 lần dòng định mức), cần dự phòng công suất gấp 2 lần.'
          : 'Tải hỗn hợp nên dự phòng tối thiểu 50% công suất để đảm bảo độ bền thiết bị.'
    };
  }, [type, powerInputs]);

  const dropResult = useMemo(() => {
    if (type !== 'voltage-drop') return null;
    const { voltage, current, length, wireSize } = dropInputs;

    const drop = (0.0175 * length * current) / wireSize;
    const percent = (drop / voltage) * 100;

    return {
      drop: drop.toFixed(2),
      percent: percent.toFixed(2),
      status: percent > 5 ? 'Nguy hiểm' : 'An toàn',
      recommendation:
        percent > 5
          ? 'Cần tăng tiết diện dây dẫn hoặc lắp ổn áp bù áp tại đầu tải.'
          : 'Độ sụt áp nằm trong phạm vi cho phép.'
    };
  }, [type, dropInputs]);

  const result = type === 'power' ? powerResult : dropResult;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Công cụ tính toán kỹ thuật</h1>
        <p className="text-slate-500">Tính nhanh công suất & sụt áp điện</p>
      </div>

      <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
        <Tab active={type === 'power'} onClick={() => setType('power')}>Công suất</Tab>
        <Tab active={type === 'voltage-drop'} onClick={() => setType('voltage-drop')}>Sụt áp</Tab>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {type === 'power' ? (
          <PowerForm inputs={powerInputs} setInputs={setPowerInputs} />
        ) : (
          <DropForm inputs={dropInputs} setInputs={setDropInputs} />
        )}

        <ResultPanel type={type} result={result} />
      </div>
    </div>
  );
}

function Tab({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("flex-1 py-3 text-sm font-bold rounded-lg", active ? "bg-white text-accent shadow" : "text-slate-500")}>{children}</button>
  );
}

function PowerForm({ inputs, setInputs }: { inputs: PowerInputs, setInputs: React.Dispatch<React.SetStateAction<PowerInputs>> }) {
  return (
    <div className="space-y-4">
      <NumberInput label="Điện áp (V)" value={inputs.voltage} onChange={v => setInputs(s => ({ ...s, voltage: v }))} />
      <NumberInput label="Dòng điện (A)" value={inputs.current} onChange={v => setInputs(s => ({ ...s, current: v }))} />
      <NumberInput label="Cosφ" value={inputs.cosPhi} onChange={v => setInputs(s => ({ ...s, cosPhi: v }))} />
      <select value={inputs.loadType} onChange={e => setInputs(s => ({ ...s, loadType: e.target.value as any }))} className="w-full border rounded-lg px-3 py-2">
        <option value="motor">Motor</option>
        <option value="heater">Điện trở</option>
        <option value="mixed">Hỗn hợp</option>
      </select>
    </div>
  );
}

function DropForm({ inputs, setInputs }: { inputs: DropInputs, setInputs: React.Dispatch<React.SetStateAction<DropInputs>> }) {
  return (
    <div className="space-y-4">
      <NumberInput label="Điện áp (V)" value={inputs.voltage} onChange={v => setInputs(s => ({ ...s, voltage: v }))} />
      <NumberInput label="Dòng điện (A)" value={inputs.current} onChange={v => setInputs(s => ({ ...s, current: v }))} />
      <NumberInput label="Chiều dài (m)" value={inputs.length} onChange={v => setInputs(s => ({ ...s, length: v }))} />
      <NumberInput label="Tiết diện (mm²)" value={inputs.wireSize} onChange={v => setInputs(s => ({ ...s, wireSize: v }))} />
    </div>
  );
}

function NumberInput({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-500">{label}</label>
      <input type="number" value={value} onChange={e => onChange(+e.target.value)} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function ResultPanel({ type, result }: { type: 'power' | 'voltage-drop', result: any }) {
  if (!result) return (
    <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-10 text-center">
      <Calculator className="w-10 h-10 text-slate-300 mb-3" />
      <p className="text-slate-500">Nhập dữ liệu để xem kết quả</p>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white rounded-xl p-8 space-y-4">
      {type === 'power' ? (
        <>
          <div>kVA: <b>{result.kva}</b></div>
          <div>kW: <b>{result.kw}</b></div>
          <div>Đề xuất ≥ <b>{result.recommended} kVA</b></div>
          <p className="text-slate-400 text-sm">{result.explanation}</p>
        </>
      ) : (
        <>
          <div>Sụt áp: <b>{result.drop} V</b></div>
          <div>%: <b>{result.percent}%</b></div>
          <div className={result.status === 'Nguy hiểm' ? "text-red-400" : "text-green-400"}>{result.status}</div>
          <p className="text-slate-400 text-sm">{result.recommendation}</p>
        </>
      )}
      <div className="flex gap-2 text-amber-300 text-sm pt-4 border-t border-slate-700"><Info className="w-4 h-4" />Kết quả chỉ mang tính tham khảo</div>
    </div>
  );
}
