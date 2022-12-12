import express from "express";
let router = express.Router();
import APIController from '../controller/APIController';

const initApiroute = (app) => {
    router.get('/joke', APIController.getAlljoke);
    router.put('/update-vote', APIController.UpdateVoteStory);
    return app.use('/api/v1/', router)
}
export default initApiroute;
