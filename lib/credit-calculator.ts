export const CREDIT_MONTHLY_INTEREST_RATE = 0.005;
export const MAX_CREDIT_TENOR_MONTHS = 24;

export function calculateInstallmentTerms(limit: number, tenor: number) {
  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new RangeError("Masukkan nominal limit berupa bilangan bulat yang valid.");
  }
  if (!Number.isSafeInteger(tenor) || tenor < 1 || tenor > MAX_CREDIT_TENOR_MONTHS) {
    throw new RangeError(`Tenor harus antara 1 dan ${MAX_CREDIT_TENOR_MONTHS} bulan.`);
  }

  const principalPerMonth = Math.round(limit / tenor);
  const interestPerMonth = Math.round(limit * CREDIT_MONTHLY_INTEREST_RATE);
  const installmentPerMonth = principalPerMonth + interestPerMonth;
  const totalRepayment = installmentPerMonth * tenor;

  if (installmentPerMonth < 1 || !Number.isSafeInteger(totalRepayment)) {
    throw new RangeError("Nominal limit terlalu kecil atau terlalu besar untuk disimulasikan.");
  }

  return {
    principalPerMonth,
    interestPerMonth,
    installmentPerMonth,
    totalInterest: interestPerMonth * tenor,
    totalRepayment,
  };
}
