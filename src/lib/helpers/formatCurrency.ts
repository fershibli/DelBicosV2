export const formatBRLFromUnits = (value?: number | string) => {
  if (value === undefined || value === null || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(num)) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
};

export const formatBRLFromCents = (cents?: number) => {
  if (cents === undefined || cents === null) return '';
  const units = cents / 100;
  return formatBRLFromUnits(units);
};

export const formatBRL = (
  opts: { price?: string; price_cents?: number } | undefined,
) => {
  if (!opts) return '';
  if (typeof opts.price_cents === 'number')
    return formatBRLFromCents(opts.price_cents);
  if (opts.price !== undefined && opts.price !== null && opts.price !== '') {
    const n = Number(opts.price);
    if (!Number.isNaN(n)) return formatBRLFromUnits(n);
  }
  return '';
};

export default formatBRL;
