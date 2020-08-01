//Store Class: Handle Storage
class Store {
  static getPriceRules() {
    let priceRules;
    if (localStorage.getItem("priceRules") === null) {
      priceRules = [];
    } else {
      priceRules = JSON.parse(localStorage.getItem("priceRules"));
    }
    return priceRules;
  }

  static addPriceRules() {}
}
