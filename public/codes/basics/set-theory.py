# 集合演算の実装
class SetOperations:
    def __init__(self, elements=None):
        """集合を初期化"""
        if elements is None:
            elements = []
        # Pythonのsetを内部的に使用（重複自動除去）
        self._elements = set(elements)

    def add(self, element):
        """要素を追加"""
        self._elements.add(element)
        return self

    def remove(self, element):
        """要素を削除"""
        self._elements.discard(element)  # エラーを出さずに削除
        return self

    def has(self, element):
        """要素が含まれているかチェック"""
        return element in self._elements

    def size(self):
        """集合のサイズ"""
        return len(self._elements)

    def union(self, other):
        """和集合（Union）"""
        return SetOperations(self._elements | other._elements)

    def intersection(self, other):
        """積集合（Intersection）"""
        return SetOperations(self._elements & other._elements)

    def difference(self, other):
        """差集合（Difference）"""
        return SetOperations(self._elements - other._elements)

    def symmetric_difference(self, other):
        """対称差集合（Symmetric Difference）"""
        return SetOperations(self._elements ^ other._elements)

    def is_subset_of(self, other):
        """部分集合かどうかチェック"""
        return self._elements <= other._elements

    def is_superset_of(self, other):
        """上位集合かどうかチェック"""
        return self._elements >= other._elements

    def is_empty(self):
        """空集合かどうかチェック"""
        return len(self._elements) == 0

    def to_list(self):
        """集合をリストとして取得"""
        return list(self._elements)

    def __str__(self):
        """集合を文字列として表現"""
        elements = sorted(list(self._elements), key=str)
        return "{" + ", ".join(map(str, elements)) + "}"

    @staticmethod
    def visualize_relation(set_a, set_b, operation):
        """ベン図的な表現（簡易版）"""
        a_only = set_a.difference(set_b)
        b_only = set_b.difference(set_a)
        both = set_a.intersection(set_b)

        print("=== ベン図的な表現 ===")
        print(f"A のみ: {a_only}")
        print(f"B のみ: {b_only}")
        print(f"A ∩ B: {both}")

        if operation == "union":
            result = set_a.union(set_b)
            print(f"A ∪ B: {result}")
        elif operation == "intersection":
            result = set_a.intersection(set_b)
            print(f"A ∩ B: {result}")
        elif operation == "difference":
            result = set_a.difference(set_b)
            print(f"A - B: {result}")
        else:
            result = set_a

        return result


# 使用例
if __name__ == "__main__":
    print("=== 集合演算の例 ===")

    # 集合の作成
    numbers_a = SetOperations([1, 2, 3, 4, 5])
    numbers_b = SetOperations([4, 5, 6, 7, 8])

    print(f"集合A: {numbers_a}")
    print(f"集合B: {numbers_b}")

    # 基本演算
    print(f"\n=== 基本演算 ===")
    print(f"A ∪ B (和集合): {numbers_a.union(numbers_b)}")
    print(f"A ∩ B (積集合): {numbers_a.intersection(numbers_b)}")
    print(f"A - B (差集合): {numbers_a.difference(numbers_b)}")
    print(f"B - A (差集合): {numbers_b.difference(numbers_a)}")

    # 関係のチェック
    print(f"\n=== 集合の関係 ===")
    subset = SetOperations([1, 2, 3])
    print(f"{{1, 2, 3}} は A の部分集合: {subset.is_subset_of(numbers_a)}")
    print(f"A は {{1, 2, 3}} の上位集合: {numbers_a.is_superset_of(subset)}")

    # 実際の例：プログラミング言語
    print(f"\n=== 実用例：プログラミング言語 ===")
    web_languages = SetOperations(["JavaScript", "HTML", "CSS", "TypeScript"])
    system_languages = SetOperations(["C", "C++", "Rust", "Go"])
    popular_languages = SetOperations(["JavaScript", "Python", "Java", "C++"])

    print(f"Web開発言語: {web_languages}")
    print(f"システム言語: {system_languages}")
    print(f"人気言語: {popular_languages}")

    print(f"\nWeb開発と人気言語の共通: {web_languages.intersection(popular_languages)}")
    print(
        f"システムと人気言語の共通: {system_languages.intersection(popular_languages)}"
    )

    # カラフルな大学の例
    print(f"\n=== 大学の例 ===")
    math_students = SetOperations(["田中", "佐藤", "鈴木", "高橋"])
    cs_students = SetOperations(["佐藤", "鈴木", "山田", "渡辺"])

    print(f"数学科の学生: {math_students}")
    print(f"情報科学科の学生: {cs_students}")
    print(f"両方を履修: {math_students.intersection(cs_students)}")
    print(f"いずれかを履修: {math_students.union(cs_students)}")
    print(f"数学科のみ: {math_students.difference(cs_students)}")
    print(f"情報科学科のみ: {cs_students.difference(math_students)}")
