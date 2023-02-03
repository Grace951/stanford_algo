var fs = require('node:fs');

try {
  const content = fs.readFileSync('Assignment4_input.txt', 'utf8');
  const values = content?.split('\n').map((str) => Number(str.trim()));
  console.log(values.length, values[0]);
  console.log('start', new Date().toISOString());
  let count = 0;
  const dict = {};

  for (let i = 0; i < values.length; i++) {
    for (let j = 1; j < values.length; j++) {
      const sum = values[i] + values[j];
      if (!dict[sum]) {
        dict[sum] = true;
        count++;
      }
    }
  }
  console.log('count', count, new Date().toISOString());
} finally {
}
