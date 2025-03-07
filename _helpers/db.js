const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.json');
const mysql = require('mysql2/promise');

module.exports = db = {};

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

    // Create Sequelize instance
    const sequelize = new Sequelize(database, user, password, { host, dialect: 'mysql' });

    // Load models
    db.User = require('../users/user.model.js')(sequelize, DataTypes);

    // Sync database
    await sequelize.sync({ alter: true });
}
