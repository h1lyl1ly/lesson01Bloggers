import request from 'supertest'
import {app} from '../../src'

describe('/course', () => {
   beforeAll(async () => {
       await request(app).delete('/__test__/data')

    })


    it ('should return 200 and empty array', () => {
        request(app)
            .get('/course')
            .expect(200,[])
    })
    it ('should return 404 for not existing course', () => {
        request(app)
            .get('/course/9999999')
            .expect(404)
    })
    it ('shouldn`t create course with incorrect input data', async () =>{
        await request(app)
            .post('/course/777777')
            .send({title: ''})
            .expect(400)

        await request(app)
            .get('/course')
            .expect(200,[])
    })
    it ('should create course with correct input data', async () =>{
        const createResponse = await request(app)
            .post('/course')
            .send({title: 'it-incubator'})
            .expect(201)

        const createdResponse = createResponse.body
        expect(createdResponse).toEqual({
            id: expect.any(Number),
            title: 'it-incubator'
        })

        request(app)
            .get('/course')
            .expect(200,[createdResponse])
    })
})