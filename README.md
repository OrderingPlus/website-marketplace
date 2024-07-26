# OrderingPlus - Website Marketplace

## Description

This repository is a template marketplace using functional components. It includes a submodule from another repository.

Please select the option that you like better.

## ✨ Quick Start

If you just want to try out the Website, use our cloud-hosted version at [orderingplus.com](https://orderingplus.com).

To create your own project and add it to the source code (src/config.json), start for free (no credit card required) at [partners.orderingplus.com](https://partners.orderingplus.com). Here, you can add your stores, products, and more to customize your marketplace.

If you want to demo this Website Marketplace open-source project, click here for [⚡️Gitpod Online Demo](https://gitpod.io/#https://github.com/OrderingPlus/website-marketplace).

Questions? Join [Discord](https://discord.gg/v4kWYAKjBu).

## Getting started
> Having installed:
> 1. Node.js (version 18 or higher)
> 2. Git (version 2.30 or higher)
> 3. Yarn (version 1.22.19 or higher)

## Option 1: Clone repository and run with yarn

1. Open your terminal
2. Clone repository writing:
```
git clone --recursive https://github.com/OrderingPlus/website-marketplace.git
```
3. Enter the downloaded repository folder
```
cd website-marketplace
```
4. To install dependencies run
```
yarn install
```
5. To start the development server run
```
yarn start
```

## Option 2: Clone repository and run with Docker
> "You need to have Docker previously installed. You can install it from [here](https://docs.docker.com/engine/install/)"

1. Ensure Docker is opened.
2. Open your terminal.
3. Clone repository writing:
```
git clone --recursive https://github.com/OrderingPlus/website-marketplace.git
```
4. Enter the downloaded repository folder
```
cd website-marketplace
```
5. Run
```
docker-compose up
```
6. Open `localhost:3000` in your browser

# Troubleshooting

- If you can't get the server with `0.0.0.0:3000` you can use `localhost:3000` instead.
- If you have troubles with Docker, and it’s not running when you run `docker-compose` up https://d.pr/v/J1G6Sk, you can try Quit docker or Restart Docker  https://d.pr/i/eKntOb. Open Docker again, and run `docker-compose up`.
- FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
Check your CPU and memory settings in Docker. Go to Docker `Desktop/Preferences` or `Settings/Resources` Increase the memory and CPU limit (keep in mind that this may affect your computer's performance, so make sure your computer has the capabilities to handle it without getting overwhelmed and don't set a limit higher than what your computer can support).

## Notes

To change the project name to use, you can go to following path `src/config.json` and change the property `project` to the value you need.
Also in `src/config.json` file you can change the value of the properties you can see there.

> By default we use `demosv5` as a project, this project has a reset every 2 hours

## Format code

Run `yarn lint` to execute the linter.
