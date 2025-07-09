```python
def bucket_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
    n = len(array)

    if n == 0:
        set_sorted_indices(list(range(n)))
        set_comparing_indices([])
        return

    max_val = array[0]
    for i in range(1, n):
        if not is_sorting.current: return
        set_comparing_indices([i])
        set_array(list(array))
        time.sleep(speed / 1000.0)
        if array[i] > max_val:
            max_val = array[i]

    num_buckets = int(n**0.5)
    buckets = [[] for _ in range(num_buckets)]

    for i in range(n):
        if not is_sorting.current: return
        set_comparing_indices([i])
        set_array(list(array))
        time.sleep(speed / 1000.0)
        bucket_index = min(int(array[i] * num_buckets / (max_val + 1)), num_buckets - 1)
        buckets[bucket_index].append(array[i])

    for i in range(num_buckets):
        if not is_sorting.current: return
        # Sort each bucket (using insertion sort for simplicity, can be any sort)
        for j in range(1, len(buckets[i])):
            key = buckets[i][j]
            k = j - 1
            while k >= 0 and buckets[i][k] > key:
                buckets[i][k + 1] = buckets[i][k]
                k -= 1
            buckets[i][k + 1] = key

    current_index = 0
    for i in range(num_buckets):
        for j in range(len(buckets[i])):
            if not is_sorting.current: return
            array[current_index] = buckets[i][j]
            set_array(list(array))
            set_sorted_indices(lambda prev: prev + [current_index])
            time.sleep(speed / 1000.0)
            current_index += 1

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time
```