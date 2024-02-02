#!/bin/bash

# Prompt the user for the project value
echo -n "Enter the project name: "
read project_name

# Path to your JSON file
json_file="./src/config.json"

# Check if the file exists
if [ -f "$json_file" ]; then
    # Use jq to modify the JSON file
    jq --arg project "$project_name" '.project = $project' "$json_file" > tmp.json && mv tmp.json "$json_file"
    echo "Project field updated successfully!"
else
    echo "Error: JSON file '$json_file' not found."
fi
