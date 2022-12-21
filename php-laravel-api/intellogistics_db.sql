-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2022 at 06:01 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intellogistics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `waybill_no` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `driver_note` varchar(255) DEFAULT NULL,
  `branch_note` varchar(255) DEFAULT NULL,
  `start_location` text DEFAULT NULL,
  `dest_location` varchar(255) DEFAULT NULL,
  `driver_id` varchar(255) DEFAULT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `driver_cell` varchar(255) DEFAULT NULL,
  `driver_alt_cell` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customers_details`
--

CREATE TABLE `customers_details` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `names` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `billing_type` varchar(255) DEFAULT NULL,
  `accept_terms` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `api_key` varchar(255) DEFAULT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers_details`
--

INSERT INTO `customers_details` (`id`, `user_id`, `username`, `password`, `names`, `surname`, `phone_no`, `user_email`, `billing_type`, `accept_terms`, `user_type`, `api_key`, `serviceProviderID`, `date_created`, `date_modified`) VALUES
(1, 'ephraim_01', 'ephraim_01', '$2y$10$8gK29R1Hbbg84FvPVoz9G.0LlvYizoy8lQqAww7IqvjaaQGwTrx0C', 'Ephraim Kgwele', 'Kgwele', '0608667709', 'mekgwele@gmail.com', '', '', '', 'RXJFOE8wMUFwOGtWRktHZTk2cDdiUEJlcGYwTXFsWWlpSVE3RWNNSQ==', 'skynet_12', '2022-09-18 14:41:48', '2022-09-18 14:43:28');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `driver_id` varchar(255) DEFAULT NULL,
  `full_names` varchar(255) DEFAULT NULL,
  `licence_no` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `email_addr` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `alt_no` varchar(255) DEFAULT NULL,
  `driver_address` varchar(255) DEFAULT NULL,
  `driver_city` varchar(255) DEFAULT NULL,
  `driver_country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `vehicle_name` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `vehicle_year` varchar(255) DEFAULT NULL,
  `vehicle_plate` varchar(255) DEFAULT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`id`, `driver_id`, `full_names`, `licence_no`, `route`, `email_addr`, `phone_no`, `alt_no`, `driver_address`, `driver_city`, `driver_country`, `postal_code`, `vehicle_name`, `vehicle_model`, `vehicle_year`, `vehicle_plate`, `date_created`, `date_modified`) VALUES
(1, '1289765', 'Jeremy Clarkson', '721625136153', 'Stubens Valley', 'clarkson@mail.com', '0987654321', '0123456789', 'Saddle rock complex', 'Joburg', 'RSA', '1724', 'BMW', '320i', '2009', 'YWJ 635 L', '2022-09-18 10:05:53', '2022-09-18 10:05:53');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `waybill_no` varchar(255) DEFAULT NULL,
  `invoice_no` varchar(255) DEFAULT NULL,
  `customer_id` varchar(255) DEFAULT NULL,
  `invoice_amount` varchar(255) DEFAULT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `date_modified` datetime NOT NULL,
  `date_created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `waybill_no`, `invoice_no`, `customer_id`, `invoice_amount`, `serviceProviderID`, `date_modified`, `date_created`) VALUES
(1, 'UT-642897', '0001', 'ephraim_01', '120', 'courier_guy_12', '2022-09-18 17:03:32', '2022-09-18 17:03:32');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `waybill` varchar(255) DEFAULT NULL,
  `package_type` varchar(255) DEFAULT NULL,
  `package_desc` varchar(255) DEFAULT NULL,
  `length` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `width` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `package_tracking`
--

