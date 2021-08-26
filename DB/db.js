const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
    host: '/postgres://dtpbhkqinnhhpl:6986987fb91c44a355992d5a2c1a4753f9cd56ef5ad077263407c5d600ccea19@ec2-54-74-35-87.eu-west-1.compute.amazonaws.com:5432/d4m6ctnfae47lk',
    dialect: 'postgres',
    logging: false,
    storage: 'database.sqlite',
});
sequelize.authenticate();
console.log("Database Online!");

const XPEnabled = sequelize.define('xpenable', {
    guild: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

const Levels = sequelize.define('levels', {
    user: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    guild: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 15,
        allowNull: false,
    },
    message_count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
});

sequelize.sync({force:false})
module.exports = { XPEnabled, Levels };