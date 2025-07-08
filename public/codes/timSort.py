```python
def tim_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
    n = len(array)
    MIN_MERGE = 32

    def insertion_sort_tim(arr, left, right):
        for i in range(left + 1, right + 1):
            temp = arr[i]
            j = i - 1
            while j >= left and arr[j] > temp:
                if not is_sorting.current: return
                set_comparing_indices([j, j + 1])
                set_array(list(arr))
                time.sleep(speed / 1000.0)
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = temp
            set_array(list(arr))
            time.sleep(speed / 1000.0)

    def merge_tim(arr, l, m, r):
        len1 = m - l + 1
        len2 = r - m
        left_arr = [0] * len1
        right_arr = [0] * len2

        for i in range(len1): left_arr[i] = arr[l + i]
        for i in range(len2): right_arr[i] = arr[m + 1 + i]

        i = 0
        j = 0
        k = l

        while i < len1 and j < len2:
            if not is_sorting.current: return
            set_comparing_indices([l + i, m + 1 + j])
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            k += 1

        while i < len1:
            if not is_sorting.current: return
            arr[k] = left_arr[i]
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            k += 1
            i += 1

        while j < len2:
            if not is_sorting.current: return
            arr[k] = right_arr[j]
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            k += 1
            j += 1

    for i in range(0, n, MIN_MERGE):
        insertion_sort_tim(array, i, min((i + MIN_MERGE - 1), (n - 1)))

    size = MIN_MERGE
    while size < n:
        left = 0
        while left < n:
            mid = left + size - 1
            right = min((left + 2 * size - 1), (n - 1))
            if mid < right:
                merge_tim(array, left, mid, right)
            left += 2 * size
        size *= 2

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time
```