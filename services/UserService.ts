import { User } from "../types/User";
import db from '../database';

const UserService = {
    addUser: (user:User):User =>{
        return db.user.create(user).then(value=>{
            if(!value) throw new Error("failed to add user")
            else{
                return value.toJSON()
            }
        })
    },
    findUser : (id:String) : User | any =>{
        return db.user.findOne({where:{id}}).then(value=>{
            if(!value) throw new Error("user not found")
            else{
                return value.toJSON()
            }
        })
    },
    deleteUser : (id:String) =>{
        return db.user.destroy({where:{id}})
    },
    deleteUserViaEmail : (email:String) =>{
        return db.user.destroy({where:{email}})
    }
}

export default UserService;