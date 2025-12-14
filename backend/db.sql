-- 0. 创建并使用数据库
CREATE DATABASE IF NOT EXISTS `ordering_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ordering_db`;

-- 1. 用户表
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(64) NOT NULL COMMENT '微信OpenID',
  `nickname` varchar(64) DEFAULT NULL COMMENT '昵称',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 菜品分类表
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL COMMENT '分类名称',
  `sort` int DEFAULT '0' COMMENT '排序优先级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 菜品表
CREATE TABLE `dishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL COMMENT '分类ID',
  `name` varchar(64) NOT NULL COMMENT '菜品名称',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `image` varchar(255) DEFAULT NULL COMMENT '图片URL',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `status` tinyint DEFAULT '1' COMMENT '1:上架 0:下架',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. 订单表
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL COMMENT '总金额',
  `status` tinyint DEFAULT '0' COMMENT '0:待支付 1:制作中 2:已完成',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. 订单详情表
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `dish_id` int NOT NULL,
  `count` int NOT NULL COMMENT '数量',
  `price` decimal(10,2) NOT NULL COMMENT '下单时的单价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入一些测试数据
INSERT INTO `categories` (`name`, `sort`) VALUES ('热销推荐', 1), ('主食', 2), ('饮料', 3);
INSERT INTO `dishes` (`category_id`, `name`, `price`, `image`) VALUES 
(1, '招牌红烧肉', 38.00, 'http://dummyimage.com/200x200'),
(2, '扬州炒饭', 18.00, 'http://dummyimage.com/200x200'),
(3, '冰镇可乐', 5.00, 'http://dummyimage.com/200x200');
