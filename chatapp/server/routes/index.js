import authRouter from './auth.route.js'
import express from 'express'
const router = express.Router();

const defaultRoute = [
    {
        path : '/auth',
        route: authRouter
    },
];


defaultRoute.forEach(item =>{
    router.use(item.path , item.route);
})


export default router;

