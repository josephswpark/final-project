export default function Total(items) {
  const result = {};
  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.price * items.length);
  });
  result.subtotal = subtotal;
  result.tax = (subtotal * 0.0775).toFixed(2);
  result.total = (Number(subtotal) + Number(result.tax)).toLocaleString('en-US');
  result.subtotal = Number(subtotal.toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
  });
  return result;
}
