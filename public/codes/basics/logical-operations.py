# 論理演算の実装例
class LogicalOperations:
    @staticmethod
    def and_op(a, b):
        """論理積（AND）"""
        return a and b

    @staticmethod
    def or_op(a, b):
        """論理和（OR）"""
        return a or b

    @staticmethod
    def not_op(a):
        """否定（NOT）"""
        return not a

    @staticmethod
    def xor_op(a, b):
        """排他的論理和（XOR）"""
        return (a or b) and not (a and b)

    @staticmethod
    def nand_op(a, b):
        """否定論理積（NAND）"""
        return not LogicalOperations.and_op(a, b)

    @staticmethod
    def nor_op(a, b):
        """否定論理和（NOR）"""
        return not LogicalOperations.or_op(a, b)

    @classmethod
    def generate_truth_table(cls, operation):
        """真理値表の生成"""
        results = []
        inputs = [(False, False), (False, True), (True, False), (True, True)]

        for a, b in inputs:
            if operation == "AND":
                result = cls.and_op(a, b)
            elif operation == "OR":
                result = cls.or_op(a, b)
            elif operation == "XOR":
                result = cls.xor_op(a, b)
            elif operation == "NAND":
                result = cls.nand_op(a, b)
            elif operation == "NOR":
                result = cls.nor_op(a, b)
            else:
                result = False

            results.append({"a": a, "b": b, "result": result})

        return results

    @classmethod
    def evaluate_expression(cls, a, b, c):
        """複合論理式の評価"""
        # 例: (A AND B) OR (NOT C)
        return cls.or_op(cls.and_op(a, b), cls.not_op(c))

    @classmethod
    def demonstrate_de_morgan(cls, a, b):
        """ド・モルガンの法則の実証"""
        # NOT(A AND B) = (NOT A) OR (NOT B)
        left = cls.not_op(cls.and_op(a, b))
        right = cls.or_op(cls.not_op(a), cls.not_op(b))

        # NOT(A OR B) = (NOT A) AND (NOT B)
        left2 = cls.not_op(cls.or_op(a, b))
        right2 = cls.and_op(cls.not_op(a), cls.not_op(b))

        return {
            "rule1": {"left": left, "right": right, "equal": left == right},
            "rule2": {"left": left2, "right": right2, "equal": left2 == right2},
        }


# 使用例とテスト
if __name__ == "__main__":
    print("=== 基本的な論理演算 ===")
    print(f"True AND False = {LogicalOperations.and_op(True, False)}")
    print(f"True OR False = {LogicalOperations.or_op(True, False)}")
    print(f"NOT True = {LogicalOperations.not_op(True)}")
    print(f"True XOR False = {LogicalOperations.xor_op(True, False)}")

    print("\n=== AND演算の真理値表 ===")
    and_table = LogicalOperations.generate_truth_table("AND")
    for row in and_table:
        print(f"{row['a']} AND {row['b']} = {row['result']}")

    print("\n=== ド・モルガンの法則の実証 ===")
    de_morgan = LogicalOperations.demonstrate_de_morgan(True, False)
    print(f"規則1が成立: {de_morgan['rule1']['equal']}")
    print(f"規則2が成立: {de_morgan['rule2']['equal']}")
