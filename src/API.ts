/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePinsInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  lat: number,
  lng: string,
  userID: string,
  _version?: number | null,
};

export type ModelPinsConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPinsConditionInput | null > | null,
  or?: Array< ModelPinsConditionInput | null > | null,
  not?: ModelPinsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Pins = {
  __typename: "Pins",
  id: string,
  title: string,
  description?: string | null,
  lat: number,
  lng: string,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdatePinsInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  lat?: number | null,
  lng?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeletePinsInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  Pins?: ModelPinsConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelPinsConnection = {
  __typename: "ModelPinsConnection",
  items:  Array<Pins | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelPinsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelPinsFilterInput | null > | null,
  or?: Array< ModelPinsFilterInput | null > | null,
  not?: ModelPinsFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreatePinsMutationVariables = {
  input: CreatePinsInput,
  condition?: ModelPinsConditionInput | null,
};

export type CreatePinsMutation = {
  createPins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePinsMutationVariables = {
  input: UpdatePinsInput,
  condition?: ModelPinsConditionInput | null,
};

export type UpdatePinsMutation = {
  updatePins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePinsMutationVariables = {
  input: DeletePinsInput,
  condition?: ModelPinsConditionInput | null,
};

export type DeletePinsMutation = {
  deletePins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetPinsQueryVariables = {
  id: string,
};

export type GetPinsQuery = {
  getPins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPinsQueryVariables = {
  filter?: ModelPinsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPinsQuery = {
  listPins?:  {
    __typename: "ModelPinsConnection",
    items:  Array< {
      __typename: "Pins",
      id: string,
      title: string,
      description?: string | null,
      lat: number,
      lng: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPinsQueryVariables = {
  filter?: ModelPinsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPinsQuery = {
  syncPins?:  {
    __typename: "ModelPinsConnection",
    items:  Array< {
      __typename: "Pins",
      id: string,
      title: string,
      description?: string | null,
      lat: number,
      lng: string,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      Pins?:  {
        __typename: "ModelPinsConnection",
        items:  Array< {
          __typename: "Pins",
          id: string,
          title: string,
          description?: string | null,
          lat: number,
          lng: string,
          userID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      Pins?:  {
        __typename: "ModelPinsConnection",
        items:  Array< {
          __typename: "Pins",
          id: string,
          title: string,
          description?: string | null,
          lat: number,
          lng: string,
          userID: string,
          createdAt: string,
          updatedAt: string,
          _version: number,
          _deleted?: boolean | null,
          _lastChangedAt: number,
        } | null >,
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreatePinsSubscription = {
  onCreatePins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePinsSubscription = {
  onUpdatePins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePinsSubscription = {
  onDeletePins?:  {
    __typename: "Pins",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: string,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    Pins?:  {
      __typename: "ModelPinsConnection",
      items:  Array< {
        __typename: "Pins",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: string,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
