class hexClass:
    def __init__(self,number,t,tr,br,b,bl,tl,word,complete):
        
        self.number = int(number)
        self.word = word
        self.complete = complete
        self.empty = True
        
        self.order = ["top", "topRight", "bottomRight", "bottom", "bottomLeft", "topLeft"]
        
        self.revorder = ["topLeft", "bottomLeft", "bottom", "bottomRight", "topRight", "top"]
        
        # Sides
        self.sides = {"top":t,"topRight":tr,"bottomRight":br,"bottom":b,"bottomLeft":bl,"topLeft":tl}

        self.nb = {}
        
        # this gives each hex their neighbours
        if self.number not in (1,5,8,12,15,19,22):
            self.nb["left"] = self.number - 1
        
        if  self.number not in (4, 7, 11, 14, 18, 21, 25):
            self.nb["right"] = self.number + 1
        
        if self.number not in (1,2,3,4):
    
            if self.number % 7 != 1:
                self.nb["topLeft"] = self.number - 4
                
            if self.number not in (11, 18, 25):
                self.nb["topRight"] = self.number - 3
                
        if self.number not in (22,23,24,25):
            
            if self.number % 7 != 1:
                self.nb["bottomLeft"] = self.number + 3
                
            if self.number not in (4,11,18):
                self.nb["bottomRight"] = self.number + 4
                
                
    
    def update(self):
        res = ""
        for k,v in self.sides.items():
            if v is not None:
                res += self.sides[k]
        res = res.strip()
        self.word = res
        
        if all(value == " " for k, value in self.sides.items()):
            self.empty = True
        else:
            self.empty = False
            
        if all(value != " " for k, value in self.sides.items()):
            self.complete = True
        else:
            self.complete = False
        
    def getside(self,side):
        return self.sides[side]    
    
    def insertWord(self, word):
        ls = [self.order, self.revorder]
        possible_outcomes = []
        # currently returns several copies
        for o in ls: 
            for i in range(6):
                for j in range(6):
                    # Find the number of matching consecutive letters
                    matching_count = 0
                    for k in range(6):
                        if word[(k+i)%6] == self.sides[o[(k+j)%6]]: # magic
                            matching_count += 1
                        else:
                            break

                    # If 2 or more consecutive letters match, insert the word
                    if matching_count > 1:
                        if all(self.sides[o[(l+j)%6]] in (word[(l+i)%6], " ") for l in range(6)): # more magic, but i'm proud
                            new_outcome = self.sides.copy()
                            for k in range(6):
                                
                                new_outcome[o[(k+j)%6]] = word[(k+i)%6]
                            possible_outcomes.append(new_outcome)
                            
        returnal = []
        for item in possible_outcomes:
            if item not in returnal:
                returnal.append(item)
        
            
        return returnal
    
    
    
    
            
            """
    
    def __repr__(self): # prints a small hex of itself.
        x = " "
        if self.number < 10:
            x = "  "
        return("  "+str(self.sides["top"])+"  \n"+str(self.sides["topLeft"]) + x +str(self.number)+" "+
               str(self.sides["topRight"])+"\n"+str(self.sides["bottomLeft"])+"    "+str(self.sides["bottomRight"])+"\n  "+str(self.sides["bottom"]))
    
"""