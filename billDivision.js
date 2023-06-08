import {Product} from './modules/product.js';
import {Client} from './modules/client.js'

//Product list variables
let productInput = document.querySelector('input#productInput')
let priceInput = document.querySelector('input#priceInput')
let productList = document.querySelector('select#productList')
let productAddBtn = document.querySelector('button#productAddBtn')
let quantityInput = document.querySelector('input#quantityInput')
let productDeleteBtn = document.querySelector('button#productDeleteBtn')
let product = []

//Client list variables
let clientList = document.querySelector('select#clientList')
let clientAddBtn = document.querySelector('button#clientAddBtn')
let clientInput = document.querySelector('input#clientInput')
let payFeeSelect = document.querySelector('select#payFeeSelect')
let clientDeleteBtn = document.querySelector('button#clientDeleteBtn')
let client = []

//Consumption list variables
let consumptionList = document.querySelector('select#consumptionList')
let consumptionAddBtn = document.querySelector('button#consumptionAddBtn')
let consumptionProductSelect = document.querySelector('select#consumptionProductSelect')
let consumptionClientSelect = document.querySelector('select#consumptionClientSelect')
let consumptionDeleteBtn = document.querySelector('button#consumptionDeleteBtn')

//Division variables
let divisionBtn = document.querySelector('button#divisionBtn')
let divisionList = document.querySelector('select#divisionList')

//Event listeners
productAddBtn.addEventListener('click', insertProduct)
clientAddBtn.addEventListener('click', insertClient)
consumptionAddBtn.addEventListener('click', insertConsumption)
divisionBtn.addEventListener('click', division)
productDeleteBtn.addEventListener('click', ()=>{deleteItem(0)})
clientDeleteBtn.addEventListener('click', ()=>{deleteItem(1)})
consumptionDeleteBtn.addEventListener('click', ()=>{deleteItem(2)})

let selectItemGlobal = []

function insertProduct() {
    for(let i=0;i<quantityInput.value;i++){
        let productLocal = (productInput.value+': '+(i+1))
        product.push(new Product(productLocal, priceInput.value))
    
        let option = document.createElement('option')
        option.innerHTML = productLocal + ' | $ ' + priceInput.value
        productList.appendChild(option) 

        //Creating the dropdown list
        let dropdownOption = document.createElement('option')
        dropdownOption.innerHTML = productLocal
        consumptionProductSelect.appendChild(dropdownOption)
    }
}

function insertClient() {
    let payFee
    if(payFeeSelect.value == 'Yes')
        payFee = true
    else
        payFee = false

    client.push(new Client(clientInput.value, payFee))

    let option = document.createElement('option')
    option.innerHTML = clientInput.value + ': tax? ' + payFeeSelect.value
    clientList.appendChild(option) 

    //Creating the dropdown list
    let dropdownOption = document.createElement('option')
    dropdownOption.innerHTML = clientInput.value
    consumptionClientSelect.appendChild(dropdownOption)
}

function insertConsumption() {
    product[consumptionProductSelect.selectedIndex].setClients(client[consumptionClientSelect.selectedIndex])
    client[consumptionClientSelect.selectedIndex].setProducts(product[consumptionProductSelect.selectedIndex])
    
    let option = document.createElement('option')
    option.innerHTML =  consumptionProductSelect.value + ': ' + consumptionClientSelect.value 
    consumptionList.appendChild(option) 
}

function division(){
    while(divisionList.length>0)
        divisionList.remove(0)
    
    for(let i=0;i<client.length;i++){
        client[i].setBill(0) 
    }

    for(let i=0;i<product.length;i++){
        let bill = product[i].getPrice() / product[i].getAllClients().length
        for(let j=0;j<product[i].getAllClients().length;j++){
            let clientIndex = product[i].getClients(j).getId()

            for(let k=0;k<client.length;k++){
                if(client[k].getId() == clientIndex){
                    let payFee = 1
                    if(client[k].getPayFee() == true)
                        payFee = 1.1
                    client[k].setBill(client[k].getBill()+(bill*payFee))
                }
            }
        }
    }

    for(let i=0;i<client.length;i++){
        let option = document.createElement('option')
        option.innerHTML = client[i].getName() + ': $ ' + client[i].getBill()
        divisionList.appendChild(option)
    }

}

function deleteItem(list){
    selectItemGlobal[0] = productList.selectedIndex
    selectItemGlobal[1] = clientList.selectedIndex
    selectItemGlobal[2] = consumptionList.selectedIndex

    let id
    switch (list) {
        case 0:
            id = product[selectItemGlobal[0]].getId()
            //delete suspended list
            productList.remove(selectItemGlobal[0])
            product.splice(selectItemGlobal[0],1)
            consumptionProductSelect.remove(selectItemGlobal[0],1)

            for(let i=0;i<client.length;i++){
                for(let j=0;j<client[i].getAllProducts().length;j++){
                    if(client[i].getProducts(j).getId()==id){
                        client[i].deleteProduct(j)
                    }
                }
            }
            updateConsumptionList()
            break;
        case 1:
            id = client[selectItemGlobal[1]].getId()

            clientList.remove(selectItemGlobal[1])
            client.splice(selectItemGlobal[1],1)
            consumptionClientSelect.remove(selectItemGlobal[0],1)
            
            for(let i=0;i<product.length;i++){
                for(let j=0;j<product[i].getAllClients().length;j++){
                    if(product[i].getClients(j).getId()==id){
                        product[i].deleteClient(j)
                    }
                }
            }
            updateConsumptionList()
            break;
    }
}

function updateConsumptionList(){
    while(consumptionList.length>0){
        consumptionList.remove(0)
    }
    
    for(let i=0;i<product.length;i++){
        for(let j=0;j<product[i].getAllClients().length;j++){
            let option = document.createElement('option')
            option.innerHTML =  product[i].getName() + ': ' + product[i].getClients(j).getName() 
            consumptionList.appendChild(option) 
        }
    }
}
