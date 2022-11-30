import { Sequelize,DataTypes } from "sequelize";
import fs from 'fs'
import path from "path";
const basename = path.basename(__filename);

const sequelize = new Sequelize(process.env.POSTGRES_DB as string,process.env.POSTGRES_USERNAME as string,process.env.POSTGRES_PASSWORD as string,{
    dialect:"postgres",
    port:5432,
    host:"localhost"
})



const db : any = {}

fs.readdirSync(__dirname)
  .filter(file=>{
    return (file.indexOf(".") !==0 && file !==basename && file.slice(-3) === ".ts")
  }).forEach(file=>{
    let model = require("./"+file)(sequelize,DataTypes)
    db[model.name] = model
})

Object.keys(db).forEach(modelName=>{
    if(db[modelName].associate){
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize.authenticate().then(value=>{
    console.log("Database Connect")
})

sequelize.sync()

export default db;
