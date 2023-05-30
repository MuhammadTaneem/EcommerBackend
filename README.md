
# Floric

Floric is a commerce web application with height security API and single page web application.


## Requirements
- Python 3.9.13
- Node ^12.20.0 || ^14.15.0 || >=16.10.0"
- Angular 13.3.0
- Postgresql


## Clone the project

```bash
  git clone https://taneemul@bitbucket.org/taneemul/floric.git
``` 




## Change in settings 
Create Database 

```bash
  name = floric
  port= 5433
  password = 12345
```

## Configure API  Localy
Go to the project directory

```bash
  cd floric\server
```

Create virtual environment


```bash
  pip install virtualenv
  virtualenv venv
  venv\Scripts\activate
```
Install dependencies


```bash
  pip install -r requirements.txt
```
## Migrations

```bash
  python manage.py migrate
```


## Configure Databse Localy

Load dataset


   - copy this blocks of code  change {{your disk location}} to your disk localtion past it in pgadmin query 


```bash
SELECT setval('users_user_id_seq', (SELECT MAX(id) from "users_user"));
SELECT setval('products_category_id_seq', (SELECT MAX(id) from "products_category"));
SELECT setval('products_product_id_seq', (SELECT MAX(id) from "products_product"));

copy public.users_user (id, last_login, is_superuser, is_staff, is_active, date_joined, first_name, last_name, email, password, image, phone, date_of_birth, gender, city, address)
FROM '{{your disk location}}\dataset\users_user.csv' CSV HEADER QUOTE '"' ESCAPE '''';

copy public.products_category (id, name, cat_img) FROM '{{your disk location}}\dataset\products_category.csv' CSV HEADER QUOTE '"' ESCAPE '''';

copy public.products_product (id, name, description, weight, quantity, color, brand, model, price, size, posted_time, product_img1, product_img2, product_img3, product_img4, author_id, product_category_id)
FROM '{{your disk location}}\dataset\products_product.csv' CSV HEADER QUOTE '"' ESCAPE '''';


```





## Start the server

```bash
  python manage.py runserver
```



## Run Web-application Locally


Go to the frontend directory

```bash
  cd userinterface
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng serve
```


## Tech Stack

**Frontend:** 
- Angular
- Angular meterial
- Coreui 
- Rxjs 
- Typescript
- Ng-bootstrap
- Ngx-grid
- Ng-image-slider
- Ng-starrating

**Server:**
- Python
- Django
- Django rest framework
- Djoser


# Floric

Floric is a commerce web application with height security API and single page web application.


## Requirements
- Python 3.9.13
- Node ^12.20.0 || ^14.15.0 || >=16.10.0"
- Angular 13.3.0
- Postgresql


## Clone the project

```bash
  git clone https://taneemul@bitbucket.org/taneemul/floric.git
``` 




## Change in settings 
Create Database 

```bash
  name = floric
  port= 5433
  password = 12345
```

## Configure API  Localy
Go to the project directory

```bash
  cd floric\server
```

Create virtual environment


```bash
  pip install virtualenv
  virtualenv venv
  venv\Scripts\activate
```
Install dependencies


```bash
  pip install -r requirements.txt
```
## Migrations

```bash
  python manage.py migrate
```


## Configure Databse Localy

Load dataset


   - copy this blocks of code  change {{your disk location}} to your disk localtion past it in pgadmin query 


```bash
SELECT setval('users_user_id_seq', (SELECT MAX(id) from "users_user"));
SELECT setval('products_category_id_seq', (SELECT MAX(id) from "products_category"));
SELECT setval('products_product_id_seq', (SELECT MAX(id) from "products_product"));

copy public.users_user (id, last_login, is_superuser, is_staff, is_active, date_joined, first_name, last_name, email, password, image, phone, date_of_birth, gender, city, address)
FROM '{{your disk location}}\dataset\users_user.csv' CSV HEADER QUOTE '"' ESCAPE '''';

copy public.products_category (id, name, cat_img) FROM '{{your disk location}}\dataset\products_category.csv' CSV HEADER QUOTE '"' ESCAPE '''';

copy public.products_product (id, name, description, weight, quantity, color, brand, model, price, size, posted_time, product_img1, product_img2, product_img3, product_img4, author_id, product_category_id)
FROM '{{your disk location}}\dataset\products_product.csv' CSV HEADER QUOTE '"' ESCAPE '''';


```





## Start the server

```bash
  python manage.py runserver
```



## Run Web-application Locally


Go to the frontend directory

```bash
  cd userinterface
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ng serve
```


## Tech Stack

**Frontend:** 
- Angular
- Angular meterial
- Coreui 
- Rxjs 
- Typescript
- Ng-bootstrap
- Ngx-grid
- Ng-image-slider
- Ng-starrating

**Server:**
- Python
- Django
- Django rest framework
- Djoser

