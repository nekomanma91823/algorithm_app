async function shellSort(array, setArray, setComparingIndices, setSwappingIndices, setSortedIndices, speed, isSorting) {
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
}

// Helper function (assuming it's defined elsewhere or passed)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}