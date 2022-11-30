//buttons

let btnLeft = document.querySelectorAll(".left button")
let btnRight = document.querySelectorAll(".right button")
//Inputs

let LeftInp = document.querySelector(".left input")
let RightInp = document.querySelector(".right input")
//Paragraph valyuta

let paragraphLeft = document.querySelector(".left .price p")
let paragraphRight = document.querySelector(".right .price p")

//default values
let base = "RUB"
let symbols = "USD"
window.addEventListener('load', e => FetchR (base, symbols));

//navbar-phone
let menu = document.querySelector("#navbar-phone .menu")
let menubar = document.querySelector("#navbar-phone  .menu-bar")
menu.addEventListener("click", () => {
    menu.classList.toggle("active")
    menubar.classList.toggle("active")
})

function showbtn() {
    //Left Button Click
    btnLeft.forEach(elements => {
        elements.addEventListener("click", () => {
            btnLeft.forEach(x => x.classList.remove("actived"));
            elements.classList.add("actived");
            base = elements.value
            api(elements.parentElement.classList[0])
        })
    })
    //Right Button Click
    btnRight.forEach(elements => {
        elements.addEventListener("click", () => {
            btnRight.forEach(x => x.classList.remove("actived"));
            elements.classList.add("actived");
            symbols = elements.value
            api(elements.parentElement.classList[0])
        })
    })
}

//call function
showbtn();

//Left input write
LeftInp.addEventListener("input", (e) => {
    e.target.value = e.target.value.split(",").join(".")
    FetchR(base, symbols);
})

//Right input write
RightInp.addEventListener("input", () => {
    FetchL(base, symbols);
})

function api(btnparent) {
    if (btnparent == "left-value-buttons") {

        FetchL(base, symbols);
    }
    if (btnparent == "right-value-buttons") {
        FetchR(base, symbols)
    }
}

//Fetch for Left function
function FetchL(baseval, symbolsval) {
    if (baseval != symbolsval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(RightInp.value==""){
                    LeftInp.value=""
                }
                else{
                    LeftInp.value = RightInp.value.replace(/\s+/g, '') * data.rates[`${baseval}`]
                    Leftinp(LeftInp)
                }
                
                paragraphRight.innerHTML = `1 ${data.base} = ${data.rates[`${baseval}`]} ${baseval}`;
                

                fetch(
                    `https://api.exchangerate.host/latest?base=${baseval}&symbols=${symbolsval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        paragraphLeft.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsval}`]
                            } ${symbolsval}`;
                    });
            });
    }
    else if (baseval == symbolsval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(RightInp.value==""){
                    LeftInp.value=""
                }
                else{
                    LeftInp.value = RightInp.value.replace(/\s+/g, '') * data.rates[`${baseval}`]
                    Leftinp(LeftInp)
                }
                paragraphLeft.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsval}`]
                    } ${symbolsval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        paragraphRight.innerHTML = `1 ${data.base} = ${data.rates[`${baseval}`]
                            } ${baseval}`;
                    });
            })
    }
}

//Fetch for Right function
function FetchR(baseval, symbolsval) {
    if (baseval != symbolsval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${baseval}&symbols=${symbolsval}`
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(LeftInp.value==""){
                    RightInp.value=""
                }
                else{
                    RightInp.value = LeftInp.value.replace(/\s+/g, '') * data.rates[`${symbolsval}`];
                    Rightinp(RightInp)
                }
       
        
                paragraphLeft.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsval}`]
                    } ${symbolsval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        paragraphRight.innerHTML = `1 ${data.base} = ${data.rates[`${baseval}`]
                            } ${baseval}`;
                    });
            });
    }
    else if (baseval == symbolsval) {
        fetch(
            `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
        )
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if(LeftInp.value==""){
                    RightInp.value=""
                }
                else{
                    RightInp.value = LeftInp.value.replace(/\s+/g, '') * data.rates[`${symbolsval}`];
                    Rightinp(RightInp)
                }
                paragraphRight.innerHTML = `1 ${data.base} = ${data.rates[`${baseval}`]
                    } ${baseval}`;
                fetch(
                    `https://api.exchangerate.host/latest?base=${symbolsval}&symbols=${baseval}`
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        paragraphLeft.innerHTML = `1 ${data.base} = ${data.rates[`${symbolsval}`]
                            } ${symbolsval}`;
                    });
            })
    }
}

  function Leftinp(inp){
      var numberMask = IMask(inp,{
        mask: Number, 
        scale: 6,  
        signed: false,  
        thousandsSeparator:' ',  
        padFractionalZeros: false,  
        normalizeZeros: true,  
        radix: '.',  
        mapToRadix: ['.'],  
      })
  }
  Leftinp(LeftInp)
  function Rightinp(inp){
    var numberMask = IMask(inp,{
      mask: Number, 
      scale: 6,  
      signed: false,  
      thousandsSeparator:' ',  
      padFractionalZeros: false,  
      normalizeZeros: true,  
      radix: '.',  
      mapToRadix: ['.'],  
    })
}
Rightinp(RightInp)

