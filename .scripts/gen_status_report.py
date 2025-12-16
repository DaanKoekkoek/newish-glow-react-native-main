import os
import re
import datetime
from collections import Counter
import webbrowser

def generate_component_status_report(folder_path):
    """
    Generates a status report for Javascript components by scanning .stories.tsx files.

    Args:
        folder_path: The path to the root folder containing component folders.

    Returns:
        A dictionary where keys are component names and values are lists of status labels.
    """

    component_statuses = {}

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".stories.tsx"):
                filepath = os.path.join(root, file)
                component_name = file.replace(".stories.tsx", "")
                statuses = extract_component_status(filepath)
                component_statuses[component_name] = statuses

    return component_statuses

def extract_component_status(filepath):
    """
    Extracts the status labels from a component's .stories.tsx file.

    Args:
        filepath: The path to the .stories.tsx file.

    Returns:
        A list of status labels found in the file, or an empty list if no status is found.
    """
    statuses = []
    try:
        with open(filepath, 'r') as f:
            content = f.read()

            # Use regex to find the parameters.status.type block
            status_block_match = re.search(r'parameters:\s*?{\s*?status:\s*?{\s*?type:\s*?\[(.*?)\]', content, re.DOTALL)
            if status_block_match:
                status_list_str = status_block_match.group(1)
                # Clean up the string and split into individual statuses
                status_labels = [status.strip().strip('"').strip("'") for status in status_list_str.strip().split(',') if status.strip()]
                statuses = status_labels
            else:
                # print(f"Warning: No 'parameters.status.type' block found in {filepath}")
                pass

    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
    except Exception as e:
        print(f"Error reading file {filepath}: {e}")

    return statuses

def generate_csv_string(component_statuses):
    """
    Generates a CSV string from the component status data.

    Args:
        component_statuses: A dictionary of component statuses.

    Returns:
        A string containing the CSV data.
    """
    csv_header = "Component,Statuses\n"
    csv_rows = []
    for component_name, statuses in component_statuses.items():
        status_str = ", ".join(statuses) if statuses else "No status found"
        csv_rows.append(f"{component_name},{status_str}")
    csv_content = csv_header + "\n".join(csv_rows)

    # Escape special HTML characters for <pre> tag display (important for commas and newlines in CSV)
    csv_content_escaped = csv_content.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

    csv_html = f"""
<h2>CSV Export</h2>
<p>Copy the text below and paste it into your spreadsheet software (e.g., Excel).</p>
<ul>
    <li>Select the first cell (usually A1) where you want to paste the data.</li>
    <li>Paste the text (Ctrl+V or right-click and select "Paste").</li>
    <li>Select the column where you pasted the data (usually column A).</li>
    <li>Go to the Data tab on the Ribbon.</li>
    <li>Click on Text to Columns.</li>
</ul>

<p>In the Convert Text to Columns Wizard:</p>

<ul>
<li>Choose Delimited and click Next.</li>
<li>Check the Comma delimiter and click Next.</li>
<li>Click Finish.</li>
</ul>
<p>This should split the data into separate columns based on the commas.</p>
<pre style="border: 1px solid black; padding: 10px; overflow-x: auto;">
{csv_content_escaped}
</pre>
<br><br><br><br>
</body>
</html>
"""
    return csv_html

