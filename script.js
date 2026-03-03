const form = document.querySelector('form');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const amount = document.querySelector('#amount');

amount.addEventListener("input", () => {
    let value = amount.value.replace(/\D/g, "");
    value = Number(value) / 100

    amount.value = convertCurrencyBRL(value);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    createExpense();
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

    console.log(newExpense);
}