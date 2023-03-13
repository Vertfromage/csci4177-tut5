const { v4: uuid } = require('uuid') //https://www.npmjs.com/package/uuid

const express = require('express')
const router = express.Router()


const users = [{
    email : 'abc@abc.ca',
    firstName : 'ABC',
    id : 'abf6783'
    },
    {
    email : 'xyz@xyz.ca',
    firstName: 'XYZ',
    id : '5abf674563'
    }]

router.get('/users', (req, res)=>{
    res.status(200).json({
        message:"Users retrieved",
        success: true,
        data: users
    })
})

router.get('/user/:id', (req, res)=>{
    const {id} =  req.params
    const user = users.find( u => u.id === id )
    if(user){
        res.status(200).json({
            message:"Users retrieved",
            success: true,
            data: user
        })
    }else{
        res.status(404).json({
            message: "User not found",
            success:false
        })
    }   
})

router.post('/add', (req,res)=>{
    const input = req.body
    input.id = uuid()
    if(input?.email && input?.firstName && input?.id){
        users.push(input)
        res.status(201).json({
            message: "User added",
            success: true            
        })
    }else{
        res.status(500).json({
            message:"Error User not added",
            success: false
        })
    }
})

router.put('/update/:id', (req,res)=>{
    const input = req.body
    const {id} =  req.params
    let found = false

    if(input?.email && input?.firstName && id){
        users.forEach(u=>{
            if(u.id===id){
                u.email = input.email
                u.firstName = input.firstName
                found=true
            }
        })
        if(found){
            res.status(201).json({
                message: "User updated",
                success: true            
            })
        }else{
            res.status(404).json({
                message: "User not found",
                success:false
            })
        }
    }else{
        
        res.status(500).json({
            message:"Error User not updated",
            success: false
        })
    }
})



module.exports = router