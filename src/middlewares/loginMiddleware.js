exports.loginRequered = (request, response, next)=> {
    if(!request.session.user){
        response.redirect("login")
        return
    }
    next()
}

exports.isLogin = (request, response, next)=> {
    if(request.session.user){
        response.redirect("/")
        return
    }
    next()
}