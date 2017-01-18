'use strict'

var Sequelize = require('sequelize')
var sequelize = new Sequelize('sample', null, null, {
      dialect: "postgres",
      port: 5432,
    })

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.')
  }, function (err) {
    console.log('Unable to connect to the database:', err)
  })

const Trains = sequelize.define('trains', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  capacity: {
    type: Sequelize.INTEGER,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at:  Sequelize.DATE,
  deleted_at: Sequelize.DATE
}, {
  underscored: true
})

const Passengers = sequelize.define('passengers', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  name: {
    type: Sequelize.TEXT,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at:  Sequelize.DATE,
  deleted_at: Sequelize.DATE
}, {
  underscored: true
})

const Tickets = sequelize.define('tickets', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at:  Sequelize.DATE,
  deleted_at: Sequelize.DATE
}, {
  underscored: true
})

const Stations = sequelize.define('stations', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  location: {
    type: Sequelize.TEXT,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at:  Sequelize.DATE,
  deleted_at: Sequelize.DATE
}, {
  underscored: true
})

Tickets.hasOne(Passengers, {as: 'ticket'})
Stations.hasMany(Passengers, {as: 'station'})
Trains.hasMany(Passengers, {as: 'train'})
Tickets.belongsTo(Stations, {as: 'destination', constraints: false})
Trains.belongsTo(Stations, {as: 'station'})
Stations.belongsTo(Stations, {as: 'nextStation'})

sequelize.sync({force: true}).then( _ => {
  console.log('Done sync\'ing')
})
