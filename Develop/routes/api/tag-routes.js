const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name', 'category_id', 'stock', 'price']
      }
    ]
  })

  .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name', 'category_id', 'stock', 'price']
      },
    ]
  })

  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tags were found with this id!' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.username,
    category_name: req.body.tag_name,
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {id: req.params.id  }
  })
  .then(dbTabData => {
    if (!dbTabData[0]) {
      res.status(404).json({ message: 'No tab was found with this id!' });
      return;
    }
    res.json(dbTabData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag by that ID' });
        return;
      }
      res.json(tagData)
    })
    .catch(err => {console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
