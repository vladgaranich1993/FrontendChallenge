# Frontend Challenge

## Build a web app with Next.js 13

As a frontend developer you get the task to implement a frontend for an employee API, where you can
list, create, read, update and delete employees.

### API

Use [restapiexample.com](https://dummy.restapiexample.com)

> [!WARNING]
> API has a rate limit

A base structure is already implemented.
Feel free to improve the current implementation whenever you see potential or let us know what you
would do differently in your pull requests description.

Please fork our repo and implement the missing features. Also track time and let us know how long it
took you to finish the challenge.

### Run It

```bash
$ nvm exec 20.9 npm run dev
```

By default, the app is reachable at `http://127.0.0.1:3000`

### Setup

Currently we are using node `20.9` so we recommend to use `nvm`.

Install `nvm` by following this
[guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Install and use node `20.9`:

```bash
$ nvm use
```

> [!TIP]
> Don't forget to install the node packages:

```bash
$ npm i
```

### Formatting

Prettier is our formatter of choice. We added some settings for VSCode. If you use a different IDE please adapt the settings.

## Using Mocoon for Mocking API Responses

Due to limitations and slow response times with dummy API server, I've incorporated Mocoon, an open-source application for mocking responses. This tool significantly speeds up both development and testing phases.

### Installation & Configuration

1. Install Mocoon: Visit [Mocoon's official website](insert-website-link-here) and follow the instructions to install the application.
2. Set Up Configuration:
   - Find the provided configuration file in the project root.
   - Click '+' button in Mockoon and select 'Open local environment' and choose the provided configuration file.
   - Uncomment the line 12 in employee.datasource.ts.

By following these steps, you can simulate API responses and streamline your workflow.
