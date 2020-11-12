const db = require("../models")

module.exports = {
    create: function(req,res){
        console.log(req.body)
        db.Post
        .create(req.body) 
        .then(res => db.User.findOneAndUpdate({_id: req.body.userId}, { $push: { posts: res._id } }, { new: true },))
        .then(dbPost => res.json(dbPost))
        .catch(err => res.status(422).json(err))
    },
    remove: function(req,res){
        db.Post
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
}