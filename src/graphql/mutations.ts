/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPins = /* GraphQL */ `
  mutation CreatePins(
    $input: CreatePinsInput!
    $condition: ModelPinsConditionInput
  ) {
    createPins(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePins = /* GraphQL */ `
  mutation UpdatePins(
    $input: UpdatePinsInput!
    $condition: ModelPinsConditionInput
  ) {
    updatePins(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePins = /* GraphQL */ `
  mutation DeletePins(
    $input: DeletePinsInput!
    $condition: ModelPinsConditionInput
  ) {
    deletePins(input: $input, condition: $condition) {
      id
      title
      description
      lat
      lng
      userID
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
      username
      email
      Pins {
        items {
          id
          title
          description
          lat
          lng
          userID
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
      username
      email
      Pins {
        items {
          id
          title
          description
          lat
          lng
          userID
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
      username
      email
      Pins {
        items {
          id
          title
          description
          lat
          lng
          userID
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
