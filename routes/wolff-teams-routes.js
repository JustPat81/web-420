/*
*==============================
* Title: wolff-teams-routes.js
* Author: Patrick Wolff
* Date: 09 October 2022
* Description: Assignment 9 - Capstone
*==============================
*/

const express = require("express");
const router = express.Router();
const Team = require("../models/wolff-teams.js");

// findAllTeams
/**
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     name: findAllTeams
 *     description: Find and display all teams
 *     summary: Returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams", async (req, res) => {
  try {
    Team.find({}, function (err, teams) {
      if (err) {
        res.status(501).send({
          message: `MongoDB Exception:${err}`,
        });
      } else {
        res.json(teams);
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Exception:${e.message}`,
    });
  }
});

// assignPlayerToTeam
/**
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: Assign a player to a team.
 *     summary: Assign a player to a team.
 *     operationId: assignPlayerToTeam
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: _id is generated by team document
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Assign a player to a team
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (team) {
        let newPlayer = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
        };

        team.players.push(newPlayer);
        team.save();

        res.status(200).json({
          message: "Player added to team document",
        });
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

// findAllPlayersByTeamId
/**
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *        - Teams
 *     name: findAllPlayersByTeamId
 *     description: Shows all players by team _id
 *     summary: Find all players by a team _id
 *     operationId: findAllPlayersByTeamId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: _id is generated by team document
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get("/teams/:id/players", async (req, res) => {
  try {
    Team.findOne({ _id: req.params.id }, function (err, team) {
      if (team) {
        res.json(team.players);
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

// deleteTeam
/**
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     description: Deletes a team document
 *     summary: Delete team by ID
 *     operationId: deleteTeamById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete("/teams/:id", async (req, res) => {
  try {
    Team.findByIdAndDelete({ _id: req.params.id }, function (err, team) {
      if (team) {
        res.status(200).send({
          message: `Team document Delete:${req.params.id}`,
        });
      } else if (!team) {
        res.status(401).send("Invalid teamId");
      } else {
        res.status(501).send({ message: `MongoDB Exception! ${err}` });
      }
    });
  } catch (e) {
    res.status(500).send({ message: `Server Exception! ${e.message}` });
  }
});

module.exports = router;