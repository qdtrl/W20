class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateItemQuality() {
    this.sellIn -= 1;
    if (this.quality >= 50 || this.quality === 0) {
      return this;
    } else if (this.isConjured()) {
      this.quality -= 2;
      return this;
    } else {
      this.quality -= 1;
      return this;
    }
  }

  isConjured() {
    const nameConjured = this.name.split(" ")[0];
    if (nameConjured === "Conjured") {
      return true;
    }
    return false;
  }
}

class Cheese extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    if (this.quality >= 50) {
      this.quality = 50;
      return this;
    } else if (this.sellIn >= 10) {
      this.quality += 1;
      return this;
    } else if (this.sellIn > 5) {
      this.quality += 2;
      return this;
    } else {
      this.quality += 3;
      return this;
    }
  }
}

class Legendary extends Item {
  constructor(name) {
    super(name);
    this.sellIn = "infini";
    this.quality = 80;
  }

  updateItemQuality() {
    return this;
  }
}

class BackstagePasses extends Item {
  updateItemQuality() {
    this.sellIn -= 1;
    if (this.sellIn < 0) {
      this.quality = 0;
      return this;
    } else if (this.quality >= 50) {
      this.quality = 50;
      return this;
    } else if (this.sellIn >= 10) {
      this.quality += 1;
      return this;
    } else if (this.sellIn > 5) {
      this.quality += 2;
      return this;
    } else {
      this.quality += 3;
      return this;
    }
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.map( item => {
      item.updateItemQuality();
    })
  }

  lookShopItems() {
    this.items.forEach( item => {
      console.log(`%c${item.name}%c de qualité %c${item.quality}%c points, disponible pendant : %c${item.sellIn}%c jours.`, "color:green", "","color:red", "", "color:blue", "" )
    })
  }
}

// const listItems = [
//   new Item("Dexterity Vest", 10, 20),
//   new Item("Conjured Dexterity Vest", 10, 20),
//   new Cheese("Aged Brie", 20, 30),
//   new Legendary("Scalibur", 32, 89),
//   new BackstagePasses("to a TAFKAL80ETC concert", 20, 30)
// ]
// let gildedRose = new Shop(listItems);
// gildedRose.lookShopItems();
// console.log(gildedRose);
// gildedRose.updateQuality();
// gildedRose.lookShopItems();

module.exports = {
  Item,
  Cheese,
  Legendary,
  BackstagePasses,
  Shop
}