def generate_html_report(component_statuses):
    """
    Generates an HTML report as a string from the component status data, including summary, percentages, and color coding.

    Args:
        component_statuses: A dictionary of component statuses.

    Returns:
        A string containing the HTML report.
    """

    total_components = len(component_statuses)
    ux_passed_count = 0
    qa_passed_count = 0
    no_status_count = 0  # Counter for components with no status

    status_counts = Counter()  # Use Counter for all status labels

    report_generation_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for component_name, statuses in component_statuses.items():  # Need component_name for "No status found"
        if not statuses:  # Check for empty status list (no status found)
            no_status_count += 1
        else:
            status_counts.update(statuses)  # Count occurrences of each status label

    ux_passed_count = status_counts.get("uxPassed", 0)  # Get counts from Counter, default 0
    qa_passed_count = status_counts.get("qaPassed", 0)
    fresh_count = status_counts.get("fresh", 0)  # Add count for 'fresh'

    ux_passed_percentage = (ux_passed_count / total_components) * 100 if total_components > 0 else 0
    qa_passed_percentage = (qa_passed_count / total_components) * 100 if total_components > 0 else 0
    no_status_percentage = (no_status_count / total_components) * 100 if total_components > 0 else 0
    fresh_percentage = (fresh_count / total_components) * 100 if total_components > 0 else 0

    status_color_map = {  # Define status to color mapping
        "uxPassed": "green",
        "qaPassed": "lightblue",
        "fresh": "orange",
        "releaseCandidate": "violet"
    }

    html_content = f"""
<!DOCTYPE html>
<html>
<head>
<title>Component Status Report</title>
<style>
  .status-cell {{ padding: 8px; }}
  .status-uxPassed {{ background-color: green; color: white; }}
  .status-qaPassed {{ background-color: lightblue; }}
  .status-fresh {{ background-color: orange; }}
  .status-no-status {{ background-color: lightgray; }}
    .status-releaseCandidate {{ background-color: violet; color: white; }}
  .status-cell {{
    border: 1px solid black;
    text-align: left;
  }}
</style>
<style>
  body {{ font-family: Arial, sans-serif; }}
  table {{ border-collapse: collapse; width: 100%; margin-top: 20px; }}
  th, td {{ border: 1px solid black; padding: 8px; text-align: left; }}
  th {{ background-color: #f2f2f2; }}
  .summary-box {{
    border: 1px solid black;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #e6f7ff; /* Light blue background for summary */
  }}
  .summary-box h2 {{ margin-top: 0; }}
  .summary-box p {{ margin-bottom: 5px; }}
  .small-text {{ font-size: 0.8em; color: gray; }}
</style>
</head>
<body>

<h1>Component Status Report</h1>

<div class="summary-box">
  <h2>Summary</h2>
  <p>Total Components: <strong>{total_components}</strong></p>
  <p>UX Passed Status: <strong>{ux_passed_count}</strong> ({ux_passed_percentage:.2f}%)</p>
  <p>QA Passed Status: <strong>{qa_passed_count}</strong> ({qa_passed_percentage:.2f}%)</p>
 <p class="small-text">Report Generated At: <strong>{report_generation_time}</strong></p>
</div>

<table>
  <thead>
    <tr>
      <th>Component</th>
      <th>Statuses</th>
    </tr>
  </thead>
  <tbody>
"""

    for component_name, statuses in component_statuses.items():
        if statuses:
            status_str = ", ".join(statuses)
            # For color coding, use the *first* status in the list if available, otherwise no-status
            status_label_for_class = statuses[0]
        else:
            status_str = "No status found"
            status_label_for_class = "no-status"  # Class for no status

        status_class = f"status-{status_label_for_class}" if status_label_for_class in status_color_map else f"status-{status_label_for_class}" if status_label_for_class == "no-status" else ""  # Get class from map or default to status-label

        html_content += f"""
    <tr>
      <td>{component_name}</td>
      <td class="status-cell {status_class}">{status_str}</td>
    </tr>
"""

    html_content += """
  </tbody>
</table>
"""
    csv_export_html = generate_csv_string(component_statuses) # Generate CSV HTML here
    html_content += csv_export_html # Add CSV export HTML to the main HTML content
    return html_content

def export_report_html(html_content, output_filepath="../../.scripts/reports/grw_status_report.html"):
    """
    Exports the HTML report content to a .html file.

    Args:
        html_content: The HTML content string.
        output_filepath: The path to save the HTML file (default: "react_web_report.html").
    """
    try:
        # Create the directory if it does not exist
        os.makedirs(os.path.dirname(output_filepath), exist_ok=True)

        with open(output_filepath, 'w') as f:
            f.write(html_content)
        print(f"Report exported to: {output_filepath}")
    except Exception as e:
        print(f"Error exporting report to HTML file: {e}")

    # Open the HTML file in the default web browser
    webbrowser.open(f"file://{os.path.abspath(output_filepath)}")

if __name__ == "__main__":
    # components_folder = "./packages/glow-react-web/lib/components"  # Path to your components folder
    components_folder = "./lib/components"  # Path when using pnpm commands in package.json
    if not os.path.exists(components_folder):
        print(f"Error: Components folder '{components_folder}' not found. Please adjust the path.")
    else:
        report_data = generate_component_status_report(components_folder)
        html_report = generate_html_report(report_data)
        export_report_html(html_report)