const mongoose = require("mongoose")
const schemaContato = mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ""},
    email: {type: String, required: false, default: ""},
    telefone: {type: String, required: false, default: ""}
})

const modelContato = mongoose.model("ContatoModel", schemaContato)

class Contato{
    constructor(body){
        this.body = body
        this.erros = []
        this.msgSuccess = []
        this.contato = null
    }


    async register(){
        this.contatoIsErros()
        if(this.erros.length > 0){ return }

        this.contato = await modelContato.create(this.body)
    }

    contatoIsErros(){
        this.cleanBody()
        if(!this.body.email && !this.body.telefone){ this.erros.push("Precisa adicionar pelo menos um Email ou Telefone!")}
    }


    cleanBody(){
        for(let key in this.body){
            if(typeof this.body[key] !== "string")
                this.body[key] = ""
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        }
    }

    async editarContato(id){
        if(typeof id !== "string"){return}
        this.contatoIsErros()
        if(this.erros.length > 0){ return }
        this.contato = await modelContato.findByIdAndUpdate(id, this.body, {new: true})
    }

    async buscarID(id){
        if(typeof id !== "string"){return}
        const contato = await modelContato.findById(id)
        return contato
    }

    async buscarContatos(){
        const contatos = await modelContato.find()
        return contatos
    }

    async delete(id){
        if(typeof id !== "string"){return}
        const contato = await modelContato.findByIdAndDelete(id)
        return contato
    }

}

module.exports = Contato