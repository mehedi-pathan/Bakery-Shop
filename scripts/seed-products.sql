-- Initial product seeding for bakery shop
INSERT INTO products (id, name, description, price, category, image, "isActive", "createdAt", "updatedAt") VALUES
-- Bakery Items
('bakery_1', 'Fresh Croissantttt', 'Buttery, flaky croissant baked fresh daily', 3.50, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_2', 'Sourdough Bread', 'Artisan sourdough with perfect crust', 8.00, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('bakery_3', 'Chocolate Muffin', 'Rich chocolate muffin with chocolate chips', 4.25, 'Bakery', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pastries
('pastry_1', 'Apple Danish', 'Flaky pastry with sweet apple filling', 4.75, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_2', 'Cream Puff', 'Light choux pastry filled with vanilla cream', 3.25, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pastry_3', 'Fruit Tart', 'Buttery tart shell with fresh seasonal fruits', 6.50, 'Pastry', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Pizza
('pizza_1', 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 14.99, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_2', 'Pepperoni Pizza', 'Traditional pepperoni with mozzarella cheese', 16.99, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('pizza_3', 'Veggie Supreme', 'Loaded with fresh vegetables and cheese', 17.99, 'Pizza', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Burgers
('burger_1', 'Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 12.99, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('burger_2', 'Chicken Deluxe', 'Grilled chicken breast with avocado and bacon', 13.99, 'Burger', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Drinks
('drink_1', 'Fresh Orange Juice', 'Freshly squeezed orange juice', 4.50, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_2', 'Artisan Coffee', 'Premium roasted coffee beans', 3.75, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('drink_3', 'Iced Tea', 'Refreshing iced tea with lemon', 3.25, 'Drinks', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),

-- Others
('other_1', 'Chocolate Cake Slice', 'Rich chocolate layer cake', 5.99, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW()),
('other_2', 'Cheesecake', 'Creamy New York style cheesecake', 6.99, 'Others', '/placeholder.svg?height=200&width=200', true, NOW(), NOW());
