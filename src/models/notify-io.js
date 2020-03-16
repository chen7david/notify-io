const SchemaBuilder = require('./schema')

class NotifyIO {

    static schemas = null

    constructor(state){
        this.lang = 'en'
        if(state) this.state = state
    }

    static loadSchema(schema){
        if(!(schema instanceof SchemaBuilder))
            throw(`schema should be an instance of SchemaBuilder`)
        this.schemas = schema.export()
        return this
    }

    load(name, data, key){
        let template = this.getTemplate(name)
        if(!template) throw(`${name} template does not exist!`)
        let config = { template }
        if(key) config.key = key
        if(data) config.data = data
        if(!this.queue) this.queue = []
        this.queue.push(config)
        return this
    }

    render(){
        const messages = []
        let lang = this.lang
        for(let config of this.queue){
            const { template, data, key } = config
            messages.push({
                message: template[lang](data),
                key
            })
        }
        delete this.queue
        this.messages = messages
        return this
    }

    message(name, data, key){
        this.load(name, data, key)
        this.render()
        return this
    }

    stateTo(state){
        this.state = state
        return this
    }

    langTo(lang){
        this.lang = lang
        return this
    }

    schemas(){
        return this.constructor.schemas
    }

    getTemplate(name){
        return this.schemas()[name]
    }
}

module.exports = NotifyIO