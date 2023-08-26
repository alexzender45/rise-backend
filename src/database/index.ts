import pgPromise from 'pg-promise';
import config from 'config';

const url:string = config.get('db_url');

const pgp = pgPromise({});
const db = pgp(url);

 export default db;