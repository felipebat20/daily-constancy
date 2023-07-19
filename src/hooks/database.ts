import Localbase from 'localbase';

const db = new Localbase('db');

db.config.debug = false;

export default db;
