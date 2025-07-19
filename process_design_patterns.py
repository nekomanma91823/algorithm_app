import json
import os

# Read the content of data/designPatterns.ts
with open("C:/Users/taku1/OneDrive - 公立大学法人大阪/workspace_study/algorithm_app/data/designPatterns.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the JSON-like part from the content
# Assuming the content starts with 'export const designPatternsData = ' and ends with ';\n'
json_str = content.replace("export const designPatternsData = ", "").strip()
if json_str.endswith(";\n"):
    json_str = json_str[:-2]
elif json_str.endswith(";"):
    json_str = json_str[:-1]

# Replace backticks with a placeholder, then replace single quotes with double quotes, then escape double quotes
# This is a hack because the content is not strictly JSON, but a JS object literal
json_str = json_str.replace("`", "___BACKTICK_PLACEHOLDER___") # Replace backticks with a unique placeholder
json_str = json_str.replace("'", "\"") # Replace single quotes with double quotes
json_str = json_str.replace("\"", "\\\"") # Escape existing double quotes
json_str = json_str.replace("___BACKTICK_PLACEHOLDER___", "\"") # Replace placeholder back to double quote (since original backticks are now part of a string)

# Manually fix specific problematic parts that are not valid JSON
# These are the parts that were causing issues in the previous attempts
json_str = json_str.replace("anOperation(): string {\n    const product = this.factoryMethod();\n    return \"Creator: The same creator's code has just worked with \" + product.operation();\n  }", "anOperation(): string {\n    const product = this.factoryMethod();\n    return \"Creator: The same creator's code has just worked with \" + product.operation();\n  }")
json_str = json_str.replace("return \"The result of the B1 collaborating with the (" + result + ")\";", "return \"The result of the B1 collaborating with the (" + result + ")\";")
json_str = json_str.replace("return \"The result of the B2 collaborating with the (" + result + ")\";", "return \"The result of the B2 collaborating with the (" + result + ")\";")
json_str = json_str.replace("console.log(\"Product parts: \" + this.parts.join(\", \") + \"\\n\");", "console.log(\"Product parts: \" + this.parts.join(\", \") + \"\\n\");")
json_str = json_str.replace("console.log(\n        \"Displaying character '\" + this.char + \"' (Font: \" + this.font + \", Size: \" + this.size + \") at (" + position.x + ", " + position.y + \")\\n      );", "console.log(\n        \"Displaying character '\" + this.char + \"' (Font: \" + this.font + \", Size: \" + this.size + \") at (" + position.x + ", " + position.y + \")\\n      );")
json_str = json_str.replace("return \"Monkey: I'll eat the \" + request + \".\";", "return \"Monkey: I'll eat the \" + request + \".\";")
json_str = json_str.replace("return \"Squirrel: I'll eat the \" + request + \".\";", "return \"Squirrel: I'll eat the \" + request + \".\";")
json_str = json_str.replace("return \"Dog: I'll eat the \" + request + \".\";", "return \"Dog: I'll eat the \" + request + \".\";")
json_str = json_str.replace("return \"ConcreteDecoratorA(\" + super.operation() + \")\";", "return \"ConcreteDecoratorA(\" + super.operation() + \")\";")
json_str = json_str.replace("return \"ConcreteDecoratorB(\" + super.operation() + \")\";", "return \"ConcreteDecoratorB(\" + super.operation() + \")\";")
json_str = json_str.replace("return \"Branch(\" + results.join(\"+\") + \")\";", "return \"Branch(\" + results.join(\"+\") + \")\";")
json_str = json_str.replace("return \"Adapter: (TRANSLATED) \" + result + \";", "return \"Adapter: (TRANSLATED) \" + result + \";")

# Attempt to parse the string as JSON
try:
    design_patterns_data = json.loads(json_str)
except json.JSONDecodeError as e:
    print(f"JSON Decode Error: {e}")
    print(f"Problematic string part: {json_str[e.pos-50:e.pos+50]}")
    # Fallback to a more robust parsing if direct JSON.loads fails
    # This might involve more complex regex or a JS parser if available

new_design_patterns_data = {}
updated_ts_content = "export const designPatternsData = {\n"

for pattern_key, pattern_data in design_patterns_data.items():
    pattern_name = pattern_key
    typescript_code = pattern_data["source_code"]["typescript"]
    python_code = pattern_data["source_code"]["python"]

    # Define paths for new code files
    code_dir = f"public/codes/design-pattern/{pattern_name}"
    typescript_file_path = os.path.join(code_dir, "index.ts")
    python_file_path = os.path.join(code_dir, "index.py")

    # Create directory if it doesn't exist
    os.makedirs(code_dir, exist_ok=True)

    # Write TypeScript code to file
    with open(typescript_file_path, "w", encoding="utf-8") as f:
        f.write(typescript_code)

    # Write Python code to file
    with open(python_file_path, "w", encoding="utf-8") as f:
        f.write(python_code)

    # Update the source_code paths in the data
    pattern_data["source_code"]["typescript"] = f"/codes/design-pattern/{pattern_name}/index.ts"
    pattern_data["source_code"]["python"] = f"/codes/design-pattern/{pattern_name}/index.py"

    new_design_patterns_data[pattern_key] = pattern_data

# Generate the new data/designPatterns.ts content
updated_ts_content += json.dumps(new_design_patterns_data, indent=2, ensure_ascii=False)
updated_ts_content += "\n};\n"

# Write the updated content back to data/designPatterns.ts
with open("C:/Users/taku1/OneDrive - 公立大学法人大阪/workspace_study/algorithm_app/data/designPatterns.ts", "w", encoding="utf-8") as f:
    f.write(updated_ts_content)

print("Code files separated and data/designPatterns.ts updated successfully.")