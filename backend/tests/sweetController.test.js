process.env.NODE_ENV = "test";
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');
const Sweet = require('../src/models/sweet');

let adminToken, userToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create admin
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: '123456',
    isAdmin: true,
  });

  // Create user
  const user = await User.create({
    name: 'User',
    email: 'user@test.com',
    password: '123456',
    isAdmin: false,
  });

  adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Sweet.deleteMany();
});

describe('Sweet APIs', () => {
  it('Admin can add a new sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Gulab Jamun', category: 'Milk Sweets', price: 20, quantity: 50 });

    expect(res.status).toBe(201);
    expect(res.body.sweet).toHaveProperty('_id');
  });

  it('User cannot add a sweet', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ name: 'Rasgulla', category: 'Milk Sweets', price: 25, quantity: 40 });

    expect(res.status).toBe(403);
  });

  it('Can purchase a sweet and decrease quantity', async () => {
    const sweet = await Sweet.create({ name: 'Jalebi', category: 'Milk Sweets', price: 10, quantity: 50 });

    const res = await request(app)
      .post(`/api/sweets/purchase/${sweet._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.sweet.quantity).toBe(49);
  });

  it('Cannot purchase out-of-stock sweet', async () => {
    const sweet = await Sweet.create({ name: 'Ladoo', category: 'Milk Sweets', price: 15, quantity: 0 });

    const res = await request(app)
      .post(`/api/sweets/purchase/${sweet._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Sweet out of stock');
  });

  it('Admin can restock sweet', async () => {
    const sweet = await Sweet.create({ name: 'Barfi', category: 'Milk Sweets', price: 12, quantity: 0 });

    const res = await request(app)
      .put(`/api/sweets/restock/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 20 });

    expect(res.status).toBe(200);
    expect(res.body.sweet.quantity).toBe(20);
  });

  it('Admin can delete sweet', async () => {
    const sweet = await Sweet.create({ name: 'Kaju Katli', category: 'Milk Sweets', price: 30, quantity: 50 });

    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});
