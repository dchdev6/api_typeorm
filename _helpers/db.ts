import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.json';
import mysql from 'mysql2/promise';

const db: any = {};
export default db;

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;

    try {
        const connection = await mysql.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`✅ Database '${database}' is ready.`);
    } catch (error) {
        console.error('⚠️ MySQL Connection Error:', error);
        process.exit(1);
    }

    const sequelize = new Sequelize(database, user, password, { host, dialect: 'mysql' });
    db.User = require('../users/user.model').default(sequelize, DataTypes);
    await sequelize.sync({ alter: true });
}
