# Community Info Tech Test

[Live Link](https://main.d39ctd52lifvh8.amplifyapp.com/)

## Project Setup

### Requirements

- Needs `AWS Amplify` to set the project up locally.
  - Can comment out `Amplify.configure(awsConfig);` and `import awsConfig from "./aws-exports";` in `src/App.tsx` - the app will run, but will not be able to communicate with the backend.
- No Google API key - rename `.env.local.example` to `.env.local` and paste key there.
- `Node v16.14.2` - earlier versions should work also, but not tested.
- `yarn` installed.

1. Install dependencies with `yarn`.
2. Start the project with `yarn start`.

## Authentication

- There's no proper authentication in the project. I have three "users" saved in the database to demonstrate the different rendering of the pins, and who can edit what.

## Issues

- On mobile, at least on Android, MUI's Auto Select does not blur when panning the map, so the focus keeps on coming back to the input, bringing up the keyboard. Need to either close the Auto Select component manually, press on a pin to open up a drawer, or press an element on the Bottom Navigation.
- Need to be way better optimized.
- No testing.
