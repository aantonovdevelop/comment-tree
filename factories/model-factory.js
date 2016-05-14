"use strict";

class ModelFactory {

    /**
     *
     * @param {Object} mongoose Mongoose instance
     * @param {String} name Name of model
     * @param {Object} schema Model schema object
     *
     * @constructor
     */
    constructor (mongoose, name, schema) {
        this.model = mongoose.model(name, schema);
    }
    
    /**
     * Create instance of model
     */
    create_instance (schema) {
        return new this.model(schema);
    };

    /**
     * Get message model
     */
    get_model () {
        return this.model;
    };
}

module.exports = ModelFactory;