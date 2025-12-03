*Pokedex Manager*

This is a small web application where users can search Pokemon using the PokeAPI (pokedex-promise-v2 npm package), add them to their personal Pokedex, edit their Pokwmon names, and delete them if they want. Each user has their own private Pokedex, so nobody can see or change someone else’s Pokemon.

*Technologies Used*

-Node.js / Express
-MongoDB + Mongoose
-Passport.js (Local + GitHub login)
-PokeAPI (pokedex-promise-v2 npm package)
-Bootstrap (I decided to use simple CSS later on)

*Live Demo Link*

You can access the live version of the website here:
https://pokedex-manager.onrender.com/

*Additional Feature*

The extra feature I decided to include was private user pokedexes.

This means that every Pokemon stored in the database is linked to the specific user who added it. After users login, they can see only their own Pokemon. Other users cannot edit, delete or even view someone else’s Pokedex.

I think this makes the app more personal and secure.

*Installation Steps (if running locally)*

If you want to run this project on your own machine, follow these steps:

Open the terminal on your machine, then

1. Clone this repository
run "git clone https://github.com/codebydevfer/COMP2068JSFrameworks/tree/main/ASSIGNMENT02/pokedex-manager"

2. Go inside the project folder
run "cd pokedex-manager"

3. Install all dependencies
run "npm install"

4. Create a .env file in the root folder

Add your environment variables:

MONGO_URL= your_mongo_atlas_uri_here
SESSION_SECRET= your_secret_here

GITHUB_CLIENT_ID= your_client_id
GITHUB_CLIENT_SECRET= your_client_secret
GITHUB_CALLBACK_URL= http://localhost:3000/auth/github/callback

5. Start the application
run "npm start"


The app will run at:
http://localhost:3000