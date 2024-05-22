import json
import csv

def flatten_json(y, parent_key=''):
    out = {}

    def flatten(x, name=''):
        if type(x) is dict:
            for a in x:
                # If the parent key is "translation", do not add it to the key name
                if name == 'translation_':
                    flatten(x[a], a + '_')
                else:
                    flatten(x[a], name + a + '_')
        elif type(x) is list:
            i = 0
            for a in x:
                flatten(a, name + str(i) + '_')
                i += 1
        else:
            out[name[:-1]] = x

    flatten(y, parent_key)
    return out

def json_to_csv(json_file, csv_file):
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Check if the data is a dictionary or list of dictionaries
    if isinstance(data, dict):
        data = [data]  # Convert dictionary to a list of one dictionary
    
    # Flatten each dictionary in the list
    flattened_data = [flatten_json(item) for item in data]

    with open(csv_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Key', 'Value'])
        for item in flattened_data:
            for key, value in item.items():
                writer.writerow([key, value])


# Example usage
json_to_csv('website-marketplace-translations.json', 'website-marketplace-translations.csv')