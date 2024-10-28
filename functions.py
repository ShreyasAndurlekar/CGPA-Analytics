import pandas as pd

pd.set_option('display.max_rows', None)
file_path = 'data/sem4.xlsx'
df = pd.read_excel(file_path)

df['Average'] = (df['S.G.P.A'] + df['C.G.P.A']) / 2

def extract_division(batch):
    return batch[0]                    

def find_students_moved(old_data, new_data, old_division, new_division):

    old_data['Division'] = old_data['Batch'].apply(extract_division)        
    new_data['Division'] = new_data['Batch'].apply(extract_division)

    students_old_division = old_data[old_data['Division'] == old_division][['Name', 'Batch']]
    students_moved = new_data[new_data['Division'] == new_division]
    students_moved = students_moved[students_moved['Name'].isin(students_old_division['Name'])] 
    return students_moved

def get_cgpa(name, df_sem3, df_sem4, df_sorted):
    
    name_set = set(name.lower().split())
    result_sem4 = df_sem4[df_sem4['Name_Set'].apply(lambda x: name_set.issubset(x))]
    result_sem3 = df_sem3[df_sem3['Name_Set'].apply(lambda x: name_set.issubset(x))]

    if result_sem4.empty:
        return f"No student found with the name: {name} in sem4.xlsx"
    elif len(result_sem4) > 1:
        return f"Multiple matches found for: {name} in sem4.xlsx. Please provide a more specific name."
    if result_sem3.empty:
        return f"No student found with the name: {name} in sem3.xlsx"

    full_name = result_sem4['Name'].values[0]
    cgpa_sem4 = result_sem4['C.G.P.A'].values[0]
    rank = int(df_sorted[df_sorted['Name'] == full_name]['Rank'].values[0])
    matching_sem3 = result_sem3[result_sem3['Name'] == full_name]

    if not matching_sem3.empty:
        cgpa_sem3 = matching_sem3['C.G.P.A'].values[0]
        if cgpa_sem3 == 0:
            percentage_increase = "N/A (previous CGPA was 0)"
        else:
            percentage_increase = (cgpa_sem4 - cgpa_sem3) * 10
            percentage_increase = f"{percentage_increase:.2f}%"
    else:
        percentage_increase = "N/A (student not found in sem3.xlsx)"
    
    return f"Name: {full_name}\nCGPA: {cgpa_sem4}\nRank: #{rank}\nRate of Change: {percentage_increase}"

def gender_cgpa():

    df = pd.read_excel('data/sem4.xlsx', sheet_name=0)
    average_cgpa_by_gender = df.groupby('Gender')['C.G.P.A'].median().reset_index()
    overall_mean_cgpa = df['C.G.P.A'].mean()
    print(average_cgpa_by_gender)
    print(overall_mean_cgpa)
    students_above_8_cgpa = df[df['C.G.P.A'] > 8]
    count_above_8_cgpa = students_above_8_cgpa.shape[0]
    print(count_above_8_cgpa)

    chunk_size = 60
    num_chunks = (len(df) + chunk_size - 1) // chunk_size  # Calculate the number of chunks
    
    print("\nBoys to Girls Ratio for Every 60 Rows:")
    for i in range(num_chunks):
        chunk = df.iloc[i*chunk_size:(i+1)*chunk_size]
        boys_count = (chunk['Gender'] == 'Male').sum()
        girls_count = (chunk['Gender'] == 'Female').sum()
        
        # Format the ratio as "boys_count:girls_count"
        ratio = f"{boys_count}:{girls_count}"
        
        print(f"Chunk {i + 1}: Boys to Girls Ratio = {ratio}")

def hardest():

    df1 = pd.read_excel('data/sem3.xlsx')  
    df2 = pd.read_excel('data/sem4.xlsx')  

    courses1 = ['EM-III', 'BELD', 'DBMS', 'DS', 'COA']
    courses2 = ['DM', 'TCS', 'OS', 'CN', 'DAA']

    grade_mapping = {'O': 7, 'A': 6, 'B': 5, 'C': 4, 'D': 3, 'E': 2, 'P': 1, 'Fail': 0, 'xxx': 0}

    for course in courses1:
        df1[course] = df1[course].map(grade_mapping)

    lowest_grade_course1 = df1[courses1].mean().idxmin()
    print(f"The course with the lowest grades in semester 3 is: {lowest_grade_course1}")


    for course in courses2:
        df2[course] = df2[course].map(grade_mapping)

    lowest_grade_course2 = df2[courses2].mean().idxmin()
    print(f"The course with the lowest grades in semester 4 is: {lowest_grade_course2}")

def barack():

    df_sem3 = pd.read_excel('data/sem3.xlsx')  
    df_sem4 = pd.read_excel('data/sem4.xlsx')  

    df_sem3['C.G.P.A'] = pd.to_numeric(df_sem3['C.G.P.A'], errors='coerce')
    df_sem4['C.G.P.A'] = pd.to_numeric(df_sem4['C.G.P.A'], errors='coerce')

    merged_df = pd.merge(df_sem3[[ 'Name', 'C.G.P.A']], 
                        df_sem4[[ 'Name', 'C.G.P.A']], 
                        on='Name', suffixes=('_sem3', '_sem4'))

    merged_df['CGPA_Increase'] = merged_df['C.G.P.A_sem4'] - merged_df['C.G.P.A_sem3']

    top_5_increases = merged_df.sort_values(by='CGPA_Increase', ascending=False).head(15)

    print(top_5_increases[['Name', 'C.G.P.A_sem3', 'C.G.P.A_sem4', 'CGPA_Increase']])






