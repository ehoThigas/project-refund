const form = document.querySelector('form');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const amount = document.querySelector('#amount');
const expenseHeader = document.querySelector('header');
const expenseList = document.querySelector('ul');
let expensesNumber = 0;

amount.addEventListener("input", () => {
    let value = amount.value.replace(/\D/g, "");
    value = Number(value) / 100

    amount.value = convertCurrencyBRL(value);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addExpense(createExpense());
})

expenseList.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove-icon")){
        e.target.closest("li").remove();
    }
})

function convertCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value;
}

function createExpense(){
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    return newExpense;
}

function addExpense(newExpense){
    try {
        const expenseItem = `
            <li class="expense">
                <img src="./img/${escapeHTML(newExpense.category_id)}.svg" alt="Ícone de tipo da despesa" />

                <div class="expense-info">
                    <strong>${escapeHTML(newExpense.expense)}</strong>
                    <span>${escapeHTML(newExpense.category_name)}</span>
                </div>

                <span class="expense-amount"><small>R$</small>${escapeHTML(newExpense.amount.replace(/R\$\s?/, ""))}</span>

                <img src="./img/remove.svg" alt="remover" class="remove-icon" />
            </li>
        `
        
        expenseList.insertAdjacentHTML("beforeend", expenseItem);
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error);
    }
}

function updateTotal(){
    
    
    newHeader = `
        <p>
              Minhas solicitações <i>&bullet;</i>
              <span>${escapeHTML(expensesNumber)} despesas</span>
            </p>
            <h2><small>R$</small>0,00</h2>
    `
}

function escapeHTML(str){
    const p = document.createElement('p');
    p.textContent = str;

    return p.innerHTML;
}