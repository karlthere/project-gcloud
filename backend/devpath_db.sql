-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2025 at 12:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devpath_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `difficulty` varchar(100) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `github_link` text DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `references` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `user_id`, `title`, `category`, `difficulty`, `tags`, `image_url`, `github_link`, `status`, `description`, `references`) VALUES
(3, 1, 'Project', 'Fullstack', 'Menengah', 'html, css', 'https://i.pinimg.com/736x/e9/04/0c/e9040cb01fbc5f5d0de4c40725b255a7.jpg', '', 'On-Going', 'html', 'ff'),
(4, 2, 'kalkulator', 'Backend', 'Mudah', 'html, css, js', 'https://i.pinimg.com/736x/e9/04/0c/e9040cb01fbc5f5d0de4c40725b255a7.jpg', '', 'Belum dikerjakan', '', ''),
(5, 2, 'portofolio pribadi', 'Frontend', 'Mudah', 'html, css, js, tailwind', 'https://i.pinimg.com/736x/e9/04/0c/e9040cb01fbc5f5d0de4c40725b255a7.jpg', '', 'On-Going', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(1, 'tryman@gmail.com', 'tryman', '$2b$10$Gdh8CCf8KSJbx1vxPwasU.ubyqDsPG3.GL77fZ0ICQe/BzbXCsIX6'),
(2, 'lalaken@gmail.com', 'lalaken', '$2b$10$BPBvzFk3xUcJvQ5ZFOoQX.MVc8czUVUdYcwwyLHydzaNOVD6X2ZlK');

--
-- Indexes for dumped tables
--

CREATE TABLE 'notes' (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO 'notes' (`id`, `user_id`, `project_id`, `notes`) VALUES
(1, 1, 3, 'ini adalah catatan pertama'),
(2, 2, 4, 'ini adalah catatan kedua'),
(3, 2, 5, 'ini adalah catatan ketiga');
--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
