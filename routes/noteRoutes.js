/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Operations related to user notes
 */

const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get a list of all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/notes', noteController.getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note retrieved successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/notes/:id', noteController.getNoteById);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Note created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/notes', noteController.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update an existing note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/notes/:id', noteController.updateNoteById);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/notes/:id', noteController.deleteNoteById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Share a note with another user for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: Note shared successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/notes/share', noteController.shareNote);

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for notes based on keywords for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notes retrieved successfully based on search
 *       500:
 *         description: Internal Server Error
 */
router.get('/notes-search', noteController.searchNotes);

module.exports = router;