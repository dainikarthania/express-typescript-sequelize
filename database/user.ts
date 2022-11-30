module.exports = (sequelize,DataTypes) =>{
    let User = sequelize.define('user',{
        email : {type:DataTypes.STRING,notNull:true,unique:true},
        name: {type:DataTypes.STRING,notNull:true},
        dob:{type:DataTypes.DATE,notNull:true},
    })

    return User
}