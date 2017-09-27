-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2017 at 09:31 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diplomski`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

CREATE TABLE `korisnici` (
  `id` int(11) NOT NULL,
  `ime` varchar(30) COLLATE utf8_croatian_ci DEFAULT NULL,
  `prezime` varchar(30) COLLATE utf8_croatian_ci DEFAULT NULL,
  `korisnicko_ime` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_croatian_ci NOT NULL,
  `pwd_hash` text COLLATE utf8_croatian_ci NOT NULL,
  `statuts` int(11) NOT NULL DEFAULT '1',
  `role` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `ime`, `prezime`, `korisnicko_ime`, `email`, `pwd_hash`, `statuts`, `role`) VALUES
(6, 'Milica', 'Ninković', '8bitadmin', 'milica.ninkovic95@gmail.com', '$2y$12$IorDSGixsPsuttD9VIc4SuXMni4rZI364/llQSmH/mZ14WXimXDNC', 1, 1),
(7, 'Petar', 'Petrović', 'petar', 'petar@mail.com', '$2y$12$3C8mI91UJZNA9GA5d4H7fusECQM4XXw5HZ78hcIjrPV4BFpYdqOnS', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `kursevi`
--

CREATE TABLE `kursevi` (
  `id` int(11) NOT NULL,
  `naziv` varchar(70) COLLATE utf8_croatian_ci NOT NULL,
  `opis` text COLLATE utf8_croatian_ci,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `kursevi`
--

INSERT INTO `kursevi` (`id`, `naziv`, `opis`, `status`) VALUES
(1, 'HTML', 'HTML (engl. HyperText Markup Language, jezik za označavanje hiperteksta) je opisni jezik specijalno namenjen opisu veb stranica. Pomoću njega se jednostavno mogu odvojiti elementi kao što su naslovi, paragrafi, citati i slično. Pored toga, u HTML standard su ugrađeni elementi koji detaljnije opisuju sam dokument kao što su kratak opis dokumenta, ključne reči, podaci o autoru i slično. Ovi podaci su opštepoznati kao meta podaci i jasno su odvojeni od sadržaja dokumenta. Aktuelna verzija u trenutku pravljenja ovog veb sajta je HTML 5.2 koja je izašla 8. avgusta 2017. godine. U ovom kursu biće objašnjeni elementi HTML-a koji su neophodni za pravljenje vaše prve veb stranice.', 1),
(2, 'CSS', 'CSS (engl. Cascading Style Sheets) je jezik formatiranja pomoću kog se definiše izgled elemenata veb-stranice.\r\nPrvobitno, HTML je služio da definiše kompletan izgled, strukturu i sadržaj veb-stranice, ali je od verzije 4.0 HTML-a uveden CSS koji bi definisao konkretan izgled, dok je HTML ostao u funkciji definisanja strukture i sadržaja. Aktuelna verzija CSS-a u trenutku pisanja ovog sajta je CSS 4, ali je za izradu korišćena verzija 3. Kao što je već rečeno, CSS služi za stilizaciju veb stranice tako da će ovaj kurs biti posvećen bitnim elementima za stilizaciju vaše prve veb strane.', 1),
(3, 'JavaScript', 'JavaScript pomaže klijentskoj strani u interakciji sa web stranicama čije su funkcionalnosti prethodno definisane u Javascript jeziku. Iako je njegov nastanak prvenstveno vezan za programski jezik Java koji je objektno-orijentisan, on nema skoro nikakve veze sa objektno-orijentisanim jezicima. Jedina stvar koju ima zajedničku sa Java programskim jezikom jeste sintaksa koja je nalik programskom jeziku C, odakle su je i nasledili. Ovaj jezik nam omogućava da statičke, odnosno, nepromenljive elemente učinimo dinamičkim, odnosno, promenljivim. Uz pomoć ovog jezika možete napraviti i svoju prvu igricu, ali ćemo se time baviti na nekom drugom kursu. Ovde ćemo objasniti neke od bitnih osnova za pravljenje veb stranica.', 1),
(9, 'Novi test kurs', 'Opis novog test kursa', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lekcije`
--

