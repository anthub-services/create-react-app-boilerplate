# Create React App Boilerplate
This project is based on the
[Node API and Client Boilerplate](https://github.com/anthub-services/node-api-and-client-boilerplate).
Required node version is `9.2.1`.
The client app is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
and [Bootstrap 3.3](http://getbootstrap.com/docs/3.3/) framework and theme.

## Settings

### Environment Vars

Copy `.env.dist` to `.env` and change the values of the environment variables if needed.

```
REACT_APP_SITE_NAME=React App Boilerplate
REACT_APP_API_BASE_URL=http://localhost:7770
REACT_APP_API_SIGN_IN_URL=http://localhost:7770/sign-in
REACT_APP_API_SIGN_OUT_URL=http://localhost:7770/sign-out
REACT_APP_API_VERIFY_TOKEN_URL=http://localhost:7770/verify-token
REACT_APP_API_SESSIONS_URL=http://localhost:7770/sessions
REACT_APP_API_USERS_URL=http://localhost:7770/users
REACT_APP_API_JWT_SECRET=jwtsecretcode
```

### Config Files

Copy `./src/Config.dist` folder to `Config` and change the configurations if needed.

## Starting the App

```
yarn
yarn start
```

Note: See **Bash Commands** section for Docker.

To generate the `./client/src/Assets/Styles/Style.css`,
open another terminal console then on the `root` directory of the project,
run the following command:

```
yarn run watch-css
```

The command above works only in Mac with the `fsevents` module installed.
Run the command below as an alternative:

```
yarn run build-css
```

Note: You must run the command above manually everytime you made changes to `.scss` files.
All the `*.scss` files shall be compiled to `*.css` but only the `Style.css` is included in the repository.

Access the app at <http://localhost:7771>.

## Docker

Download and install the [Docker Community Edition](https://www.docker.com/community-edition).

Note: See **Bash Commands** section for Docker.

The `yarn run watch-css` command should be running on a separate terminal console for client app.

## Bash Commands

On the `root` directory of the project, run the following commands:

Note: To view the Docker containers, open another terminal console then enter `docker ps`.

### Docker

| Command                                | Description                                                            |
|----------------------------------------|------------------------------------------------------------------------|
| `./bin/install`                        | Build the Docker container and start the app                           |
| `./bin/reinstall`                      | Rebuild the Docker container with the current branch and start the app |
| `./bin/start`                          | Start the client app service                                           |
| `./bin/stop`                           | Stop the client app service                                            |
| `./bin/console <container ID or Name>` | Access the terminal console of the container                           |

### CSS

| Command           | Description                                                         |
|-------------------|---------------------------------------------------------------------|
| `./bin/css/watch` | Watch and compile *.scss files on file changes (for Mac users only) |
| `./bin/css/build` | Manually compile *.scss files                                       |

## Available API App Boilerplates

- [Node Express API Mockup Data Boilerplate](https://github.com/anthub-services/node-express-api-mockup-data-boilerplate) –
 non-database API server powered by [Express](https://expressjs.com/)
- [Node Express API Boilerplate](https://github.com/anthub-services/node-express-api-boilerplate) –
 API server powered by [Express](https://expressjs.com/) and [PostgreSQL](https://www.postgresql.org/) database
- [Rails API Boilerplate](https://github.com/anthub-services/rails-api-boilerplate) –
 API server powered by [Ruby on Rails](http://rubyonrails.org/) and [PostgreSQL](https://www.postgresql.org/) database

## Users

With the [Node Express API Mockup Data Boilerplate](https://github.com/anthub-services/node-express-api-mockup-data-boilerplate)
or the [Node Express API Boilerplate](https://github.com/anthub-services/node-express-api-boilerplate) app,
use the following credentials to test different API responses. Default password for all accounts is `password`.

| Name              | Email                  | Description |
|-------------------|------------------------|-------------|
| Super Admin User  | `superadmin@email.com` | Has wildcard access |
| Admin User        | `admin@email.com`      | Has wildcard access but `Admin › Users › Delete` is excluded |
| Common User       | `user@email.com`       | Can access `My Profile`, `Admin › Dashboard`, `Users`, `Users › View, and Settings` |
| Referrer User     | `referrer@email.com`   | When `redirect` is set without the domain, e.i. `/admin/dashboard`, user shall be redirected to internal page if no location path (referrer) found on the Sign In page |
| Redirect User     | `redirect@email.com`   | When `redirect` is set with complete URL, e.i. `https://github.com/anthub-services`, user shall be redirected to external page if no location path (referrer) found on the Sign In page |
| Blocked User      | `blocked@email.com`    | User is signed in but the account is blocked |
| Unauthorized User | `<any invalid email>`  | Simply enter wrong `email` and/or `password` |

## Docker Boilerplates

The following boilerplates can be used to install and run the API and client boilerplates in a Docker container.

- [Docker for Node API Mockup Data and Client Boilerplates](https://github.com/anthub-services/docker-for-node-api-mockup-data-and-client-boilerplates)
- [Docker for Node API and Client Boilerplates](https://github.com/anthub-services/docker-for-node-api-and-client-boilerplates)
- [Docker for Rails API and Client Boilerplates](https://github.com/anthub-services/docker-for-rails-api-and-client-boilerplates)
