import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PinsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Pins {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly lat: number;
  readonly lng: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Pins, PinsMetaData>);
  static copyOf(source: Pins, mutator: (draft: MutableModel<Pins, PinsMetaData>) => MutableModel<Pins, PinsMetaData> | void): Pins;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly Pins?: (Pins | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}