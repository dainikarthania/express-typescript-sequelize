import * as dotenv from 'dotenv'
dotenv.config()
import assert from "assert";
import UserService from "../services/UserService";
import { expect } from 'chai';

describe("user testing",()=>{
    it("should exist", () => {
        assert(UserService);
      });

      before(async()=>{
        await UserService.deleteUserViaEmail("test@mail.com")
      })

    let obj = {
       email : "test@mail.com",
       name   : "test",
       dob    : new Date("2000/01/01")
    }

    let user;

    it("adding user",async ()=>{
        user = await UserService.addUser(obj)

        expect(user.email).to.equal(obj.email)

    })
    it("finding user",async ()=>{
        let userDetails = await UserService.findUser(user.id)
        console.log("ee",userDetails)
        expect(userDetails).to.not.be.empty

    })
    it("deleting user",async ()=>{
         await UserService.deleteUser(user.id)

        let userDetails = await UserService.findUser(user.id).catch(err => {return {}})

        expect(userDetails).to.be.empty
    })
})