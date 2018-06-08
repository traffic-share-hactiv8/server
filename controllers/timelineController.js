const Timeline = require('../models/timelines');
const axios = require('axios');

module.exports = {
    getAllTimeline : (req,res)=>{
        Timeline.find().sort({createdAt : 1})
        .populate('userId')
        .then(timelines=>{
            res.status(200).json({message: "Retrieve Success", timelines})
        })
        .catch(err=>{
            res.status(400).json({error: err})
        });
    },
    createTl : (req,res)=>{

        const userId = req.user.id
        imageUrl = req.file.cloudStoragePublicUrl
        location = req.body.location
        description  = req.body.description
        function convertToQuery (string) {
            let splitStr = string.split(',')
            let removeSpace = []
            splitStr.forEach(function (element) {
              removeSpace.push(element.trim())
            })
            let address = removeSpace.join(',')
            let addressSplit = address.split('')
            for (var i = 0; i < addressSplit.length; i++) {
              if (addressSplit[i] === ' ') {
                addressSplit[i] = '+'
              } else if (addressSplit[i] === ',') {
                addressSplit[i] = ',+'
              }
            }
            return addressSplit.join('')
          }
          let locationMap = location
          let longitude = 0
          let latitude = 0
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${convertToQuery(locationMap)}&key=AIzaSyBn11t_9j9am22Zuan7gHnFPk30MRAY7j4`)
            .then((response) => {
              let longitude = response.data.results[0].geometry.location.lng
              let latitude = response.data.results[0].geometry.location.lat
              console.log(longitude, latitude)
              timeline = new Timeline({
                  imageUrl,
                  location,
                  description,
                  latitude ,
                  longitude,
                  userId
              })
              timeline.save()
              .then(result=>{
                  res.status(201).json({message: "create TL success", result})
              })
              .catch(err=>{
                  res.status(500).json({error:err})
              })
            })
            .catch((err) => {
              console.log(err);
            })
        // let longitude = longlatit[0];
        // let latitude = longlatit[1];
    },
    getTLCurrentUser : (req,res)=> {
        const userId = req.user.id
        Timeline.find({userId})
        .populate('userId')
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


function getlatit(locationInp){
    function convertToQuery (string) {
        let splitStr = string.split(',')
        let removeSpace = []
        splitStr.forEach(function (element) {
          removeSpace.push(element.trim())
        })
        let address = removeSpace.join(',')
        let addressSplit = address.split('')
        for (var i = 0; i < addressSplit.length; i++) {
          if (addressSplit[i] === ' ') {
            addressSplit[i] = '+'
          } else if (addressSplit[i] === ',') {
            addressSplit[i] = ',+'
          }
        }
        return addressSplit.join('')
      }
      let location = locationInp
      let longitude = 0
      let latitude = 0
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${convertToQuery(location)}&key=AIzaSyBn11t_9j9am22Zuan7gHnFPk30MRAY7j4`)
        .then((response) => {
          longitude = response.data.results[0].geometry.location.lng
          latitude = response.data.results[0].geometry.location.lat
          console.log(longitude, latitude)
        })
        .catch((err) => {
          return err;
        })
}