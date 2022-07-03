/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePinInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  lat: number,
  lng: number,
  username: string,
  userId: string,
  _version?: number | null,
};

export type ModelPinConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  username?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelPinConditionInput | null > | null,
  or?: Array< ModelPinConditionInput | null > | null,
  not?: ModelPinConditionInput | null,
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

export type Pin = {
  __typename: "Pin",
  id: string,
  title: string,
  description?: string | null,
  lat: number,
  lng: number,
  username: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdatePinInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  lat?: number | null,
  lng?: number | null,
  username?: string | null,
  userId?: string | null,
  _version?: number | null,
};

export type DeletePinInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  username: string,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  username: string,
  Pins?: ModelPinConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelPinConnection = {
  __typename: "ModelPinConnection",
  items:  Array<Pin | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  username?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type ModelPinFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  lat?: ModelFloatInput | null,
  lng?: ModelFloatInput | null,
  username?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelPinFilterInput | null > | null,
  or?: Array< ModelPinFilterInput | null > | null,
  not?: ModelPinFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
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

export type CreatePinMutationVariables = {
  input: CreatePinInput,
  condition?: ModelPinConditionInput | null,
};

export type CreatePinMutation = {
  createPin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePinMutationVariables = {
  input: UpdatePinInput,
  condition?: ModelPinConditionInput | null,
};

export type UpdatePinMutation = {
  updatePin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePinMutationVariables = {
  input: DeletePinInput,
  condition?: ModelPinConditionInput | null,
};

export type DeletePinMutation = {
  deletePin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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

export type GetPinQueryVariables = {
  id: string,
};

export type GetPinQuery = {
  getPin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPinsQueryVariables = {
  filter?: ModelPinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPinsQuery = {
  listPins?:  {
    __typename: "ModelPinConnection",
    items:  Array< {
      __typename: "Pin",
      id: string,
      title: string,
      description?: string | null,
      lat: number,
      lng: number,
      username: string,
      userId: string,
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
  filter?: ModelPinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPinsQuery = {
  syncPins?:  {
    __typename: "ModelPinConnection",
    items:  Array< {
      __typename: "Pin",
      id: string,
      title: string,
      description?: string | null,
      lat: number,
      lng: number,
      username: string,
      userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
      email: string,
      username: string,
      Pins?:  {
        __typename: "ModelPinConnection",
        items:  Array< {
          __typename: "Pin",
          id: string,
          title: string,
          description?: string | null,
          lat: number,
          lng: number,
          username: string,
          userId: string,
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
      email: string,
      username: string,
      Pins?:  {
        __typename: "ModelPinConnection",
        items:  Array< {
          __typename: "Pin",
          id: string,
          title: string,
          description?: string | null,
          lat: number,
          lng: number,
          username: string,
          userId: string,
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

export type OnCreatePinSubscription = {
  onCreatePin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePinSubscription = {
  onUpdatePin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePinSubscription = {
  onDeletePin?:  {
    __typename: "Pin",
    id: string,
    title: string,
    description?: string | null,
    lat: number,
    lng: number,
    username: string,
    userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
    email: string,
    username: string,
    Pins?:  {
      __typename: "ModelPinConnection",
      items:  Array< {
        __typename: "Pin",
        id: string,
        title: string,
        description?: string | null,
        lat: number,
        lng: number,
        username: string,
        userId: string,
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
