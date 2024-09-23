let data = []
fetch('https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json')
    .then(res => res.json())
    .then(fetchedData => {
        data = fetchedData
        console.log(data);
        showProducts()
    })

const cards = document.getElementById('cards')

function showProducts() {
    data.map(item => {
        cards.innerHTML += `
             <div class="card mb-[20px] px-2">
                    <div class="mb-[10px]">
                        <img src="${item.img}" alt="" class="w-full h-[220px] object-cover">
                    </div>
                    <div class="title flex justify-between mb-[23px]">
                        <p class="font-bold text-[22px] text-wrap">${item.name}</p>
                        <button onclick="showPizza('${item.id}', '${item.img}', '${item.name}', '${item.price}')" class="bg-[#0f9675] whitespace-nowrap px-[18px] py-[5px] h-[40px] rounded-md font-bold uppercase text-[18px] text-white">Bunu sec</button>
                    </div>
                    <p>${item.composition}</p>

                </div>

        
        `


    })
}
let flag = true
const bgBlur = document.getElementById('bgBlur')

function openPopup() {
    if (flag) {
        bgBlur.classList.remove("hidden");
        bgBlur.classList.add("grid");
    } else {
        bgBlur.classList.remove("grid");
        bgBlur.classList.add("hidden");
    }
    flag = !flag
    bgBlur.innerHTML = `
        <div onclick="dayan(event)" class="pop-up w-[600px] px-[20px] py-[10px] min-h-[200px] relative bg-white">
                <div class="flex justify-between">
                    <p class="text-[23px] font-bold">Sebet</p>
                    <p class="grid cursor-pointer font-bold" onclick="openPopup()" >Bagla X</p>
                </div>
                <div>
                    <span class="basket-count">Sebetinizdeki mehsullarin sayi: 0</span>
                </div>
                <div class="basket-content">
                
                </div>
                <div class="text-[20px] flex justify-between mt-5 font-bold">
                <button class=" bg-[#ad0f14] text-white px-[40px] py-[8px] ">Menyuya kecin</button>
                <button class=" total-price ">Umumi mebleg: 0 m</button>
                </div>
        </div>

   `
   addBasket()
}
const bgBlur2 = document.getElementById('bgBlur2')

