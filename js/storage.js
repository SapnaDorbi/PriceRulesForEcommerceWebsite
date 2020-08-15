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
    var priceRuleArr = Object.values(priceRules[0]);

    priceRuleArr.forEach((priceRule, index) => {
      if (index == priceRuleNumber) {
        priceRuleArr.splice(index, 1);
      }
    });
    var updatedPriceRules = [];
    updatedPriceRules.push(priceRuleArr);
    localStorage.setItem("priceRules", JSON.stringify(updatedPriceRules));
  }
}

// UI Class: Handle UI Of Saved Data
class UI {
  static displaySavePriceRules() {
    const savedPriceRules = Store.getPriceRules();
    if (savedPriceRules.length > 0) {
      Object.values(savedPriceRules[0]).forEach((savedPriceRule, key) => {
        UI.addPriceRuleToList(savedPriceRule, key + 1);
      });
    }
  }

  static addPriceRuleToList(savedPriceRule, key) {
    const price_rule = document.querySelector("#saved-price-rules");
    const row = document.createElement("tr");

    row.innerHTML = `<td>${key}</td>
      <td>${savedPriceRule.min_price}</td>
      <td>${savedPriceRule.max_price}</td>
      <td>${savedPriceRule.price_action}</td>
      <td>${savedPriceRule.apply_as}</td>
      <td>${savedPriceRule.adjustment_amount}</td>
      <td><a href="#" class="delete-row btn btn-danger">X</a></td>`;

    price_rule.append(row);
  }

  static deletePriceRule(el) {
    if (el.classList.contains("delete-row")) {
      el.parentNode.parentNode.remove();
    }
  }
}

//Event: Display saved price rules
document.addEventListener("DOMContentLoaded", UI.displaySavePriceRules);

//Event: Remove a saved price rule
document.querySelector("#saved-price-rules").addEventListener("click", (e) => {
  //Remove a saved price rule from UI
  UI.deletePriceRule(e.target);

  //Remove a saved price rule from stroage
  Store.removePriceRules(
    e.target.parentNode.parentNode.children[0].textContent
  );
});
