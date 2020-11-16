const express = require('express');
const api_helper = require('./API_helper');
const router = express.Router();
const googleTrends = require('google-trends-api');

const guardianKey = 'd3f9bd73-6fed-4257-9ec0-2f575730e56d';
const nytimesKey = 'v8ZpU25Mdau80BSGFN4xMKfNn6inKF8S';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/guardian', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/search?api-key=' + guardianKey + '&section=(sport|business|technology|politics)&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/home', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=' + guardianKey)
        .then(response => {
            if (response["response"]["status"] === "ok") {
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/world', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/world?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/politics', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/politics?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/business', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/business?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/technology', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/technology?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/sports', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/sport?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/science', (req, res) => {
    api_helper.makeAPICall('https://content.guardianapis.com/science?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(response["response"]["results"]);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/world', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/politics', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/business', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/technology', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/sports', (req, res) => {
    api_helper.makeAPICall('https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=' + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"title" in data[i] || data[i]["title"] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"published_date" in data[i] || data[i]["published_date"] === "")
                        isComplete = false;
                    if (!"section" in data[i] || data[i]["section"] === "")
                        isComplete = false;
                    if (!"url" in data[i] || data[i]["url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/article', (req, res) => {
    var id = req.query.id;
    api_helper.makeAPICall('https://content.guardianapis.com/' + id + '?api-key=' + guardianKey + '&show-blocks=all')
        .then(response => {
            res.json(response);
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/article', (req, res) => {
    let id = req.query.id;
    api_helper.makeAPICall("https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"" + id + "\")&api-key=" + nytimesKey)
        .then(response => {
            res.json(response);
        }).catch(error => {
        res.send(error);
    })
});

router.get('/guardian/search', (req, res) => {
    let q = req.query.q;
    api_helper.makeAPICall("https://content.guardianapis.com/search?q=" + q + "&api-key=" + guardianKey + "&show-blocks=all")
        .then(response => {
            if (response["response"]["status"] === "ok") {
                let data = response["response"]["results"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"webTitle" in data[i] || data[i]["webTitle"] === "")
                        isComplete = false;
                    if (!"blocks" in data[i] || !"body" in data[i]["blocks"] || data[i]["blocks"]["body"].length === 0 || !"bodyTextSummary" in data[i]["blocks"]["body"][0] || data[i]['blocks']['body'][0]['bodyTextSummary'] === "")
                        isComplete = false;
                    if (!"webPublicationDate" in data[i] || data[i]["webPublicationDate"] === "")
                        isComplete = false;
                    if (!"sectionId" in data[i] || data[i]["sectionId"] === "")
                        isComplete = false;
                    if (!"webUrl" in data[i] || data[i]["webUrl"] === "")
                        isComplete = false;
                    if (!"id" in data[i] || data[i]["id"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/nytimes/search', (req, res) => {
    let q = req.query.q;
    api_helper.makeAPICall("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + nytimesKey)
        .then(response => {
            if (response["status"] === "OK") {
                let data = response["response"]["docs"];
                let output = [];
                let isComplete = true;
                for (let i = 0; i < data.length; i++) {
                    if (!"headline" in data[i] || !"main" in data[i]["headline"] || data[i]['headline']['main'] === "")
                        isComplete = false;
                    if (!"abstract" in data[i] || data[i]["abstract"] === "")
                        isComplete = false;
                    if (!"pub_date" in data[i] || data[i]["pub_date"] === "")
                        isComplete = false;
                    if (!"news_desk" in data[i])
                        isComplete = false;
                    if (!"web_url" in data[i] || data[i]["web_url"] === "")
                        isComplete = false;
                    if (isComplete)
                        output.push(data[i]);
                    if (output.length === 10)
                        break;
                }
                res.json(output);
            } else {
                res.json(response);
            }
        }).catch(error => {
        res.send(error);
    })
});

router.get('/trending', (req, res) => {
    let q = req.query.q;
    googleTrends.interestOverTime({keyword: q, startTime: new Date('2019-06-01')})
        .then(response => {
            res.json(JSON.parse(response));
        }).catch(error => {
        res.send(error);
    })
});

module.exports = router;