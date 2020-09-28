const BASE_URL = "https://batsaikhan-js-project-backend.herokuapp.com"
const USERS_URL = `${BASE_URL}/users`
const USER_SELECT_URL = `${BASE_URL}/select`
const USER_CLEAR_URL = `${BASE_URL}/clear`
const INCOME_URL = `${BASE_URL}/incomes`
const EXPENSE_URL = `${BASE_URL}/expenses`
const SELECTED_USER_URL = `${BASE_URL}/selected_user`

fetch(USERS_URL)
.then(response => response.json())
.then(obj => {
    userPropSelect = document.getElementById('userPropSelect')
    for (const userProperty in obj) {
        option = document.createElement('option')
        option.text = `${obj[userProperty].first_name} ${obj[userProperty].last_name}`
        option.value = `${obj[userProperty].id}`
        userPropSelect.add(option)
    } 
})

fetch(SELECTED_USER_URL)
.then(response => response.json())
.then(obj => {
    let header = document.querySelector('header')
    let h3 = document.createElement('h3')
    if (obj['message'] === 'user clear') {
        h3.innerHTML = 'No User Selected'
        header.appendChild(h3)
    } else {
        h3.innerHTML = `${obj.first_name} ${obj.last_name}`
        header.appendChild(h3)
    }
})

const userOptionSelector = () => {
    let selection = document.getElementById('userPropSelect')
    for (const option of selection) {
        if (option.selected) {
            if (option.value === '0') {
                alert("Please select user")
            } else {
                let formData = {
                    id: option.value
                }
                let configObj = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
                fetch(USER_SELECT_URL, configObj)
                .then(response => response.json())
                .then(obj => {
                    createUserHeader(obj)
                })
            }
        } 
    }
}

const clearUserInfor = () => {
    fetch(USER_CLEAR_URL)
    .then(response => response.json())
    .then(obj => createUserHeader(obj))
}

const userSubmit = document.getElementById('userSubmit')
userSubmit.addEventListener('click', userOptionSelector)

const userClear = document.getElementById('userClear')
userClear.addEventListener('click', clearUserInfor)

const createIncome = (event) => {
    event.preventDefault()
    fetch(SELECTED_USER_URL)
    .then(response => response.json())
    .then(obj => {
        if (obj['message'] === 'user clear') {
            alert('Please select user before submiting your income')
        } else {
            let formData = {
                name: document.getElementById('incomeName').value,
                amount: document.getElementById('incomeAmount').value,
                date: document.getElementById('incomeDate').value,
                isSupplement: document.querySelector("input[value='true']").value,
                user_id: obj.id
            }
            let configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            fetch(INCOME_URL, configObj)
            .then(response => response.json())
            .then(obj => {
                document.querySelector('.incomeFormCard').reset()
                if (Object.keys(obj)[0] === 'message') {
                    alert(obj['message'])
                } else {
                    alert('Income created successfully')
                }
                
            })
        }
    })
}
const incomeSubmit = document.getElementById('incomeSubmit')
incomeSubmit.addEventListener('click', createIncome)

const createExpense = (event) => {
    event.preventDefault()
    const category = () => {
        let expenseCategory = document.getElementById('expenseCategory')
        for (const category of expenseCategory) {
        if (category.selected) {
            return category.value
            }
        }
    }
    const paymentType = () => {
        let paymentType = document.getElementsByName('paymentType')
        for (const type of paymentType) {
            if (type.checked) {
                return type.value
            }
        }
    }
    fetch(SELECTED_USER_URL)
    .then(response => response.json())
    .then(obj => {
        if (obj['message'] === 'user clear') {
            alert('Please select user before submiting your expense')
        } else {
            let formData = {
                name: document.getElementById('expenseName').value,
                amount: document.getElementById('expenseAmount').value,
                category: category(),
                date: document.getElementById('expenseDate').value,
                note: document.getElementById('expenseNote').value,
                paymentType: paymentType(),
                user_id: obj.id
            }
            let configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            fetch(EXPENSE_URL, configObj)
            .then(response => response.json())
            .then(obj => {
                document.querySelector('.expenseFormCard').reset()
                if (Object.keys(obj)[0] === 'message') {
                    alert(obj['message'])
                } else {
                    alert('Expense created successfully')
                }
            })
        }
    })   
}

const expenseSubmit = document.getElementById('expenseSubmit')
expenseSubmit.addEventListener('click', createExpense)

