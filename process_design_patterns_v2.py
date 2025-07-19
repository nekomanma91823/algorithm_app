import re
import os

def process_design_patterns_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    updated_content = content

    # Regex to find each pattern entry and its source_code block
    # This regex is simplified to avoid recursion and focuses on capturing the code blocks
    # It assumes that 'typescript: `' and 'python: `' are followed by the code block
    # and that the code block ends with `,' or ``' followed by a closing brace.
    pattern_entry_regex = re.compile(
        r'''("(?P<pattern_key>.*?)"):\s*{.*?source_code:\s*{\s*typescript:\s*`(?P<typescript_code>.*?)`,
python:\s*`(?P<python_code>.*?)`\s*}.*?}
''',
        re.DOTALL
    )

    replacements = []

    for pattern_match in pattern_entry_regex.finditer(content):
        full_match_start = pattern_match.start()
        full_match_end = pattern_match.end()
        
        pattern_key = pattern_match.group('pattern_key')
        typescript_code = pattern_match.group('typescript_code').strip()
        python_code = pattern_match.group('python_code').strip()

        code_dir = os.path.join("public", "codes", "design-pattern", pattern_key)
        os.makedirs(code_dir, exist_ok=True)

        typescript_file_path = os.path.join(code_dir, "index.ts")
        python_file_path = os.path.join(code_dir, "index.py")

        # Write TypeScript code
        with open(typescript_file_path, 'w', encoding='utf-8') as f:
            f.write(typescript_code)

        # Write Python code
        with open(python_file_path, 'w', encoding='utf-8') as f:
            f.write(python_code)

        # Construct the new source_code block
        new_source_code_block_str = f'source_code: {{ typescript: "/codes/design-pattern/{pattern_key}/index.ts", python: "/codes/design-pattern/{pattern_key}/index.py" }}'
        
        # Find the exact source_code block within the current pattern_match's content
        # This regex needs to be precise to capture only the source_code part
        source_code_inner_block_regex = re.compile(r'source_code:\s*{\s*typescript:\s*`.*?`,\s*python:\s*`.*?`\s*}', re.DOTALL)
        inner_source_code_match = source_code_inner_block_regex.search(pattern_match.group(0))

        if inner_source_code_match:
            # Calculate the start and end positions relative to the original 'content' string
            start_replace = full_match_start + inner_source_code_match.start()
            end_replace = full_match_start + inner_source_code_match.end()
            
            replacements.append((start_replace, end_replace, new_source_code_block_str))

    # Apply replacements in reverse order to maintain correct indices
    for start, end, new_str in sorted(replacements, key=lambda x: x[0], reverse=True):
        updated_content = updated_content[:start] + new_str + updated_content[end:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("Code files separated and data/designPatterns.ts updated successfully.")

# Call the function with the target file path
process_design_patterns_data("C:/Users/taku1/OneDrive - 公立大学法人大阪/workspace_study/algorithm_app/data/designPatterns.ts")