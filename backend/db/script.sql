CREATE TABLE users(
	id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    email VARCHAR(80) NOT NULL, 
    pass VARCHAR(50) NOT NULL
);

CREATE TABLE suppliers(
	id_supplier INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    contact_person VARCHAR(70) NOT NULL, 
    email VARCHAR(80) NOT NULL, 
    id_type INT NOT NULL,
    NIT VARCHAR(20) NOT NULL, 
    phone VARCHAR(10) NOT NULL, 
    city VARCHAR(60) NOT NULL,
    created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
    
    FOREIGN KEY (id_type) REFERENCES suppliers_type(id_type)
);

CREATE TABLE suppliers_type(
	id_type INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    supplier_type VARCHAR(100) NOT NULL
);

INSERT INTO users(email, pass) VALUES ('admin@kratt.com','admin2025'); 
