const Sequelize = require('sequelize');
//SQLite3

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});


// PostGreSQL
/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
*/

sequelize.authenticate();
console.log("Database Online!");

const XPEnabled = sequelize.define('xpenable', {
    guild: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

const Levels = sequelize.define('levels', {
    user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    guild: {
        type: Sequelize.STRING,
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

const Mutes = sequelize.define('mutes', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    guildId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: Sequelize.INTEGER,
});

const Reminders = sequelize.define('reminders', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    text: {
        type: Sequelize.STRING(1999),
        allowNull: false,
    },
    duration: Sequelize.INTEGER,
});

sequelize.sync({force:false});
module.exports = { XPEnabled, Levels, Mutes, Reminders };