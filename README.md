# OrderingX - Website Marketplace

## Description

This repository is a template marketplace using functional components. It includes a submodule from another repository.

Please select the option that you like better.

## Option 1: Clone repository and run with yarn

1. Clone repository: `git clone --recursive https://github.com/OrderingX/website-marketplace.git`
2. Enter the downloaded repository folder `cd website-marketplace`
3. Run `yarn install` to install dependencies
4. Run `yarn start` to start the development server

## Option 2: Clone repository and run with Docker
> "You need to have Docker previously installed. You can install it from [here](https://docs.docker.com/engine/install/)"

1. Clone repository: `git clone --recursive https://github.com/OrderingX/website-marketplace.git`
2. Enter the downloaded repository folder `cd website-marketplace`
3. Run `docker-compose up`
4. Open `localhost:3002` in your browser

# Troubleshooting

If you can't get the server with `0.0.0.0:3002` you can use `localhost:3002` instead.

## Notes

To change the project name to use, you can go to following path `src/config.json` and change the property `project` to the value you need.
Also in `src/config.json` file you can change the value of the properties you can see there.

> By default we use `demosv5` as a project, this project has a reset every 2 hours

## Format code

Run `yarn lint` to execute the linter.
