
export function formatPrice(price: number | string) {
  return (+price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'GHC',
  }).replace('C', '₵');
}
