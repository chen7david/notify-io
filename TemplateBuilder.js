const { isObject } = require('funx-js')

class TemplateBuilder {

    constructor(){
        this.templates = {}
    }

    load(key, details, messages){
        if(this.templates[key])
            throw(`${key} template was already loaded`)
        if(!isObject(messages) || !isObject(messages))
            throw(`${key} template details and messages arguments have to be of type object`)
        this.templates[key] = { details, messages }
        return this
    }

    getTemplates(){
        return this.templates
    }
}

module.exports = { TemplateBuilder }