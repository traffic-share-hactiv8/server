const Timeline = require('../models/timelines');

module.exports = {
    getAllTimeline : (req,res)=>{
        Timeline.find().sort({createdAt : 1})
        .then(timelines=>{
            res.status(200).json({message: "Retrieve Success", timelines})
        })
        .catch(err=>{
            res.status(400).json({error: err})
        });
    },
    createTl : (req,res)=>{
        const userId = req.user.id
        imageUrl = req.body.imageUrl
        location = req.body.location
        description  = req.body.description
        timeline = new Timeline({
            imageUrl,
            location,
            description,
            userId
        })
        timeline.save()
        .then(result=>{
            res.status(201).json({message: "create TL success", result})
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
    },
    getTLCurrentUser : (req,res)=> {
        const userId = req.user.id
        Timeline.find({userId})
        .then(timelines=>{
            res.status(200).json({message: "Retrieve TL Success", timelines})
        })
        .catch(err=>{
            res.status(400).json({error: err})
        })
    },

    editTL : (req,res)=> {
        const id = req.params.id
        const userId = req.user.id
        const imageUrl = req.body.imageUrl
        const location = req.body.location
        const description = req.body.description
        Timeline.findById({_id: id})
        .then(timeline=>{
            //if user is current
            if (timeline.userId.equals(userId)){
                Timeline.update({_id:id},{
                    $set : {imageUrl, location, description}
                })
                .then(result=>{
                    res.status(200).json({message: "update TL success", result})
                })
                .catch()
            }else{
                res.status(403).json({error:"Forbidden to update!"})
            }
        })
    },
    deleteTL : (req,res)=>{
        const id = req.params.id;
        const userId = req.user.id

        Timeline.findById({_id:id})
        .then(timeline=>{
            //if user is current
            if (timeline.userId.equals(userId)){
                Timeline.remove({_id:id})
                .then(result=>{
                    res.status(200).json({message: "delete TL success!", result})
                })
                .catch(err=>{
                    res.status(400).json({error:err})
                })
            }else{
                res.status(403).json({error:"Forbidden to delete!"})
            }
        })
        .catch(err=>{
            res.status(400).json({error:err})
        })
    }
}