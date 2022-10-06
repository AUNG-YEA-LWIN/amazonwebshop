const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.KEY;

const usersSchema = new mongoose.Schema({
    fname:{
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("not valid email address")
            }
        }
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        maxlength: 11
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    confirmpassword: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
    carts : Array
})

usersSchema.pre('save', async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword,12);
    }
    next();
    
})

// token generate 

usersSchema.methods.generateAuthtoken = async function() {
    try{
        let token = jwt.sign({_id:this._id},secretKey);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err) {
        console.log(err);
    }
} 

// add to cart data

usersSchema.methods.addcartdata = async function(cart) {
    try{
        this.carts = this.carts.concat(cart);
        await this.save();
        return this.carts
    }catch(err) {   
        console.log(err)
    }
}

const USER = new mongoose.model('USER', usersSchema);

module.exports = USER;