import { Request, Response } from 'express';
import express from 'express';
import * as reimbursementDao from '../dao/reimbursement-dao';

export const reimbursementRouter = express.Router();

/**
 * Find all reimbursements
 */
reimbursementRouter.get('', async (req: Request, resp: Response) => {
    try {
        console.log('retrieving all reimbursements');
        let users = await reimbursementDao.findAll();
        resp.json(users);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});

/**
 * Find reimbursement by id
 */
reimbursementRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id;
    console.log(`retreiving reimbursement with id  ${id}`)
    try {
        let user = await reimbursementDao.findById(id);
        if (user !== undefined) {
            resp.json(user);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        resp.sendStatus(500);
    }
});

/**
 * Add a new reimbursement
 */
reimbursementRouter.post('', async (req, resp) => {
    console.log('creating reimbursement')
    try {
        const id = await reimbursementDao.create(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
})