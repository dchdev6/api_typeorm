const config = require('config.js');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

    // Creates db if it doesn't already exist

    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password});
    await connection.query('CREATE DATABASE IF NOT EXISTS \` $(database)\`;');

    // Connects to the database (db)

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Initializes the models and adds them to the exported database object

    db.User = require('../users/user.model')(sequelize);

    // Synchronize all models with database

    await sequelize.sync({ alter: true });
}
