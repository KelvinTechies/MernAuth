import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Users = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    })


Users.pre('save', async function (nxt) {
    if (!this.isModified('password')) {
        nxt()
    } else {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

Users.methods.comparePwd = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
}

const User = mongoose.model('Users', Users)

export default User