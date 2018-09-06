import { Request, Response } from 'express';
import * as express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';
import { authMiddleware } from '../security/authorization-middleware';

export const reimbursementRouter = express.Router();

/**
 * Find all reimbursements
 */
reimbursementRouter.get('', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    try {
        const users = await reimbursementDao.findAll();
        resp.json(users);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}]);

/**
 * Find reimbursement by id
 */
reimbursementRouter.get('/:id', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    const id = +req.params.id;
    try {
        const user = await reimbursementDao.findById(id);
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
 * Add a new reimbursement
 */
reimbursementRouter.post('', [authMiddleware('Employee', 'Manager'), async (req: Request, resp: Response) => {
    try {
        const id = await reimbursementDao.create(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}])

/**
 * Update reimbursement
 */
reimbursementRouter.put('/:id', [authMiddleware('Manager'), async (req: Request, resp: Response) => {
    try {
        const id = await reimbursementDao.update(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}])