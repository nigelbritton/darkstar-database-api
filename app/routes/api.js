/**
 * Created by Nigel.Britton on 23/07/2018.
 */

'use strict';

var express = require('express'),
    debug = require('debug')('darkstar-database-api'),
    router = express.Router();

var dataContent = require('../lib/dataContent');

router.get('/getPlayers', function (req, res, next) {
    dataContent.query('select charid, charname, nation, pos_zone, playtime from chars;')
    .then(function (results) {
        res.send(results);
    })
    .catch(function () {
        res.send({});
    });
});

router.get('/getAuctionListings', function (req, res, next) {
    dataContent.query('select itemid, stack, seller, seller_name, date, buyer_name, sale, sell_date from auction_house where sell_date = 0;')
    .then(function (results) {
        res.send(results);
    })
    .catch(function () {
        res.send({});
    });
});

router.get('/getAuctionHistory', function (req, res, next) {
    dataContent.query('select itemid, stack, seller, seller_name, date, buyer_name, sale, sell_date from auction_house where sell_date <> 0;')
    .then(function (results) {
        res.send(results);
    })
    .catch(function () {
        res.send({});
    });
});

module.exports = router;
