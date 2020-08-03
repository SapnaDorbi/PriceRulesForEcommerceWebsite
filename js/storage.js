//Price Rules: Represent a price rule
class PriceRule {
  // constructor(ruleNumber, minPrice, maxPrice, priceAction, applyAs)
}

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

  static addPriceRules(priceRule) {
    const priceRules = Store.getPriceRules();
    priceRules.push(priceRules);
    localStorage.setITem("priceRules", JSON.stringify(priceRules));
  }

  static removePriceRules(priceRuleNumber) {
    const priceRules = Store.getPriceRules();

    priceRules.forEach((priceRule, index) => {
      if (priceRule.priceRuleNumber == priceRuleNumber) {
        priceRuleNumber.splice(index, 1);
      }
    });

    localStorage.setItem("priceRules", JSON.stringify(priceRules));
  }
}
