'use client';

import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Papa from 'papaparse'; // Directly import from module array if Turbopack hangs

interface GarageUploadClientProps {
    uploadGarages: (garages: any[]) => Promise<{ success: boolean; inserted?: number; error?: string }>;
}

export default function GarageUploadClient({ uploadGarages }: GarageUploadClientProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [status, setStatus] = useState<'idle' | 'parsing' | 'ready' | 'uploading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [insertedCount, setInsertedCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        if (selected.type !== 'text/csv' && !selected.name.endsWith('.csv')) {
            setErrorMsg('Please upload a valid CSV file.');
            setStatus('error');
            return;
        }

        setFile(selected);
        setStatus('parsing');
        setErrorMsg('');

        Papa.parse(selected, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<any>) => {
                // We expect columns: Brand, Name, Address, City
                // Or similar variations. Let's strictly map them to b, n, a, c.
                const mapped = results.data.map((row: any) => ({
                    b: row['Brand'] || row['brand'] || row['Insurer'] || '',
                    n: row['Name'] || row['name'] || row['Garage Name'] || '',
                    a: row['Address'] || row['address'] || '',
                    c: row['City'] || row['city'] || ''
                })).filter((g: any) => g.n && g.c); // Must have at least name and city

                if (mapped.length === 0) {
                    setErrorMsg('No valid rows found. Please ensure your CSV has headers like: Brand, Name, Address, City.');
                    setStatus('error');
                    return;
                }

                setPreview(mapped);
                setStatus('ready');
            },
            error: (err: Error) => {
                setErrorMsg(err.message);
                setStatus('error');
            }
        });
    };

    const handleUpload = async () => {
        if (preview.length === 0) return;

        setStatus('uploading');
        const res = await uploadGarages(preview);

        if (res.success) {
            setInsertedCount(res.inserted || 0);
            setStatus('success');
            setTimeout(() => {
                window.location.reload(); // Refresh to show new data in the table
            }, 2000);
        } else {
            setErrorMsg(res.error || 'Upload failed');
            setStatus('error');
        }
    };

    const reset = () => {
        setFile(null);
        setPreview([]);
        setStatus('idle');
        setErrorMsg('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-serif font-bold text-slate-900 mb-1">Bulk Upload CSV</h2>
                    <p className="text-sm text-slate-500">Add hundreds of garages at once. Required headers: <span className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded text-xs">Name, City</span>. Optional: <span className="font-mono text-slate-700 bg-slate-100 px-1 py-0.5 rounded text-xs">Brand, Address</span></p>
                </div>
                {status === 'ready' && (
                    <button
                        onClick={reset}
                        className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {status === 'idle' || status === 'error' ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors group ${status === 'error' ? 'border-red-200 bg-red-50 hover:border-red-300' : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30'
                        }`}
                >
                    <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFile}
                    />
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${status === 'error' ? 'bg-red-100 text-red-500' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                        } transition-colors`}>
                        {status === 'error' ? <AlertCircle size={24} /> : <UploadCloud size={24} />}
                    </div>
                    <p className={`font-bold text-sm mb-1 ${status === 'error' ? 'text-red-700' : 'text-slate-700'}`}>
                        Click to upload CSV file
                    </p>
                    {status === 'error' ? (
                        <p className="text-xs text-red-500 max-w-sm mx-auto">{errorMsg}</p>
                    ) : (
                        <p className="text-xs text-slate-400">or drag and drop here</p>
                    )}
                </div>
            ) : status === 'parsing' ? (
                <div className="border border-slate-100 rounded-2xl p-10 text-center flex flex-col items-center">
                    <Loader2 size={32} className="text-emerald-500 animate-spin mb-4" />
                    <p className="text-sm font-bold text-slate-700">Parsing CSV Data...</p>
                </div>
            ) : status === 'success' ? (
                <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-10 text-center flex flex-col items-center">
                    <CheckCircle2 size={40} className="text-emerald-500 mb-4" />
                    <p className="text-lg font-bold text-emerald-900 mb-1">Upload Successful!</p>
                    <p className="text-sm text-emerald-700 font-medium">Added {insertedCount} new garages to the database.</p>
                    <p className="text-xs text-emerald-600/70 mt-4">Refreshing layout...</p>
                </div>
            ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">Previewing {preview.length} valid rows</span>
                        <button
                            onClick={handleUpload}
                            disabled={status === 'uploading'}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                        >
                            {status === 'uploading' ? (
                                <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                            ) : (
                                'Confirm & Insert'
                            )}
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-white sticky top-0 border-b border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                <tr>
                                    <th className="py-2 px-4 font-bold uppercase tracking-wider text-slate-400">Brand</th>
                                    <th className="py-2 px-4 font-bold uppercase tracking-wider text-slate-400">Name</th>
                                    <th className="py-2 px-4 font-bold uppercase tracking-wider text-slate-400">City</th>
                                    <th className="py-2 px-4 font-bold uppercase tracking-wider text-slate-400">Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {preview.slice(0, 10).map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                        <td className="py-2 px-4 font-medium text-slate-700">{row.b}</td>
                                        <td className="py-2 px-4 font-bold text-slate-800">{row.n}</td>
                                        <td className="py-2 px-4 font-medium text-slate-600">{row.c}</td>
                                        <td className="py-2 px-4 text-slate-400 truncate max-w-xs">{row.a}</td>
                                    </tr>
                                ))}
                                {preview.length > 10 && (
                                    <tr>
                                        <td colSpan={4} className="py-3 text-center text-slate-400 font-medium bg-slate-50/50">
                                            ...and {preview.length - 10} more rows
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
