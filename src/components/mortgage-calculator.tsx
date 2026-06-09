import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/mortgage";
import { formatPrice } from "@/lib/format";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

function Field({
  id, label, value, onChange, min, max, step, suffix, prefix,
}: {
  id: string; label: string; value: number; onChange: (n: number) => void;
  min: number; max: number; step: number; suffix?: string; prefix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          {prefix && <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
          <Input
            id={id}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`h-9 w-32 text-right ${prefix ? "pl-6" : ""}`}
          />
          {suffix && <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="mt-3"
        aria-label={label}
      />
    </div>
  );
}

export function MortgageCalculator({ initialPrice = 750000 }: { initialPrice?: number }) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(Math.round(initialPrice * 0.2));
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(1.1);
  const [insurance, setInsurance] = useState(1200);

  const result = useMemo(
    () => calculateMortgage({ price, downPayment: down, rate, termYears: term, taxRate, insurance }),
    [price, down, rate, term, taxRate, insurance],
  );

  return (
    <div className="grid gap-8 rounded-xl border border-border bg-card p-6 lg:grid-cols-2 lg:p-8">
      <div className="space-y-6">
        <Field id="m-price" label="Home Price" value={price} onChange={setPrice} min={50000} max={10000000} step={10000} prefix="$" />
        <Field id="m-down" label="Down Payment" value={down} onChange={setDown} min={0} max={price} step={5000} prefix="$" />
        <Field id="m-rate" label="Interest Rate" value={rate} onChange={setRate} min={0} max={15} step={0.1} suffix="%" />
        <Field id="m-term" label="Loan Term" value={term} onChange={setTerm} min={5} max={40} step={1} suffix="yrs" />
        <Field id="m-tax" label="Property Tax (annual)" value={taxRate} onChange={setTaxRate} min={0} max={5} step={0.05} suffix="%" />
        <Field id="m-ins" label="Home Insurance (annual)" value={insurance} onChange={setInsurance} min={0} max={20000} step={100} prefix="$" />
      </div>

      <div className="flex flex-col justify-center rounded-xl bg-primary p-6 text-primary-foreground lg:p-8">
        <p className="text-sm uppercase tracking-wide text-primary-foreground/70">Estimated Monthly Payment</p>
        <p className="mt-2 font-display text-4xl font-bold text-gold lg:text-5xl">
          {formatPrice(Math.round(result.monthlyTotal))}
        </p>
        <dl className="mt-6 space-y-3 border-t border-primary-foreground/15 pt-6 text-sm">
          <div className="flex justify-between"><dt className="text-primary-foreground/70">Principal & Interest</dt><dd className="font-medium">{formatPrice(Math.round(result.monthlyPrincipalInterest))}</dd></div>
          <div className="flex justify-between"><dt className="text-primary-foreground/70">Property Tax</dt><dd className="font-medium">{formatPrice(Math.round(result.monthlyTax))}</dd></div>
          <div className="flex justify-between"><dt className="text-primary-foreground/70">Insurance</dt><dd className="font-medium">{formatPrice(Math.round(result.monthlyInsurance))}</dd></div>
          <div className="flex justify-between border-t border-primary-foreground/15 pt-3"><dt className="text-primary-foreground/70">Loan Amount</dt><dd className="font-medium">{formatPrice(Math.round(result.loanAmount))}</dd></div>
          <div className="flex justify-between"><dt className="text-primary-foreground/70">Total Interest</dt><dd className="font-medium">{formatPrice(Math.round(result.totalInterest))}</dd></div>
        </dl>
      </div>
    </div>
  );
}
