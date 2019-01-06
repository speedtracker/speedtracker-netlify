# SpeedTracker

> Website performance monitoring tool

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/speedtracker/speedtracker-netlify)

## Requirements

1. A WebPageTest API key. You can get one from free [here](https://www.webpagetest.org/getkey.php).

1. A database. Currently, SpeedTracker supports only MongoDB databases. You can set up a free instance with mLab [here](https://mlab.com/).

1. A free [GitHub](https://github.com) account.

1. A free [Netlify](https://netlify.com) account.

## Setting up

1. Create [a new GitHub repository](https://github.com/new).

1. Click the [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/speedtracker/speedtracker-netlify) button.

1. When taken to the Netlify website, fill in the following details:

    - `DEFAULT_URL`: the URL of the site you wish to test; if you want to set up multiple profiles (i.e. multiple URLs and/or WebPageTest settings) you must do so using the [configuration file](#configuration).

    - `MONGODB_CONN_STR`: the MongoDB connection string; if you created an account with mLab, this will be provided for you in their interface.

    - `MONGODB_DATABASE`: the name of the MongoDB database you wish to use.

    - `WPT_API_KEY`: your WebPageTest API key.

1. With everything configured, you can now [start a test](#starting-a-test).

## Starting a test

To start a test, send a `GET` request to `https://<your-netlify-url>/api/test/default`. This will instruct WebPageTest to start a test on your behalf.

This response to this request includes some relevant information, such as the test ID. The `userUrl` property contains a link to the test status, telling you whether it's still queued, running or if it has been completed. 

## Configuration

(TO DO)