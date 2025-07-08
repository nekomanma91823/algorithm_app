```javascript
async function introSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
    const n = array.length;
    const MAX_DEPTH_FACTOR = 2; // log2(n) * 2

    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    const medianOfThree = (arr, a, b, c) => {
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

    const partition = async (arr, low, high) => {
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

    const heapify = async (arr, n, i, offset) => {
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

    const heapSortIntro = async (arr, low, high) => {
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

    const insertionSortIntro = async (arr, low, high) => {
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

    const introSortRecursive = async (arr, low, high, depthLimit) => {
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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```