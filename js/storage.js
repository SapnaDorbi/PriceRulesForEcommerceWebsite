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
    priceRules.push(priceRule);
    localStorage.setItem("priceRules", JSON.stringify(priceRules));
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

// UI Class: Handle UI Of Saved Data
class UI {
  static displaySavePriceRules() {
    const savedPriceRules = Store.getPriceRules();
    Object.values(savedPriceRules[0]).forEach((savedPriceRule) => {
      UI.addPriceRuleToList(savedPriceRule);
    });
  }

  static addPriceRuleToList(savedPriceRule, index) {
    const price_rule = document.querySelector("#saved-price-rules");
    const row = document.createElement("tr");

    row.innerHTML = `<td>${savedPriceRule.min_price}</td>
      <td>${savedPriceRule.max_price}</td>
      <td>${savedPriceRule.price_action}</td>
      <td>${savedPriceRule.apply_as}</td>
      <td>${savedPriceRule.adjustment_amount}</td>`;

    price_rule.append(row);
  }
}

//Event: Display saved price rules
document.addEventListener("DOMContentLoaded", UI.displaySavePriceRules);
