import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongoDB } from './src/config/mongooseConfig.js';
import { customErrorHandler } from './src/error-handler/customErrorHandler.js';
import { userRouter } from './src/features/user/user.routes.js';
import { droneRouter } from './src/features/drone/drone.routes.js';
import { validateToken } from './src/middlewares/jwt.middleware.js';
import { siteRouter } from './src/features/site/site.routes.js';
import { missionRouter } from './src/features/mission/mission.routes.js';
import { categoryRouter } from './src/features/category/category.routes.js';

const app = express();
const port_number = process.env.PORT_NUMBER;

app.use(bodyParser.json());

//Routes

app.use("/api/users",userRouter);
app.use("/api/drones",validateToken,droneRouter);
app.use("/api/sites",validateToken,siteRouter);
app.use("/api/missions",validateToken,missionRouter);
app.use("/api/categories",validateToken,categoryRouter);

// Application Level Error Handler
app.use((err,req,res,next) => {
    if(err instanceof customErrorHandler)
    {
        return res.status(err.code).json({error : err.message});
    }

    console.log(err);
    res.status(500).send('Something Went Wrong , Please try Later');
})

app.listen(port_number,() => {
    console.log(`Server is running on port ${port_number}`);
    connectToMongoDB();
})