CREATE TABLE `package_tracking` (
  `id` int(11) NOT NULL,
  `waybill_no` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `qoute_details`
--

CREATE TABLE `qoute_details` (
  `id` int(11) NOT NULL,
  `qoute_id` varchar(255) NOT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `driver_id` varchar(255) DEFAULT NULL,
  `cust_name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `cellphone` varchar(255) DEFAULT NULL,
  `email_addr` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `receiver_phone` varchar(255) DEFAULT NULL,
  `receiver_email` varchar(255) DEFAULT NULL,
  `receiver_company` varchar(255) DEFAULT NULL,
  `destination_address` varchar(255) DEFAULT NULL,
  `pickup_address` varchar(255) DEFAULT NULL,
  `collection_branch` varchar(255) DEFAULT NULL,
  `destination_branch` varchar(255) DEFAULT NULL,
  `collection_distance` varchar(255) DEFAULT NULL,
  `destination_distance` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `receival_method` varchar(255) DEFAULT NULL,
  `final_price` varchar(255) DEFAULT NULL,
  `vat_price` varchar(255) DEFAULT NULL,
  `mincharge_price` varchar(255) DEFAULT NULL,
  `per_kg_price` varchar(255) DEFAULT NULL,
  `fuel_price` varchar(255) DEFAULT NULL,
  `pickup_postal_code` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `delivery_status` varchar(255) DEFAULT NULL,
  `delivery_note` varchar(255) DEFAULT NULL,
  `signed_by` varchar(255) DEFAULT NULL,
  `signed_on` date DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `cust_login_id` varchar(255) DEFAULT NULL,
  `admin_weight` varchar(255) DEFAULT NULL,
  `admin_height` varchar(255) DEFAULT NULL,
  `admin_length` varchar(255) DEFAULT NULL,
  `admin_width` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `qoute_details`
--

INSERT INTO `qoute_details` (`id`, `qoute_id`, `serviceProviderID`, `driver_id`, `cust_name`, `surname`, `cellphone`, `email_addr`, `company_name`, `receiver_name`, `receiver_phone`, `receiver_email`, `receiver_company`, `destination_address`, `pickup_address`, `collection_branch`, `destination_branch`, `collection_distance`, `destination_distance`, `service_type`, `receival_method`, `final_price`, `vat_price`, `mincharge_price`, `per_kg_price`, `fuel_price`, `pickup_postal_code`, `branch`, `status`, `delivery_status`, `delivery_note`, `signed_by`, `signed_on`, `payment_status`, `note`, `cust_login_id`, `admin_weight`, `admin_height`, `admin_length`, `admin_width`, `date_created`, `date_modified`) VALUES
(1, 'ZP-704434', 'courier_guy_12', NULL, 'malose ephraim', 'Kgwele', ' 27845492300', 'mekgwele@gmail.com', '', 'Nathi', 'Kev', 'pharragetech@gmail.com', 'Pharrage', ' Limpopo', ' Gauteng', ' ', ' ', NULL, NULL, 'overnight', '', '265', '15', '100', '0', '150', '', 'undefined', '00', 'pending', NULL, NULL, NULL, 'pending', 'Be careful please', 'null', '12', '34', '34', '12', '2022-09-18 14:22:13', '2022-09-18 14:22:13'),
(2, 'RI-346147', 'courier_guy_12', NULL, 'malose ephraim', 'Kgwele', ' 27845492300', 'mekgwele@gmail.com', '', 'Nathi', '01223', 'pharragetech@gmail.com', 'pharrage', ' Gauteng', ' Gauteng', ' ', ' ', NULL, NULL, 'overnight', '', '265', '15', '100', '0', '150', '', 'undefined', '00', 'pending', NULL, NULL, NULL, 'pending', 'Be careful please', 'null', '12', '12', '12', '12', '2022-09-18 14:29:12', '2022-09-18 14:29:12'),
(3, 'HS-56767', NULL, NULL, 'Ephraim Malose', 'Kgwele', '08376463734', 'mekgwele@gmail.com', 'Pharrage', NULL, NULL, NULL, NULL, 'Saddle rock complex', 'Aglet', NULL, NULL, NULL, NULL, 'Economy', 'pickup', '156', '25', '25', '0', '67', '1726', 'kempton park', '0', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, '2022-09-18 14:31:33', '2022-09-18 14:31:33'),
(5, 'YE-961679', 'courier_guy_12', NULL, 'malose ephraim', 'Kgwele', ' 27845492300', 'mekgwele@gmail.com', '', 'Nathi', '01223', 'pharragetech@gmail.com', 'pharrage', ' Gauteng', ' Gauteng', ' ', ' ', NULL, NULL, 'overnight', '', '265', '15', '100', '0', '150', '', 'undefined', '00', 'pickup', NULL, NULL, NULL, 'pending', 'Be careful please', 'null', '12', '12', '12', '12', '2022-09-18 14:35:05', '2022-09-18 15:16:25'),
(6, 'UT-642897', 'courier_guy_12', NULL, 'malose ephraim', 'Kgwele', ' 27845492300', 'mekgwele@gmail.com', '', 'Nathi', '012345', 'pharragetech@gmail.com', 'pharrage', ' Gauteng', ' Gauteng', ' ', ' ', NULL, NULL, 'overnight', '', '265', '15', '100', '0', '150', '', 'undefined', '00', 'delivered', 'Delivered safely', 'H', '2022-08-12', 'pending', 'Be careful please', 'ephraim_01', '12', '12', '12', '23', '2022-09-18 14:49:20', '2022-09-18 15:31:14'),
(7, 'LD-493423', 'dsv_1', NULL, 'malose ephraim', 'Kgwele', ' 27845492300', 'mekgwele@gmail.com', '', 'Nathi', '012345678', 'pharragetech@gmail.com', 'Pharrage', ' MK', ' sa', ' ', ' ', NULL, NULL, 'overnight', '', '252', '12', '80', '0', '160', '', 'undefined', '00', 'pending', NULL, NULL, NULL, 'pending', 'Be careful please', 'ephraim_01', '1', '13', '121', '121', '2022-09-18 15:59:50', '2022-09-18 15:59:50');

-- --------------------------------------------------------

--
-- Table structure for table `rates_additional`
--

CREATE TABLE `rates_additional` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `rates_local`
--

CREATE TABLE `rates_local` (
  `id` int(11) NOT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `volumetric_weight` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `fuel_levy` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL,
  `min_rate` varchar(255) DEFAULT NULL,
  `weight_after_max` varchar(255) DEFAULT NULL,
  `rate_after_min` varchar(255) DEFAULT NULL,
  `max_kg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rates_local`
--

INSERT INTO `rates_local` (`id`, `service_id`, `service_name`, `serviceProviderID`, `volumetric_weight`, `vat`, `fuel_levy`, `service_type`, `service_desc`, `min_rate`, `weight_after_max`, `rate_after_min`, `max_kg`) VALUES
(1, 'overnight', 'Overnight', 'courier_guy_12', '4000', '15', '100', 'overnight', 'We deliver the next day', '100', '5', '10', '60'),
(2, 'overnight', 'Overnight', 'dsv_1', '4000', '15', '200', 'overnight', 'We deliver the next day', '80', '5', '10', '60'),
(3, 'overnight', 'Overnight', 'skynet_12', '4000', '15', '150', 'overnight', 'We deliver the next day', '110', '5', '10', '60'),
(4, 'express', 'Express', 'skynet_12', '4000', '15', '150', 'express', 'We deliver the next day', '210', '2', '12', '60');

-- --------------------------------------------------------

--
-- Table structure for table `rates_main`
--

CREATE TABLE `rates_main` (
  `id` int(11) NOT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `volumetric_weight` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `fuel_levy` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL,
  `min_rate` varchar(255) DEFAULT NULL,
  `weight_after_max` varchar(255) DEFAULT NULL,
  `rate_after_min` varchar(255) DEFAULT NULL,
  `max_kg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rates_main`
--

INSERT INTO `rates_main` (`id`, `service_id`, `service_name`, `serviceProviderID`, `volumetric_weight`, `vat`, `fuel_levy`, `service_type`, `service_desc`, `min_rate`, `weight_after_max`, `rate_after_min`, `max_kg`) VALUES
(1, 'overnight', 'Overnight', 'courier_guy_12', '5000', '15', '200', 'overnight', 'We deliver the next day', '120', '10', '2', NULL),
(2, 'normal_delivery', 'Normal Delivery', 'courier_guy_12', '5000', '15', '120', 'normal_delivery', 'Delivery in 2 - 5 Days', '80', '2', '5', '40'),
(3, 'overnight', 'Overnight', 'skynet_12', '5000', '15', '210', 'overnight', 'We deliver the next day', '120', '10', '2', NULL),
(4, 'normal_delivery', 'Normal Delivery', 'skynet_12', '5000', '15', '150', 'normal_delivery', 'Delivery in 2 - 5 Days', '80', '2', '5', '40'),
(5, 'overnight', 'Overnight', 'dsv_1', '5000', '15', '180', 'overnight', 'We deliver the next day', '120', '10', '2', NULL),
(6, 'normal_delivery', 'Normal Delivery', 'dsv_1', '5000', '15', '80', 'normal_delivery', 'Delivery in 2 - 5 Days', '80', '2', '5', '40');

-- --------------------------------------------------------

--
-- Table structure for table `services_local`
--

CREATE TABLE `services_local` (
  `id` int(11) NOT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services_local`
--

INSERT INTO `services_local` (`id`, `service_id`, `service_name`, `service_desc`, `date_created`, `date_modified`) VALUES
(1, 'overnight', 'Overnight', 'Delivery the next day', '2022-09-18 14:03:34', '2022-09-18 14:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `services_main`
--

CREATE TABLE `services_main` (
  `id` int(11) NOT NULL,
  `service_id` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `service_desc` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services_main`
--

INSERT INTO `services_main` (`id`, `service_id`, `service_name`, `service_desc`, `date_created`, `date_modified`) VALUES
(1, 'overnight', 'Overnight', 'Delivery the next day', '2022-09-18 14:05:40', '2022-09-18 14:05:40'),
(2, 'normal_delivery', 'Normal Delivery', 'Delivery within 2 - 5 days week days', '2022-09-18 14:05:40', '2022-09-18 14:05:40');

-- --------------------------------------------------------

--
-- Table structure for table `service_providers`
--

CREATE TABLE `service_providers` (
  `id` int(11) NOT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `date_created` varchar(255) DEFAULT NULL,
  `date_modified` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service_providers`
--

INSERT INTO `service_providers` (`id`, `serviceProviderID`, `company_name`, `company_logo`, `contact_no`, `email_address`, `date_created`, `date_modified`) VALUES
(1, 'skynet_12', 'Skynet', 'https://skynet.co.za/wp-content/uploads/2019/10/SkyNet-copy-260.png', '0123456789', 'Skynet@mail.com', NULL, NULL),
(2, 'courier_guy_12', 'Courier Guy', 'https://www.thecourierguy.co.za/wp-content/uploads/2022/02/TCG_Logo_RGB-1.png', '0928417384', 'info@courierguy.co.za', NULL, NULL),
(4, 'dsv_1', 'DSV', 'https://dsv-media-premium.azureedge.net/~/media/COM/Images/Standard/Header-logo.png?h=50&la=en&w=324&revision=67787f21-815d-4a29-9db7-5e198d5ac245', '0198417384', 'info@dsv.co.za', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(255) DEFAULT NULL,
  `admin_names` varchar(255) DEFAULT NULL,
  `admin_cell` varchar(255) DEFAULT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `serviceProviderID` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `admin_id`, `admin_names`, `admin_cell`, `admin_email`, `username`, `password`, `serviceProviderID`, `date_created`, `date_modified`) VALUES
(1, 'phar_2345678', NULL, NULL, NULL, 'pharragetech@gmail.com', '$2y$10$t5mOAhUv8T1N5uTsslq/b.bhh/kZmhVYofutgCNh1Y1ECqPKQyoEK', NULL, '2022-09-18 10:00:30', '2022-09-18 10:00:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers_details`
--
ALTER TABLE `customers_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package_tracking`
--
ALTER TABLE `package_tracking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qoute_details`
--
ALTER TABLE `qoute_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `qoute_id` (`qoute_id`);

--
-- Indexes for table `rates_additional`
--
ALTER TABLE `rates_additional`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rates_local`
--
ALTER TABLE `rates_local`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rates_main`
--
ALTER TABLE `rates_main`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_local`
--
ALTER TABLE `services_local`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services_main`
--
ALTER TABLE `services_main`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_providers`
--
ALTER TABLE `service_providers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serviceProviderID` (`serviceProviderID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers_details`
--
ALTER TABLE `customers_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `package_tracking`
--
ALTER TABLE `package_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qoute_details`
--
ALTER TABLE `qoute_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rates_additional`
--
ALTER TABLE `rates_additional`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rates_local`
--
ALTER TABLE `rates_local`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rates_main`
--
ALTER TABLE `rates_main`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `services_local`
--
ALTER TABLE `services_local`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services_main`
--
ALTER TABLE `services_main`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `service_providers`
--
ALTER TABLE `service_providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
