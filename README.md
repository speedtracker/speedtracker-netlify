<img src="https://speedtracker.org/assets/images/logo-full-square-inverted.png" width="300">

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

1. Visit your dashboard at your root URL (e.g. https://speedtracker.netlify.com). Once the test has finished, the results will be displayed in the various charts. It may take some time for the test to finish – if you don't see any data, check back in a few minutes.

## Starting a test

To start a test, send a `GET` request to `https://speedtracker.netlify.com/api/test/default`. This will instruct WebPageTest to start a test on your behalf.

This response to this request includes some relevant information, such as the test ID. The `userUrl` property contains a link to the test status, telling you whether it's still queued, running or if it has been completed.

Depending on how busy the chosen WebPageTest instance is, the test may take several minutes – or even hours – to complete. Once finished, the results will be sent back to SpeedTracker and displayed on the dashboard.

## Configuration

There is a configuration file, named `speedtracker.config.js`, that allows several parameters to be configured by the user.

### Profiles

The `profiles` object can be used to configure multiple profiles. A profile is comprised of a URL for the page to be tested and a set of WebPageTest parameters that configure the test.

*Example: A profile that will test https://www.bbc.co.uk/bbcone from a Cable connection, from London, doing 5 runs for each test.*

```js
const config = {
  profiles: {
    bbc: {
      name: 'BBC One',
      parameters: {
        connectivity: 'Cable',
        location: 'London_EC2',
        runs: 5,
        url: 'https://www.bbc.co.uk/bbcone'
      }
    }
  }
}
```

The following options are accepted (from [webpagetest-api](https://github.com/marcelduran/webpagetest-api)):

* **location**: _String_, location to test from
* **connectivity**: _String_, connectivity profile -- requires location to be specified -- (Cable|DSL|3GSlow|3G|3GFast|4G|LTE|Edge|2G|Dial|FIOS|Native|custom) [Cable]
* **runs**: _Number_, number of test runs [1]
* **firstViewOnly**: _Boolean_, skip the Repeat View test
* **video**: _Boolean_, capture video
* **private**: _Boolean_, keep the test hidden from the test log
* **label**: _String_, label for the test
* **stopAtDocumentComplete**: _Boolean_, stop test at document complete. typically, tests run until all activity stops
* **disableJavaScript**: _Boolean_, disable JavaScript (IE, Chrome, Firefox)
* **clearCerts**: _Boolean_, clear SSL certificate caches
* **ignoreSSL**: _Boolean_, ignore SSL certificate errors, e.g. name mismatch, self-signed certificates, etc
* **disableCompatibilityView**: _Boolean_, forces all pages to load in standards mode (IE only)
* **tcpDump**: _Boolean_, capture network packet trace (tcpdump)
* **saveResponseBodies**: _Boolean_, save response bodies for text resources
* **keepOriginalUserAgent**: _Boolean_, do not add PTST to the original browser User Agent string
* **domElement**: _String_, DOM element to record for sub-measurement
* **minimumDuration**: _Number_, minimum test duration in seconds
* **tester**: _String_, run the test on a specific PC (name must match exactly or the test will not run)
* **emulateMobile**: _Boolean_, (experimental) emulate mobile browser: Chrome mobile user agent, 640x960 screen, 2x scaling and fixed viewport (Chrome only)
* **timeline**: _Boolean_, capture Developer Tools Timeline (Chrome only)
* **timelineCallStack**: _Boolean_, set between 1-5 to include the JS call stack. must be used in conjunction with timeline (increases overhead) (Chrome only)
* **chromeTrace**: _Boolean_, capture chrome trace (about://tracing) (Chrome only)
* **netLog**: _Boolean_, capture Network Log (Chrome only)
* **dataReduction**: _Boolean_, enable data reduction on Chrome 34+ Android (Chrome only)
* **userAgent**: _String_, custom user agent string (Chrome only)
* **commandLine**: _String_, use a list of custom command line switches (Chrome only)
* **login**: _String_, username for authenticating tests (http authentication)
* **password**: _String_, password for authenticating tests (http authentication)
* **sensitive**: _Boolean_, discard script and http headers in the result
* **disableHTTPHeaders**: _Boolean_, disable saving of the http headers (as well as browser status messages and CPU utilization)
* **block**: _String_, space-delimited list of urls to block (substring match)
* **spof**: _String_, space-delimited list of domains to simulate failure by re-routing to blackhole.webpagetest.org to silently drop all requests
* **customMetrics**: _String_, execute arbitrary JavaScript at the end of a test to collect custom metrics
* **authenticationType**: _Number_, type of authentication: 0 = Basic, 1 = SNS [0]
* **notifyEmail**: _String_, e-mail address to notify with the test results
* **pingback**: _String_, URL to ping when the test is complete (the test ID will be passed as an "id" parameter)
* **bandwidthDown**: _String_, download bandwidth in Kbps (used when specifying a custom connectivity profile)
* **bandwidthUp**: _String_, upload bandwidth in Kbps (used when specifying a custom connectivity profile)
* **latency**: _String_, first-hop Round Trip Time in ms (used when specifying a custom connectivity profile)
* **packetLossRate**: _Number_, packet loss rate - percent of packets to drop (used when specifying a custom connectivity profile)
* **disableOptimization**: _Boolean_, disable optimization checks (for faster testing)
* **disableScreenshot**: _Boolean_, disable screen shot capturing
* **fullResolutionScreenshot**: _Boolean_, save a full-resolution version of the fully loaded screen shot as a PNG
* **jpegQuality**: _Number_, jpeg compression level (30-100) for the screen shots and video capture
* **medianVideo**: _Boolean_, store the video from the median run when capturing video is enabled
* **htmlBody**: _Boolean_, save the content of only the base HTML response
* **tsView**: _String_, test name to use when submitting results to tsviewdb (for private instances that have integrated with tsviewdb)
* **tsViewConfigs**: _String_, configs to use when submitting results to tsviewdb (for private instances that have integrated with tsviewdb)
* **affinity**: _String_, string to hash test to a specific test agent. tester will be picked by index among available testers
* **priority**: _Number_, change test priority (0-9) [enforced by API key, otherwise 5]
* **blockAds**: _Boolean_, block ads defined by http://adblockplus.org
* **continuousVideoCapture**: _Boolean_, capture video continuously (unstable/experimental, may cause tests to fail)
* **forceSpdy3**: _Boolean_, force SPDY version 3 (Chrome only)
* **forceSoftwareRendering**: _Boolean_, force software rendering, disable GPU acceleration (Chrome only)
* **pollResults**: _Number_, poll for results after test is scheduled at every <interval> seconds [5]
* **waitResults**: _String_, wait for test results informed by agent once complete listening on <hostname>:<port> [hostname:first port available above 8000]
* **timeout**: _String_, timeout for polling and waiting results [no timeout]
* **lighthouse**: _Boolean_, perform lighthouse test (Chrome only, Linux agent only)
