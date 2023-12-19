let totalpermu = 1;
let order = [];

function orderfun(hive, start) {
    let nbs = [start - 1];
    let index = 0;

    while (nbs.length < 25) {
        for (let [k, v] of Object.entries(hive.all[nbs[index]].nb)) {
            if (!nbs.includes(v - 1)) {
                nbs.push(v - 1);
            }
        }
        index += 1;
    }

    nbs.shift();
    return nbs;
}

function flatten(lst) {
    return lst.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

function remove_duplicates(lst) {
    return Array.from(new Set(lst.map(JSON.stringify))).map(JSON.parse);
}

function insert(hive, index) {
    let permutations = [];
    let size = hive.complete_amt;

    for (let word of hive.available) {
        let outcomes = hive.all[index].insertWord(word);

        if (outcomes.length !== 0) {
            outcomes = remove_duplicates(outcomes);
            for (let outcome of outcomes) {
                let hive_copy = JSON.parse(JSON.stringify(hive));
                hive_copy.all[index].sides = outcome;

                hive_copy.updatehexes();
                hive_copy.complete_amt += 1;
                hive_copy.available = hive_copy.available.filter(item => item !== word);

                permutations.push(hive_copy);
            }
        }
    }

    let nl = [];
    for (let perm of permutations) {
        if (perm.complete_amt > size) {
            nl.push(perm);
        }
    }

    return nl;
}

function run(hives, index) {
    let permutations = [];

    for (let hive of hives) {
        permutations.push(insert(hive, index));
    }

    return flatten(permutations);
}

function main(words, x, start) {
    let hexes = [];

    for (let i = 1; i <= 26; i++) {
        hexes.push(new HexClass(i, " ", " ", " ", " ", " ", " ", " ", false));
    }

    hexes[x - 1] = start;

    let hive = new HiveClass(hexes, words);
    hive.updatehexes();

    order = orderfun(hive, x);

    let tree = {0: [hive]};
    let i = 0;

    console.log(tree[0][0]);

    let x = 0;
    for (let index of order) {
        x += 1;
        console.log("Inserting at", index + 1, "\n");
        let permutations = [];

        permutations = run(tree[i], index);

        i += 1;

        tree[i] = flatten(permutations);

        if (i === 24) {
            for (let item of tree[24]) {
                console.log(item);
            }
        }
    }
}




class HexClass {
    constructor(number, t, tr, br, b, bl, tl, word, complete) {
      this.number = parseInt(number);
      this.word = word;
      this.complete = complete;
      this.empty = true;
  
      this.order = ["top", "topRight", "bottomRight", "bottom", "bottomLeft", "topLeft"];
      this.revorder = ["topLeft", "bottomLeft", "bottom", "bottomRight", "topRight", "top"];
  
      // Sides
      this.sides = {"top":t, "topRight":tr, "bottomRight":br, "bottom":b, "bottomLeft":bl, "topLeft":tl};
  
      this.nb = {};
  
      // this gives each hex their neighbours
      if (![1,5,8,12,15,19,22].includes(this.number)) {
        this.nb["left"] = this.number - 1;
      }
  
      if (![4, 7, 11, 14, 18, 21, 25].includes(this.number)) {
        this.nb["right"] = this.number + 1;
      }
  
      if (![1,2,3,4].includes(this.number)) {
        if (this.number % 7 !== 1) {
          this.nb["topLeft"] = this.number - 4;
        }
  
        if (![11, 18, 25].includes(this.number)) {
          this.nb["topRight"] = this.number - 3;
        }
      }
  
      if (![22,23,24,25].includes(this.number)) {
        if (this.number % 7 !== 1) {
          this.nb["bottomLeft"] = this.number + 3;
        }
  
        if (![4,11,18].includes(this.number)) {
          this.nb["bottomRight"] = this.number + 4;
        }
      }
    }
  
    update() {
      let res = "";
      for (let k in this.sides) {
        if (this.sides[k] !== null) {
          res += this.sides[k];
        }
      }
      res = res.trim();
      this.word = res;
  
      if (Object.values(this.sides).every(value => value === " ")) {
        this.empty = true;
      } else {
        this.empty = false;
      }
  
      if (Object.values(this.sides).every(value => value !== " ")) {
        this.complete = true;
      } else {
        this.complete = false;
      }
    }
  
    getside(side) {
      return this.sides[side];
    }
  
    insertWord(word) {
      let ls = [this.order, this.revorder];
      let possible_outcomes = [];
  
      for (let o of ls) {
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 6; j++) {
            // Find the number of matching consecutive letters
            let matching_count = 0;
            for (let k = 0; k < 6; k++) {
              if (word[(k+i)%6] === this.sides[o[(k+j)%6]]) {
                matching_count += 1;
              } else {
                break;
              }
            }
  
            // If 2 or more consecutive letters match, insert the word
            if (matching_count > 1) {
              if (o.map((l, index) => this.sides[o[(l+j)%6]]).every(value => [word[(value+i)%6], " "].includes(value))) {
                let new_outcome = {...this.sides};
                for (let k = 0; k < 6; k++) {
                  new_outcome[o[(k+j)%6]] = word[(k+i)%6];
                }
                possible_outcomes.push(new_outcome);
              }
            }
          }
        }
      }
  
      let returnal = [];
      for (let item of possible_outcomes) {
        if (!returnal.includes(item)) {
          returnal.push(item);
        }
      }
  
      return returnal;
    }
  }


  class HiveClass {
    constructor(hexes, words) {
      this.all = hexes;
      this.badlist = [];
      this.available = words;
      this.complete_amt = -1;
    }
  
    size() {
      return this.used.length + 1;
    }
  
    gethex(i) {
      return this.all[i - 1];
    }
  
    updatehexes() {
      let ls = [
        ["topLeft", "bottomRight", "top"],
        ["topRight", "bottomLeft", "top"],
        ["topLeft", "bottom", "topLeft"],
        ["left", "topRight", "topLeft"],
        ["topRight", "bottom", "topRight"],
        ["right", "topLeft", "topRight"],
        ["left", "bottomRight", "bottomLeft"],
        ["bottomLeft", "top", "bottomLeft"],
        ["right", "bottomLeft", "bottomRight"],
        ["bottomRight", "top", "bottomRight"],
        ["bottomLeft", "topRight", "bottom"],
        ["bottomRight", "topLeft", "bottom"]
      ];
  
      for (let hex of this.all) {
        for (let i of ls) {
          try {
            let a = this.all[hex.nb[i[0]] - 1].sides[i[1]];
            if (hex.sides[i[2]] !== a && a !== " " && hex.sides[i[2]] === " ") {
              hex.sides[i[2]] = this.all[hex.nb[i[0]] - 1].sides[i[1]];
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
  
      this.complete_amt = -1;
      for (let hex of this.all) {
        hex.update();
        if (hex.complete) {
          this.complete_amt += 1;
        }
      }
    }
  }
  