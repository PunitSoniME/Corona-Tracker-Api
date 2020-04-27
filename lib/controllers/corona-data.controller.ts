import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import { StatusCode } from "../providers/status-code";
import * as https from 'https';
import * as variables from './../config/variables';
var OAuth = require('oauth');
// import * as OAuth from 'OAuth';

export class CoronaDataController {

    public async getAll(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {

            var options = {
                host: variables.coronaApi,
                path: '/v2/all',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            return https.request(options, function (resp) {
                if (resp.statusCode == 200) {
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        return res.status(StatusCode.Ok).json(JSON.parse(data));
                    });
                } else {
                    return res.status(StatusCode.PreconditionFailed).json({ message: 'Server is down, Please try after some time' });
                }
            }).on("error", (err) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: err.message });
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getAllCountries(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {

            var options = {
                host: variables.coronaApi,
                path: '/v2/countries',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            return https.request(options, function (resp) {
                if (resp.statusCode == 200) {
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        return res.status(StatusCode.Ok).json(JSON.parse(data));
                    });
                } else {
                    return res.status(StatusCode.PreconditionFailed).json({ message: 'Server is down, Please try after some time' });
                }
            }).on("error", (err) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: err.message });
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryData(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            var options = {
                host: variables.coronaApi,
                path: '/v2/countries/' + req.params.countryName,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            return https.request(options, function (resp) {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    return res.status(StatusCode.Ok).json(JSON.parse(data));
                });
            }).on("error", (err) => {
                return res.status(StatusCode.PreconditionFailed).json(err.message);
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryDataInDetails(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            var options = {
                host: variables.coronaApi,
                path: '/v2/countries/' + req.params.countryName,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            return https.request(options, function (resp) {
                if (resp.statusCode == 200) {
                    let data = '';
                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        return res.status(StatusCode.Ok).json(JSON.parse(data));
                    });
                } else {
                    return res.status(StatusCode.PreconditionFailed).json({ message: 'Server is down, Please try after some time' });
                }
            }).on("error", (err) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: err.message });
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getTwitterHashTagDetails(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            let hashTag = req.body.hashTag;
            let nextResult = req.body.nextResults;

            var oauth = new OAuth.OAuth(
                'https://api.twitter.com/oauth/request_token',
                'https://api.twitter.com/oauth/access_token',
                variables.twitterKey,
                variables.twitterSecret,
                '1.0A',
                null,
                'HMAC-SHA1'
            );

            let apiUrl: string = "https://api.twitter.com/1.1/search/tweets.json";

            if (nextResult) {
                apiUrl = apiUrl + nextResult;
            }
            else {
                apiUrl = `${apiUrl}?q=${hashTag}&count=50`;
            }

            return oauth.get(
                apiUrl,
                variables.token,
                variables.secret,
                (error, data, response) => {
                    if (error) {
                        return res.status(StatusCode.PreconditionFailed).json(error);
                    };
                    if (response.statusCode == 200) {
                        return res.status(StatusCode.Ok).json(JSON.parse(data as any));
                    }
                    return res.status(StatusCode.PreconditionFailed).json({ message: 'Server is down, Please try after some time' });
                });

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }


}