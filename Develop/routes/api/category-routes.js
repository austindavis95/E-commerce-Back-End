const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name', 'category_id', 'stock', 'price']
      }
    ]
  })

  .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    
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
  
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category was found with this id!' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.post('/', (req, res) => {
  // create a new category
    // expects Categorys name
    Category.create({
      id: req.body.username,
      category_name: req.body.category_name,
    })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
