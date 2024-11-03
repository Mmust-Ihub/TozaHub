import { Router } from "express";
import walletController from "../controllers/wallet.controller.js";

const walletRouter = Router();

walletRouter.post("/create", walletController.createWallet);
walletRouter.get("/all", walletController.getWallets);
walletRouter.post("/one", walletController.getWallet);
walletRouter.post("/topup", walletController.topUpWallet);
walletRouter.post("/topup/history", walletController.topUpHistory);

export default walletRouter;

/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: The wallet managing API
 * /api/v1/wallet/one:
 *   post:
 *     summary: The single wallet data
 *     tags: [Wallets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetWallet'
 *     responses:
 *       200:
 *         description: The single wallet data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetWalletResponse'

 * /api/v1/wallet/topup:
 *   post:
 *     summary: top-up the sacco wallet
 *     tags: [Wallets]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TopUpWallet'
 *     responses:
 *       202:
 *         description: Your request was received for processing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopUpWalletResponse'
 *
 * /api/v1/wallet/topup/history:
 *   post:
 *     summary: get the top up history
 *     tags: [Wallets]
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TopUpHistory'
 *     responses:
 *       200:
 *         description: Your request was received for processing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopUpHistoryResponse'
 */

// schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     GetWallet:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the sacco
 *       example:
 *         email: sacco@gmail.com
 *     GetWalletResponse:
 *       type: map
 *       example:
 *         name: test1
 *         email: sacco@gmail.com
 *         phone_number: 2547..
 *         wallet_id: ROZDK
 *         label: test1,
 *         available_balance: 0
 *         current_balance: 0
 *     TopUpWallet:
 *       type: object
 *       required:
 *         - email
 *         - phone_number
 *         - amount
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the sacco
 *         phone_number:
 *           type: number
 *           description: The phone number to top up from
 *         amount:
 *           type: number
 *           description: The amount to top up
 *       example:
 *         email: sacco@gmail.com
 *         phone_number: 2547...
 *         amount: 1
 *     TopUpWalletResponse:
 *       type: map
 *       example:
 *         status: success
 *         message: Your request have been received for processing
 *
 *     TopUpHistory:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the sacco
 *       example:
 *         email: sacco@gmail.com
 *     TopUpHistoryResponse:
 *       type: object
 *       example:
 *         count: 2
 *         results:
 *             "transaction_id": "Y460BZQ"
 *             "invoice": null
 *             "currency": "KES"
 *             "value": -0.03
 *             "running_balance": 0.97
 *             "narrative": "M-Pesa payment fee"
 *             "trans_type": "CHARGE"
 *             "created_at": "2024-10-28T05:47:06.909940+03:00"
 *             "updated_at": "2024-10-28T05:47:06.966726+03:00"
 */