let basket= []
function showPizza(id,img,title, price){
    let existingProduct = basket.find(item => item.id === id)
    if (existingProduct) {
        existingProduct.count +=1
    }
    else{
        basket.push({ id, img, title, price, count: 1 })
    }
    openPizza()
}
function openPizza() {
    if (bgBlur2.classList.contains('hidden')) {
        bgBlur2.classList.remove('hidden');
        bgBlur2.classList.add('grid');
    } else {
        bgBlur2.classList.remove('grid');
        bgBlur2.classList.add('hidden');
    }
    bgBlur2.innerHTML =''
    basket.map(item=>{
        bgBlur2.innerHTML = `
        <div onclick="dayan(event)" class=" bg-white w-[400px] h-auto">
                 <div onclick="openPizza()" class="text-right cursor-pointer">
                     <span>Bagla X</span>
                 </div>
                 <div class="w-[320px] m-auto h-auto">
                    <div class="max-w-full">
                     <img src="${item.img}" alt="">
                    </div>
                    <div class="title font-bold text-[20px] my-3">${item.title} </div>
 
                      <ul class="flex w-full rounded-md cursor-pointer justify-center">
                         <li id="li-enenevi" class="active p-2 w-[50%] rounded-md bg-[#0f9675]">Enenevi</li>
                         <li id="li-nazik" class="w-[50%] p-2 rounded-md bg-[#f1f1f1]">Nazik</li>
                     </ul>
                    
                     <select name="" id="enenevi" class="bg-[#ad0f14] my-2 hidden rounded-sm p-3 text-white w-full">
                         <option value="">Mini pizza, 15 sm -  5.5 M</option>
                         <option value="">Kiçik, 23 sm -  11 M</option>
                         <option value="">Orta, 30 sm -  17 M</option>
                         <option value="">Böyük, 35 sm -  21 M</option>
                     </select>
                     <select name="" id="nazik" class="bg-[#ad0f14] my-2 hidden rounded-sm p-3 text-white w-full">
                         <option value="">Kiçik, 23 sm -  11 M</option>
                         <option value="">Orta, 30 sm -  17 M</option>
                         <option value="">Böyük, 35 sm -  21 M</option>
                     </select>
                     
                   <div class="flex mt-4 justify-between">
                         <div class="">
                         <button onclick="increase('${item.id}')" class="bg-[#808080] px-3 text-white">-</button>
                         <span>${item.count}</span>
                         <button  onclick="decrease('${item.id}')" class="bg-[#0f9675] px-3 text-white">+</button>
                        </div>
                         <div class="font-bold text-[20px]">
                         ${item.price}m
                         </div>
                   </div>
 
                  <div class="mt-4 mb-2 rounded-md text-white cursor-pointer bg-[#0f9675]">
                      <button onclick="addBasket('${item.id}','${item.title}', '${item.price}')" class="px-5 py-2 ">Sebete at</button>
                  </div>
 
                 </div>
             </div>
 
    `
    })
    const enenevi = document.getElementById('enenevi');
    const nazik = document.getElementById('nazik');
    const liNazik = document.getElementById('li-nazik');
    const liEnenevi = document.getElementById('li-enenevi');

    function selectEnenevi() {
        liEnenevi.classList.add('active');
        liNazik.classList.remove('active');
        enenevi.classList.remove('hidden');
        nazik.classList.add('hidden');
        liEnenevi.style.backgroundColor = '#0f9675';
        liNazik.style.backgroundColor = '#f1f1f1';
        liEnenevi.style.color = 'white'; 
        liNazik.style.color = 'black';
    }

    function selectNazik() {
        liNazik.classList.add('active');
        liEnenevi.classList.remove('active');
        nazik.classList.remove('hidden');
        enenevi.classList.add('hidden');
        liNazik.style.backgroundColor = '#0f9675';
        liEnenevi.style.backgroundColor = '#f1f1f1';
        liNazik.style.color = 'white'; 
        liEnenevi.style.color = 'black';
    }
    liEnenevi.addEventListener('click', selectEnenevi);
    liNazik.addEventListener('click', selectNazik);

    selectEnenevi();
}
// function increase(id){
//     let existingProduct = basket.find(b => b.id === id);
//     if (existingProduct) {
//         existingProduct.count += 1;
//         openPizza(); 
//     }
// }
// function decrease(id) {
//     let existingProduct = basket.find(b => b.id === id);
//     if (existingProduct && existingProduct.count > 1) {
//         existingProduct.count -= 1;
//         openPizza(); 
//     }
// }

function addBasket() {
    const basketContent = document.querySelector('.basket-content'); 
    basketContent.innerHTML = ''; 
    
    basket.forEach(item => {
        basketContent.innerHTML += `
            <div class="basket-item flex justify-between mb-[10px]">
                <img src="${item.img}" alt="${item.title}" class="w-[30%] h-[50px] object-contain">
                <div class=" w-[50%] ">
                <p class="font-bold">${item.title}</p>
                <p>${item.count} x ${item.price}m</p>
                </div>
            </div>
        `;
    });
    const basketCount = document.querySelector('.basket-count'); 
    const totalPriceElement = document.querySelector('.total-price'); 

    const totalCount = basket.reduce((acc, item) => acc + item.count, 0);
    basketCount.textContent = `Sebetinizdeki mehsullarin sayi: ${totalCount}`;
   
    const totalPrice = basket.reduce((acc, item) => acc + item.price * item.count, 0);
    totalPriceElement.textContent = `Umumi mebleg: ${totalPrice} m`;


}

function dayan(event) {
    event.stopPropagation()
}

