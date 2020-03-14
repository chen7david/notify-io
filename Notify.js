const { TemplateBuilder } = require('./TemplateBuilder')
const { isArray } = require('funx-js')

class Notify {

    static lang = 'en'

    constructor(){
        this.lang = this.getLang()
    }

    static congif(config){
        let { langs, defaultLang, templates } = config
        if(!(templates instanceof TemplateBuilder))
            throw(`templates has to be a valid instace of TemplateBuilder`)
        if(langs){
            if(!isArray(langs)) throw(`langs has to be of type Array`)
            if(langs.length == 0) throw(`langs can not be empty`)
            this.langs = langs 
        }else {
            this.langs  = ['en']
        }
        if(defaultLang){
            if(typeof defaultLang !== 'string')
                throw(`defaultLang has to be a valid instace of String`)
            if(!this.langs.includes(defaultLang)) 
                throw(`defaultLang has to be included in your langs Array`)
            this.lang = defaultLang
        }

        this.templates = templates.getTemplates()
        return this
    }

    template(name, data){
        let template = this.templates()[name]
        if(!template)
            throw(`${name} template was not loaded, please load it first!`)
        let message = template.messages[this.lang]
        if(!(message instanceof Function))
            throw(`${this.lang} template lang was not loaded, please load it first!`)
        template.details.message = template.messages[this.lang](data)
        return template.details
    }

    setKey(key){
        
        this.key = key
    }

    loadMessage(name, data){
        if(!this.messages) this.messages = []
        this.messages.push(this.template(name, data))
        return this
    }

    langTo(lang){
        if(this.isLang(lang)) this.lang = lang
        return this
    }

    getLang(){
        return this.constructor.lang
    }

    getNotification(){
        return {
            lang: this.lang,
            messages:this.messages
        }
    }

    isLang(lang){
        return this.constructor.langs.includes(lang)
    }

    templates(){
        return this.constructor.templates
    }
}

module.exports = { Notify, TemplateBuilder }