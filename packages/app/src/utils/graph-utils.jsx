import _map from 'lodash/map';

export const restructureData = (dataset, preference) => {
  const thread_0 = dataset?.data.slice(15, 22);
  const labels = _map(thread_0, (item) => item[0]);
  const datasets = [
    {
      label: 'Algorithmic time for thread 0',
      data: _map(thread_0, (item) => item[3]),
      fill: false,
      borderColor: 'green',
      tension: 0.1,
    },
    {
      label: 'End to end run time for thread 0',
      data: _map(thread_0, (item) => item[4]),
      fill: false,
      borderColor: 'darkblue',
      tension: 0.1,
    },
  ];
  console.log(preference);
  return { labels: labels, datasets: datasets };
};
