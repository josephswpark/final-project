# Sneaker World

A full-stack web application for sneakers to purchase rare sneakers.

## Why I built this :thinking: 
Growing up, I always loved sneakers except I wasn't able to afford any of it, which made my desire to collect sneakers grew. As I collected my personal sneakers, I also started reselling limited and rare sneakers. As I used applications such as OfferUp and Facebook Marketplace, I wanted to create an E-Commerce website so that I can directly sell my sneaker inventory to consumers. 

### Live Demo 🔗

Try the application live here: https://sneaker-world.josephswpark.dev

## 💻 Technologies Used

### Languages
* HTML5
* CSS3
* JavaScript (ES6)
* SQL
* React (Framework)
* JSX
### Packages
* Node.js
* Express.js
* Babel
* Webpack
* Argon2
* JSON Web Token
* Dotenv
* Material UI

## Features :open_book:
* Users can view all shoes
* Users can search for a product
* Users can filter the products by brand, price & sort Alphabetically
* Users can click a product to view its details
* Users can add multiple shoes to their cart
* Users can view the current cart
* Users can delete an item(s) from the cart
* Users can place an order with the items in their cart

## Stretch Features :books:
* Users can sign up for an account
* Users can sign in to their account
* Users can sign out of their account
* Users can view their Order History

## Preview :eyes:
![Kapture 2023-01-18 at 16 24 19](https://user-images.githubusercontent.com/113474457/213326900-500220c4-62ae-4045-a6d0-573b4f260bb7.gif)

## Features in Development :notebook:
* Users can sign up for an account

## :man_technologist: Development

### Getting Started

1. Clone the repository
```
git clone git@github.com:josephswpark/sneaker-world.git
```
2. Install dependencies with Node Package Manager
```
npm install
```
3. Create a local .env file from provided example file
```
cp .env.example .env
```
4. Set the TOKEN_SECRET from 'changeMe' on your .env file
```
TOKEN_SECRET=changeMe <--
```
5. Start PostgreSQL
```
sudo service postgresql start
```
6. Create a database
```
createdb name-of-database
```
7. Update the DATABASE_URL in your .env file. Switch 'changeMe' to the name-of-database created
```
DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
```
8. Start pgweb to view the database information
```
pgweb --db=name-of-database
```
9. Initialize the database with schema.sql and import any starting data from data.sql
```
npm run db:import
```
10. Start the project! Open a new terminal and run this script. Project can be viewed at http://localhost:3000 in your browser after running the command
```
npm run dev
```
