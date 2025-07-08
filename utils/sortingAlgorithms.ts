export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface SortAnimationProps {
  array: number[];
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
  setComparingIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSwappingIndices: React.Dispatch<React.SetStateAction<number[]>>;
  setSortedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  speed: number;
  isSorting: React.MutableRefObject<boolean>;
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

export const bubbleSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (!isSorting.current) return; // Allow pausing
      setComparingIndices([j, j + 1]);
      setArray([...array]);
      await sleep(speed);

      if (array[j] > array[j + 1]) {
        setSwappingIndices([j, j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setArray([...array]);
        await sleep(speed);
        setSwappingIndices([]);
      }
    }
    setSortedIndices(prev => [...prev, n - 1 - i]);
  }
  setSortedIndices(Array.from({ length: n }, (_, i) => i)); // Mark all as sorted
  setComparingIndices([]);
};

export const selectionSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  let n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (!isSorting.current) return;
      setComparingIndices([minIdx, j]);
      setArray([...array]);
      await sleep(speed);

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      setSwappingIndices([i, minIdx]);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      setArray([...array]);
      await sleep(speed);
      setSwappingIndices([]);
    }
    setSortedIndices(prev => [...prev, i]);
  }
  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const insertionSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  let n = array.length;

  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      if (!isSorting.current) return;
      setComparingIndices([j, j + 1]);
      setArray([...array]);
      await sleep(speed);

      setSwappingIndices([j, j + 1]);
      array[j + 1] = array[j];
      setArray([...array]);
      await sleep(speed);
      setSwappingIndices([]);
      j = j - 1;
    }
    array[j + 1] = key;
    setArray([...array]);
    await sleep(speed);
  }
  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const mergeSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];

  const merge = async (arr: number[], l: number, m: number, r: number) => {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (!isSorting.current) return;
      setComparingIndices([l + i, m + 1 + j]);
      setArray([...array]);
      await sleep(speed);

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      await sleep(speed);
      k++;
    }

    while (i < n1) {
      if (!isSorting.current) return;
      arr[k] = L[i];
      setArray([...arr]);
      await sleep(speed);
      i++;
      k++;
    }

    while (j < n2) {
      if (!isSorting.current) return;
      arr[k] = R[j];
      setArray([...arr]);
      await sleep(speed);
      j++;
      k++;
    }
  };

  const mergeSortRecursive = async (arr: number[], l: number, r: number) => {
    if (l < r) {
      const m = Math.floor(l + (r - l) / 2);

      await mergeSortRecursive(arr, l, m);
      await mergeSortRecursive(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  };

  await mergeSortRecursive(array, 0, array.length - 1);
  setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
  setComparingIndices([]);
};

export const quickSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];

  const partition = async (arr: number[], low: number, high: number) => {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      if (!isSorting.current) return;
      setComparingIndices([j, high]);
      setArray([...array]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        setSwappingIndices([i, j]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
        setSwappingIndices([]);
      }
    }
    setSwappingIndices([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);
    setSwappingIndices([]);
    return (i + 1);
  };

  const quickSortRecursive = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      if (pi === undefined) return; // Handle early exit from partition

      await quickSortRecursive(arr, low, pi - 1);
      await quickSortRecursive(arr, pi + 1, high);
    }
  };

  await quickSortRecursive(array, 0, array.length - 1);
  setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
  setComparingIndices([]);
};

