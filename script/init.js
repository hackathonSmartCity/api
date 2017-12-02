const Sequelize = require('sequelize');
var sequelize = require('../db');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    },
    facebook_auth: {
        type: Sequelize.STRING,
        unique: true
    },
    google_auth: {
        type: Sequelize.STRING,
        unique: true
    }
});

const Difficulty = sequelize.define('difficulty', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});

const UserDifficulty = sequelize.define('userDifficulty', {
    id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'userInterestIndex'
    },
    id_difficulty: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'userInterestIndex'
    }
});

User.belongsToMany(Difficulty, { through: 'userDifficulty', foreignKey: 'id_user' });
Difficulty.belongsToMany(User, { through: 'userDifficulty', foreignKey: 'id_difficulty' });

const Interest = sequelize.define('interest', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const UserInterest = sequelize.define('userInterest', {
    id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'userInterestIndex'
    },
    id_interest: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'userInterestIndex'
    }
});

User.belongsToMany(Difficulty, { through: 'userInterest', foreignKey: 'id_user' });
UserInterest.belongsToMany(User, { through: 'userInterest', foreignKey: 'id_interest' });

Difficulty.sync({force: true});

UserDifficulty.sync({force: true});

Interest.sync({force: true});

UserInterest.sync({force: true});

User.sync({force: true});