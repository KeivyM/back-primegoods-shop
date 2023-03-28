import express from "express";
import {
  CreateProduct,
  GetProducts,
  GetOneProduct,
  DeleteProduct,
} from "../../modules/Product.js";
import { Register, GetUsers, Login, CheckStatus } from "../../modules/User.js";
import fileUpload from "express-fileupload";
import protect from "../../middleware/auth.js";
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const router = express.Router();

// /**
//  * @openapi
//  * /api/v1/login:
//  *   get:
//  *     tags:
//  *       - login
//  *     responses:
//  *       200:
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: OK
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestión de autenticacion
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               -email
 *               -password
 *
 *     responses:
 *      200:
 *        description: login correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Objeto creado con éxito.
 */
router.route("/login").post(Login);

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               -name
 *               -username
 *               -email
 *               -password
 *               -confirmPassword
 *
 *     responses:
 *      200:
 *        description: login correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Objeto creado con éxito.
 */
router.route("/register").post(Register);
// router.route("/getUsers").get(protect, GetUsers);

router.route("/check-status").get(CheckStatus);

/**
 * @openapi
 * /api/v1/product/create:
 *    post:
 *      summary: ima
 *      tags: [Products]
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                    type: string
 *                    required: true
 *                  description:
 *                    type: string
 *                  category:
 *                    type: string
 *                    enum: [tech, vehicle]
 *                  images:
 *                    required: true
 *                    type: array
 *                    items:
 *                      type: string
 *                      format: binary
 *                  price:
 *                    type: number
 *                  color:
 *                    type: string
 *              required:
 *                -title
 *                -description
 *                -images
 *                -price
 *                -category
 *
 *      responses:
 *       200:
 *         description: Objeto creado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Objeto creado con éxito.
 *       404:
 *         description: error al crear producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: error al crear producto.
 */
router
  .route("/product/create")
  .post(protect, fileUpload({ useTempFiles: true }), CreateProduct);
//falta agregar la respuesta de autorizacion

router.route("/getProducts").get(protect, GetProducts);
router.route("/product/:id").get(protect, GetOneProduct);
// router.route("/deleteProduct/:id").delete(protect, DeleteProduct);

export default router;
