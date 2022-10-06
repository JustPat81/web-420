/*
*==============================
* Title: wolff-node-shopper-routes.js
* Author: Patrick Wolff
* Date: 25 September 2022
* Description: Assignment 7 - NodeShopper
*==============================
*/

/**createCustomer
* @openapi
*  /api/customers:
*     post:
*      summary: Creates a new customer
*      description: |
*        Creates and adds a new customer to the catalog.
*      requestBody:
*        required: true
*        content:
*          application/json:
*           schema:
*             required:
*               - firstName
*               - lastName
*               - userName
*             properties:
*               firstName:
*                   type: string
*               lastName:
*                   type: string
*               userName:
*                   type: string
*      responses:
*        '200':    # status code
*          description: Customer added to MongoDB
*        '500':    # status code
*          description: Server exceptions
*        '501':    # status code
*          description: MongoDB exceptions*/

router.post('/api/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

        await Customer.create(newCustomer, function(err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customer);
                res.json(customer);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**createInvoiceByUserName
* @openapi
*  /api/customers/:username/invoices:
*     post:
*      summary: Creates a new invoice
*      description: |
*        Creates and adds a new invoice via username.
*      requestParams:
*        required: true
*        content:
*          application/json:
*           schema:
*             required:
*               - userName
*             properties:
*               userName:
*                   type: string
*      requestBody:
*        required: true
*        content:
*          application/json:
*           schema:
*             required:
*               - userName
*               - subtotal
*               - tax
*               - dateCreated
*               - dateShipped
*               - lineItems
*             properties:
*               userName:
*                   type: string
*               subtotal:
*                   type: string
*               tax:
*                   type: string
*               dateCreated:
*                   type: string
*               dateShipped:
*                   type: string
*               lineItems:
*                   type: array
*      responses:
*        '200':    # status code
*          description: Invoice added to MongoDB
*        '500':    # status code
*          description: Server exceptions
*        '501':    # status code
*          description: MongoDB exceptions*/

router.post('/api/customers/:username/invoices', async(req, res) => {
    try {
        Customer.find({}, function(err, customers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customers);
                res.json(customers);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})    
    try {
        const newInvoice = {
            userName: req.body.userName,
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems

}    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }

/**push() off invoice array and pass in the newInvoice object literal */
invoice.push(newInvoice)

/**save() on Customer model and save the results to MongoDB */
invoice.save(function(err, customers) {
    if (err) {
        console.log(err);
        res.json(customers);
    } else {
        console.log(customers);
        res.json(customers);
    }
})


/** findAllInvoicesByUserName
* @openapi
*  /api/customers/:username/invoices:
*     post:
*      summary: Creates a new invoice
*      description: |
*        Creates and adds a new invoice via username.
*      requestParams:
*        required: true
*        content:
*          application/json:
*           schema:
*             required:
*               - userName
*             properties:
*               userName:
*                   type: string
*      responses:
*        '200':    # status code
*          description: Invoice added to MongoDB
*        '500':    # status code
*          description: Server exceptions
*        '501':    # status code
*          description: MongoDB exceptions*/

router.get('/api/customers/:username/invoices', async(req, res) => {
    try {
        Customers.find({'userName': req.params.user}, function(err, customers) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composers);
                res.json(composers);
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