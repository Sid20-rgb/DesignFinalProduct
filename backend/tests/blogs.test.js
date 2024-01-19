const supertest = require('supertest');
const app = require('../app');
const Book = require('../models/Blog');
const {default: mongoose} = require('mongoose');
const api = supertest(app);

let token = ''
beforeAll(async () => {
    await Book.deleteMany()
    await Book.create({
        title: "Love and London",
        content: "This is a blog about love and London",
        contentImg: "contentImg",
        blogCover: "blogCover",
    })
    await api.post('/users/register')
        .send({
            username: 'testuser2',
            email: 'test2@gmail.com',
            password: 'test123',
    })
    const res = await api.post('/users/login')
        .send({
            username: 'testuser2',
            password: 'test123',
    })
    // console.log(res.body)
    token = res.body.token
})

afterAll(async () => await mongoose.connection.close())

test('logged in user can get list of blogs', async () => {
    // expect(true).toBe(true)
    const res = await api.get('/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    // console.log(res.body)
    // expect(res.body.length).toBe(1) // we have only one book in the database
    expect(res.body[0].title).toMatch(/London/)
})