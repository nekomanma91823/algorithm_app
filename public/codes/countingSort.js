async function countingSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}