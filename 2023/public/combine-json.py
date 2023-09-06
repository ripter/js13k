import os
import json

root_path = '.'  # Starting from the current directory
combined_data = {}

# Recursively walk through each directory
for dirpath, dirnames, filenames in os.walk(root_path):
    # For each .json file in the directory
    for filename in filenames:
        if filename.endswith('.json'):
            with open(os.path.join(dirpath, filename), 'r') as f:
                data = json.load(f)
                
                # Determine the key to be used in the final dict (based on directory name)
                key = os.path.basename(dirpath)
                
                if key not in combined_data:
                    combined_data[key] = []
                
                combined_data[key].append(data)

# Write combined data to the final json file
with open('combined.json', 'w') as outfile:
    json.dump(combined_data, outfile, indent=4)

print("JSON files combined!")
