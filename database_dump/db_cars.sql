-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  ven. 14 déc. 2018 à 22:36
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `db_cars`
--
CREATE DATABASE IF NOT EXISTS `db_cars` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_cars`;

-- --------------------------------------------------------

--
-- Structure de la table `offers`
--

CREATE TABLE `offers` (
  `reference` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `gaz` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `publish_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offers`
--

INSERT INTO `offers` (`reference`, `name`, `model`, `gaz`, `date`, `publish_date`) VALUES
('7', 'ferrari', 'spider', 'essence', '2019', '03/08/2019'),
('10', 'Volkswagen', 'Passat', 'gazoil', '2017', '12/08/2018');

-- --------------------------------------------------------

--
-- Structure de la table `tokens`
--

CREATE TABLE `tokens` (
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tokens`
--

INSERT INTO `tokens` (`token`) VALUES
('token1');

COMMIT;