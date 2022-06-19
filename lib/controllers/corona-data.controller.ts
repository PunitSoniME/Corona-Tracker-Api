import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import { StatusCode } from "../providers/status-code";
var OAuth = require('oauth');

import axios from 'axios';

export class CoronaDataController {

    public async getAll(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            return await axios.get(process.env.CORONA_API + 'all').then((response) => {
                return res.status(StatusCode.Ok).json(response.data);
            }).catch((error) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: error.message });
            });
        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getAllCountries(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            return await axios.get(process.env.CORONA_API + 'countries').then((response) => {
                return res.status(StatusCode.Ok).json(response.data);
            }).catch((error) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: error.message });
            });
        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryData(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            return await axios.get(process.env.CORONA_API + 'countries/' + req.params.countryName).then((response) => {
                return res.status(StatusCode.Ok).json(response.data);
            }).catch((error) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: error.message });
            });
        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryDataInDetails(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            return await axios.get(process.env.CORONA_API + 'countries/' + req.params.countryName).then((response) => {
                return res.status(StatusCode.Ok).json(response.data);
            }).catch((error) => {
                return res.status(StatusCode.PreconditionFailed).json({ message: error.message });
            });
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
                process.env.TWITTER_KEY,
                process.env.TWITTER_SECRET,
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
                process.env.TOKEN,
                process.env.SECRET,
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