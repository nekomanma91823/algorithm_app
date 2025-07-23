# スタック (Stack) - Python実装


class Stack:
    """LIFO（Last In, First Out）方式のスタック実装"""

    def __init__(self):
        self.items = []  # スタックの要素を格納するリスト
        self.top = -1  # スタックの頂上を示すインデックス

    def push(self, element):
        """要素をスタックに追加（プッシュ） - O(1)"""
        self.items.append(element)
        self.top += 1

    def pop(self):
        """スタックから要素を取り出し（ポップ） - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        element = self.items.pop()
        self.top -= 1
        return element

    def peek(self):
        """スタックの頂上の要素を確認（ピーク） - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[self.top]

    def is_empty(self):
        """スタックが空かどうかチェック - O(1)"""
        return len(self.items) == 0

    def size(self):
        """スタックのサイズを取得 - O(1)"""
        return len(self.items)

    def __str__(self):
        """スタックの内容を表示 - O(n)"""
        if self.is_empty():
            return "Stack is empty"

        result = "Top -> "
        for i in range(len(self.items) - 1, -1, -1):
            result += str(self.items[i])
            if i > 0:
                result += " -> "
        return result + " <- Bottom"

    def clear(self):
        """スタックをクリア - O(1)"""
        self.items = []
        self.top = -1

    def to_list(self):
        """スタックの内容をリストとして取得 - O(n)"""
        return self.items[::-1]  # 逆順にして返す


def is_balanced_parentheses(s):
    """括弧の対応チェック"""
    stack = Stack()
    pairs = {")": "(", "}": "{", "]": "["}

    for char in s:
        if char in "({[":
            stack.push(char)
        elif char in ")}]":
            if stack.is_empty() or stack.pop() != pairs[char]:
                return False

    return stack.is_empty()


def evaluate_rpn(tokens):
    """逆ポーランド記法の計算"""
    stack = Stack()

    for token in tokens:
        if token in ["+", "-", "*", "/"]:
            b = stack.pop()
            a = stack.pop()

            if token == "+":
                result = a + b
            elif token == "-":
                result = a - b
            elif token == "*":
                result = a * b
            elif token == "/":
                result = int(a / b)  # 切り捨て除算

            stack.push(result)
        else:
            stack.push(int(token))

    return stack.pop()


# 使用例
if __name__ == "__main__":
    print("=== 基本的なスタック操作 ===")
    stack = Stack()

    # 要素の追加
    stack.push(10)
    stack.push(20)
    stack.push(30)
    print(stack)  # Top -> 30 -> 20 -> 10 <- Bottom

    # 頂上の要素を確認
    print(f"頂上の要素: {stack.peek()}")  # 頂上の要素: 30

    # 要素の取り出し
    print(f"ポップ: {stack.pop()}")  # ポップ: 30
    print(f"ポップ: {stack.pop()}")  # ポップ: 20
    print(stack)  # Top -> 10 <- Bottom

    # スタックのサイズ
    print(f"サイズ: {stack.size()}")  # サイズ: 1

    # 応用例1: 括弧の対応チェック
    print("\n=== 括弧の対応チェック ===")
    test_cases = ["()[]{}", "([{}])", "([)]", "((()"]
    for case in test_cases:
        result = is_balanced_parentheses(case)
        print(f"'{case}': {result}")

    # 応用例2: 逆ポーランド記法の計算
    print("\n=== 逆ポーランド記法の計算 ===")
    rpn1 = ["2", "1", "+", "3", "*"]  # (2 + 1) * 3 = 9
    rpn2 = ["4", "13", "5", "/", "+"]  # 4 + (13 / 5) = 6

    print(f"{rpn1} = {evaluate_rpn(rpn1)}")
    print(f"{rpn2} = {evaluate_rpn(rpn2)}")

    # スタックの状態確認
    print(f"\nスタックは空: {stack.is_empty()}")
    stack.clear()
    print(f"クリア後、スタックは空: {stack.is_empty()}")
