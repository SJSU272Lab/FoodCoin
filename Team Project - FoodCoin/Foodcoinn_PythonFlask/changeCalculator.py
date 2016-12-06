import csv

f = open('week_before.csv')
csv_f = csv.reader(f)
file = open('week_after.csv')
csv_file = csv.reader(file)
input_parameters_before = []
my_data_before = []
input_parameters_after = []
my_data_after = []
for row in csv_f:
    input_parameters_before.append(row[0])
    input_parameters_before.append(row[1])
    input_parameters_before.append(row[2])
    my_data_before.append(input_parameters_before)
    input_parameters_before = []

for row in csv_file:
    input_parameters_after.append(row[0])
    input_parameters_after.append(row[1])
    input_parameters_after.append(row[2])
    my_data_after.append(input_parameters_after)
    input_parameters_after = []

def calculate():
    addQuantityWastedB=0
    for i in my_data_before:
        addQuantityWastedB=addQuantityWastedB+int(i[1])
    revenueLostB=[]
    for i in my_data_before:
        revenueLostB.append(int(i[2]))
    totalB=0
    totalB= sum(revenueLostB)
    addQuantityWastedA=0
    for i in my_data_after:
        addQuantityWastedA=addQuantityWastedA+int(i[1])
    revenueLostA=[]
    for j in my_data_after:
        revenueLostA.append(int(j[2]))
    totalA=0
    totalA= sum(revenueLostA)
    return addQuantityWastedB,addQuantityWastedA,totalB,totalA

def sendChanges():
    addQuantityWastedB,addQuantityWastedA,totalB,totalA=calculate()
    data={}
    data={"wastedbefore":addQuantityWastedB,"wastedafter":addQuantityWastedA,"revenuebefore":totalB,"revenueafter":totalA}
    return data
