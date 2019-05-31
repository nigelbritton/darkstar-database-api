# Darkstar Database API

This is a simple app that creates static json feeds of popular database calls for use in mobile/web applications. This application uses a direct connection to your Darkstar mySQL database to view the content; as you only need read access a user with read only should be used for security.

## First time setup

Once you have cloned / downloaded the repository simply run the following command to download the npm dependencies.

```
npm install
```

## Add a mySQL User (readonly)

```
CREATE USER 'darkstar-app'@'%' IDENTIFIED BY 'your_strong_password';
GRANT SELECT, SHOW VIEW ON `dspdb`.* TO "darkstar-app"@"%" IDENTIFIED BY 'your_strong_password';
FLUSH PRIVILEGES;
```

## Running locally

To get the application running locally use the following command.

```
npm start
```

To get the application running locally with debugging on use the following command.

```
npm run debug-application
```

The application will now be availble at:

```
https://localhost:3000/
```

## Heroku

Deploy to this project with Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
