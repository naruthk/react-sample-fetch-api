# Sample Project for AppSheet

This sample React web application retrives information from an external source (REST API) and displays 5 youngest users with valid US telephone numbers.

## Interface

AppSheet truly cares about information and data. I believe that it makes sense to go with a clutter-free interface. The end result is a beautiful web app that focuses on presenting the data in an attractive and meaningful way.

## Business Logic & Requirements

- Ability to view 5 youngest users.
- Users must have valid US telephone numbers.
- Names must be sorted alphabetically.
- Retrieved data contains each user's id, name, age, number, photo, and biography.

## Testing

- Jest (built in with `create-react-app`)

## External Libraries Used

- Prettier
- Normalize.css

---

## Deployment

Here are the steps to check out the application locally:

1. `cd sample-app`
2. `npm install` to install required dependencies
3. `npm start` to start development server

To run test, type `npm run`.