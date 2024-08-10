import pandas as pd

def extract_division(batch):
    return batch[0]                    

def find_students_moved(old_data, new_data, old_division, new_division):

    old_data['Division'] = old_data['Batch'].apply(extract_division)        
    new_data['Division'] = new_data['Batch'].apply(extract_division)

    students_old_division = old_data[old_data['Division'] == old_division][['Name', 'Batch']]
    students_moved = new_data[new_data['Division'] == new_division]
    students_moved = students_moved[students_moved['Name'].isin(students_old_division['Name'])] 
    return students_moved

def get_cgpa(name):
    try:
       
        df = pd.read_excel('data/sem4.xlsx', sheet_name=0)
        
        # Convert all names to lowercase and split into sets of words
        df['Name_Set'] = df['Name'].str.lower().apply(lambda x: set(x.split()))
        
        # Convert input name to lowercase and split into a set of words
        name_set = set(name.lower().split())
        
        # Find the row where all words in the input name are present
        result = df[df['Name_Set'].apply(lambda x: name_set.issubset(x))]
        
        if result.empty:
            return f"No student found with the name: {name}"
        elif len(result) > 1:
            return f"Multiple matches found for: {name}. Please provide a more specific name."
        else:
            full_name = result['Name'].values[0]
            cgpa = result['C.G.P.A'].values[0]
            return f"The CGPA of {full_name} is {cgpa}"
    
    except FileNotFoundError:
        return "Error: The file 'sem4.xlsx' was not found in the 'data' folder."
    except Exception as e:
          return f"An error occurred: {str(e)}\nAvailable columns: {df.columns.tolist()}"

def gender_cgpa():

    df = pd.read_excel('data/sem4.xlsx', sheet_name=0)
    average_cgpa_by_gender = df.groupby('Gender')['C.G.P.A'].mean().reset_index()
    overall_mean_cgpa = df['C.G.P.A'].mean()
    print(average_cgpa_by_gender)
    print(overall_mean_cgpa)
    students_above_8_cgpa = df[df['C.G.P.A'] > 8]
    count_above_8_cgpa = students_above_8_cgpa.shape[0]
    print(count_above_8_cgpa)

gender_cgpa()



