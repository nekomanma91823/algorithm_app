async function timSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
    const n = array.length;
    const MIN_MERGE = 32;

    const insertionSortTim = async (arr, left, right) => {
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

    const mergeTim = async (arr, l, m, r) => {
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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}