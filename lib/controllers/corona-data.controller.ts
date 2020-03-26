import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import { StatusCode } from "../providers/status-code";
import * as https from 'https';
import * as variables from './../config/variables';

export class CoronaDataController {

    public async getAll(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {

            var options = {
                host: variables.coronaApi,
                path: '/all',
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
                console.log("Error: " + err.message);
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getAllCountries(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {

            var options = {
                host: variables.coronaApi,
                path: '/countries',
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
                console.log("Error: " + err.message);
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryData(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            var options = {
                host: variables.coronaApi,
                path: '/countries/' + req.params.countryName,
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
                console.log("Error: " + err.message);
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }

    public async getCountryDataInDetails(req: Request | any, res: Response, next: NextFunction): Promise<any> {
        try {
            var options = {
                host: variables.coronaApi,
                path: '/countries/' + req.params.countryName,
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
                console.log("Error: " + err.message);
            }).end();

        } catch (ex) {
            return res.status(StatusCode.PreconditionFailed).json({ message: ex.message });
        }
    }
}