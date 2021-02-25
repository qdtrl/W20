var { Shop, Item, Cheese, Legendary, BackstagePasses } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et sellIn d'item normaux périmés", function () {
    listItems.push(new Item("+5 Dexterity Vest", -4, 20));
    listItems.push(new Item("Mana Cake", -2, 6));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: -5, quality: 18 },
      { sellIn: -3, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et sellIn d'item 'conjured'", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Conjured Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 2, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et sellIn d'item 'conjured' périmés", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", -10, 20));
    listItems.push(new Item("Conjured Mana Cake", -3, 6));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: -11, quality: 16 },
      { sellIn: -4, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Cheese("Aged Brie", 20, 30));
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter par 2 quand il reste moins de 10 jours et plus de 5 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Cheese("Aged Brie", 10, 30));
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 8, 30));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 32 },
      { sellIn:7, quality: 32 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter par 3 quand il reste 5 jours ou moins pour Aged Brie et Backstage passes", function () {
    listItems.push(new Cheese("Aged Brie", 4, 30));
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 3, 30));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 33 },
      { sellIn: 2, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Les tickets tombent à zéro après la date de péremption", function () {
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 0, 43));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité d'un produit n'est jamais de plus de 50", function () {
    listItems.push(new Item("Brie", 4, 50));
    listItems.push(new Cheese("Aged Brie", 4, 50));
    listItems.push(new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 3, 50));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 50 },
      { sellIn: 3, quality: 50 },
      { sellIn: 2, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité d'un produit n'est jamais négative", function () {
    listItems.push(new Item("Brie", 4, 0));
    listItems.push(new Item("TAFKAL80ETC Robot", 3, 0));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 0 },
      { sellIn: 2, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Les items légendaires ne perdent pas en qualités et ne se périment pas", function () {
    listItems.push(new Legendary("Scalibur", 4, 50));
    listItems.push(new Legendary("Sulfuras", 3, 30));

    const gildedRose = new Shop(listItems);
    gildedRose.updateQuality();

    var expected = [
      { sellIn: "infini", quality: 80 },
      { sellIn: "infini", quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(gildedRose.items[idx].quality).toBe(testCase.quality);
      expect(gildedRose.items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});