var UTIL = (function (domU) {
  var index = 0,
    div,
    actionArr,
    hiddenRow,
    priceAction = {
      select: "Select Price Action",
      increase: "Increase",
      decrease: "Decrease",
    },
    ApplyAs = {
      select: "Select Apply As",
      fixed: "Fixed",
      percent: "Percent",
    };

  document.querySelector(".add-rules").addEventListener("click", function (e) {
    createHtML(index);
    index++;
  });

  var createHtML = function (index) {
    var tbody = document.getElementById("price-rules");
    console.log(tbody, "check tbody");
    var row = document.createElement("tr");
    var th = document.querySelectorAll(".add-price-rule-heading"),
      thLength = th.length;

    for (var i = 0; i < thLength; i++) {
      var column = document.createElement("td");
      if (th[i].className.includes("input-type")) {
        var input = document.createElement("input");
        input.name = index + "[" + th[i].id + "]";
        input.className = th[i].id + " form-control";
        input.id = index + "-" + th[i].id;
        div = document.createElement("div");
        div.className = "has-error";

        column.appendChild(input);
        column.appendChild(div);
      } else if (th[i].className.includes("select-type")) {
        var select = document.createElement("select");
        select.name = index + "[" + th[i].id + "]";
        select.className = "form-control";
        actionArr = th[i].id == "price_action" ? priceAction : ApplyAs;

        for (key in actionArr) {
          var options = document.createElement("option");
          options.value = key;
          options.innerHTML = actionArr[key];

          select.appendChild(options);
        }
        column.appendChild(select);
      } else if (th[i].className.includes("rule-number")) {
        var ruleNumber = document.createElement("th");
        ruleNumber.innerHTML = index;
      } else {
        var button = document.createElement("button");
        button.innerHTML = "X";
        button.type = "button";
        button.className = "delete-row btn btn-danger";
        column.appendChild(button);
      }
      if (th[i].className.includes("rule-number")) {
        row.append(ruleNumber);
      } else {
        row.appendChild(column);
      }

      hiddenRow = document.createElement("input");
      hiddenRow.type = "hidden";
      hiddenRow.className = " hidden-input";
      hiddenRow.id = "priceRule-" + index;
    }
    var errorRow = document.createElement("tr");
    var errorColumn = document.createElement("td");
    errorColumn.colSpan = "5";
    errorRow.appendChild(errorColumn);

    tbody.appendChild(row);
    tbody.appendChild(errorRow);
    tbody.appendChild(hiddenRow);
  };

  var flag = true;
  document.querySelector("#price-rules").addEventListener(
    "keyup",
    function (event) {
      var number = parseFloat(event.target.value);
      if (Number.isInteger(number) === false && Number.isNaN(number)) {
        flag = false;
        event.target.nextSibling.innerHTML = "Only Numbers are allowed.";
      }

      if (flag && event.target.className.includes("max_price")) {
        var minPriceVal = parseFloat(
          event.target.parentNode.previousSibling.firstChild.value
        );
        var maxPriceVal = parseFloat(event.target.value);

        event.target.parentNode.parentNode.nextSibling.nextSibling.value =
          minPriceVal + "," + maxPriceVal;

        if (minPriceVal && maxPriceVal < minPriceVal) {
          event.target.nextSibling.innerHTML =
            "Max Price is always greater than Min Price.";
        } else if (minPriceVal && maxPriceVal > minPriceVal) {
          event.target.nextSibling.innerHTML = "";
          event.target.parentNode.previousSibling.childNodes[1].innerHTML = "";
        }
      }

      if (flag && event.target.className.includes("min_price")) {
        var maxPriceVal = parseFloat(
          event.target.parentNode.nextSibling.firstChild.value
        );
        var minPriceVal = parseFloat(event.target.value);

        event.target.parentNode.parentNode.nextSibling.nextSibling.value =
          minPriceVal + "," + maxPriceVal;

        if (maxPriceVal && minPriceVal > maxPriceVal) {
          event.target.nextSibling.innerHTML =
            "Min Price is always less than Max Price.";
        } else if (maxPriceVal && minPriceVal < maxPriceVal) {
          event.target.nextSibling.innerHTML = "";
          event.target.parentNode.nextSibling.childNodes[1].innerHTML = "";
        }
      }

      if (flag && minPriceVal && maxPriceVal) {
        let hiddenInputs = document.querySelectorAll(".hidden-input");
        hiddenInputLength = hiddenInputs.length;

        for (let j = 0; j < hiddenInputLength; j++) {
          hiddenInputs[j].classList.add("price-range");
        }

        if (event.target.parentNode.parentNode.nextSibling) {
          event.target.parentNode.parentNode.nextSibling.nextSibling.classList.remove(
            "price-range"
          );
        }

        let priceRange = document.querySelectorAll(".price-range");
        priceRangeLength = priceRange.length;

        for (let i = 0; i < priceRangeLength; i++) {
          let min_max_values = priceRange[i].value;
          let min_max = min_max_values.split(",");
          let min = parseFloat(min_max[0]);
          let max = parseFloat(min_max[1]);
          let current_value = parseFloat(event.target.value);

          if (min <= current_value && max >= current_value) {
            event.target.parentNode.parentNode.nextSibling.childNodes[0].innerHTML = `This rule is conflicting with Rule ${
              i + 1
            }`;
          } else {
            event.target.parentNode.parentNode.nextSibling.childNodes[0].innerHTML =
              "";
            continue;
          }
        }
      }
    },
    false
  );

  document
    .querySelector("#price-rules")
    .addEventListener("click", function (e) {
      if (e.target.className.includes("delete-row")) {
        e.target.parentNode.parentNode.nextSibling.remove();
        e.target.parentNode.parentNode.nextSibling.remove();
        e.target.parentNode.parentNode.remove();
        // e.stopPropagation();
      }
    });

  document
    .querySelector(".card-header")
    .addEventListener("click", function (e) {
      if (e.target.innerHTML == "Saved Price Rule") {
        document.getElementById("save-price-rule-table").style.display =
          "block";
        document.getElementById("add-price-rule-table").style.display = "none";
        console.log(e.target.parentNode, typeof e.target.parentNode, "hteef");
        // e.target.parentNode.previousSibling.firstChild.classList.remove(
        //   "active"
        // );
        e.target.classList.add("active");
      }
      if (e.target.innerHTML == "Add Price Rule") {
      }
    });

  // Event: Add PriceRules
  document
    .getElementById("price-rules-form")
    .addEventListener("submit", (e) => {
      //stop the page reloading
      e.preventDefault();

      /*Another way of using FormData start*/
      // let priceRuleForm = e.target;
      // let formData = new FormData(priceRuleForm);

      //add more things that were not in the form
      // formData.append("api-key", "myApiKey");

      //look at all the contents
      // for (let key of formData.keys()) {
      //   console.log(key, formData.get(key));
      // }
      /*Another way of using FormData end*/

      const formData = new FormData(document.querySelector("form"));
      const object = {};
      formData.forEach((value, key) => {
        const [, index, attr] = /(^\d+)\[(.*?)\]/.exec(key);
        if (!(index in object)) {
          object[index] = {};
        }
        object[index][attr] = value;
      });

      //Add price to local storage
      Store.addPriceRules(object);
    });
})(UTIL || {});
