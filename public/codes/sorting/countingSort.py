def counting_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
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

    count = [0] * (max_val + 1)
    output = [0] * n

    for i in range(n):
        if not is_sorting.current: return
        set_comparing_indices([i])
        set_array(list(array))
        time.sleep(speed / 1000.0)
        count[array[i]] += 1

    for i in range(1, max_val + 1):
        if not is_sorting.current: return
        count[i] += count[i - 1]

    for i in range(n - 1, -1, -1):
        if not is_sorting.current: return
        set_comparing_indices([i])
        set_array(list(array))
        time.sleep(speed / 1000.0)
        output[count[array[i]] - 1] = array[i]
        count[array[i]] -= 1

    for i in range(n):
        if not is_sorting.current: return
        array[i] = output[i]
        set_array(list(array))
        set_sorted_indices(lambda prev: prev + [i])
        time.sleep(speed / 1000.0)

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time