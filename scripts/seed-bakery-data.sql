-- Insert admin user
INSERT INTO users (id, name, email, password, phone, role, "createdAt", "updatedAt") VALUES
('admin_bakery_2024', 'Bakery Admin', 'admin@bakery.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', '01622839616', 'ADMIN', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, description, price, category, image, "isActive", "createdAt", "updatedAt") VALUES

-- Bakery Items
('bakery_croissant', 'Fresh Croissantttt', 'Buttery, flaky croissant baked fresh daily', 120.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_bread', 'Sourdough Bread', 'Artisan sourdough with perfect crust', 250.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_muffin', 'Chocolate Muffin', 'Rich chocolate muffin with chocolate chips', 150.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_plain_bread', 'Plain Bread', 'A simple staple, often prepared with flour, milk, sugar, and salt', 40.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_cream_bun', 'Cream Bun', 'Soft, sweet pastry filled with cream', 35.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_burger_bun', 'Burger Bun', 'Soft, airy buns for burgers', 30.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_butter_bun', 'Butter Bun', 'Fluffy buns infused with butter', 35.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_custard_bread', 'Custard Bread', 'Sweet bun filled with creamy custard', 50.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_cheese_bread', 'Cheese Bread', 'Bread with cheesy filling', 60.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_baguette', 'French Baguette', 'Classic French baguette', 80.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pastries
('pastry_danish', 'Apple Danish', 'Flaky pastry with sweet apple filling', 180.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_puff', 'Cream Puff', 'Light choux pastry filled with vanilla cream', 130.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_tart', 'Fruit Tart', 'Buttery tart shell with fresh seasonal fruits', 220.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_choco_cake', 'Chocolate Coated Cake', 'Rich chocolate coated cake', 600.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_moist_brownie', 'Moist Chocolate Brownie', 'Soft chocolate brownie 100gm', 130.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pizza
('pizza_margherita', 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 450.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_pepperoni', 'Pepperoni Pizza', 'Traditional pepperoni with mozzarella cheese', 520.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_veggie', 'Veggie Supreme', 'Loaded with fresh vegetables and cheese', 580.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_koriana', 'Koriana Pizza', 'Soft bun pizza topped with minced chicken, sauce & cheese', 110.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Burgers & Sandwiches
('burger_beef', 'Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 380.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('burger_chicken', 'Mexican Chicken Steak Burger', 'Grilled chicken breast with avocado and bacon', 420.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('sandwich_mexican', 'Mexican Sub Sandwich', 'Sub sandwich with chicken, veggies & sauce', 170.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('hotdog_mexican', 'Mexican Hot Dog', '110gm soft bun hot dog', 110.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Drinks
('drink_milkshake', 'Milkshake', 'Vanilla, Chocolate, Strawberry flavors', 80.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_lassi', 'Lassi', 'Sweet, salty or fruit-flavored yogurt drink', 70.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_fresh_juice', 'Fresh Juice', 'Seasonal flavors: Mango, Orange, Watermelon', 80.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_lemonade', 'Lemonade', 'Refreshing lemonade with mint', 60.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_coffee', 'Coffee', 'Americano, Espresso, Cappuccino', 90.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_tea', 'Milk Tea', 'Classic milk tea', 50.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_iced_tea', 'Iced Tea', 'Iced lemon or mango tea', 70.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_energy', 'Energy Drink', 'Popular Bangladeshi energy drinks', 100.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_soft', 'Soft Drink', 'Coca-Cola, Pepsi, 7UP etc.', 50.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_water', 'Bottled Water', 'Mineral water', 30.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Others
('other_cake', 'Chocolate Cake Slice', 'Rich chocolate layer cake', 200.00, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('other_cheesecake', 'Cheesecake', 'Creamy New York style cheesecake', 250.00, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW())

ON CONFLICT (id) DO NOTHING;
