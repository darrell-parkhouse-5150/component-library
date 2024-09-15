-- these schemas are all for the angular apps that I will be creating
create database `angular_components`;
use `angular_components`;

create table `project`(
    `project_id` int(11) primary key auto_increment,
    `creator` varchar(30) not null,
    
)