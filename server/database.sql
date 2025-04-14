create database musicservice;
use musicservice;

drop table user;
create table user(
	id int primary key auto_increment,
    name varchar(50),
    email varchar(50),
    password varchar(50)
);

create table playlist(
	songId int references song(songId)
);

alter table farhanakhtarlibrary 
	modify name varchar(100),
    modify artist_name varchar(100),
    modify album_name varchar(100),
    modify album_image varchar(200),
    modify audio varchar(200);

create table song(
    songId int primary key,
	name varchar(50),
    artist varchar(50),
    album varchar(50),
    genre varchar(50)
);

insert into user(name, email, password) values(
	'Farhan', 'farhan97parvez@gmail.com', '123456'
);

delete from farhanakhtarlibrary where name = '' and artist_name = '' and album_name = '' and album_image = '' and audio = '';
