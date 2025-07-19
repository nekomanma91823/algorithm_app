async function bogoSort(
  array,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting
) {
  const n = array.length;

  function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  function shuffle(arr) {
    let n = arr.length;
    while (n > 0) {
      let index = Math.floor(Math.random() * n);
      n--;
      [arr[n], arr[index]] = [arr[index], arr[n]];
    }
    return arr;
  }

  while (!isSorted(array)) {
    if (!isSorting.current) return;
    array = shuffle(array);
    setArray([...array]);
    setComparingIndices([]);
    setSwappingIndices([]);
    await sleep(speed);
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
}

// Helper function (assuming it\'s defined elsewhere or passed)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}