import copy

class Prototype:
    def __init__(self) -> None:
        self.primitive = None
        self.component = None
        self.circular_reference = None

    def __copy__(self) -> object:
        # Create a shallow copy of the object.
        new = self.__class__()
        new.__dict__.update(self.__dict__)
        return new

    def __deepcopy__(self, memo: dict = {}) -> object:
        # Create a deep copy of the object.
        new = self.__class__()
        memo[id(self)] = new
        for k, v in self.__dict__.items():
            setattr(new, k, copy.deepcopy(v, memo))
        return new

class ComponentWithBackReference:
    def __init__(self, prototype: Prototype) -> None:
        self.prototype = prototype
