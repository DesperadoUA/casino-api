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
    static replaceHeadings(str) {
        [
            {old:'<h2', new: "<h2 class='heading' data-deep='first' "},
            {old:'<h3', new: "<h3 class='heading' data-deep='second' "},
            {old:'<h4', new: "<h4 class='heading' data-deep='second' "},
            {old:'<h5', new: "<h5 class='heading' data-deep='second' "},
            {old:'<h6', new: "<h6 class='heading' data-deep='second' "}
        ].forEach(item => {
            const old = new RegExp(item.old, 'g');
            str = str.replace(old, item.new) 
        })
        return str
    }
 }
 module.exports = Helper