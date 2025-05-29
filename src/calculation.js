const calculateMean = (values) => {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};
export const calculateGChartLimits = (data) => {
  const values = data.map((d) => d.value);
  const mean = calculateMean(values);

  // 3-sigma limits for G Chart (Geometric distribution)
  const upperControlLimit = mean + 3 * Math.sqrt(mean * (mean + 1));
  const lowerControlLimit = Math.max(
    0,
    mean - 3 * Math.sqrt(mean * (mean + 1))
  );

  // 95% control limits (2 standard deviations)
  //   const upperControlLimit95 = mean + 2 * Math.sqrt(mean * (mean + 1));
  //   const lowerControlLimit95 = Math.max(
  //     0,
  //     mean - 2 * Math.sqrt(mean * (mean + 1))
  //   );

  return {
    centerLine: mean,
    upperControlLimit,
    lowerControlLimit,
    // upperControlLimit95,
    // lowerControlLimit95,
  };
};
