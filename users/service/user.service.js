const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const ApiError = require('../../errors/validation.error');
const models = require('../../models');
const jwtService = require('./jwt.service');

class UserService {
  async createUser({
    email, first_name, password, last_name = null, phone = null,
  }) {
    const candidate = await models.sequelize.query('select * FROM "Users" WHERE email=:email', {
      replacements: { email },
      type: QueryTypes.SELECT,
    });
    if (candidate.length) {
      throw ApiError.BadRequest('user with such email already exists');
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await models.sequelize.query(
      `INSERT INTO "Users" (email,first_name, password, last_name, phone) 
      VALUES (:email,:first_name, :password, :last_name, :phone)
      RETURNING *`,
      {
        type: QueryTypes.INSERT,
        replacements: {
          email, first_name, password: hashPassword, last_name, phone,
        },
      },
    );
    return user[0];
  }

  async login({ email, password }) {
    const userInfo = await models.sequelize.query(
      'SELECT password FROM "Users" WHERE email=:email',
      {
        type: QueryTypes.SELECT,
        replacements: { email },
      },
    );
    if (!userInfo.length) {
      throw ApiError.BadRequest('wrong password or email');
    }
    const hashedPassword = userInfo[0].password;
    const ifEqualPasswords = await bcrypt.compare(password, hashedPassword);
    if (!ifEqualPasswords) {
      throw ApiError.BadRequest('wrong password or email');
    }
    const token = jwtService.generateToken({ email });
    return token;
  }

  async findOne(id) {
    const user = await models.sequelize.query(
      'SELECT * FROM "Users" where id=:id',
      {
        type: QueryTypes.SELECT,
        replacements: { id },
      },
    );
    if (!user.length) {
      throw ApiError.BadRequest('there is no user with such id');
    }
    return user;
  }

  async updateUser({
    id, email, first_name, password, last_name = null, phone = null,
  }) {
    const hashPassword = await bcrypt.hash(password, 4);
    const userToUpdate = await models.sequelize.query(
      `UPDATE "Users" SET
    email=:email,
    first_name=:first_name,
    password=:hashPassword,
    last_name=:last_name,
    phone=:phone
    WHERE id=:id RETURNING *`,
      {
        type: QueryTypes.UPDATE,
        replacements: {
          id, email, first_name, hashPassword, last_name, phone,
        },
      },
    );

    return userToUpdate[0];
  }
}

module.exports = new UserService();
