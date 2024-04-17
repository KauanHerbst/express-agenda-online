const { request, response } = require("express")
const Contato = require("../models/contatoModel")

exports.contato = (request, response)=> {
    response.render("contato", {
        contato: {}
    })
}

exports.register = async (request, response)=> {
    const contato = new Contato(request.body)
    try{
        await contato.register()
        if(contato.erros.length > 0){
            request.flash("erros", contato.erros)
            request.session.save(()=> {
                return response.redirect("contato")
            })
            return
        }
        contato.msgSuccess.push("Contato Adicionado com Sucesso!")
        request.flash("success", contato.msgSuccess)
        response.redirect("contato") 

    }catch(e){
        console.log(e)
        response.redirect("error")
    }
}

exports.editContato = async (request, response)=>{
    const contatoModel = new Contato()
    if(!request.params.id) return response.redirect("/error")
    const contato = await contatoModel.buscarID(request.params.id)
    if(!contato) return response.redirect("/error")
    response.render("editContato", {contato})
}

exports.edit = async (request,response) =>{
    const contatoModel = new Contato(request.body)
    try{
        if(!request.params.id) return response.redirect("/error")
        const contato = await contatoModel.editarContato(request.params.id)
        if(contatoModel.erros.length > 0){
            request.flash("erros", contatoModel.erros)
            request.session.save(()=> {
                return response.redirect(`/contato/edit/${request.params.id}`)
            })
            return
    }
    contatoModel.msgSuccess.push("Contato Atualizado com Sucesso!")
    request.flash("success", contatoModel.msgSuccess)
    request.session.save(() => {response.redirect(`/contato/edit/${request.params.id}`) })
    }catch(e){
        console.log(e)
        response.render("error404")
    }
}

exports.delete = async (request, response)=>{
    const contatoModel = new Contato()
    if(!request.params.id) return response.redirect("/error")
    const contato = await contatoModel.delete(request.params.id)
    if(!contato) return response.redirect("/error")
    contatoModel.msgSuccess.push("Contato Deletado com Sucesso!")
    request.flash("success", contatoModel.msgSuccess)
    request.session.save(()=> {response.redirect("back")})
}