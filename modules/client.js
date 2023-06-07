export class Client {
    constructor (name, payFee){
        this.name = name
        this.payFee = payFee
        this.bill = 0
        this.id = Math.random()*100
        this.products = []
        
    }

    getName(){
        return this.name
    }

    getPayFee(){
        return this.payFee
    }

    getBill(){
        return this.bill
    }

    setBill(bill){
        this.bill = bill
    }

    getId(){
        return this.id
    }

    setProducts(product) {
        this.products.push(product)
    }

    getProducts(whichProduct) {
        return this.products[whichProduct].name
    }

    
}