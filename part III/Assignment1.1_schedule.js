var fs = require('node:fs');
let COUNT = 0;

function computeSchedule(jobs = []) {
  // schedules jobs in decreasing order of the difference (weight - length)
  return jobs
    .map((item) => ({
      ...item,
      rank: item.weight - item.length,
    }))
    .sort((a, b) => {
      if (a.rank == b.rank) {
        return b.weight - a.weight;
      }
      return b.rank - a.rank;
    });
}

try {
  const content = fs.readFileSync('1.1_input.txt', 'utf8');
  const jobs = content
    ?.split('\n')
    .slice(1)
    .map((str) => {
      const v = str.trim().split(' ');
      return { weight: Number(v[0]), length: Number(v[1]) };
    });
  COUNT = Number(content?.split('\n')?.[0]);
  console.log(COUNT, jobs.length, jobs[0]);

  const scheduledJobs = computeSchedule(jobs);
  console.log(scheduledJobs.slice(0, 50));
  const sum = scheduledJobs.reduce(
    (acc, cur) => {
      const totalTime = acc.totalTime + cur.length;
      return { sum: acc.sum + cur.weight * totalTime, totalTime };
    },
    { sum: 0, totalTime: 0 }
  );

  console.log(sum); // 69119377652
} finally {
}
