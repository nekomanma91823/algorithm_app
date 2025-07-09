```python
def radix_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
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

    def counting_sort_for_radix(arr, exp):
        output = [0] * n
        count = [0] * 10

        for i in range(n):
            if not is_sorting.current: return
            set_comparing_indices([i])
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            index = (arr[i] // exp) % 10
            count[index] += 1

        for i in range(1, 10):
            count[i] += count[i - 1]

        i = n - 1
        while i >= 0:
            if not is_sorting.current: return
            set_comparing_indices([i])
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            index = (arr[i] // exp) % 10
            output[count[index] - 1] = arr[i]
            count[index] -= 1
            i -= 1

        for i in range(n):
            if not is_sorting.current: return
            arr[i] = output[i]
            set_array(list(arr))
            set_sorted_indices(lambda prev: prev + [i])
            time.sleep(speed / 1000.0)

    exp = 1
    while max_val // exp > 0:
        counting_sort_for_radix(array, exp)
        exp *= 10

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time
```