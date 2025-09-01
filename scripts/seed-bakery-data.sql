-- Insert admin user
INSERT INTO users (id, name, email, password, phone, role, "createdAt", "updatedAt") VALUES
('admin_bakery_2024', 'Bakery Admin', 'admin@bakery.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', '01622839616', 'ADMIN', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (id, name, description, price, category, image, "isActive", "createdAt", "updatedAt") VALUES
-- Bakery Items
('bakery_croissant', 'Fresh Croissant', 'Buttery, flaky croissant baked fresh daily', 120.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_bread', 'Sourdough Bread', 'Artisan sourdough with perfect crust', 250.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_muffin', 'Chocolate Muffin', 'Rich chocolate muffin with chocolate chips', 150.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pastries
('pastry_danish', 'Apple Danish', 'Flaky pastry with sweet apple filling', 180.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_puff', 'Cream Puff', 'Light choux pastry filled with vanilla cream', 130.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_tart', 'Fruit Tart', 'Buttery tart shell with fresh seasonal fruits', 220.00, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pizza
('pizza_margherita', 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 450.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_pepperoni', 'Pepperoni Pizza', 'Traditional pepperoni with mozzarella cheese', 520.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_veggie', 'Veggie Supreme', 'Loaded with fresh vegetables and cheese', 580.00, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Burgers
('burger_beef', 'Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 380.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('burger_chicken', 'Chicken Deluxe', 'Grilled chicken breast with avocado and bacon', 420.00, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Drinks
('drink_orange', 'Fresh Orange Juice', 'Freshly squeezed orange juice', 80.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_coffee', 'Artisan Coffee', 'Premium roasted coffee beans', 90.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_tea', 'Iced Tea', 'Refreshing iced tea with lemon', 70.00, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Others
('other_cake', 'Chocolate Cake Slice', 'Rich chocolate layer cake', 200.00, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('other_cheesecake', 'Cheesecake', 'Creamy New York style cheesecake', 250.00, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
