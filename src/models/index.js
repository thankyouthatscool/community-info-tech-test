// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Pins, User } = initSchema(schema);

export {
  Pins,
  User
};