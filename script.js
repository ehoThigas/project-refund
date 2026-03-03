const form = document.querySelector('form');
const expense = document.querySelector('#expense');
const category = document.querySelector('#category');
const amount = document.querySelector('#amount');
const expenseQuantity = document.querySelector('aside header p span');
const expenseTotal = document.querySelector('aside header h2');
const expenseList = document.querySelector('ul');

amount.addEventListener("input", () => {
    let value = amount.value.replace(/\D/g, "");
    value = Number(value) / 100;

    amount.value = convertCurrencyBRL(value);
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addExpense(createExpense());
})

expenseList.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove-icon")){
        e.target.closest("li").remove();
        updateTotal();
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
        `;
        
        expenseList.insertAdjacentHTML("beforeend", expenseItem);
        updateTotal();
        
        form.reset();
        expense.focus();
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.");
        console.log(error);
    }
}

function updateTotal(){  
    try{
        const items = expenseList.querySelectorAll('li');
        let total = 0;

        expenseQuantity.textContent = `${items.length} ${
            items.length > 1 ? "despesas" : "despesa"
        }`;

        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector('.expense-amount');

            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
            value = parseFloat(value);

            if(isNaN(value)) return alert('Não foi possível calcular o total, o valor não parece ser um número.');

            total += Number(value);
        }

        total = convertCurrencyBRL(total).replace(/R\$\s?/, "");
        const newHTML = `<small>R$</small>${escapeHTML(total)}`;

        expenseTotal.innerHTML = '';
        expenseTotal.insertAdjacentHTML("beforeend", newHTML);
    } catch(error){
        alert("Não foi possível atualizar o total.");
        console.log(error);
    }
}

function escapeHTML(str){
    const p = document.createElement('p');
    p.textContent = str;

    return p.innerHTML;
}