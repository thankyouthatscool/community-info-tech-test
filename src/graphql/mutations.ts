/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPin = /* GraphQL */ `
  mutation CreatePin(
    $input: CreatePinInput!
    $condition: ModelPinConditionInput
  ) {
    createPin(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      username
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePin = /* GraphQL */ `
  mutation UpdatePin(
    $input: UpdatePinInput!
    $condition: ModelPinConditionInput
  ) {
    updatePin(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      username
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePin = /* GraphQL */ `
  mutation DeletePin(
    $input: DeletePinInput!
    $condition: ModelPinConditionInput
  ) {
    deletePin(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      username
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      username
      Pins {
        items {
          id
          title
          description
          lat
          lng
          username
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      username
      Pins {
        items {
          id
          title
          description
          lat
          lng
          username
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      username
      Pins {
        items {
          id
          title
          description
          lat
          lng
          username
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
