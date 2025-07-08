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
