def intro_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
    n = len(array)
    MAX_DEPTH_FACTOR = 2  # log2(n) * 2

    def swap(arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]

    def median_of_three(arr, a, b, c):
        if arr[a] < arr[b]:
            if arr[b] < arr[c]: return b
            elif arr[a] < arr[c]: return c
            else: return a
        else:
            if arr[a] < arr[c]: return a
            elif arr[b] < arr[c]: return c
            else: return b

    def partition(arr, low, high):
        pivot_index = median_of_three(arr, low, (low + high) // 2, high)
        swap(arr, pivot_index, high)  # Move pivot to end
        pivot = arr[high]
        i = (low - 1)

        for j in range(low, high):
            if not is_sorting.current: return
            set_comparing_indices([j, high])
            set_array(list(arr))
            time.sleep(speed / 1000.0)

            if arr[j] < pivot:
                i += 1
                set_swapping_indices([i, j])
                swap(arr, i, j)
                set_array(list(arr))
                time.sleep(speed / 1000.0)
                set_swapping_indices([])
        set_swapping_indices([i + 1, high])
        swap(arr, i + 1, high)
        set_array(list(arr))
        time.sleep(speed / 1000.0)
        set_swapping_indices([])
        return (i + 1)

    def heapify(arr, n_heap, i, offset):
        largest = i
        l = 2 * i + 1
        r = 2 * i + 2

        if l < n_heap:
            set_comparing_indices([offset + largest, offset + l])
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            if arr[offset + l] > arr[offset + largest]:
                largest = l

        if r < n_heap:
            set_comparing_indices([offset + largest, offset + r])
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            if arr[offset + r] > arr[offset + largest]:
                largest = r

        if largest != i:
            set_swapping_indices([offset + i, offset + largest])
            swap(arr, offset + i, offset + largest)
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            set_swapping_indices([])
            heapify(arr, n_heap, largest, offset)

    def heap_sort_intro(arr, low, high):
        size = high - low + 1
        for i in range(size // 2 - 1, -1, -1):
            heapify(arr, size, i, low)

        for i in range(size - 1, 0, -1):
            set_swapping_indices([low, low + i])
            swap(arr, low, low + i)
            set_array(list(arr))
            time.sleep(speed / 1000.0)
            set_swapping_indices([])
            heapify(arr, i, 0, low)

    def insertion_sort_intro(arr, low, high):
        for i in range(low + 1, high + 1):
            key = arr[i]
            j = i - 1
            while j >= low and arr[j] > key:
                if not is_sorting.current: return
                set_comparing_indices([j, j + 1])
                set_array(list(arr))
                time.sleep(speed / 1000.0)
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key
            set_array(list(arr))
            time.sleep(speed / 1000.0)

    def intro_sort_recursive(arr, low, high, depth_limit):
        if (high - low + 1) <= 16:  # Threshold for insertion sort
            insertion_sort_intro(arr, low, high)
            return

        if depth_limit == 0:
            heap_sort_intro(arr, low, high)
            return

        if low < high:
            pi = partition(arr, low, high)
            if pi is None: return  # Handle early exit

            intro_sort_recursive(arr, low, pi - 1, depth_limit - 1)
            intro_sort_recursive(arr, pi + 1, high, depth_limit - 1)

    import math
    intro_sort_recursive(array, 0, n - 1, math.floor(math.log2(n)) * MAX_DEPTH_FACTOR)

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])

import time