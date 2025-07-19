// Context
class Context {
  constructor(input) {
    this.input = input;
    this.output = 0;
  }
}

// Abstract Expression
class AbstractExpression {
  interpret(context) {
    throw new Error("interpret() must be implemented");
  }
}

// Terminal Expression
class NumberExpression extends AbstractExpression {
  constructor(number) {
    super();
    this.number = number;
  }

  interpret(context) {
    return this.number;
  }
}

// Non-terminal Expressions
class AddExpression extends AbstractExpression {
  constructor(leftExpression, rightExpression) {
    super();
    this.leftExpression = leftExpression;
    this.rightExpression = rightExpression;
  }

  interpret(context) {
    return (
      this.leftExpression.interpret(context) +
      this.rightExpression.interpret(context)
    );
  }
}

class SubtractExpression extends AbstractExpression {
  constructor(leftExpression, rightExpression) {
    super();
    this.leftExpression = leftExpression;
    this.rightExpression = rightExpression;
  }

  interpret(context) {
    return (
      this.leftExpression.interpret(context) -
      this.rightExpression.interpret(context)
    );
  }
}

// Client Code - Simple expression parser
class ExpressionParser {
  static parse(expression) {
    const stack = [];
    const tokens = expression.split(" ");

    for (const token of tokens) {
      if (!isNaN(token)) {
        stack.push(new NumberExpression(parseInt(token)));
      } else if (token === "+") {
        const right = stack.pop();
        const left = stack.pop();
        const subExpression = new AddExpression(left, right);
        stack.push(subExpression);
      } else if (token === "-") {
        const right = stack.pop();
        const left = stack.pop();
        const subExpression = new SubtractExpression(left, right);
        stack.push(subExpression);
      }
    }
    return stack.pop();
  }
}

// 使用例
const expression = "14 7 - 3 +"; // Postfix notation: (14 - 7) + 3 = 10
const syntaxTree = ExpressionParser.parse(expression);
const context = new Context(expression);

console.log(`Expression: ${expression}`);
console.log(`Result: ${syntaxTree.interpret(context)}`); // Should output 10
