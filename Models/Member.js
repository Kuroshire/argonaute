const { Schema, model } = require("mongoose");

const MemberSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true
    }
);

const Member = model("Member", MemberSchema);
module.exports = Member;