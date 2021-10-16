const enviroment = process.env.NODE_ENV || 'development';

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    enviroment === 'production' ?
    './build/modules/**/infra/typeorm/entities/*.js' :
    './src/modules/**/infra/typeorm/entities/*.ts'
  ]
}
