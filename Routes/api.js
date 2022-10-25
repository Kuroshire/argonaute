const express = require('express');
const router = express.Router();

const Member = require('../Models/Member.js');


//@route      GET /api/test
//@desc       Test the a  uth route
//@access     Public

router.get('/test', (req, res) => {
    res.send("API route working");
});

//@route      GET /api/members
//@desc       return the list of members (only their infos such as name, age, etc) in the database
//@access     Public
router.get('/members', (req, res) => {
    const result = [];

    Member.find({}, (err, members) => {
        if(err){
            return res.status(400).json({error : "Error detected"});
        }

        members.map( member => {
            result.push({
                name : member.name
            });
        });
        
        return res.json(result);
    });
});


//@route      POST /api/addmember
//@desc       Add a new member to the database
//@access     Public
router.post('/addmember', async(req, res) => {
    try{
        //check for existing members
        const existingName = await Member.findOne({name : req.body.name});
        if(existingName){
            return res.status(400)
                .json({error: "There is already a member with this name"});
        }

        //create a new member
        const newMember = new Member({
            name: req.body.name
        });

        //save new Member to DB
        const savedMember = await newMember.save();

        //return the new Member
        return res.json(savedMember);

    } catch(err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

module.exports = router;