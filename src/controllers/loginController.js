const Account = require("../models/accountModel")


exports.loginHome = (request, response)=> {
    response.render("login")
}

exports.login= async function(request, response){
    const account = new Account(request.body)
    try{
        await account.login()
        if(account.erros.length > 0){
            request.flash("erros", account.erros)
            request.session.save(() => {
                return response.redirect('login')
            })
            return
        }
        account.msgSuccess.push("Login Realizado!")
        request.flash("success", account.msgSuccess)
        request.session.user = account.user 
        response.redirect('profile')
    }catch(e){
        console.warn(e)
        response.redirect("error")
    }

}

exports.logout = (request, response)=>{
    request.session.destroy()
    response.redirect("login")
}