const supertest = require('supertest');

const app = require('../app');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');

const api = supertest(app);

beforeAll(async () => {
    await User.deleteMany({})
})
test('user registration', async () => {
    const res = await api.post('/users/register')
        .send({
            username: 'testuser1',
            email: 'test@gmail.com',
            password: 'test123',
        })
        .expect(201)

        // console.log(res.body)
        expect(res.body.username).toBe('testuser1')
})

test('registration of duplicate username' , () => {
    return api.post('/users/register')
    .send({
        username: 'testuser1',
            email: 'test@gmail.com',
            password: 'test123',
    }).expect(400)
    .then((res) => {
        // console.log(res.body)
        expect(res.body.error).toMatch(/Duplicate/)
    })
})

test('registered user can login', async () => {
    const res = await api.post('/users/login')
    .send({
        username: 'testuser1',
        password: 'test123'
    }).expect(200)
    console.log(res.body)
    expect(res.body.token).toBeDefined()
})

test('user login with unregistered username', async () => {
    const res = await api.post('/users/login')
        .send({
            username: "testuser3",
            password: "test143"
        })
        .expect(400)
    expect(res.body.error).toMatch(/registered/)
})

afterAll(async () => await mongoose.connection.close())