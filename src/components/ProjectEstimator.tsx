import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, CalculatorIcon, ArrowRightIcon, SparklesIcon } from 'lucide-react';

interface ScopeOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  weeks: number;
}

const scopeOptions: ScopeOption[] = [
  { id: 'identity', name: 'Brand Identity & Guidelines Vault', category: 'Branding', basePrice: 450000, weeks: 6 },
  { id: 'devanagari', name: 'Custom Multilingual / Devanagari Typography', category: 'Typography', basePrice: 180000, weeks: 3 },
  { id: 'packaging', name: 'Packaging Structural & Die-lines', category: 'Packaging', basePrice: 380000, weeks: 5 },
  { id: 'press', name: 'On-Press Production Supervision', category: 'Production', basePrice: 120000, weeks: 2 },
  { id: 'spatial', name: 'Spatial Experience & Retail Wayfinding', category: 'Spatial', basePrice: 650000, weeks: 8 },
  { id: 'digital', name: 'Digital Flagship Experience & CMS', category: 'Digital', basePrice: 520000, weeks: 7 }
];

export function ProjectEstimator() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>(['identity', 'packaging']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'priority'>('standard');

  const toggleOption = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const selectedItems = scopeOptions.filter((opt) => selectedIds.includes(opt.id));
  const subtotal = selectedItems.reduce((acc, curr) => acc + curr.basePrice, 0);
  const totalWeeks = Math.max(...selectedItems.map((s) => s.weeks)) + Math.floor(selectedItems.length * 0.8);

  const multiplier = timelineSpeed === 'priority' ? 1.2 : 1;
  const estimatedCost = Math.round(subtotal * multiplier);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleExportToBrief = () => {
    const summary = selectedItems.map((s) => s.name).join(', ');
    const range = `Estimated ${formatINR(estimatedCost)} (${totalWeeks} weeks)`;
    navigate('/contact', {
      state: {
        prefillBrief: `I am interested in an engagement covering: ${summary}. Desired timeline: ${timelineSpeed === 'priority' ? 'Priority Sprint' : 'Standard Delivery'} (~${totalWeeks} weeks).`,
        prefillBudget: estimatedCost > 2500000 ? '₹25L – ₹50L (Enterprise Flagship)' : estimatedCost > 1000000 ? '₹10L – ₹25L (Growth Signature)' : '₹4.5L – ₹10L (Starter Sprint)'
      }
    });
  };

  return (
    <div className="border border-ink/15 bg-bone-dim p-6 sm:p-10 md:p-12 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/12 pb-6">
        <div>
          <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-gold-deep">
            <CalculatorIcon className="h-3.5 w-3.5" />
            <span>Interactive Scope Configurator</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-light text-ink">
            Tailor Your Engagement
          </h2>
        </div>
        <div className="flex items-center gap-2 font-sans text-xs">
          <span className="text-ink/60">Pace:</span>
          <button
            type="button"
            onClick={() => setTimelineSpeed('standard')}
            className={`px-3 py-1 border transition-colors ${
              timelineSpeed === 'standard'
                ? 'border-gold bg-gold text-white'
                : 'border-ink/20 text-ink/70 hover:border-ink'
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => setTimelineSpeed('priority')}
            className={`px-3 py-1 border transition-colors ${
              timelineSpeed === 'priority'
                ? 'border-gold bg-gold text-white'
                : 'border-ink/20 text-ink/70 hover:border-ink'
            }`}
          >
            Priority (+20%)
          </button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scopeOptions.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt.id)}
              className={`flex flex-col justify-between p-5 text-left border transition-all duration-300 ${
                isSelected
                  ? 'border-gold bg-white shadow-sm ring-1 ring-gold'
                  : 'border-ink/15 bg-bone hover:border-ink/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-sans text-[10px] uppercase tracking-wider text-ink/40">
                  {opt.category}
                </span>
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected ? 'border-gold bg-gold text-white' : 'border-ink/25 text-transparent'
                  }`}
                >
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-light leading-snug text-ink">
                {opt.name}
              </h3>
              <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 font-sans text-xs text-ink/60">
                <span>~{opt.weeks} weeks</span>
                <span className="font-medium text-ink">{formatINR(opt.basePrice)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Strip */}
      <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-ink/15 pt-8 bg-ink text-bone p-6 sm:p-8">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gold">
            Estimated Scope Investment
          </span>
          <div className="mt-2 flex items-baseline gap-4">
            <span className="font-display text-3xl sm:text-4xl font-light text-bone">
              {formatINR(estimatedCost)}
            </span>
            <span className="font-sans text-xs text-bone/60">
              Estimated duration: <span className="text-gold-soft font-medium">{totalWeeks} weeks</span>
            </span>
          </div>
          <p className="mt-2 font-sans text-xs text-bone/50 max-w-md">
            Fixed milestone fee. Divided into 3 payments. Covers full source vector rights and creative director sign-off.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportToBrief}
          className="inline-flex items-center justify-center gap-2.5 border border-gold bg-gold px-6 py-3.5 font-sans text-xs uppercase tracking-[0.2em] font-medium text-ink-deep transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <SparklesIcon className="h-3.5 w-3.5" />
          Import Into Project Brief
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

