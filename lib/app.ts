import * as bodyParser from "body-parser";
import * as express from "express";

import { CoronaDataRoutes } from "./routes/corona-data.route";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.setHeaders();
        this.config();
        this.routes();
    }

    private setHeaders(): void {

        //  --------------------------------------

        this.app.use((req, res, next) => {

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");

            //  res.setHeader("Access-Control-Allow-Credentials", "true");

            next();
        });
    }

    private routes(): void {
        this.app.get("/", (req, res) => {
            return res.status(200).json({
                message: "Api Working Fine."
            });
        });

        this.app.use("/CoronaApi", new CoronaDataRoutes().router);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());        //  support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}

export default new App().app;