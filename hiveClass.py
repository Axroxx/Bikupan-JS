class hiveClass:
    def __init__(self,hexes,words) -> None:
        
        self.all = hexes
        self.badlist = []
        self.avalable = words
        self.complete_amt = -1
        
    
            
    def size(self):
        return len(self.used)+1
        
            
    def gethex(self,i):
        return(self.all[i-1])
    
        
    def updatehexes(self):
                         
        #top
        
        
        ls = [["topLeft","bottomRight","top"],
        ["topRight","bottomLeft","top"],
        ["topLeft","bottom","topLeft"],
        ["left","topRight","topLeft"],
        ["topRight","bottom","topRight"],
        ["right","topLeft","topRight"],
        ["left","bottomRight","bottomLeft"],
        ["bottomLeft","top","bottomLeft"],
        ["right","bottomLeft","bottomRight"],
        ["bottomRight","top","bottomRight"],
        ["bottomLeft","topRight","bottom"],
        ["bottomRight","topLeft","bottom"]]
        
        # some wierd pattern appeared when writing all these by hand, so the list above fixed
        # code length
        
        for hex in self.all: # this makes sure all hexes gets their neighbours values
            for i in ls:
                try:
                    a = self.all[hex.nb[i[0]]-1].sides[i[1]]
                    if hex.sides[i[2]] != a and a != " " and hex.sides[i[2]] == " ":
                        hex.sides[i[2]] = self.all[hex.nb[i[0]]-1].sides[i[1]]
                        
                except:
                    pass
      
        self.complete_amt = -1
        for hex in self.all:
            hex.update() 
            
            if hex.complete:
                self.complete_amt += 1
              
            
    """
    
    def __repr__(self): # function for printing the hive neatly. can probably be shortened
        s = ""
        n = 1
        
        
        l = (0,7,14,21)
        l2 = (4,11,18,25)
        l0 = (3,10,17,24)
        
        index = 0
        
        for ran in l:
            s += "   "
            for i in range(ran,l2[index]):
                if self.all[i].sides["top"] != " ":
                    s += self.all[i].sides["top"] + "     "
                else:
                    s += "-     "

            s += "\n"
                
            
            for i in range(ran,l2[index]):
                if self.all[i].sides["topLeft"] != " ":
                    s += self.all[i].sides["topLeft"] + "     "
                else:
                    s += "-     "
            
            if self.all[l0[index]].sides["topRight"] != " ":
                s += self.all[l0[index]].sides["topRight"] + "     "
            else:
                s += "-     "
            
            
            # num
            s += "\n   "
            for i in range(4):
                s += colored(str(n),"red") + "    "
                if n < 10:
                    s += " "
                n += 1

            s += "\n"
            for i in range(ran,l2[index]):
                if self.all[i].sides["bottomLeft"] != " ":
                    s += self.all[i].sides["bottomLeft"] + "     "
                else:
                    s += "-     "
            if self.all[i].sides["bottomRight"] != " ":
                    s += self.all[i].sides["bottomRight"] + "     "
            else:
                s += "-     "
                
            
            s += "\n   "
            for i in range(ran,l2[index]):
                if self.all[i].sides["bottom"] != " ":
                    s += self.all[i].sides["bottom"] + "     "
                else:
                    s += "-     "
            
            index += 1
                
            s += "\n      "
            
            if ran != 21:

                for i in range(3):
                    s += colored(str(n),"red") + "    "
                    if n < 10:
                        s += " "
                    n += 1
            
            s += "\n"
            
        
        return(s)
            
    
            """