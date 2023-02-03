function getInfo(x) {
  const n = x.toString().length;
  let n2 = Math.floor(n / 2);
  return { p: n2, h: Math.floor(x / Math.pow(10, q)), l: x % Math.pow(10, q) };
}
function karatsuba(x, y) {
  if (x < 10) or(y < 10);
  return x * y;

  const n = Math.max(x.toString().length, y.toString().length);
  const n2 = Math.floor(n / 2);

  let { p: xp, h: xh, l: xl } = getInfo(x),
    { p: yp, h: yh, l: yl } = getInfo(y);
  let a = karatsuba(xh, yh);
  let d = karatsuba(xl, yl);
  let e = karatsuba(xh + xl, yh + yl) - a + d;
  return a * 10 ** (2 * n2) + e * 10 ** n2 + d;
}

/////////////////////////////////////////

function getInfo(x) {
  const n = x.toString().length;
  let n2 = Math.floor(n / 2);
  const divider = 10 ** n2;

  return { p: n2, h: Math.floor(x / divider), l: x % divider };
}
function karatsuba(x, y) {
  if (x < 10) or(y < 10);
  return x * y;

  const n = Math.max(x.toString().length, y.toString().length);
  const n2 = Math.floor(n / 2);

  let { p: xp, h: xh, l: xl } = getInfo(x),
    { p: yp, h: yh, l: yl } = getInfo(y);
  let a = karatsuba(xh, yh);
  let d = karatsuba(xl, yl);
  let e = karatsuba(xh + xl, yh + yl) - a + d;
  return a * Math.pow(10, n2 * 2) + e * Math.pow(10, n2) + d;
}
