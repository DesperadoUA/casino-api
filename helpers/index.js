const slugify = require('slugify')
class Helper {
    static transliterateUrl(str) {
        return slugify(str, {
            replacement: '-',  
            remove: /[*+~.()'"!:@]/g, 
            lower: true,      
            strict: false,     
            trim: true   
        })
    }
    static metaSave(data, configEditor) {
        const newData = {}
        for (let key in configEditor) {
            if(key in data) {
                newData[key] = configEditor[key].dataType === 'JSON' 
                               ? JSON.stringify(data[key]) 
                               : data[key]
            }
            else {
                newData[key] = configEditor[key].dataType === 'JSON' 
                               ? JSON.stringify(configEditor[key].default) 
                               : configEditor[key].default
            }
        }
        return newData
    }
    static metaDecode(data, configEditor) {
        const newData = {}
        for (let key in configEditor) {
            if(key in data) {
                newData[key] = configEditor[key].dataType === 'JSON' 
                               ? JSON.parse(data[key]) 
                               : data[key]
            }
            else {
                newData[key] = configEditor[key].default
            }
        }
        return newData
    }
    static createSchemas(fields, DataTypes) {
        const data = {}
        for(let key in fields) {
            data[key] = {}
            for(let keySchemas in fields[key].schemas) {
                if(keySchemas === 'type') {
                    data[key][keySchemas] = DataTypes[fields[key].schemas[keySchemas]]
                } else {
                    data[key][keySchemas] = fields[key].schemas[keySchemas] 
                }
            }
        }
        return data
    }
 }
 module.exports = Helper