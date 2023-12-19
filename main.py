from hexClass import *
from hiveClass import *
import copy

totalpermu = 1

#Letters go in clock-order
order = []

    


           
def orderfun(hive,start):
    #function for making the selection order start from the center out
    
    nbs = [start-1]
    index = 0
    
    while len(nbs) < 25:
        for k,v in hive.all[nbs[index]].nb.items():
            if v-1 not in nbs:
                nbs.append(v-1)
        index+=1
    
    nbs.pop(0)
    
    return nbs
            

def flatten(lst):
    # function to flatten lists, for example [[[a]],[b]] => [a,b]
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

def remove_duplicates(lst):
    # removes dictionary duplicates
    return list({str(item): item for item in lst}.values())


def insert(hive,index):
    permutations = []
    size = hive.complete_amt
    
    for word in hive.avalable: # each hive has their own avalable stack
        
        outcomes = hive.all[index].insertWord(word) # outcomes check if the word also can be inserted backwards
        
        
        if outcomes != []:
            outcomes = remove_duplicates(outcomes)
            for outcome in outcomes:
                hive_copy = copy.deepcopy(hive) 
                hive_copy.all[index].sides = outcome
                
                hive_copy.updatehexes() # updates all neighbours
                
                hive_copy.complete_amt += 1
                hive_copy.avalable.remove(word)
                    
                #if index == 14:    
                    #print(hive_copy)
                permutations.append(hive_copy)
                
    
    nl = []
    
    # for some reason, the program returns copies of the starting hive, so it has to be removed
    for perm in permutations:
        if perm.complete_amt > size:
            nl.append(perm)
    
    return nl
    
                        
                        
def run(hives,index):
    
    permutations = []
    
    for hive in hives:
        permutations.append(insert(hive,index))
    
    permutations = flatten(permutations)
        
    return permutations             
 
    
    


def main(words, x, start): # x = starting index, start is starting word
    global order
    
    hexes = []
    
    # initializing all hexes
    for i in range(1,26):
        hexes.append(hexClass(i," "," "," "," "," "," ","",False))
        
    # starting hex   
    
    hexes[x-1] = start
    
    
    # importaint
    hive = hiveClass(hexes,words)
    
    hive.updatehexes()
    
    order = orderfun(hive,x)
    
      
    
    # dictionary where the key is the amount of inserted words
    tree = {0:[hive]}
    i = 0
    
    print(tree[0][0])
    
    x = 0
    for index in order:  
        x += 1
        print("Inserting at", index+1,"\n")
        permutations = []
        
        permutations = run(tree[i],index)
        
        i += 1
        
        tree[i] = flatten(permutations)
            
        print(tree[i][0])
        
        print("Total permutations:",len(tree[i]),"\n")
        
        print(tree[i][0].avalable)
        
        print("Complete amount: ", tree[i][0].complete_amt, "\n")
        
        if i == 24:
            for item in tree[24]:
                print(item)
        
        