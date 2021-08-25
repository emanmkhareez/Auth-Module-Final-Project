'use strict';

const express = require('express');
const { note } = require('../models/index')
const bearerAuth = require('../middelware/bearer.js')
const permissions = require('../middelware/acl')

const router = express.Router();


router.get('/note', bearerAuth, permissions('read'), handleGetAll);
router.get('/note/:id', bearerAuth, permissions('read'), handleGetOne);
router.post('/note', bearerAuth, permissions('create'), handleCreate);
router.put('/note/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/note/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await note.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = parseInt(req.params.id);
  let theRecord = await note.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await note.create(obj);
  if (newRecord) { res.status(201).json(newRecord); }
  res.status(400).send('💢 Sentence is Invalid')
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await note.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await note.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;
