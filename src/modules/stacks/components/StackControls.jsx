import { useState } from "react";
import { Plus, Minus, Eye, RotateCcw, AlertCircle } from "lucide-react";

export default function StackControls({
  onPush,
  onPop,
  onPeek,
  onReset,
  isFull = false,
  isEmpty = false,
  isAnimating = false,
  error = null,
}) {
  const [inputVal, setInputVal] = useState("");
  const [validationError, setValidationError] = useState(null);

  const handlePush = (e) => {
    e.preventDefault();
    if (isAnimating || isFull) return;

    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const num = Number(trimmed);
    if (!Number.isFinite(num) || !Number.isInteger(num)) {
      setValidationError("Please enter a valid integer (decimals are not supported).");
      return;
    }

    setValidationError(null);
    const success = onPush(num);
    // Only clear input if operation succeeded
    if (success) {
      setInputVal("");
    }
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    if (validationError) setValidationError(null);
  };

  const handleReset = () => {
    setValidationError(null);
    onReset?.();
  };

  const activeError = error || validationError;

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Stack Operations
          </h3>
          <p className="text-xs text-[#8C837B]">
            Push new items, pop the top item, or peek at the boundary
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={isAnimating}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
        >
          <RotateCcw size={13} />
          <span>Reset Stack</span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Push Form */}
        <form onSubmit={handlePush} className="flex gap-2">
          <input
            id="stack-input-value"
            type="number"
            step="1"
            aria-label="Value to push onto stack"
            placeholder="Value to push"
            value={inputVal}
            onChange={handleInputChange}
            disabled={isFull || isAnimating}
            className="w-36 rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#4B7754] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isFull || !inputVal.trim() || isAnimating}
            className="flex items-center gap-1.5 rounded-xl bg-[#4B7754] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#3B5E42] disabled:opacity-40"
          >
            <Plus size={14} />
            <span>Push</span>
          </button>
        </form>

        <div className="h-6 w-px bg-[#EEE5DB] hidden sm:block" />

        {/* Pop Button */}
        <button
          type="button"
          onClick={onPop}
          disabled={isEmpty || isAnimating}
          className="flex items-center gap-1.5 rounded-xl bg-[#DC2626] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#B91C1C] disabled:opacity-40"
        >
          <Minus size={14} />
          <span>Pop (Top)</span>
        </button>

        {/* Peek Button */}
        <button
          type="button"
          onClick={onPeek}
          disabled={isEmpty || isAnimating}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3.5 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
        >
          <Eye size={14} className="text-[#D97706]" />
          <span>Peek Top</span>
        </button>
      </div>

      {/* Overflow/Underflow/Validation Alert Banner */}
      {activeError && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-4 flex items-center gap-2 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-xs font-medium text-[#991B1B]"
        >
          <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
          <span>{activeError}</span>
        </div>
      )}
    </div>
  );
}
