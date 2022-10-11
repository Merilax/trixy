const Sequelize = require('sequelize');
//SQLite3
/* 
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});
 */

// PostGreSQL

const sequelize = new Sequelize(process.env.SEQUELDB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


sequelize.authenticate();
console.log("Database Auth Success!");

const XPEnabled = sequelize.define('xpenables', {
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

const XPRewardType = sequelize.define('xprewardtypes', {
    guild: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCumulative: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

const XPRewards = sequelize.define('xprewards', {
    guild: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    roleId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    level: {
        type: Sequelize.INTEGER,
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
    duration: Sequelize.BIGINT,
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

const Prefix = sequelize.define('prefixes', {
    guildId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    prefix: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
});

sequelize.sync({ force: false, alter: true });
module.exports = { XPEnabled, Levels, XPRewardType, XPRewards, Mutes, Reminders, Prefix };