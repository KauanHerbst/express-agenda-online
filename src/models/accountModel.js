const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const schemaAccount = mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
})

const modelAccount = mongoose.model("ModelAccount", schemaAccount)

class Account {
    constructor(body){
        this.body = body
        this.erros = []
        this.user = null
        this.msgSuccess = []
    }

    async login(){
        this.cleanBody()
        this.user = await modelAccount.findOne({email: this.body.email})
        if(!this.user){
            this.erros.push("Usuário Inválido!")
            return
        }

        if(!bcrypt.compareSync(this.body.senha, this.user.senha)){
            this.erros.push("Senha Inválida!")
            this.user = null
            return
        }

    }

    async register(){
        this.isErros()
        if(this.erros.length > 0) { return }
        
        await this.userExist()

        if(this.erros.length > 0) { return }
        const salt = bcrypt.genSaltSync()
        this.body.senha = bcrypt.hashSync(this.body.senha, salt)
        this.user = await modelAccount.create(this.body)
    }

    isErros(){
        this.cleanBody()
        if(!validator.isEmail(this.body.email)) {this.erros.push("Email Invalido!")}
        if(this.body.senha.length <= 3) {this.erros.push("A senha deve ter no minimo 4 caracteres")}
    }


    async userExist(){
        const userE = await modelAccount.findOne({email: this.body.email})
        if(userE){
            this.erros.push("Conta já registrada!")
            return
        }
    }

    cleanBody(){
        for(let key in this.body){
            if(typeof this.body[key] !== "string")
                this.body[key] = ""
        }
        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            senha: this.body.senha
        }
    }

}

module.exports = Account