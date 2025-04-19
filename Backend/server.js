const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { connectRabbitMQ, publishOrderEvent } = require('./rabbitmq');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());


const pool = new Pool({
    user: 'postgres',
    host: 'bakery-db',
    database: 'bakerydb',
    password: 'Aarush@2004',
    port: 5432,
});


pool.connect()
    .then(() => {
        console.log('Connected to the PostgreSQL database successfully!');
    })
    .catch(err => {
        console.error('Error connecting to the PostgreSQL database:', err);
        process.exit(1);
    });
connectRabbitMQ();


app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching orders');
    }
});

app.get('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving order');
    }
});

app.put('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { user_name, product_name, status, total } = req.body;

    try {
        await pool.query(
            'UPDATE orders SET user_name=$1, product_name=$2, status=$3, total=$4 WHERE id=$5',
            [user_name, product_name, status, total, id]
        );
        res.send('Order updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating order');
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM orders WHERE id = $1', [id]);
        res.send('Order deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting order');
    }
});

app.post('/api/orders', async (req, res) => {
    const { user_name, product_name, status, total } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO orders (user_name, product_name, status, total) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_name, product_name, status, total]
        );
        publishOrderEvent(result.rows[0]); 
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating new order');
    }
});


app.get('/api/total-products', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM products');
        res.json({ totalProducts: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching total products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/total-orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM orders');
        res.json({ totalOrders: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching total orders:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
