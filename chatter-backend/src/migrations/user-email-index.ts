import { Db } from 'mongodb';

module.exports = {
  async up(db: Db) {
    //create unique index for user email
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
};
