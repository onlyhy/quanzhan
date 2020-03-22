const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// 定义模型
// 用户名唯一，对密码做处理（npm i bcrypt）
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String, set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})
const User = mongoose.model('User', userSchema)

// User.db.dropCollection('users')

module.exports = { User }