const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with a json inserted message', function(done) {
    const result={
      name:'CJ',
      message:"cool",
      latitude:45,
      longitude:44
    };
    const resp={
      ...result,
      date: '2019-07-10T19:49:50.996Z',
     _id: '5d26356c7a85fe2354641737'
    }
    request(app)
      .post('/api/v1/messages')
      .send(result)
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(response=>{
          response.body._id='5d26356c7a85fe2354641737';
          response.body.date='2019-07-10T19:49:50.996Z';
      })
      .expect(200,resp,done);
  });
});
