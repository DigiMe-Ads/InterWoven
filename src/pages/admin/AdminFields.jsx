// ── Text field ────────────────────────────────────────────────────────────────
export function TextField({ label, value, onChange, multiline = false }) {
  const friendlyLabel = label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase())
    .trim();

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        {friendlyLabel}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors resize-none bg-gray-50 focus:bg-white"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors bg-gray-50 focus:bg-white"
        />
      )}
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
export function AdminSection({ title, children, onSave, saving, saved }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-extrabold text-gray-700">{title}</h3>
        <button
          onClick={onSave}
          disabled={saving}
          className={`flex items-center gap-2 text-xs font-semibold px-5 py-2 rounded-full transition-colors disabled:opacity-60 ${
            saved
              ? "bg-green-100 text-green-700"
              : "bg-[#2D8080] text-white hover:bg-[#236B6B]"
          }`}
        >
          {saving ? (
            <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>
          ) : saved ? "✓ Saved!" : "Save changes"}
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}