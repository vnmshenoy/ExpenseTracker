 "# ExpenseTracker" 
 1)bower install ionic-datepicker --save
 2)genymotion
 3)android 23
4)http://stackoverflow.com/questions/32456701/ionic-how-to-set-ion-scroll-height-so-that-it-automatically-adjusts-in-all-r

5)CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key,  category_id integer, category_name text);

CREATE TABLE tblCategoryItems (id integer primary key, category_item_id integer,category_id integer, category_item_name text,category_item_price integer,category_item_date string)

INSERT INTO tblCategories (category_Id, category_name) VALUES (1,"Coles");
INSERT INTO tblCategories (category_Id, category_name) VALUES (2,"IS");

select * from tblCategories;
INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_date) VALUES (?,?,?,?,?);
INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_date) VALUES (?,?,?,?,?)

INSERT INTO tblCategoryItems (category_id, category_item_id,category_item_name,category_item_price,category_item_date) VALUES (1,1,"Apple",23,"25/02/2015");


how to install sqlite on mobile with app

