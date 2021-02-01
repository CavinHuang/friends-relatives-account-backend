/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80004
 Source Host           : localhost:3306
 Source Schema         : friends-relatives-account

 Target Server Type    : MySQL
 Target Server Version : 80004
 File Encoding         : 65001

 Date: 01/02/2021 16:16:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文章标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE,
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `uid` int(11) NOT NULL COMMENT '所属会员ID',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '变化类型：1、进账；2、出账',
  `number` decimal(10, 0) NOT NULL DEFAULT 0 COMMENT '变化的金额',
  `friend` int(11) NOT NULL COMMENT '所属亲友ID',
  `bill_cate` int(11) NOT NULL COMMENT '所属分类ID',
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1612167276990' COMMENT '发生时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES (3, 1, 1, 111, 1, 1, '1611913109000', '', '2021-01-29 17:38:31', '2021-01-29 17:38:31', NULL);
INSERT INTO `bill` VALUES (4, 1, 1, 2222, 1, 1, '1612165748000', '', '2021-02-01 15:49:10', '2021-02-01 15:49:10', NULL);
INSERT INTO `bill` VALUES (5, 1, 1, 2222, 1, 1, '1612165748000', '', '2021-02-01 15:52:25', '2021-02-01 15:52:25', NULL);
INSERT INTO `bill` VALUES (6, 1, 1, 22, 1, 1, '1612165748000', '', '2021-02-01 15:59:09', '2021-02-01 15:59:09', NULL);

-- ----------------------------
-- Table structure for bill_cate
-- ----------------------------
DROP TABLE IF EXISTS `bill_cate`;
CREATE TABLE `bill_cate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `uid` int(11) NOT NULL COMMENT '所属会员ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '分类类型：1、进账；2、出账',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类图标(保留字段)',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '分类描述',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '分类状态：1、启用； 0、停用',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bill_cate
-- ----------------------------
INSERT INTO `bill_cate` VALUES (1, 1, '2', 1, NULL, NULL, 1, '2021-01-29 17:34:07', '2021-01-29 17:34:07', NULL);

-- ----------------------------
-- Table structure for friend_info
-- ----------------------------
DROP TABLE IF EXISTS `friend_info`;
CREATE TABLE `friend_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一id',
  `uid` int(11) NOT NULL COMMENT '所属会员ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '亲友名称',
  `first_word` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '亲友名称首字母',
  `belong` int(11) NOT NULL DEFAULT 0 COMMENT '所属亲友ID',
  `sex` tinyint(4) NOT NULL DEFAULT 3 COMMENT '亲友性别',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '亲友关系备注',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend_info
-- ----------------------------
INSERT INTO `friend_info` VALUES (1, 1, '2', '2', 0, 1, '1', '2021-01-29 17:33:55', '2021-01-29 17:33:55', NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '真实名称',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '密码',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for wechat_user_info
-- ----------------------------
DROP TABLE IF EXISTS `wechat_user_info`;
CREATE TABLE `wechat_user_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '微信方唯一ID',
  `nickName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '昵称',
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '头像',
  `gender` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别',
  `language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '语言',
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '所在国家',
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '所在省',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '所在城市',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wechat_user_info
-- ----------------------------
INSERT INTO `wechat_user_info` VALUES (1, 'ow-i35QFy0IZVSE_WFSqM2Ib6g-I', '独立的法西', 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq1mZDClBxTjUbHOPYtRDzeiareWGDDybJD959mPibI9llfib28O5He3DeVuic83VxTQib2cTsDjHtibcug/132', 1, 'zh_CN', '比利时', '', '', '2021-01-29 17:33:46', '2021-01-29 17:33:46', NULL);

SET FOREIGN_KEY_CHECKS = 1;
