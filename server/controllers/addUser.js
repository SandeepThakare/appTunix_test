import mongoose from '../db/index';
// import mongoose from 'mongoose';
// import { User } from "../model/users";
import express from 'express';
import busboyBodyParser from 'busboy-body-parser';
import bodyParser from 'body-parser';

const User = mongoose.model('User');

export default function addUser(app) {

    app.post('/user', (req, res) => {
        var user = new User({
            personal: req.body.personal,
            address: req.body.address
        });

        user.save().then((result) => {
            console.log(result)
            res.send(result);
        })
            .catch((err) => {
                console.log('Unable to add data due to following error: Error: ', JSON.stringify(err, undefined, 2));
                res.status(400).send(err);
            })
    });
}