class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }
    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
  };

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  
  getAllAncasters() {
    let result = [this];
    if (this.creator) {
      result = result.concat(this.creator.getAllAncasters());
    }
    return result;
  };
  
  closestCommonAncestor(vampire) {
    let array1 = this.getAllAncasters();
    let array2 = vampire.getAllAncasters();
    for (const arr1 of array1) {
      if (array2.includes(arr1)) {
        return arr1;
      }
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let obj = null;
    if (name === this.name) {
      return this;
    }
    if (name !== this.name) {
      if (this.offspring.length === 0) {
        return obj;
      }
      for (let index in this.offspring) {
        const vampire = this.offspring[index];
        obj = vampire.vampireWithName(name);
        if (obj) {
          return obj;
        }
      }
    }
    return obj;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (let index in this.offspring) {
      // if (this.offspring.length === 0) {
      // }
      const vampire = this.offspring[index];
      console.log("vampore",vampire.name,vampire.totalDescendents)
      count += vampire.totalDescendents + 1;
    }
    return count;
  }
};


//   /** Stretch **/

//   // Returns the closest common ancestor of two vampires.
//   // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
//   // For example:
//   // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
//   // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
//   closestCommonAncestor(vampire) {

//   }
// }

module.exports = Vampire;