const optionSelector = () => {
    let selection = document.getElementById('expensePropSelect')
    for (const option of selection) {
        if (option.selected) {
            return option
        }
    }
}
const filter = () => {
    fetch(SELECTED_USER_URL)
    .then(response => response.json())
    .then(obj => {
        if (obj['message'] === 'user clear') {
            alert('Please select user before submiting your expense')
        } else {
            let filterResult = document.getElementById('filterResult')
            filterResult.innerHTML = ''
            let ul = document.createElement('ul')
            if (optionSelector().value === 'amount') {
                let sortedObj = obj.expenses.sort(function(a, b) {return b.amount - a.amount})
                for (obj of sortedObj) {
                    let li = document.createElement('li')
                    li.innerText = `${obj.name} - ${obj.amount}`
                    ul.appendChild(li)
                }
                filterResult.appendChild(ul)
            } else if (optionSelector().value === 'date') {
                sortedDateObj = obj.expenses.sort((a, b) => a.date.localeCompare(b.date))
                let year = []
                let uniqMonth = []
                let result = []
                let monthNameChart = []
                let totalAmountChart = []
                let month = [{'01': "January"},{'02': "February"},{'03':"March"},{'04': "April"},{'05': "May"},{'06': "June"},{'07': "July"},{'08': "August"},{'09': "September"},{'10': "October"},{'11': "November"},{'12': "December"}]
        
                const findUniqYear = (sortedDateObj) => {
                    let temp = []
                    for (const e of sortedDateObj) {
                        temp.push(e.date.split("-")[0])
                    }
                    for (const e of temp) {
                        if (year.length === 0) {
                            year.push(e)
                        }
                        if (typeof year.find(n => n === e) === 'undefined') {
                            year.push(e)
                        }
                    }
                }
                const filterDate = (callback) => {
                    callback
                    for (const e of month) {
                        uniqMonth.push(Object.keys(e)[0])
                    }
                    for (const e of year) {
                        let h3Year = document.createElement('h3')
                        h3Year.innerText = e
                        filterResult.appendChild(h3Year)
                        for (const e of uniqMonth) {
                            result.push(sortedDateObj.filter(n => n.date.split("-")[1] === e))
                        }
                    }
                    for (const e of result) {
                        let num = e[0].date.split('-')[1]
                        let monthName = Object.values(month.find(n => Object.keys(n)[0] === num))[0]
                        monthNameChart.push(monthName)
                        let totalAmount = e.reduce((total, number) => total + number.amount, 0).toFixed(2)
                        totalAmountChart.push(totalAmount)
                        let li = document.createElement('li')
                        li.innerText = `${monthName} - ${totalAmount}`
                        ul.appendChild(li)
                    }
                    filterResult.appendChild(ul)
                }
                const dateChart = (label, data1, data2) => {
                    let ctx = document.getElementById('myChart').getContext('2d');
                    let chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'line',
        
                    // The data for our dataset
                    data: {
                        labels: label,
                        datasets: [{
                            label: 'Expense',
                            backgroundColor: '',
                            borderColor: 'rgb(255, 99, 132)',
                            data: data1
                        }, {
                            label: 'Income',
                            backgroundColor: '',
                            borderColor: 'rgb(126, 172, 224)',
                            data: data2
                        }]
                    },
                        options: {}
                    });
                }
                const totalIncome = () => {
                    let groupedIncome = []
                    let total = []
                    for (const e of uniqMonth) {
                        groupedIncome.push(obj.incomes.filter(n => n.date.split("-")[1] === e))
                    }
                    for (const e of groupedIncome) {
                        total.push(e.reduce((a, b) => a + b.amount, 0))
                    }
                    return total
                }
                filterDate(findUniqYear(sortedDateObj))
                dateChart(monthNameChart, totalAmountChart,  totalIncome())
            } else if (optionSelector().value === 'category') {
                let uniqCategory = []
                let result = []
                let orderedCategory = obj.expenses.sort((a,b) => a.category.localeCompare(b.category))
                const findUniqCategory = (orderedCategory) => {
                    let temp = []
                    for (const e of orderedCategory) {
                        temp.push(e.category)
                    }
                    for (const e of temp) {
                        if (uniqCategory.length === 0) {
                            uniqCategory.push(e)
                        }
                        if (typeof uniqCategory.find(n => n === e) === 'undefined') {
                            uniqCategory.push(e)
                        }
                    }
                }
                const newLocal = (orderedCategory, callback) => {
                    callback
                    for (const e of uniqCategory) {
                        result.push(orderedCategory.filter(n => n.category === e))
                    }
                }
                const filterCategory = newLocal
                const totalByCategory = (callback) => {
                    callback
                    for (e of result) {
                        let li = document.createElement('li')
                        li.innerText = `${e[0].category} - ${e.reduce((total, e) => total + e.amount, 0).toFixed(2)}`
                        ul.appendChild(li)
                        }
                    filterResult.appendChild(ul) 
                }
                totalByCategory(filterCategory(orderedCategory, findUniqCategory(orderedCategory)))
            }
        }
    })

 
}
const expenseFilterSubmit = document.getElementById('expenseFilterSubmit')
expenseFilterSubmit.addEventListener('click', filter)