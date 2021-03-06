// 引入刚刚建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的数据表模型文件
const User = Sequelize.import('../schema/user');
// 自动创建表
User.sync({ force: false });

class UserModel {

  static async createUser (data) {
    let result = await User.findOne({
      where:{
        user:data.user
      }
    })
    if(!result){
      await User.create({
        user: data.user, 
        password: data.password, 
        token: data.token, 
      })
      return true 
    }else{
      return false
    }
  }


  static async getUser (req) {
    return await User.findOne({
      where:{
        user:req.user,
        password:req.password
      }
    })
  }
}

module.exports = UserModel