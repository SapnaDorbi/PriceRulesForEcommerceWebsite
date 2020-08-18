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

  static addPriceRules(priceRuleValues) {
    const priceRules = Store.getPriceRules();
    let priceRulesLength = Object.keys(priceRules).length;
    var updatedPriceRule = {};
    priceRuleValues.forEach((value) => {
      updatedPriceRule[priceRulesLength] = value;
      priceRulesLength++;
    });
    const allPriceRules = { ...priceRules, ...updatedPriceRule };
    localStorage.setItem("priceRules", JSON.stringify(allPriceRules));
    UI.showAlert("Price Rules are saved successfully", "success");
  }

  static removePriceRules(priceRuleNumber) {
    const priceRules = Store.getPriceRules();
    var updatedPriceRules = delete priceRules[priceRuleNumber - 1];
    localStorage.setItem("priceRules", JSON.stringify(priceRules));
    UI.showAlert("Price Rules are deleted successfully", "success");
  }
}

// UI Class: Handle UI Of Saved Data
class UI {
  static displaySavePriceRules() {
    const savedPriceRules = Store.getPriceRules();
    const savedPriceRulesLength = Object.values(savedPriceRules).length;
    if (savedPriceRulesLength > 0) {
      Object.values(savedPriceRules).forEach((savedPriceRule, key) => {
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

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const cardBody = document.querySelector(".card-body");
    const form = document.querySelector("#price-rules-form");
    cardBody.insertBefore(div, form);

    //vanish alert message in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
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
