import { Request, Response } from 'express';
import * as express from 'express';
import * as userDao from '../dao/user-dao';
import * as reimbursementDao from '../dao/reimbursement-dao';
import { authMiddleware } from '../security/authorization-middleware';

export const userRouter = express.Router();

/**
 * Find all users
 */
userRouter.get('', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    try {
        console.log('retrieving all users');
        const users = await userDao.findAll();
        resp.json(users);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}]);

/**
 * Find user by id
 */
userRouter.get('/:id', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    const id = +req.params.id;
    console.log(`retreiving user with id  ${id}`)
    try {
        const user = await userDao.findById(id);
        if (user !== undefined) {
            resp.json(user);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        resp.sendStatus(500);
    }
}]);

/**
 * Find all reimbursements by user id
 */
userRouter.get('/:id/reimbursements', [authMiddleware('Employee', 'Manager'), async (req: Request, resp: Response) => {
    const id = +req.params.id;
    console.log(`retreiving reimbursements submitted by user with id  ${id}`)
    try {
        const reimbursements = await reimbursementDao.findByAuthorId(id);
        if (reimbursements !== undefined) {
            resp.json(reimbursements);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        resp.sendStatus(500);
    }
}]);

/**
 * Add a new user
 */
userRouter.post('', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    console.log('creating user')
    try {
        const id = await userDao.create(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}])

/**
 * Login
 */
userRouter.post('/login', async (req, resp) => {
    try {
        console.log("SESSION")
        console.log(req.session);
        const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);
        if (user && req.session) {
            req.session.user = user;
            resp.json(user);
        } else {
            resp.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
})