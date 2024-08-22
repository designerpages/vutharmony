# React Native CRUD App with JSONPlaceholder API

## 📱 Overview

This project is a React Native application built with Expo (version 0.18.29). It demonstrates CRUD (Create, Read, Update, Delete) operations, sorting, and searching functionalities using the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/guide/).

## ✨ Features

- **CRUD Operations**: Full support for Creating, Reading, Updating, and Deleting data.
- **Sorting**: Ability to sort data based on specific criteria.
- **Searching**: Functionality to search through the data.
- **State Management**: Utilizes Redux for efficient state management.
- **API Integration**: Uses Axios for API calls to JSONPlaceholder.
- **Form Validation**: Implements validation checks when creating new data.
- **Loading Screen**: Displays a loading screen during API calls for better user experience.

## 🛠️ Technologies Used

- React Native (Expo)
- Redux for state management
- Axios for API calls
- TypeScript for type checking

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/designerpages/vutharmony.git
   ```
2. Install dependencies:
   ```
   cd vutharmony
   npm install
   ```
3. Start the Expo development server:
   ```
   expo start
   ```

## ⚠️ Known Limitations

Due to the nature of the JSONPlaceholder API:

1. **Consistent ID for New Data**: When creating new data, the API always returns the same ID (101) for every created item. This can cause issues with displaying and managing newly created items in the app.

2. **Update and Delete Limitations**: Updating and deleting newly created data may not work as expected due to the API's behavior with newly created items.

3. **Data Persistence**: Changes made (create, update, delete) are not persisted on the server side, as JSONPlaceholder is a fake API for testing and prototyping.
