import random
import time

def is_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i] > arr[i + 1]:
            return False
    return True

def shuffle(arr):
    n = len(arr)
    while n > 0:
        index = random.randint(0, n - 1)
        n -= 1
        arr[n], arr[index] = arr[index], arr[n]
    return arr

def bogo_sort(array, set_array, set_comparing_indices, set_swapping_indices, set_sorted_indices, speed, is_sorting):
    n = len(array)

    while not is_sorted(array):
        if not is_sorting.current: return
        array = shuffle(array)
        set_array(list(array))
        set_comparing_indices([])
        set_swapping_indices([])
        time.sleep(speed / 1000.0)

    set_sorted_indices(list(range(n)))
    set_comparing_indices([])