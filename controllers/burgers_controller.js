var express = require("express");
var router = new express.Router();
var db = require("../models");

router.get("/", function (req, res) {
  res.redirect("/api/burgers");
});

router.get("/api/burgers", function (req, res) {
  db.seq_burgers.findAll({
    include:
      { model: db.seq_customers }
  }).then(function (data) {
    var burgerObj = {
      burgers: data
    };
    res.render("index", burgerObj);
  });
});

router.get("/api/customers/:custName", function (req, res) {
  db.seq_customers.findAll({
    where: {
      customer_name: req.params.custName
    },
    attributes: ["id", "customer_name"]
  }).then(function (data) {
    res.json(data);
  });
});
// The seqBurgersSeqCustomers variable is used in the router.post association below. 
var seqBurgersSeqCustomers = db.seq_burgers.belongsTo(db.seq_customers);

// This post route creates a row in the seq_customers table and the seq_burgers table in one call to sequelize. 
router.post("/api/burgers/cust", function (req, res) {
  db.seq_burgers.create({
    burger_name: req.body.burgerName,
    devoured: req.body.devoured,
    createdAt: new Date(),
    updatedAt: new Date(),
    seq_customer: {
      customer_name: req.body.custName
    }
  },
    {
      include: [{
        association: seqBurgersSeqCustomers
      }]
    }).then(function (record) {
      res.json(record);
    });
});

// This post route creates a new seq_burgers row using an existing seq_customer.id value (since the customer already exists). 
router.post("/api/burgers", function (req, res) {
  db.seq_burgers.create({
    burger_name: req.body.burgerName,
    devoured: req.body.devoured,
    createdAt: new Date(),
    updatedAt: new Date(),
    seq_customer_id: req.body.seqCustomerId
  }).then(function (record) {
    res.json(record);
  });
});

// This put route updates the seq_burgers.devoured field to a value of 1 (true).  
router.put("/api/burgers/:id", function (req, res) {
  db.seq_burgers.update(
    {
      devoured: req.body.devoured
    },
    {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if (res.changedRows === 0) {
        // If no rows were changed, then send status 404
        return res.status(404).end();
      }
      // If update successful, send status 200 OK. 
      res.status(200).end();
    }
    );
});

// This post route deletes a devoured burger row. 
router.post("/api/burgers/:id", function (req, res) {
  db.seq_burgers.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.status(200).end();
  });
});

// This post route deletes a devoured customer and also cascade deletes all seq_burger rows related to the deleted customer. 
router.post("/api/customers/:id", function (req, res) {
  db.seq_customers.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.status(200).end();
  });
});

module.exports = router;