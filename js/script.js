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
        console.log(x);
        const price = x.querySelector(".exp_list_price");
        total += Number(price.innerHTML);
    });
    expensesView.innerHTML = total;
};

//Баланс есептеу функция
function calcBalance() {
    balanceView.innerHTML = budgetView.innerHTML - expensesView.innerHTML;
};

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
        expChangeBtn.setAttribute("class", "exp_change_btn")
        expChangeBtn.addEventListener("click", (e) => {
            const aaa = e.target.parentElement;
            console.log(aaa);
            expensesNameInput.value = expListTitle.innerHTML;
            expensesPriceInput.value = expListPrice.innerHTML;
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
        flag = false;
    }
};
