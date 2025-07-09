async function radixSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
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

    const countingSortForRadix = async (arr, exp) => {
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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}