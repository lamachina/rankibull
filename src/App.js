import React, { useState } from 'react';
import { Button, Flex, Heading, Select } from '@chakra-ui/react';
import NFTCard from './NFTCard';
import NFTDrawer from './NFTDrawer';

const App = () => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <Flex flexDirection="column" alignItems="center" p={"1rem"} bg={'black'} color={'white'}>
      <Heading p={"1rem"}>+BULLRUN</Heading>
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

export default App;
