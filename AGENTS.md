# AGENTS.md - Repository Guidelines for Agentic Coding

This repository contains a Jekyll-based Python educational website with interactive Python examples. This document provides guidelines for agentic coding agents working in this repository.

## Project Overview

This is a Python workshop and tutorial site built with Jekyll. The site contains:
- Educational content about Python programming
- Interactive Python code examples using PyScript and py-editor
- Jekyll-based static site generation
- Browser-based Python terminal emulator

## Build and Development Commands

### Primary Commands
```bash
# Start development server with live reload
./dev.sh
# or: bundle exec jekyll serve

# Build production site
./build.sh  
# or: JEKYLL_ENV=production bundle exec jekyll build

# Install Ruby dependencies (if needed)
bundle install
```

### Testing and Validation
```bash
# Check Jekyll site for build errors
bundle exec jekyll doctor

# Validate markdown syntax (if markdownlint is available)
markdownlint _01-introduction/*.md _02-lab-1/*.md

# Check links in generated site
bundle exec html-proofer ./_site --check-html --check-opengraph --report-missing-names --log-level :debug
```

## File Structure and Conventions

### Content Organization
- `_01-introduction/`: Basic Python concepts and syntax
- `_02-lab-1/`: Lab exercises and practical setup guides
- `terminal/`: Browser-based Python terminal implementation
- `99-exercise/`: Interactive Python exercises using PyScript
- `docs/`: Generated static site (auto-generated, do not edit)

### Naming Conventions
- Markdown files: Use descriptive names with hyphens, e.g., `01-prerequisites.md`
- Front matter: Use lowercase keys, follow Jekyll conventions
- Python variables: Use `snake_case` for variable and function names
- Constants: Use `UPPER_SNAKE_CASE` for constants
- Classes: Use `PascalCase` (rarely used in educational content)

## Code Style Guidelines

### Python Code Examples

#### Formatting
- **Indentation**: 4 spaces (never tabs)
- **Line length**: Maximum 88-100 characters for readability
- **Imports**: Standard library first, then third-party, then local imports
- **Whitespace**: Use blank lines to separate logical sections

```python
# Good example
def calculate_average(numbers):
    """Calculate the arithmetic mean of a list of numbers."""
    if not numbers:
        return 0
    
    total = sum(numbers)
    return total / len(numbers)

result = calculate_average([1, 2, 3, 4, 5])
print(f"The average is: {result}")
```

#### Naming Patterns
- Function names: `verb_noun()` or descriptive action names
- Variable names: Descriptive, avoid single letters except for counters
- Use meaningful names that explain the purpose

```python
# Good
def process_user_data(user_list):
    for user_index, user in enumerate(user_list):
        user_id = user.get('id')
        if user_id:
            print(f"Processing user {user_index}: {user_id}")

# Avoid
def proc(l):
    for i, x in enumerate(l):
        y = x.get('id')
        if y:
            print(f"User {i}: {y}")
```

### Markdown and Jekyll Content

#### Front Matter Format
```yaml
---
layout: page
title: Descriptive Page Title
permalink: /category/page-name
---
```

#### Content Structure
- Use proper heading hierarchy (`#`, `##`, `###`)
- Include navigation links at bottom of pages
- Use Jekyll tabs component for OS-specific instructions
- Include external link indicators for off-site references

```markdown
<div class="prevnextlinks">
    <a id="previous" href="previous-page">Previous: Previous Topic</a>
    <a id="next" href="next-page">Next: Next Topic</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}"></script>
```

### Python Code Integration

#### Interactive Code Blocks
For executable Python examples, use the py-editor format:

```html
<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def example_function():
    return "Hello, World!"

result = example_function()
print(result)
</script></pre></div>
```

#### Static Code Examples
For non-interactive examples, use standard markdown:

```python
# This is a static code example
import math

def calculate_circle_area(radius):
    return math.pi * radius ** 2

area = calculate_circle_area(5)
print(f"Circle area: {area:.2f}")
```

## Error Handling and Debugging

### Python Code Examples
- Include try-catch blocks for error-prone operations
- Provide clear error messages and explanations
- Show both incorrect and correct approaches when teaching

```python
def safe_divide(a, b):
    """Safely divide two numbers, handling division by zero."""
    try:
        return a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Both arguments must be numbers!")
        return None
```

### Jekyll Build Issues
- Check YAML front matter for syntax errors
- Validate markdown syntax
- Ensure proper liquid template syntax
- Check for missing required files in `exclude:` list

## Dependencies and Requirements

### Ruby/Jekyll Dependencies
- Jekyll ~> 4.4.1
- Minima theme ~> 2.5
- jekyll-seo-tag
- jekyll-sitemap  
- jekyll-tabs

### External Dependencies
- PyScript 2025.2.3 (for interactive exercises)
- jQuery Terminal (for web terminal)
- Google Fonts (JetBrains Mono, Red Hat Mono)

## Security Considerations

- Never commit sensitive information (API keys, passwords)
- Validate all user inputs in interactive examples
- Use HTTPS for all external resources
- Keep dependencies updated regularly

## Content Guidelines

### Educational Content Standards
- Progress from simple to complex concepts
- Include practical, runnable examples
- Provide clear explanations for each code block
- Include common pitfalls and how to avoid them
- Use consistent terminology throughout

### Accessibility
- Use semantic HTML structure
- Provide alt text for images
- Ensure proper color contrast
- Include keyboard navigation for interactive elements

## Performance Considerations

- Optimize images for web (compress, appropriate formats)
- Minimize external dependencies
- Use efficient Python examples that load quickly
- Consider impact of PyScript on page load times

## Common Tasks

### Adding New Content
1. Create new markdown file in appropriate directory
2. Add proper front matter with title and permalink
3. Include navigation links at bottom
4. Test with `./dev.sh` before committing

### Updating Python Examples
1. Test code in actual Python interpreter first
2. Verify syntax and logic
3. Update both static and interactive versions if applicable
4. Test in browser for interactive examples

### Jekyll Configuration Changes
1. Test changes locally first
2. Verify site builds without errors
3. Check that all pages render correctly
4. Run full production build before deployment

This repository prioritizes educational clarity and interactive learning experiences over production optimization. All changes should enhance the learning experience and maintain code accuracy.