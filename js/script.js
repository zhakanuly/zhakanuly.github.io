//Budget
const budgetInput = document.querySelector(".budget_input");
const budgetButton = document.querySelector("#btn_budget");

//Expenses
const expensesNameInput = document.querySelector(".purchase_name");
const expensesPriceInput = document.querySelector(".purchase_price");
const expensesButton = document.querySelector("#btn_purchase");
var flag = false;

//View
const budgetView = document.querySelector(".budget_view");
const expensesView = document.querySelector(".expenses_view");
const balanceView = document.querySelector(".balance_view");

//Шығындар тізім
const expensesListView = document.querySelector(".exp_list_view")


// Бюджет сақтау
budgetButton.addEventListener("click", () => {
    budgetView.innerHTML = budgetInput.value;
    budgetInput.value = 0;
    calcBalance();
});


//Шығын сақтау, бюджеттен азайту
expensesButton.addEventListener("click", () => {
    expBtnRegim1();
});
//Шығын есептеу
function calcExpenses() {
    let total = 0;
    const all = document.querySelectorAll(".exp_list_elements");

    all.forEach((x) => {
        // console.log(x);
        const price = x.querySelector(".exp_list_price");
        total += Number(price.innerHTML);
    });
    expensesView.innerHTML = total;
};

//Баланс есептеу функция
function calcBalance() {
    balanceView.innerHTML = budgetView.innerHTML - expensesView.innerHTML;
};

var changElement;
var oldPrice1;
var difference1;
function expBtnRegim1() {
    if(flag == false) {
        const title = expensesNameInput.value;
        const price = expensesPriceInput.value;

        const expensesListElements = document.createElement("div");
        expensesListElements.setAttribute("class", "exp_list_elements")

        const expListTitle = document.createElement("div");
        expListTitle.setAttribute("class", "exp_list_title");
        expListTitle.innerHTML = title;

        const expListPrice = document.createElement("div");
        expListPrice.setAttribute("class", "exp_list_price");
        expListPrice.innerHTML = price;

        const expRemoveBtn = document.createElement("button");
        expRemoveBtn.innerHTML = "Өшіру";
        expRemoveBtn.setAttribute("class", "exp_remove_btn");
        expRemoveBtn.addEventListener("click", (e) => {
            // console.log('333',e.target)
            e.target.parentElement.remove(); 
            const removeValue = Number(expListPrice.innerHTML);
            expensesView.innerHTML = Number(expensesView.innerHTML) - removeValue;
            balanceView.innerHTML = Number(balanceView.innerHTML) + removeValue;
    });

        const expChangeBtn = document.createElement("button");
        expChangeBtn.innerHTML = "Өзгерту";
        expChangeBtn.setAttribute("class", "exp_change_btn");
        expChangeBtn.addEventListener("click", (e) => {
            var aaa = e.target.parentElement;
            changElement = aaa
            expensesNameInput.value = aaa.querySelector('.exp_list_title').innerHTML;
            expensesPriceInput.value = aaa.querySelector('.exp_list_price').innerHTML;
            var oldPrice = aaa.querySelector('.exp_list_price').innerHTML;
            oldPrice1 = oldPrice;
            console.log("ескі значение " + oldPrice1);
            flag = true;
        });

        expensesListElements.appendChild(expListTitle);
        expensesListElements.appendChild(expListPrice);
        expensesListElements.appendChild(expRemoveBtn);
        expensesListElements.appendChild(expChangeBtn);
        expensesListView.appendChild(expensesListElements);

        expListTitle.innerHTML = title;
        expListPrice.innerHTML = price;
        expensesNameInput.value = " ";
        expensesPriceInput.value = " ";


        calcExpenses();
        calcBalance();
    } else {
        changElement.children[0].innerHTML = expensesNameInput.value;
        changElement.children[1].innerHTML = expensesPriceInput.value;
        expensesNameInput.value = " ";
        expensesPriceInput.value = " ";
        let newPrice = changElement.children[1].innerHTML;
        console.log("Жаңа значение " + newPrice);
        var difference = newPrice - oldPrice1;
        difference1 = difference;
        console.log("Разница " + difference1);
        oldOrNew();
        changeBalance();
        flag = false;
    }
};

function oldOrNew() {
    if(difference1 > 0) {
        expensesView.innerHTML = Number(expensesView.innerHTML) + difference1;
    } else {
        expensesView.innerHTML = Number(expensesView.innerHTML) + difference1;
    }
};

function changeBalance() {
    if(difference1 > 0) {
        balanceView.innerHTML = Number(balanceView.innerHTML) - difference1;
    } else {
        balanceView.innerHTML = Number(balanceView.innerHTML) - difference1;
    }
}
