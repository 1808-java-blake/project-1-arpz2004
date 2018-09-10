import { Request, Response } from 'express';
import * as express from 'express';
import * as userDao from '../dao/user-dao';
import * as reimbursementDao from '../dao/reimbursement-dao';
import { authMiddleware } from '../security/authorization-middleware';
import * as bcrypt from 'bcrypt';

export const userRouter = express.Router();

/**
 * Find all users
 */
userRouter.get('', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    try {
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
userRouter.post('', [async (req: Request, resp: Response) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    user.id = 0;
    try {
        const id = await userDao.create(user);
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
        const user = await userDao.findByUsername(req.body.username);
        let authenticated = false;
        if (user) {
            authenticated = await bcrypt.compare(req.body.password, user.password);
        }
        if (user && req.session && authenticated) {
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