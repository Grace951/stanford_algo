import v8 from 'v8';

const maxHeapSz = v8.getHeapStatistics().heap_size_limit;
const maxHeapSz_GB = (maxHeapSz / 1024 ** 3).toFixed(1);

console.log('--------------------------');
console.log(`${maxHeapSz_GB}GB`);
