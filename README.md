# Simple Chat Application

A simple web chat application that integrates Discord Oauth and uses the SvelteKit Framework.

## Developing

1. Download the code and run `npm i` to install dependencies

2. Create a copy of `.env.example`, rename it to `.env` and fill out all the fields with the relevant values.

   a. For developing using the included `database` postgres container, use the following:

   ```
   POSTGRES_URI="postgres://user:postgres123@localhost:5434/chatapp"
   ```

   If you have a postgres install running elsewhere, you may use that.

   b. `DISCORD_CLIENT_SECRET` and `PUBLIC_DISCORD_CLIENT_ID` are values found in https://discord.com/developers/applications. You'll have to create a new application, then go to the pictured location to copy these values.

   c. Other values in the `.env` file can be kept as-is for local development.

3. Back on https://discord.com/developers/applications, you'll have to add redirect URIs in the dashboard in order to have authentication work. For local developement, add the following:

   ```
   http://localhost:5173/login/callback
   http://localhost:8000/login/callback
   ```

   ![image](https://user-images.githubusercontent.com/94007463/201015643-cf2c4912-37f3-4de1-b47b-7f00f4b9a17d.png)

4. Make a copy of your new `.env` file and rename it to `.env.production`. You should have both. You can ignore the production enviroment file for running in dev mode, it just needs to exist.

5. Start up the database container (or other postgres database if you went that route). You'll need to have `docker-compose` (comes with [Docker Desktop](https://www.docker.com/products/docker-desktop/)) installed on your system.

   ```
   docker-compose up --build database -d
   ```

   This command will only start up the database, and not the production container.

6. Run the website in dev mode with the following:

   ```
   npm run dev
   ```

   Navigate to the link sent in the terminal, and it (should) load!

## Building

To create a production version of your app, follow these steps.

1. Follow steps `1-4` of the above development steps, you should then have a `.env.production` file to edit.

2. To use the included postgres database, edit the databse URI in `.env.production` as shown:

   ```
   POSTGRES_URI="postgres://user:postgres123@database:5432/chatapp"
   ```

   This will be able to link with the postgres docker container.

3. Edit your new `.env.production` to use the port `8000`

   ```
   PUBLIC_DISCORD_REDIRECT_URI="http://localhost:8000/login/callback"
   PUBLIC_HOST_URL="http://localhost:8000"
   ```

   Ensure that you have the port `8000` redirect uri in the Discord application settings on their site.

4. For safety, you may **remove** the the following port settings from `docker-compose.yaml`

   ```
   ports:
     - '5434:5432'
   ```

   This ensures that the database will not be accessable from outside of the docker network. But you'll need to re-add this to connect in development mode.

5. Start up the production build with the following command:
   ```
   docker-compose up --build -d
   ```
   You can now navigate to http://localhost:8000/ to view the site.

In order to deploy this site to an actual domain name, you'd have to follow a tutorial elsewhere and point to this address with something like nginx forwarding.
