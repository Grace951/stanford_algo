var fs = require('node:fs');

try {
  const content = fs.readFileSync('Assignment4_input.txt', 'utf8');
  const values = content?.split('\n').map((str) => Number(str.trim()));
  console.log(values.length, values[0]);
  console.log('start', new Date().toISOString());

  let count = 0;
  const dict = {};

  for (let i = 0; i < values.length; i++) {
    dict[values[i]] = true;
  }
  const sums = [...Array(20000).keys()].map((item) => item - 10000);
  console.log('sum', sums.length, sums[0]);

  for (let i = 0; i < sums.length; i++) {
    const sum = sums[i];
    console.log('i', i, 'sum', sum);
    for (let x = 0; x < values.length; x++) {
      const value = values[x];
      const remain = sum - value;
      if (dict[remain] && remain !== value) {
        count++;
        break;
      }
    }
  }

  console.log('count', count, new Date().toISOString());
} finally {
}
