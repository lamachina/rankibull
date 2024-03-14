import React, { useEffect, useState } from 'react';
import { Button, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Select, useDisclosure } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NFTCard from './NFTCard';
import NFTDrawer from './NFTDrawer';
import StatsDisplay from './StatsDisplay ';
import Cat1 from './Cat1';
import Cat2 from './Cat2';
import Cat3 from './Cat3';
import Cat4 from './Cat4';
import Cat5 from './Cat5';

const Home = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState(null); // State to hold the stats data
  useEffect(() => {
    fetch('/stats.json')
      .then(response => response.json())
      .then(data => {
        setStats(data);
        console.log(data); // Log the fetched data
      })
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  const handleNFTClick = (nftId) => {
    setSelectedNFT(nftId);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const nftImagesPerPage = 100;
  const totalPages = Math.ceil(10000 / nftImagesPerPage);
  const startIndex = (currentPage - 1) * nftImagesPerPage;
  const endIndex = Math.min(startIndex + nftImagesPerPage, 10000);

  const nftImages = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSelectPage = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };

  const handleTraitClick = (traitType, traitValue) => {
    console.log("test");
    // Handle filtering and displaying images based on the clicked trait
    // You can implement this logic according to your requirements
  };

  return (
    <Flex flexDirection="column" alignItems="center" p={"1rem"} bg={'black'} color={'white'}>
      <Heading p={"1rem"}>+BULLRUN</Heading>
      <StatsDisplay stats={stats} onTraitClick={handleTraitClick} />
      <Flex mt={5}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Page précédente
        </Button>
        <Select ml={2} value={currentPage} onChange={(e) => setCurrentPage(parseInt(e.target.value))}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </Select>
        <Button ml={2} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Page suivante
        </Button>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="center" gap={"1rem"}>
        {nftImages.map((nftId) => (
          <NFTCard
            key={nftId}
            imageUrl={`/images/${nftId}.png`} // adjust path as needed
            onClick={() => handleNFTClick(nftId)}
          />
        ))}
      </Flex>
      <Flex mt={5}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Select ml={2} value={currentPage} onChange={handleSelectPage}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </Select>
        <Button ml={2} onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </Flex>
      <NFTDrawer isOpen={drawerOpen} onClose={handleCloseDrawer} metadata={selectedNFT ? `/metadata/${selectedNFT}.json` : null} imageUrl={selectedNFT ? `/images/${selectedNFT}.png` : null} />
    </Flex>
  );
};

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>
        Open
      </Button>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent display={'flex'} alignItems={'center'} justifyContent={'center'} h={'100%'} color={'black'} bg="#ffffffd6" gap={"1rem"}>
          <DrawerBody display={'flex'} flexDirection={'column'} gap={"1rem"}>
            <Link to="/">Accueil</Link>
            <Link to="/1">full</Link>
            <Link to="/2">almost full</Link>
            <Link to="/3">average</Link>
            <Link to="/4">few</Link>
            <Link to="/5">very few</Link>
          </DrawerBody>
          <CloseButton onClick={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  )
}


const App = () => (
  <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1" element={<Cat1 />} />
        <Route path="/2" element={<Cat2 />} />
        <Route path="/3" element={<Cat3 />} />
        <Route path="/4" element={<Cat4 />} />
        <Route path="/5" element={<Cat5 />} />
      </Routes>
    </div>
  </Router>
);

export default App;
