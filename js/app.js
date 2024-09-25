(async function main() {
    // https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json
    const res = await fetch("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json")
    const data = await res.json()
    const mehsullar = document.getElementById("mehsullar")

    function show() {
        data.map(item => {
            mehsullar.innerHTML += `
                <div onclick="popup('${item.img}', '${item.name}', '${item.price}', '${item.id}')" class="mehsul-pizza  my-[10px] w-[95%] mx-auto lg:mx-0 lg:w-[20%] lg:my-[15px] lg:h-[350px]  ">
                    <div class="pizza-img">
                        <img src="${item.img}" class="w-full object-cover lg:w-[100%] h-[220px] " alt="">
                    </div>
                    <div class="title-pizza pt-2 flex justify-between">
                        <span class="text-[20px] font-bold">${item.name}</span>
                        <span class="bg-[#0F9675] cursor-pointer rounded-md text-white font-bold p-[5px]">Bunu seç</span>
                    </div>
                    <p class="text-[16px] pt-4">${item.composition}</p>
                </div>
            `
        })
    }
    show()


})()

const popupDiv = document.getElementById("popmehsulsebet")

function popup(img, name, price, id) {
    popupDiv.innerHTML = `
    <div  class="mehsul-al">
        <div class="bg-black opacity-50 fixed inset-0 z-[90]" onclick="desclosd()"></div> 
        <div class="mehsulal-content px-2 flex bg-[#fff] fixed inset-0 z-[100] mx-auto top-[25%] lg:top-[30%] h-[67%] flex-col items-center justify-center w-[95%] lg:w-[25%]">
            <div class="bagla-mehsul flex pb-2 items-end justify-end w-[80%]">
                <span onclick="secbagla()" class="text-[16px] font-bold">Bağla <i class="fa-solid fa-circle-xmark"></i></span>
            </div>
            <div class="img-mehsulal w-[320px] flex items-center justify-center">
                <img src="${img}" class="w-[90%] object-cover" alt="">
            </div>
            <div class="mehsul-al-info flex items-start justify-start">
                <p class="text-[22px] font-bold">${name}</p>
            </div>
            <div class="secim-mehsul flex py-2 flex-row w-[80%] items-center justify-center">
                    <span id="enenvibg" onclick="enevigo()" class="bg-[#0F9675] text-black rounded-l-md flex items-center text-[15px] justify-center w-[60%] h-[30px]">Ənənəvi</span>
                    <span id="nazikbg" onclick="nazikgo()" class="bg-[#F1F1F1] text-black w-[60%] h-[30px] flex items-center rounded-md text-[15px] justify-center">Nazik</span>
             </div>
                        <div class="secim-pizza w-[80%] py-4">
                <select onchange="deyispizza()" id="enevi" style="display: block;" class="bg-[#AD0F14] outline-none text-[15px] text-white w-full h-[30px]">
                    <option value="5.5">Mini pizza, 15 sm - 5.5 M</option>
                    <option value="11">Kiçik, 23 sm - 11 M</option>
                    <option value="17">Orta, 30 sm - 17 M</option>
                    <option value="21">Böyük, 35 sm - 21 M</option>
                </select>
                <select onchange="deyispizza()" style="display: none;" id="nazik" class="bg-[#AD0F14] outline-none text-[15px] text-white w-full h-[30px]">
                    <option value="11">Kiçik, 23 sm - 11 M</option>
                    <option value="17">Orta, 30 sm - 17 M</option>
                    <option value="21">Böyük, 35 sm - 21 M</option>
                </select>
            </div>
            <div class="sebet-mehsulelave flex items-start lg:w-[80%] w-[90%]  justify-start py-4">
                <div class="add-say flex items-start w-full justify-start flex-row">
                    <button onclick="hesabla(-1)" id="btnInc" class="w-[29px] h-[29px] bg-[#F1F1F1] text-black text-[19px] font-bold">-</button>
                    <span id="countDiv" class="bg-[#F1F1F1] flex items-center justify-center w-[49px] h-[29px] mx-4 text-black text-[19px] font-bold">1</span>
                    <button onclick="hesabla(1)" class="w-[29px] h-[29px] bg-[#0F9675] text-white text-[19px] font-bold">+</button>
                </div>
                <p id="qiymetntc" class="text-black text-[15px] font-bold">${price}₼</p>
            </div>
            <div class="sebet-at flex items-end justify-end w-[80%] py-4">
                <button onclick="addBasket('${img}', '${name}', '${price}', '${id}')">Sebete bas  </button>
            </div>
        </div>
    </div>`
}


function hesabla(arg) {
    const countDiv = document.querySelector("#countDiv")
    let deyer = arg + +countDiv.innerHTML

    if (deyer < 1) {
        countDiv.innerHTML = 1
        document.getElementById("btnInc").disabled = true
    } else {
        document.getElementById("btnInc").disabled = false
        countDiv.innerHTML = deyer
    }
}


let basket = []
function addBasket(img, name, price, id) {
    const sideBar = document.getElementById("sideBar")
    const obj = {
        id, img, name, price, count: +countDiv.innerHTML, opsi: price * +countDiv.innerHTML
    }

    const element = basket.find(item => item.id == id)

    if (!element) {
        basket.push(obj)
    } else {
        element.count += +countDiv.innerHTML
    }

    sebeteYaz()

}


function sebeteYaz() {
    sideBar.innerHTML = ""
    basket.map(item => {
        sideBar.innerHTML += `
           <div class="border border-[1px] flex ">
                <img onclick="deleteBasket('${item.id}')" class="w-[40%]" src="${item.img}" alt="">
                <div>
                    <p>Count: ${item.count} </p>
                    <p>name:${item.name} </p>
                    <p>Price: ${item.opsi}</p>
                </div>
            </div>
        `
    })
}


function secbagla() {
    popupDiv.innerHTML = ""
}

function deleteBasket(id) {
    basket = basket.filter(item => item.id != id);
    sebeteYaz()
}


function toplam() {
    const qiymet =  basket.reduce((acc, item) =>  acc += (item.opsi), 0)
    console.log(qiymet);

    
    
}