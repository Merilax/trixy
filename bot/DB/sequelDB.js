const Sequelize = require('sequelize');
var sequelize;



if (process.env.DEVMODE == "true") {
    //SQLite3
    sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite',
    });
} else {
    // PostGreSQL
    sequelize = new Sequelize(process.env.SEQUELDB_URL, {
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
}

sequelize.authenticate();
console.log("Database Auth Success!");

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

const userConfigDB = sequelize.define('userconfig', {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    color: {
        type: Sequelize.STRING
    },
    doMentionOverride: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
});

const guildConfigDB = sequelize.define('guildconfig', {
    guildId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    prefix: {
        type: Sequelize.STRING(10)
    },
    color: {
        type: Sequelize.STRING
    },
    xpEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

const guildLevelConfigDB = sequelize.define('guildlevelconfig', {
    guildId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isCumulative: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    targetChannel: {
        type: Sequelize.STRING
    },
    doMention: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
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

sequelize.sync({ force: false, alter: true });
module.exports = { Levels, XPRewards, userConfigDB, guildConfigDB, guildLevelConfigDB };