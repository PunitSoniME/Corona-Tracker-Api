import { Router } from "express";
import { CoronaDataController } from "../controllers/corona-data.controller";

export class CoronaDataRoutes {

    public router: Router;
    public controller: CoronaDataController = new CoronaDataController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/all", this.controller.getAll);
        this.router.get("/countries", this.controller.getAllCountries);
        this.router.get("/countries/:countryName", this.controller.getCountryData);
        this.router.get("/countries/:countryName", this.controller.getCountryDataInDetails);

        this.router.post("/GetTwitterHashTagDetails", this.controller.getTwitterHashTagDetails);
    }
}
