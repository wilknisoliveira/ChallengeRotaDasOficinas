export class Product {
    constructor(name, price) {
        this.name = name
        this.price = price
        this.id = Math.random()*100
        this.clients = []
    }

    getName(){
        return this.name
    }

    getPrice(){
        return this.price
    }

    setClients(client) {
        this.clients.push(client)
    }

    getClients(whichClient) {
        return this.clients[whichClient]
    }

    getAllClients() {
        return this.clients
    }
}