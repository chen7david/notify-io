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

module.exports =  SchemaBuilder 