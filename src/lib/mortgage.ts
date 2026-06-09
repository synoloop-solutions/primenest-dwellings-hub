export interface MortgageInput {
  price: number;
  downPayment: number;
  rate: number; // annual percent
  termYears: number;
  taxRate?: number; // annual percent of price
  insurance?: number; // annual dollars
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyTotal: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = Math.max(0, input.price - input.downPayment);
  const monthlyRate = input.rate / 100 / 12;
  const n = input.termYears * 12;

  let monthlyPI: number;
  if (monthlyRate === 0) {
    monthlyPI = n > 0 ? loanAmount / n : 0;
  } else {
    monthlyPI =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);
  }
  if (!isFinite(monthlyPI)) monthlyPI = 0;

  const monthlyTax = ((input.taxRate ?? 0) / 100) * input.price / 12;
  const monthlyInsurance = (input.insurance ?? 0) / 12;
  const totalPayment = monthlyPI * n;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount,
    monthlyPrincipalInterest: monthlyPI,
    monthlyTax,
    monthlyInsurance,
    monthlyTotal: monthlyPI + monthlyTax + monthlyInsurance,
    totalInterest: Math.max(0, totalInterest),
    totalPayment,
  };
}
