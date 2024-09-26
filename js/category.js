const url = window.location.search.split('=').at('-1')
const DATA = []
fetch(`http://localhost:3000/${url}`)
.then(res => res.json())
.then(data =>{
    DATA.push(...data)
    showProducts()
})
.catch(err => alert('Undefined'))

const cards = document.getElementById('cards')

function showProducts() {
    DATA.map(item => {
        cards.innerHTML += `
             <div onclick="openPizza('${item.id}', '${item.img}', '${item.title}', '${item.price}')" class="card cursor-pointer mb-[20px] px-2">
                <div class="mb-[10px]">
                    <img src="${item.img}" alt="" class="w-full h-[220px] object-cover">
                </div>
                <div class="title flex justify-between mb-[23px]">
                    <p class="font-bold text-[22px] text-wrap">${item.title}</p>
                    <button class="bg-[#0f9675] whitespace-nowrap px-[18px] py-[5px] h-[40px] rounded-md font-bold uppercase text-[18px] text-white">Bunu sec</button>
                </div>
                <p>${item.composition}</p>
            </div>
        `
    })
}