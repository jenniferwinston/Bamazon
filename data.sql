CREATE TABLE `products` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `departmentName` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `stockQuantity` int(11) NOT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
