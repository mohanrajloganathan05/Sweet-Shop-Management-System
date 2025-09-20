process.env.NODE_ENV = "test";
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

beforeAll(async () => {
  const url = process.env.MONGO_URI;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('Auth APIs', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
    expect(res.body.user.name).toBe('Test User');
  });

  it('should login an existing user', async () => {
    // Create user first
    await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '123456', // password will be hashed in pre-save hook
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
    expect(res.body.user.name).toBe('Test User');
  });

  it('should not login with wrong password', async () => {
    await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '123456',
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpass',
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid email or password');
  });
});
