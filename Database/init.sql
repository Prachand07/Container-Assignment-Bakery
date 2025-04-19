CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT NOT NULL
);

INSERT INTO products (name, category, price, image) VALUES
('Whole Wheat Bread', 'Bread', 90, 'https://www.allrecipes.com/thmb/_piMRxT9zYHP39Lnz6-lObHzEWw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-6773-simple-whole-wheat-bread-DDMFS-4x3-B-969e7bce922948959cb9e85aa4b2ff0d.jpg'),
('Pista Biscuits', 'Cookie', 580, 'https://sindhidryfruits.live/cdn/shop/products/PistaBiscuit.jpg?v=1743099358'),
('Garlic Bread', 'Bread', 100, 'https://5.imimg.com/data5/YJ/FK/LK/SELLER-30300246/garlic-bread.jpg'),
('Almond Biscotti', 'Cookie', 560, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3punLXsJjEQwZQNlnGiA115fZXUPW2j4GZw&s'),
('ButterScotch Cake', 'Cake', 399, 'https://m-rr-uiux-green-prod-nginx.fnp.com/images/pr/x/v20221130174909/crunchy-butterscotch-cake_1.jpg'),
('Black Forest Cake', 'Cake', 550, 'https://livforcake.com/wp-content/uploads/2017/07/black-forest-cake-thumb.jpg'),
('Multigrain Bread', 'Bread', 110, 'https://static.toiimg.com/thumb/76626392.cms?width=1200&height=900'),
('Strawberry Cupcake', 'Pastry', 60, 'https://sugargeekshow.com/wp-content/uploads/2022/08/vanilla_cupcake_featured_blog.jpg'),
('Chocolate Truffle Cake', 'Cake', 599, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-v-t0zPsnbO1h8t0-mqb1Bv0OiFjK1orAfA&s'),
('Fresh Baguette', 'Bread', 90, 'https://www.allrecipes.com/thmb/J96_s7wY7k0vQtMZ9l5_XQZn4cg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7028-french-baguettes-DDMFS-4x3-a3f7e7cc53654c8db2c9919148e7c915.jpg'),
('Strawberry Cheesecake', 'Cake', 650, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw41-uke-RL1bA_2BNDbxUDBOqOVYG76WAtg&s'),
('Oatmeal Cookies', 'Cookie', 250, 'https://www.budgetbytes.com/wp-content/uploads/2024/01/Oatmeal-Cookies-Plated.jpg');


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    product_name VARCHAR(255),
    status VARCHAR(50),
    total NUMERIC
);

INSERT INTO orders (user_name, product_name, status, total) VALUES 
('Aarav Patel', 'Chocolate Cake', 'Delivered', 2999.99),
('Diya Sharma', 'Blueberry Muffin', 'Pending', 450.00),
('Ishaan Kumar', 'Croissant', 'Delivered', 325.00),
('Priya Reddy', 'Banana Bread', 'Cancelled', 875.00),
('Ravi Verma', 'Strawberry Tart', 'Delivered', 595.00),
('Sneha Yadav', 'Vanilla Cupcake', 'Shipped', 299.00),
('Vishal Mehta', 'Cinnamon Roll', 'Processing', 475.00);
