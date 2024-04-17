const ContatoModel = require("../models/contatoModel")

exports.home = async (request, response) => {
    const contato = new ContatoModel()
    const contatos = await contato.buscarContatos()
    response.render("home", {contatos})
}
