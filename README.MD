# Express-TypeScript

A **sample repository in Express & TypeScript for backend** development. This project provides a robust starting point for building scalable and type-safe server-side applications using the popular **Express.js** framework with the benefits of **TypeScript**.

## Key Features

* **Type-Safe Development:** Built with **TypeScript** for better code quality and fewer runtime errors.
* **Modern Backend:** Utilizes **Express.js** (version 5.x) for a fast and minimalist web framework.
* **Security:** Includes **Helmet** for setting various HTTP headers to secure your app.
* **Database:** Includes support for **MongoDB**.
* **File Uploads:** Ready for use with **Multer** for handling `multipart/form-data`.
* **Input Validation:** Uses **validator** for sanitization and validation of user input.

---

## Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/theaviansh-dev/Express-TypeScript.git
    cd Express-TypeScript
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    To get the project up and running, you need to configure the MongoDB URI and set the desired port for the server. Please follow the steps below to ensure everything is set up correctly.

    ### i. Update MongoDB URI
    You will need to update the MongoDB connection string to match your credentials and the database you wish to connect to. The URI should include the username, password, and database name.

    **Example MongoDB URI**:
    ```bash
    mongodb://username:password@localhost:27017/your-database
    ```
---

## Command Codes (Scripts)

Use these scripts to manage your project lifecycle:

| Command | Description |
| :--- | :--- |
| `npm run build` | **Compiles** the TypeScript source code (`.ts` files) into executable JavaScript in the `dist/` directory. |
| `npm start` | **Runs** the compiled application in the `dist/server.js` file. This is typically used for production. |
| `npm run dev` | **Starts the development server** using **nodemon** to watch for file changes and automatically restart the application. |

### Running the Project

#### Development Mode
For quick development with hot-reloading:
```bash
npm run dev
```
Or you Can run
```bash
nodemon
```
