# `Tiffs-airbnb` - Airbnb clone

## Purpose of Project

My project aims to clone the website Airbnb.com -- a popular living-space rental company. It is a full stack project with the core backend functionalities of the original website and near pixel-perfect replica of its UI. All tools/technologies are listed below:

### Backend: Express, Sequelize
### Frontend: React, Redux, HTML & CSS

### INSTRUCTIONS for running locally

1. run ```git clone https://github.com/tyang2015/Backup-for-tiff-s-airbnb.git``` to have my project downloaded to your local repo. cd into repo and run 'code .' to have it open on vscode
2. run ```cd .. ``` and then ```npm i``` to install packages needed to run code on heroku properly
3. run ```cd frontend``` and then ```npm i``` inside frontend folder to download necessary packages from package.json
4. run ```cd backend``` and then ```npm i``` inside backend folder (repeating step 2)
5. while in the backend, run ```npm start``` to start server at port 8000
6. open another terminal from vscode and run ```npm start``` to start front end server at port 3000

### INSTRUCTIONS for navigating the page
## Get All Spots
When you are on home/splash/landing page, you will see all spots in a grid form. It will show you some brief details of the spot itself, such as avg rating and price per night. To access more of the features of my website, login through demo user by clicking the top right profile icon -> then click "Demo User".

![spots-images](./images/get-spots.png)

### View Spot
You can get more info on a spot by clicking a spot to view the spot page. This is also where you can view the reviews as well as bookings calendar. Many of the website's features are located on this page, so feel free to explore it in more detail

![spot-page](./images/get-spot-page.png)

### Create Spot
Once logged in, click the profile button on the top right, and click "Create a Spot". This will show you a pop-up modal where you can fill in information for a new spot as its owner/host (eg., latitude, price, address, etc.)

![create-spot](./images/create-spot.png)

### Edit Spot
You can edit a spot by clicking "Edit spot" on the top header row on the spot page. Note that you must have proper authorization as the owner of the spot to make edits. Fill out the info as you would for create a spot.

![edit-spot](./images/edit-spot.png)




![Spot homepage](./homepage-sample-photo.png)

2. Click on any card to fetch the GET /spots/:spotId endpoint. You will find all the specific spot info here. 4 buttons at the bottom will inform you on exactly which feature and which CRUD is applicable. (The 'reserve' div is not a clickable button, but rather for just as display to demonstrate how it will look in the future). We will not test edit spot yet as it's not a requirement.

![Spotid-page](./spot-photo.png)

#### For Forms (features: spots and bookings)
1) CREATE spot form can be accessed profile menu dropdown, with the clickable link "Create a spot". 
2) EDIT spot form can be accessed at the bottom of the "/spots/:spotId" page .
2) CREATE booking form (from /spots/:spotId/bookings/new) can be accessed near the same location as #2,  at the bottom of the "/spots/:spotId" page, or on the spot bookings page (if there are no bookings).
