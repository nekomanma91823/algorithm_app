async function bucketSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
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
    const buckets = Array.from({ length: numBuckets }, () => []);

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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}