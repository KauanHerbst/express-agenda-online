exports.csurfCheckError = (erro, request, response, next) => {
    if(erro){
        return response.render("error404")
    }
}

exports.csurfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();  
    response.locals.erros =  request.flash("erros")
    response.locals.successNew = request.flash("success")
    response.locals.session = request.session
    next()
}