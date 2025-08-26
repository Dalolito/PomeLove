CREATE DATABASE IF NOT EXISTS pomelove_prod;
GRANT ALL PRIVILEGES ON pomelove_prod.* TO 'pomelove_user'@'%';
FLUSH PRIVILEGES;
