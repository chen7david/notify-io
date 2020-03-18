const { isObject } = require('funx-js')

class SchemaBuilder {

    constructor(){
        this.schemas = {}
    }

    create(name, fields){
        if(this.duplicate(name))
            throw(`schema name "${name}" is duplicate!`)
        this.schemas[name] = fields
    }

    keys(){
        return Object.keys(this.schemas)
    }

    export(){
        return this.schemas
    }

    duplicate(key){
        return this.keys().includes(key)
    }

    merege(schemas){
        if(!isObject(schemas)) 
            throw(`merge expects an object of SchemaBuilder instances`)
        let schemakeys = Object.keys(schemas)
        for(let schemaKey of schemakeys){
            let schema = schemas[schemaKey]
            if(!(schema instanceof SchemaBuilder))
                throw(`expects an instance of SchemaBuilder`)
            schema = schema.export()
            let names = Object.keys(schema)
            for(let name of names){
                if(this.duplicate(name))
                    throw(`schema name "${name}" is duplicate!`)
                let fields = schema[name]
                this.schemas[name] = fields
            }
        }
        return this
    }
}

class Notify {

    constructor(schema){
        this.lang = 'en'
        this.state = 'info'
        this.loadSchema(schema)
    }

    loadSchema(schema){
        if(!(schema instanceof SchemaBuilder))
            throw(`schema should be an instance of SchemaBuilder`)
        this.constructor.schema = schema.export()
        return this
    }

    load(name, data, key){
        let template = this.template(name)
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
            const item = { message: template[lang](data) }
            if(key) item.key = key
            messages.push(item)
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

    originalTo(state){
        this.original = original
        return this
    }

    schema(){
        return this.constructor.schema
    }

    template(name){
        return this.schema()[name]
    }
}

module.exports = { Notify, SchemaBuilder }