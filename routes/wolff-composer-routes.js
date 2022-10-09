/*
============================================
; Title:  wolff-composer-routes.js
; Author: Patrick Wolff
; Date:   04 September 2022
; Description: Routes for Composer Model
;===========================================
*/

const express = require("express");
const router = express.Router();
const Composer = require("../models/composer.js");

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning an array of composer documents.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composer documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
 router.get("/composers", async (req, res) => {
    try {
      Composer.find({}, function (err, composers) {
        if (err) {
          // unsuccessful query
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          // successful query
          console.log(composers);
          res.json(composers);
        }
      });
    } catch (e) {
      // error message
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });
  
  /**
   * findComposerById
   * @openapi
   * /api/composers/{id}:
   *   get:
   *     tags:
   *       - Composers
   *     description:  API for returning a composer document by Id
   *     summary: returns a composer document
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: composer document id
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Composer document
   *       '500':
   *         description: Server exception
   *       '501':
   *         description: MongoDB Exception
   */
  router.get("/composers/:id", async (req, res) => {
    try {
      Composer.findOne({ _id: req.params.id }, function (err, composer) {
        if (err) {
          // unsuccessful query
          console.log(err);
          res.status(500).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          // successful query
          console.log(composer);
          res.json(composer);
        }
      });
    } catch (e) {
      // error message
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });
  
  /**
   * createComposer
   * @openapi
   * /api/composers:
   *   post:
   *     tags:
   *       - Composers
   *     description: API for adding a new composer document to MongoDB Atlas
   *     summary: creates a new composer document
   *     requestBody:
   *       description: composer information
   *       content:
   *        application/json:
   *          schema:
   *             required:
   *               - firstName
   *               - lastName
   *             properties:
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Composer added
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */
  router.post("/composers", async (req, res) => {
    try {
      const newComposer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      await Composer.create(newComposer, function (err, composer) {
        if (err) {
          // unsuccessful creation
          console.log(err);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          // successful creation
          console.log(composer);
          res.json(composer);
        }
      });
    } catch (e) {
      // error
      console.log(e);
      res.status(500).send({
        message: `Server Exception: ${e.message}`,
      });
    }
  });

  /**
   * updateComposerByIdComposer
   * @openapi
   * /api/composers/{id}:
   *   put:
   *     tags:
   *       - Composers
   *     name: updateComposerById
   *     description: API for updating a composer document to MongoDB Atlas
   *     summary: Updates a composer document
   *     parameters:
   *      - name: id
   *        in: path
   *        required: true
   *        description: Id to filter the collection by.
   *        schema:
   *          type: string
   *     requestBody:
   *       description: composer information
   *       content:
   *        application/json:
   *          schema:
   *             required:
   *               - type
   *             properties:
   *               type:
   *                type: string
   *     responses:
   *       '200':
   *         description: Composer added
   *       '500':
   *         description: Server Exception
   *       '501':
   *         description: MongoDB Exception
   */

  router.put('/composer/:id', async (req, res) => {
    try {
      const composerDocId = req.params.id;

      Composer.findOne({'_id': composerDocId}, function(err, composer) {
        if (err) {
          console/log(err);
          res.status(501).send({
            'message': `MongoDB Exception: ${err}`
          })
        } else {
          console.log(composer);

          composer.set({
            type: req.body.type
          });

          composer.save(function(err, updatedComposer) {
            if (err) {
              console.log(err);
              res.json(updatedComposer);
            } else {
              console.log(updatedComposer);
              res.json(updatedComposer);
            }
          })
        }
      })

    } catch (e) {
      console.log(e);
      res.status(500).send({
        'message': `Server Exception: ${e.message}`
      })
    }
  })

  /**
 * deleteComposer
 * @openapi
 * /api/composer/{id}:
 *   delete:
 *     tags:
 *       - Composer
 *     name: deleteComposer
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/composer/:id', async (req, res) => {
  try {
      const composerDocId = req.params.id;

      Composer.findByIdAndDelete({'_id': composerDocId}, function(err, composer) {
          if (err) {
              console.log(err);
              res.status(501).send({
                  'message': `MongoDB Exception: ${err}`
              })
          } else {
              console.log(composer);
              res.json(composer);
          }
      })
  } catch (e) {
      console.log(e);
      res.status(500).send({
          'message': `Server Exception: ${e.message}`
      })
  }
})
  
  module.exports = router;