"use strict";

class CommentService {
    constructor (commentFactory) {
        this.comment_factory = commentFactory;
    }

    create_comment(user, message, parent) {
        return new Promise((resolve, reject) => {
            get_level.call(this, parent, (err, level) => {
                if (err) return reject(err);
                if (level >= 4) return reject(new Error('Maximum level of nesting'));

                this.comment_factory.create_instance({
                    message: message,
                    parent: parent
                }).save().then(message => {
                    user.comments.push(message._id);
                    user.save().then(resolve);
                });

            });
        });

        function get_level(parent, callback, level = 0) {
            this.comment_factory.get_model()
                .findOne({_id: parent})
                .then(comment => {
                    if (comment.parent) {
                        level ++;
                        get_level.call(this, comment.parent, callback, level);
                    } else {
                        callback(null, level);
                    }
                }).catch(err => callback(err, null));
        }
    }

    
    get_comments() {
        return this.comment_factory.get_model().find();
    }
}

module.exports = CommentService;