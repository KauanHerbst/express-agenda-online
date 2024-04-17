const Account = require("../models/accountModel")

exports.new = (request, response) => {
    response.render("new")
}

exports.register= async function(request, response){
    const account = new Account(request.body)
    try{
        await account.register()
        if(account.erros.length > 0){
            request.flash("erros", account.erros)
            request.session.save(() => {
                return response.redirect('new')
            })
            return
        }
        account.msgSuccess.push("Conta Criada com Sucesso!")
        request.flash("success", account.msgSuccess)
        response.redirect('new')
    }catch(e){
        console.warn(e)
        response.render("error404")
    }

}