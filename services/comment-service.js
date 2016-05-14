"use strict";

class CommentService {
    constructor (maximumNesting, commentFactory) {
        this.nesting_level = maximumNesting;
        this.model = commentFactory.get_model();
    }
    
    set nesting_level(lvl) {
        this._maximum_nesting_lvl = (lvl > 0 && lvl < 10) ? lvl : 4;
    }
    
    get nesting_level() {
        return this._maximum_nesting_lvl;
    }

    /**
     * Create new commentary
     * 
     * @param {Object} user User model instance
     * @param {String} message Commentary message
     * @param {String} parent ID of parent commentary
     * 
     * @returns {Promise}
     */
    create_comment(user, message, parent) {
        return new Promise((resolve, reject) => {
            get_level.call(this, parent, (err, level) => {
                if (err) return reject(err);
                if (level >= this._maximum_nesting_lvl) 
                    return reject(new Error('Maximum level of nesting'));

                var comment = new this.model({
                    message:message,
                    parent: parent
                });
                
                comment.save().then(message => {
                    user.comments.push(message._id);
                    user.save().then(() => resolve(message));
                });

            });
        });

        /**
         * Get level of commentary nesting
         * 
         * @param {String} parent Parent commentary ID
         * @param {Function} callback
         * @param {Number} level
         */
        function get_level(parent, callback, level = 1) {
            this.model.get_parent(parent)
                .then(parent => {
                    if (parent) {
                        level ++;
                        get_level.call(this, parent, callback, level);
                    } else {
                        callback(null, level);
                    }
                }).catch(err => callback(err, null));
        }
    }

    
    get_comments() {
        return this.model.get_all();
    }
}

module.exports = CommentService;