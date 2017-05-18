'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/', (req, res) => {
    knex('classifieds')
      .select(['id','description', 'title', 'price', 'item_image'])
      .then((classifieds) => {
         res.send(classifieds)
      })
})

router.get('/:id', (req, res) => {
   let id  = req.params.id
   knex('classifieds')
      .where('id', id)
      .select(['id','description', 'title', 'price', 'item_image'])
      .first()
      .then((classifieds) => {
         res.send(classifieds)
      })
   })

   router.post('/', (req, res) => {
      console.log('req', req.body);
      knex('classifieds')
         .insert(req.body)
         .returning(['id','description', 'title', 'price', 'item_image', 'created_at'])
         .then((object) => {
            res.send(object[0])
         })

   })


   router.patch('/:id', function(req, res) {
     let id = req.params.id
     let update = req.body

     knex('classifieds')
     .where('id', id)
     .update(update , ['id', 'title', 'description', 'price', 'item_image'])
     .then((data) => {
       var toSend = data[0];
       res.send(data[0]);
     })
     .catch(function(err) {
       res.send(err);
     });
   });

   router.delete('/:id', (req, res) => {
      let id = req.params.id
      knex('classifieds')
         .where('id', id)
         .del()
         .returning(['id', 'title', 'description', 'price', 'item_image'])
         .then((data) => {
            res.send(data[0])
         })

   })


module.exports = router;
