def shell_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
    n = len(array)

    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = array[i]
            j = i
            while j >= gap and array[j - gap] > temp:
                if not is_sorting.current: return
                set_comparing_indices([j, j - gap])
                set_array(list(array))
                time.sleep(speed / 1000.0)

                set_swapping_indices([j, j - gap])
                array[j] = array[j - gap]
                set_array(list(array))
                time.sleep(speed / 1000.0)
                set_swapping_indices([])
                j -= gap
            array[j] = temp
            set_array(list(array))
            time.sleep(speed / 1000.0)
        gap //= 2

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time