const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/users`
const INCOME_URL = `${BASE_URL}/incomes`
const EXPENSE_URL = `${BASE_URL}/expenses`
const SIGNIN_URL = `${BASE_URL}/signin`
const SIGNOUT_URL = `${BASE_URL}/signout`
const CURRENT_USER_URL = `${BASE_URL}/current_user`

let current_user = {}

const displayFullName = (obj) => {
    let navbarSection = document.getElementById('navbarSection')
    let h3 = document.createElement('h3')
    h3.innerText = `Welcome ${obj.firstName} ${obj.lastName}`
    navbarSection.appendChild(h3)
}
const userSignedIn = (obj) => {
    displayFullName(obj)
    current_user = obj
    signinFormSH = document.getElementById('signinForm').style.display='none'
    signoutButtonSH = document.getElementById('signoutButtonSH').style.display='block'
    signupFormSH = document.getElementById('signupForm').style.display='none'
    signupButtonSH = document.getElementById('signupButtonSH').style.display='none'
}
const userSignedOut = () => {
    signinFormSH = document.getElementById('signinForm').style.display='block'
    signupButtonSH = document.getElementById('signupButtonSH').style.display='block'
    signoutButtonSH = document.getElementById('signoutButtonSH').style.display='none'
    signupFormSH = document.getElementById('signupForm').style.display='none'
    document.querySelector('section').innerText=''
    document.getElementById('cardBody3').innerHTML = ''
    document.getElementById('filterResult').innerHTML=''
    document.getElementById('signinForm').reset()
    current_user = {}
}
const userSignin = (event) => {
    event.preventDefault();
    let formData = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
    }
    let configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    fetch(SIGNIN_URL, configObj)
    .then(response => response.json())
    .then(obj => {
        console.log(obj)
        if (obj.id !== undefined) {
            userSignedIn(obj)
            }
    })
}
const clickSignUpButton = (event) => {
    event.preventDefault();
    signupFormSH = document.getElementById('signupForm').style.display='block'
    signupButtonSH = document.getElementById('signupButtonSH').style.display='none'
}

class CreateUser {
    constructor(url) {
        this.url = url
        this.formData = {
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            gender: this.gender(),
            age: document.getElementById('age').value
            }
        this.configObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                body: JSON.stringify(this.formData)
            }
        }
    fetch() {
        fetch(this.url, this.configObj)
        .then(response => response.json())
        .then(obj => { console.log(obj)
        if (obj.message === undefined) {
            displayFullName(obj)
            signinFormSH = document.getElementById('signinForm').style.display='none'
            signupButtonSH = document.getElementById('signupButtonSH').style.display='none'
            signoutButtonSH = document.getElementById('signoutButtonSH').style.display='block'
            signupFormSH = document.getElementById('signupForm').style.display='none'
            }
        })
    }
    gender() {
        let gender = document.getElementsByName('gender')
            for (let i=0; i<gender.length; i++ ) {
                if (gender[i].checked) {
                    return gender[i].value
                }
            }
        }
    }
const signupForm = document.getElementById('signupButton')
signupForm.addEventListener('click', () => {
    event.preventDefault()
    let newUser = new CreateUser(USER_URL)
    newUser.fetch()
})

// const userSignup = () => {
//     event.preventDefault();
//     const getGender = () => {
//         let gender = document.getElementsByName('gender')
//         for (let i=0; i<gender.length; i++ ) {
//             if (gender[i].checked) {
//                 console.log(gender[i].value)
//                 return gender[i].value
//             }
//         }
//     }
//     let formData = {
//         email: document.getElementById('signupEmail').value,
//         password: document.getElementById('signupPassword').value,
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         gender: getGender(),
//         age: document.getElementById('age').value
//     }
//     let configObj = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     }
//     fetch(USER_URL, configObj)
//     .then(response => response.json())
//     .then(obj => { console.log(obj)
//         if (obj.message === undefined) {
//             displayFullName(obj)
//             signinFormSH = document.getElementById('signinForm').style.display='none'
//             signupButtonSH = document.getElementById('signupButtonSH').style.display='none'
//             signoutButtonSH = document.getElementById('signoutButtonSH').style.display='block'
//             signupFormSH = document.getElementById('signupForm').style.display='none'
//             }
//     })
// }
const userSignout = (event) => {
    event.preventDefault()
    fetch(SIGNOUT_URL)
    .then(response => response.json())
    .then(response => {console.log(response)
        userSignedOut()
    })
}
const currentUser = () => {
    fetch(CURRENT_USER_URL)
    .then(response => response.json())
    .then(obj => obj)
}
const displayCurrentUser = () => {
    fetch(CURRENT_USER_URL)
    .then(response => response.json())
    .then(obj => {
        if (obj.id !== undefined) {
            userSignedIn(obj)
        } else {
            userSignedOut()
        }
    })
}
displayCurrentUser()
const signinForm = document.getElementById('signinButton')
signinForm.addEventListener('click', userSignin)
const signupButton = document.getElementById('signupButtonSH')
signupButton.addEventListener('click', clickSignUpButton)
const signoutButton = document.getElementById('signoutButtonSH')
signoutButton.addEventListener('click', userSignout)


const createIncome = (event) => {
    event.preventDefault()
    let formData = {
        name: document.getElementById('incomeName').value,
        amount: document.getElementById('incomeAmount').value,
        date: document.getElementById('incomeDate').value,
        isSupplement: document.querySelector("input[value='true']").value,
        user_id: current_user.id
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
        console.log(obj)
        if (typeof obj !== 'undefined') {
            document.querySelector('.incomeFormCard').reset()
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
    let formData = {
        name: document.getElementById('expenseName').value,
        amount: document.getElementById('expenseAmount').value,
        category: category(),
        date: document.getElementById('expenseDate').value,
        note: document.getElementById('expenseNote').value,
        paymentType: paymentType(),
        user_id: current_user.id
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
        console.log(obj)
        if (typeof obj !== 'undefined') {
            document.querySelector('.expenseFormCard').reset()
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
const filter = (event) => {
    event.preventDefault()
    let filterResult = document.getElementById('filterResult')
    filterResult.innerHTML = ''
    let ul = document.createElement('ul')
    if (optionSelector().value === 'amount') {
        let sortedObj = []
        sortedObj = current_user.expenses.sort(function(a, b) {return b.amount - a.amount})
        for (obj of sortedObj) {
            let li = document.createElement('li')
            li.innerText = `${obj.name} - ${obj.amount}`
            ul.appendChild(li)
        }
        filterResult.appendChild(ul)
    } else if (optionSelector().value === 'date') {
        sortedDateObj = current_user.expenses.sort((a, b) => a.date.localeCompare(b.date))
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

                // Configuration options go here
                options: {}
            });
        }
        const totalIncome = () => {
            let groupedIncome = []
            let total = []
            for (const e of uniqMonth) {
                groupedIncome.push(current_user.incomes.filter(n => n.date.split("-")[1] === e))
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
        let orderedCategory = current_user.expenses.sort((a,b) => a.category.localeCompare(b.category))
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
const expenseFilterSubmit = document.getElementById('expenseFilterSubmit')
expenseFilterSubmit.addEventListener('click', filter)