let currencyButtonL = document.querySelectorAll(".firstCur button")
let currencyButtonR = document.querySelectorAll(".secondCur button")
let firstTextBox = document.querySelector(".firstCur input")
let secondTextBox = document.querySelector(".secondCur input")
let firstCurrency = document.querySelector(".firstCur .price p")
let secondCurrency = document.querySelector(".secondCur .price p")
let firstC = "RUB"
let secondC = "USD"
window.addEventListener('load', e => FetchR (firstC, secondC));

function getButton() {
    currencyButtonL.forEach(elements => {
        elements.addEventListener("click", () => {
            currencyButtonL.forEach(x => x.classList.remove("actived"))
            elements.classList.add("actived")
            firstC = elements.value
            api(elements.parentElement.classList[0])
        })
    })
    currencyButtonR.forEach(elements => {
        elements.addEventListener("click", () => {
            currencyButtonR.forEach(x => x.classList.remove("actived"))
            elements.classList.add("actived")
            secondC = elements.value
            api(elements.parentElement.classList[0])
        })
    })
}
getButton();  

firstTextBox.addEventListener("input", (e) => {
    e.target.value = e.target.value.split(",").join(".")
    FetchR(firstC, secondC);
})
secondTextBox.addEventListener("input", () => {
    FetchL(firstC, secondC);
})



function api(btnparent) {
    if (btnparent == "firstCurButton") {
        FetchL(firstC, secondC);
    }
    if (btnparent == "secondCurButton") {
        FetchR(firstC, secondC)
    }
}

function FetchL(firstCval, secondCval) {
    if (firstCval != secondCval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(secondTextBox.value==""){
                    firstTextBox.value=""
                }
                else{
                    firstTextBox.value = secondTextBox.value.replace(/\s+/g, '') * data.rates[`${firstCval}`]
                }
                secondCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${firstCval}`]} ${firstCval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${firstCval}&symbols=${secondCval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        firstCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${secondCval}`]
                            } ${secondCval}`;
                    });
            });
    }
    else if (firstCval == secondCval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(secondTextBox.value==""){
                    firstTextBox.value=""
                }
                else{
                    firstTextBox.value = secondTextBox.value.replace(/\s+/g, '') * data.rates[`${firstCval}`]
                }
                firstCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${secondCval}`]
                    } ${secondCval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        secondCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${firstCval}`]
                            } ${firstCval}`;
                    });
            })
    }
}
function FetchR(firstCval, secondCval) {
    if (firstCval != secondCval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${firstCval}&symbols=${secondCval}`
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(firstTextBox.value==""){
                    secondTextBox.value=""
                }
                else{
                    secondTextBox.value = firstTextBox.value.replace(/\s+/g, '') * data.rates[`${secondCval}`];
                }
                firstCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${secondCval}`]
                    } ${secondCval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        secondCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${firstCval}`]
                            } ${firstCval}`;
                    });
            });
    }
    else if (firstCval == secondCval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(firstTextBox.value==""){
                    secondTextBox.value=""
                }
                else{
                    secondTextBox.value = firstTextBox.value.replace(/\s+/g, '') * data.rates[`${secondCval}`];
                }
                secondCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${firstCval}`]
                    } ${firstCval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${secondCval}&symbols=${firstCval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        firstCurrency.innerHTML = `1 ${data.base} = ${data.rates[`${secondCval}`]
                            } ${secondCval}`;
                    });
            })
    }
}