export const heapSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  let n = array.length;

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
      setComparingIndices([largest, l]);
      setArray([...array]);
      await sleep(speed);
      if (arr[l] > arr[largest]) {
        largest = l;
      }
    }

    if (r < n) {
      setComparingIndices([largest, r]);
      setArray([...array]);
      await sleep(speed);
      if (arr[r] > arr[largest]) {
        largest = r;
      }
    }

    if (largest !== i) {
      setSwappingIndices([i, largest]);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(speed);
      setSwappingIndices([]);
      await heapify(arr, n, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    setSwappingIndices([0, i]);
    [array[0], array[i]] = [array[i], array[0]];
    setArray([...array]);
    await sleep(speed);
    setSwappingIndices([]);
    setSortedIndices(prev => [...prev, i]);
    await heapify(array, i, 0);
  }
  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const countingSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

  if (n === 0) {
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setComparingIndices([]);
    return;
  }

  let max = array[0];
  for (let i = 1; i < n; i++) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    if (array[i] > max) {
      max = array[i];
    }
  }

  const count = new Array(max + 1).fill(0);
  const output = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    count[array[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    if (!isSorting.current) return;
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    output[count[array[i]] - 1] = array[i];
    count[array[i]]--;
  }

  for (let i = 0; i < n; i++) {
    if (!isSorting.current) return;
    array[i] = output[i];
    setArray([...array]);
    setSortedIndices(prev => [...prev, i]);
    await sleep(speed);
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const radixSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

  if (n === 0) {
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setComparingIndices([]);
    return;
  }

  let max = array[0];
  for (let i = 1; i < n; i++) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    if (array[i] > max) {
      max = array[i];
    }
  }

  const countingSortForRadix = async (arr: number[], exp: number) => {
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      if (!isSorting.current) return;
      setComparingIndices([i]);
      setArray([...array]);
      await sleep(speed);
      count[Math.floor(arr[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      if (!isSorting.current) return;
      setComparingIndices([i]);
      setArray([...array]);
      await sleep(speed);
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (let i = 0; i < n; i++) {
      if (!isSorting.current) return;
      arr[i] = output[i];
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i]);
      await sleep(speed);
    }
  };

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSortForRadix(array, exp);
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const bucketSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

  if (n === 0) {
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setComparingIndices([]);
    return;
  }

  let maxVal = array[0];
  for (let i = 1; i < n; i++) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    if (array[i] > maxVal) {
      maxVal = array[i];
    }
  }

  const numBuckets = Math.floor(Math.sqrt(n));
  const buckets: number[][] = Array.from({ length: numBuckets }, () => []);

  for (let i = 0; i < n; i++) {
    if (!isSorting.current) return;
    setComparingIndices([i]);
    setArray([...array]);
    await sleep(speed);
    const bucketIndex = Math.floor((array[i] * numBuckets) / (maxVal + 1));
    buckets[bucketIndex].push(array[i]);
  }

  for (let i = 0; i < numBuckets; i++) {
    if (!isSorting.current) return;
    // Sort each bucket (using insertion sort for simplicity, can be any sort)
    for (let j = 1; j < buckets[i].length; j++) {
      let key = buckets[i][j];
      let k = j - 1;
      while (k >= 0 && buckets[i][k] > key) {
        buckets[i][k + 1] = buckets[i][k];
        k--;
      }
      buckets[i][k + 1] = key;
    }
  }

  let currentIndex = 0;
  for (let i = 0; i < numBuckets; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      if (!isSorting.current) return;
      array[currentIndex] = buckets[i][j];
      setArray([...array]);
      setSortedIndices(prev => [...prev, currentIndex]);
      await sleep(speed);
      currentIndex++;
    }
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const timSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;
  const MIN_MERGE = 32;

  const insertionSortTim = async (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      let temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        if (!isSorting.current) return;
        setComparingIndices([j, j + 1]);
        setArray([...array]);
        await sleep(speed);
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = temp;
      setArray([...array]);
      await sleep(speed);
    }
  };

  const mergeTim = async (arr: number[], l: number, m: number, r: number) => {
    const len1 = m - l + 1;
    const len2 = r - m;
    const leftArr = new Array(len1);
    const rightArr = new Array(len2);

    for (let i = 0; i < len1; i++) leftArr[i] = arr[l + i];
    for (let i = 0; i < len2; i++) rightArr[i] = arr[m + 1 + i];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < len1 && j < len2) {
      if (!isSorting.current) return;
      setComparingIndices([l + i, m + 1 + j]);
      setArray([...array]);
      await sleep(speed);
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setArray([...arr]);
      await sleep(speed);
      k++;
    }

    while (i < len1) {
      if (!isSorting.current) return;
      arr[k] = leftArr[i];
      setArray([...arr]);
      await sleep(speed);
      k++;
      i++;
    }

    while (j < len2) {
      if (!isSorting.current) return;
      arr[k] = rightArr[j];
      setArray([...arr]);
      await sleep(speed);
      k++;
      j++;
    }
  };

  for (let i = 0; i < n; i += MIN_MERGE) {
    await insertionSortTim(array, i, Math.min((i + MIN_MERGE - 1), (n - 1)));
  }

  for (let size = MIN_MERGE; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min((left + 2 * size - 1), (n - 1));
      if (mid < right) {
        await mergeTim(array, left, mid, right);
      }
    }
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const introSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

  const MAX_DEPTH_FACTOR = 2; // log2(n) * 2

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const medianOfThree = (arr: number[], a: number, b: number, c: number) => {
    if (arr[a] < arr[b]) {
      if (arr[b] < arr[c]) return b;
      else if (arr[a] < arr[c]) return c;
      else return a;
    } else {
      if (arr[a] < arr[c]) return a;
      else if (arr[b] < arr[c]) return c;
      else return b;
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivotIndex = medianOfThree(arr, low, Math.floor((low + high) / 2), high);
    swap(arr, pivotIndex, high); // Move pivot to end
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      if (!isSorting.current) return;
      setComparingIndices([j, high]);
      setArray([...array]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        setSwappingIndices([i, j]);
        swap(arr, i, j);
        setArray([...arr]);
        await sleep(speed);
        setSwappingIndices([]);
      }
    }
    setSwappingIndices([i + 1, high]);
    swap(arr, i + 1, high);
    setArray([...arr]);
    await sleep(speed);
    setSwappingIndices([]);
    return (i + 1);
  };

  const heapify = async (arr: number[], n: number, i: number, offset: number) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n) {
      setComparingIndices([offset + largest, offset + l]);
      setArray([...array]);
      await sleep(speed);
      if (arr[offset + l] > arr[offset + largest]) {
        largest = l;
      }
    }

    if (r < n) {
      setComparingIndices([offset + largest, offset + r]);
      setArray([...array]);
      await sleep(speed);
      if (arr[offset + r] > arr[offset + largest]) {
        largest = r;
      }
    }

    if (largest !== i) {
      setSwappingIndices([offset + i, offset + largest]);
      swap(arr, offset + i, offset + largest);
      setArray([...arr]);
      await sleep(speed);
      setSwappingIndices([]);
      await heapify(arr, n, largest, offset);
    }
  };

  const heapSortIntro = async (arr: number[], low: number, high: number) => {
    const size = high - low + 1;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
      await heapify(arr, size, i, low);
    }

    for (let i = size - 1; i > 0; i--) {
      setSwappingIndices([low, low + i]);
      swap(arr, low, low + i);
      setArray([...arr]);
      await sleep(speed);
      setSwappingIndices([]);
      await heapify(arr, i, 0, low);
    }
  };

  const insertionSortIntro = async (arr: number[], low: number, high: number) => {
    for (let i = low + 1; i <= high; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= low && arr[j] > key) {
        if (!isSorting.current) return;
        setComparingIndices([j, j + 1]);
        setArray([...array]);
        await sleep(speed);
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      setArray([...array]);
      await sleep(speed);
    }
  };

  const introSortRecursive = async (arr: number[], low: number, high: number, depthLimit: number) => {
    if (high - low + 1 <= 16) { // Threshold for insertion sort
      await insertionSortIntro(arr, low, high);
      return;
    }

    if (depthLimit === 0) {
      await heapSortIntro(arr, low, high);
      return;
    }

    if (low < high) {
      let pi = await partition(arr, low, high);
      if (pi === undefined) return; // Handle early exit

      await introSortRecursive(arr, low, pi - 1, depthLimit - 1);
      await introSortRecursive(arr, pi + 1, high, depthLimit - 1);
    }
  };

  await introSortRecursive(array, 0, n - 1, Math.floor(Math.log2(n)) * MAX_DEPTH_FACTOR);

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

export const shellSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
        if (!isSorting.current) return;
        setComparingIndices([j, j - gap]);
        setArray([...array]);
        await sleep(speed);

        setSwappingIndices([j, j - gap]);
        array[j] = array[j - gap];
        setArray([...array]);
        await sleep(speed);
        setSwappingIndices([]);
      }
      array[j] = temp;
      setArray([...array]);
      await sleep(speed);
    }
  }

  setSortedIndices(Array.from({ length: n }, (_, i) => i));
  setComparingIndices([]);
};

function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function shuffle(arr: number[]): number[] {
  let n = arr.length;
  while (n > 0) {
    let index = Math.floor(Math.random() * n);
    n--;
    [arr[n], arr[index]] = [arr[index], arr[n]];
  }
  return arr;
}

export const bogoSort = async ({
  array: initialArray,
  setArray,
  setComparingIndices,
  setSwappingIndices,
  setSortedIndices,
  speed,
  isSorting,
  timeoutRef,
}: SortAnimationProps) => {
  let array = [...initialArray];
  const n = array.length;

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
};