CREATE TABLE `lekcije` (
  `id` int(11) NOT NULL,
  `id_kursa` int(11) NOT NULL,
  `naziv` varchar(255) COLLATE utf8_croatian_ci NOT NULL,
  `opis` text COLLATE utf8_croatian_ci,
  `primer_koda` text COLLATE utf8_croatian_ci,
  `status` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `lekcije`
--

INSERT INTO `lekcije` (`id`, `id_kursa`, `naziv`, `opis`, `primer_koda`, `status`) VALUES
(2, 1, 'Zaglavlja', 'Zaglavlja predstavljaju naslove na stranici. Postoji 6 tipova poređanih po veličihi. H1 predstavlja najveće zaglavlje, odnosno, zaglavlje sa najvećom veličinom fonta. Svako sledeće je manje. Veličina slova zavisi od samog pretraživača i mi ih možemo menjati u našem CSS fajlu', '<body>\n<h1>Zdravo</h1>\n<h2>Zdravo</h2>\n<h3>Zdravo</h3>\n<h4>Zdravo</h4>\n<h5>Zdravo</h5>\n<h6>Zdravo</h6>\n</body>', 1),
(4, 2, 'Prva lekcija CSS', 'U ovoj lekciji prikazano je kako se zadaje stilizovanje stranice u okviru <style> taga.', '<head>\n<style>\nbody{\nbackground-color:hotpink;\n}\np{\ncolor: green;\n}\n</style>\n</head>\n<body>\n<p> Hello world! </p>\n</body>', 1),
(5, 3, 'Sintaksa JavaScript-a', 'Sintaksa ovog jezika u suštini je ista kao i kod svih ostalih. \nPromenljive se pišu sa prefiksom var, što je skraćeno od varijabla, zatim, sledi znak jednakosti a onda i vrednost koju želimo da dodelimo varijabli.\nKomentari mogu biti jednolinijski i višelinijski. Jednolinijski se pišu sa dvostrukom kosom crtom (//), a višelinijski kao:\n/* ovde\nide\nkomentar */.\nU komentaru može stajati bilo šta, osim drugog komentara.', '<!DOCTYPE html>\n<html>\n<body>\n\n<h2>JavaScript komentari se ne izvršavaju</h2>\n\n<p id="demo"></p>\n\n<script>\nvar x;\nx = 5;\n/* x = 6; Neće me izvršiti*/\ndocument.getElementById("demo").innerHTML = x;\n</script>\n\n</body>\n</html>', 1);

-- --------------------------------------------------------

--
-- Table structure for table `moje_poruke`
--

CREATE TABLE `moje_poruke` (
  `id` int(11) NOT NULL,
  `id_primljene` int(11) NOT NULL,
  `primalac` varchar(60) COLLATE utf8_croatian_ci NOT NULL,
  `poslata` int(11) NOT NULL,
  `dovrsena` int(11) NOT NULL,
  `poruka` text COLLATE utf8_croatian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `moje_poruke`
--

INSERT INTO `moje_poruke` (`id`, `id_primljene`, `primalac`, `poslata`, `dovrsena`, `poruka`) VALUES
(2, 4, 'laki93@hotmail.co.uk', 1, 1, 'Sad dobijaš pravu poruku, malopre je uzimao iz\nsubjecta. Molim te, slikaj mi i pošalji primljenu poruku.\nHvala <3'),
(3, 5, 'Shagon94@gmail.com', 1, 1, 'Poštovani Filipe,\nHvala što učestvujete u testiranju našeg softvera.\nVrlo smo Vam zahvalni na tome, što ćemo iskazati ćevapima\nkod Waltera.\nSrdačan pozdrav,\nMilica Ninković');

-- --------------------------------------------------------

--
-- Table structure for table `posta`
--

CREATE TABLE `posta` (
  `id` int(11) NOT NULL,
  `naslov` text COLLATE utf8_croatian_ci NOT NULL,
  `posiljalac` text COLLATE utf8_croatian_ci NOT NULL,
  `posiljalac_ime` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  `posiljalac_prezime` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  `procitana` int(11) NOT NULL DEFAULT '0',
  `poruka` text COLLATE utf8_croatian_ci NOT NULL,
  `odgovoreno` int(11) NOT NULL DEFAULT '0',
  `datum` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) COLLATE utf8_croatian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `naziv`) VALUES
(1, 'Admin'),
(2, 'Moderator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnici`
--
ALTER TABLE `korisnici`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `korisnicko_ime` (`korisnicko_ime`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `korisnicko_ime_2` (`korisnicko_ime`);

--
-- Indexes for table `kursevi`
--
ALTER TABLE `kursevi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lekcije`
--
ALTER TABLE `lekcije`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `moje_poruke`
--
ALTER TABLE `moje_poruke`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posta`
--
ALTER TABLE `posta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `korisnici`
--
ALTER TABLE `korisnici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `kursevi`
--
ALTER TABLE `kursevi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `lekcije`
--
ALTER TABLE `lekcije`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `moje_poruke`
--
ALTER TABLE `moje_poruke`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `posta`
--
ALTER TABLE `posta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
