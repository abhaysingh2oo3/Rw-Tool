# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

import axios from "axios";

// Fetch all groups (optionally filter with search param)
export const fetchGroups = async (searchTerm = "") => {
  const res = await axios.get("http://localhost:8080/api/groups", {
    params: { search: searchTerm }   // <-- request param
  });
  return res.data;
};

// Create a main folder (main group)
export const createMainFolder = async (name) => {
  const res = await axios.post("http://localhost:8080/api/folders/main", null, {
    params: { name }   // <-- request param
  });
  return res.data;
};

// Create a sub folder under an existing main
export const createSubFolder = async (mainId, subName) => {
  const res = await axios.post("http://localhost:8080/api/folders/sub", null, {
    params: { mainId, subName }   // multiple request params
  });
  return res.data;
};


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AccessControl() {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch groups when page loads or search changes
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/groups", {
          params: { search: searchTerm }
        });
        setGroups(res.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    loadGroups();
  }, [searchTerm]);

  const handleSaveMainFolder = async (name) => {
    try {
      await axios.post("http://localhost:8080/api/folders/main", null, {
        params: { name }
      });
      // refresh list after save
      const res = await axios.get("http://localhost:8080/api/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Error saving main folder:", error);
    }
  };

  const handleSaveSubFolder = async (mainId, subName) => {
    try {
      await axios.post("http://localhost:8080/api/folders/sub", null, {
        params: { mainId, subName }
      });
      const res = await axios.get("http://localhost:8080/api/groups");
      setGroups(res.data);
    } catch (error) {
      console.error("Error saving sub folder:", error);
    }
  };

  return (
    <div>
      {/* your existing JSX with mapped groups */}
    </div>
  );
}
