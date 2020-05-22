const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    "_id":userOneId,
    "name":"Shruti",
    "email":"shruti@gmail.com",
    "password":"shruti1234",
    "tokens":[{
        "token": jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

beforeEach(async()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/cust').send({
        name: 'Prachi',
        email: 'prachi@gmail.com',
        password: 'prachi123'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/cust/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexisting user', async () => {
    await request(app).post('/cust/login').send({
        email: userOne.email,
        password: 'mypassword'
    }).expect(400)
})

test('Should get profile for user',async()=>{
    await request(app)
        .get('/cust/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthorized user',async()=>{
    await request(app)
        .get('/cust/me')
        .send()
        .expect(401)
})

