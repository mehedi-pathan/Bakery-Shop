-- Create default admin user for bakery management
INSERT INTO users (id, name, email, password, role, "createdAt", "updatedAt") VALUES
('admin_1', 'Bakery Admin', 'admin@bakery.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', 'ADMIN', NOW(), NOW());
-- Password is 'admin123' - change this in production!
