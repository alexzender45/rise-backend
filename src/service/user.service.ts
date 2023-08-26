import db from '../database/index'
import {
  createUserQuery,
  getUserByEmailQuery,
} from '../database/user.model';
import { hashPassword, generateToken } from '../utils/auth';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

export async function createUser(
  input:
    {
      email: string,
      password: string,
      username: string
    }
): Promise<any[]> {
  try {
    const {
      email,
      password,
      username
    } = input;
    const hashedPassword = await hashPassword(password);
    const user = await db.any(getUserByEmailQuery, [email]);
    if (!_.isEmpty(user)) {
      throw new Error('Email already exists');
    }
    const createUser = await db.one(
      createUserQuery,
      [email, username, hashedPassword]
    );
    const token = generateToken({
      id: createUser.id,
      email: createUser.email,
      username: createUser.username
    });
    createUser.token = token;
    return createUser
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function login(
  input:
    {
      email: string,
      password: string
    }
): Promise<any[]> {
  try {
    const {
      email,
      password
    } = input;
    const user:any = await db.any(getUserByEmailQuery, [email]);
    if (_.isEmpty(user)) {
      throw new Error('Email not found');
    }
    const validPassword = bcrypt.compareSync(password, user[0].password);
    if (!validPassword) {
      throw new Error('Password is incorrect');
    }
    const token = generateToken({
      id: user[0].id,
      email: user[0].email,
      username: user[0].username
    });
    user[0].token = token;
    return user[0];
  } catch (error: any) {
    throw new Error(error);
  }
}


