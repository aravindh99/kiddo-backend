import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();



const db = new Sequelize(process.env.db_uri)



try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export default db;