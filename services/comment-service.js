"use strict";

class CommentService {
    constructor (commentFactory) {
        this.comment_factory = commentFactory;
    }

    create_comment(user, message) {
        return this.comment_factory.create_instance({
            message: message
        }).save().then(message => {
            user.comments.push(message._id);
            return user.save();
        });
    }
    
    get_comments() {
        return this.comment_factory.get_model().find();
    }
}

module.exports = CommentService;