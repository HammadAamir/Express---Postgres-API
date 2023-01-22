const express = require('express')
const pool = require('../../database/database')
const router = express.Router()

// get all mobile
router.get('/', async (req, res) => {
    try{
        const mobiles = await pool.query('SELECT * FROM mobile');
        res.status(200).json({data: mobiles.rows})
        if(mobiles.rows.length == 0) 
            throw {message: `No data found`};
    }catch(err){
        res.status(400).json({msg: err.message})
    }
});
// get one mobile
router.get('/:id', async (req, res) => {
    try{
        const mobile = await pool.query(
            'SELECT * FROM mobile WHERE mobile_id = $1', 
            [req.params.id]
        )
        if(mobile.rows.length == 0) 
            throw {message: `No data found with ID ${req.params.id}`};
        res.status(200).json({mobile: mobile.rows})
    }catch(err){
        res.status(400).json({msg: err.message})
    }
});
// post one mobile
router.post('/', async (req, res) => {
    try{
        const updatedMobile = await pool.query(
            'INSERT INTO mobile (brand, name, price) VALUES ($1, $2, $3) RETURNING *', 
            [req.body.brand, req.body.name, req.body.price]
            )
        res.status(200).json({mobile: updatedMobile})
    }catch(err){
        res.status(400).json({msg: err.message})
    }
})
// update one mobile
router.put('/:id', async (req, res) => {
    try{
        const searchMobile = await pool.query(
            'SELECT * FROM mobile WHERE mobile_id = $1', 
            [req.params.id]
        )
        if(searchMobile.rows.length == 0) 
            throw {message: `No data found with ID ${req.params.id}`};

        const mobile = searchMobile.rows[0]
        console.log(mobile)
        mobile.brand = req.body.brand ? req.body.brand : mobile.brand
        mobile.name = req.body.name ? req.body.name : mobile.name
        mobile.price = req.body.price ? req.body.price : mobile.price

        const updatedMobile = await pool.query(
            'UPDATE mobile SET brand=$1, name=$2, price=$3 where mobile_id = $4 RETURNING *', 
            [mobile.brand, mobile.name, mobile.price, req.params.id]
        )
    
        res.status(200).json({"Updated Data": updatedMobile.rows});
    }catch(err){
        res.status(400).json({msg: err.message})
    }
})

// delete one mobile
router.delete('/:id', async (req, res) => {
    try{
        const deleteMobile = await pool.query(
            'DELETE FROM mobile WHERE mobile_id = $1 RETURNING *',
             [req.params.id]
        )
        if (deleteMobile.rows.length == 0)
            throw {message: `No data found with ID ${req.params.id}`};
        res.status(200).json({msg: "row deleted", data: deleteMobile.rows})
    }catch(err){
        res.status(400).json({msg: err.message})
    }
})
module.exports = router