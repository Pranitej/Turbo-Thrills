
--
-- Database: `caronxdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `userName` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`userName`)
) ;



--
-- Table structure for table `bank`
--

CREATE TABLE IF NOT EXISTS `bank` (
  `accNumber` varchar(20) NOT NULL,
  `fullName` varchar(60) DEFAULT NULL,
  `contactAddress` varchar(300) DEFAULT NULL,
  `zipCode` varchar(8) DEFAULT NULL,
  `contactNumber` varchar(15) DEFAULT NULL,
  `cardType` varchar(50) DEFAULT NULL,
  `cardNumber` varchar(20) DEFAULT NULL,
  `expiryDate` varchar(10) DEFAULT NULL,
  `cvvNumber` varchar(5) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  PRIMARY KEY (`account_number`)
);

--
-- Table structure for table `customers`
--


CREATE TABLE IF NOT EXISTS `customers` (
  `customerId` bigint(20) NOT NULL AUTO_INCREMENT,
  `registerDate` date,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `contactAddress` varchar(200) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `contactMobile` varchar(15) DEFAULT NULL,
  `emailId` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customerId`)
)


--
-- Table structure for table `cars`
--

CREATE TABLE IF NOT EXISTS `cars` (
  `carId` bigint(20) NOT NULL AUTO_INCREMENT,
   `customerId` bigint,
   `postDate` date,
  `carType` varchar(20) not null,
  `company` varchar(100) DEFAULT NULL,
  `modelName` varchar(100) DEFAULT NULL,
  `yearModel` int(11) DEFAULT NULL,
  `fuelType` varchar(50) DEFAULT NULL,
  `carDescription` varchar(300) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `carImage1` varchar(150) DEFAULT NULL,
  `carImage2` varchar(150) DEFAULT NULL,
  `carImage3` varchar(150) DEFAULT NULL,
  `available` varchar(50) DEFAULT NULL,
  foreign KEY (`customerId`) references customers(`customerId`)
)  ;


--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `feedbackId` int(11) NOT NULL AUTO_INCREMENT,
  `feedbackDate` date DEFAULT NULL,
  `customerId` bigint(20) DEFAULT NULL,
  `carId` bigint(20) DEFAULT NULL,
  `review` varchar(300) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`fid`),
  foreign KEY (`customerId`) references customers(`customerId`),
  foreign KEY (`carId`) references customers(`carId`)
) 

-- --------------------------------------------------------

--
-- Table structure for table `carSales`
--

CREATE TABLE IF NOT EXISTS `carSales` (
  `saleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `transactionDate` date DEFAULT NULL,
  `carId` bigint(20) DEFAULT NULL,
  `customerId` bigint(20) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `cardNumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`saleId`),
  foreign KEY (`customerId`) references customers(`customerId`),
  foreign KEY (`carId`) references customers(`carId`)
) 


--
-- Table structure for table `transactions`
--

CREATE TABLE IF NOT EXISTS `bankTransactions` (
  `transactionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `transactionDate` datetime DEFAULT NULL,
  `Fromaccount` varchar(20) DEFAULT NULL,
  `Toaccount` varchar(20) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  PRIMARY KEY (`transactionId`)
) ;

--
-- Dumping data for table `transactions`
--
