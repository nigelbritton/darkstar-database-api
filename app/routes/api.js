/**
 * Created by Nigel.Britton on 23/07/2018.
 */

'use strict';

var express = require('express'),
    debug = require('debug')('darkstar-database-api'),
    router = express.Router();

let applicationStatus = {
    version: require('../../package.json').version,
    name: require('../../package.json').name,
    serverPort: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development',
    started: new Date()
};

var dataContent = require('../lib/dataContent');

router.get('/getPlayers', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getPlayers');
    if (!cachedContent) {
        dataContent.query('select c.charid, charname, nation, pos_zone, playtime, cj.* from chars c join char_jobs cj on c.charid = cj.charid;')
            .then(function (results) {
                let tmpResults = results;
                results = [];
                tmpResults.forEach(result => {
                    let profile = {
                        charid: result['charid'],
                        charname: result['charname'],
                        nation: result['nation'],
                        pos_zone: result['pos_zone'],
                        playtime: result['playtime'],
                        jobs: {}
                    }
                    delete result['charid'];
                    delete result['charname'];
                    delete result['nation'];
                    delete result['pos_zone'];
                    delete result['playtime'];
                    profile.jobs = result;
                    results.push(profile);
                });
                dataContent.setCacheData('getPlayers', results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function (err) {
                debug(err);
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

router.get('/getAuctionListings', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getAuctionListings');
    if (!cachedContent) {
        dataContent.query('select ah.itemid, ah.stack, ah.seller, ah.seller_name, ah.date, ah.buyer_name, ah.sale, ah.sell_date, ia.level, ia.jobs, ib.name, ib.aH from auction_house ah left join item_armor ia on ah.itemid = ia.itemid left join item_basic ib on ah.itemid = ib.itemid  where ah.sell_date = 0;')
            .then(function (results) {
                dataContent.setCacheData('getAuctionListings', results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function () {
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

router.get('/getAuctionHistory', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getAuctionHistory');
    if (!cachedContent) {
        dataContent.query('select ah.itemid, ah.stack, ah.seller, ah.seller_name, ah.date, ah.buyer_name, ah.sale, ah.sell_date, ia.level, ia.jobs, ib.name, ib.aH from auction_house ah left join item_armor ia on ah.itemid = ia.itemid left join item_basic ib on ah.itemid = ib.itemid where ah.sell_date <> 0;')
            .then(function (results) {
                dataContent.setCacheData('getAuctionHistory', results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function () {
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

router.get('/getZones', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getZones');
    if (!cachedContent) {
        dataContent.query('select zoneid, name, music_day, music_night, restriction, tax from zone_settings;')
            .then(function (results) {
                dataContent.setCacheData('getZones', results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function () {
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

router.get('/getItems', function (req, res, next) {
    res.send({
        version: applicationStatus.version,
        data: {},
        updated: new Date().getTime()
    });
});

router.get('/getItems/:categoryId', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getItems_'+ parseInt(req.params.categoryId));
    if (!cachedContent) {
        dataContent.query('select * from item_basic where aH = ' + parseInt(req.params.categoryId) + ';')
            .then(function (results) {
                dataContent.setCacheData('getItems_'+ parseInt(req.params.categoryId), results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function (err) {
                debug(err);
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

router.get('/getSynthRecipes', function (req, res, next) {
    let cachedContent = dataContent.getCacheData('getSynthRecipes');
    if (!cachedContent) {
        dataContent.query('select * from synth_recipes;')
            .then(function (results) {
                dataContent.setCacheData('getSynthRecipes', results, 7200);
                res.send({
                    version: applicationStatus.version,
                    data: results,
                    updated: new Date().getTime()
                });
            })
            .catch(function () {
                res.send({});
            });
    } else {
        res.send({
            version: applicationStatus.version,
            data: cachedContent,
            updated: new Date().getTime()
        });
    }
});

module.exports = router;
