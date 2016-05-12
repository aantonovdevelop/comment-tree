"use strict";

/**
 * 
 * @param {Object} mongoose Mongoose instance
 * @param {String} name Name of model
 * @param {Object} schema Model schema object
 * 
 * @constructor
 */
function ModelFactory (mongoose, name, schema) {

    this.model = mongoose.model(name, schema);

    /**
     * Create instance of model
     */
    this.create_instance = function (schema) {
        return new this.model(schema);
    };

    /**
     * Get message model
     */
    this.get_model = function () {
        return this.model;
    };
}

module.exports = ModelFactory;