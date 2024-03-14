import React, { useState, useEffect } from 'react';
import { Button, Flex, Heading, Select } from '@chakra-ui/react';
import NFTCard from './NFTCard';
import NFTDrawer from './NFTDrawer'; // Import the NFTDrawer component

const Cat3 = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemNumbers, setItemNumbers] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const itemsPerPage = 50; // Number of items to display per page

    useEffect(() => {
        // Fetch the data from ranking_cat_1.json
        fetch('ranking_cat_3.json')
            .then(response => response.json())
            .then(data => {
                // Extract item numbers from the data
                const numbers = Object.keys(data);
                setItemNumbers(numbers);
            })
            .catch(error => console.error('Error fetching item numbers:', error));
    }, []);

    // Pagination logic
    const totalItems = itemNumbers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNFTClick = (nftId) => {
        setSelectedNFT(nftId);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <Flex flexDirection="column" alignItems="center" p={"1rem"} bg={'black'} color={'white'}>
            <Heading p={"1rem"}>Statistiques</Heading>

            <Flex flexWrap="wrap" justifyContent="center" gap={"1rem"}>
                {itemNumbers.slice(startIndex, endIndex).map((itemNumber, index) => (
                    <NFTCard
                        key={startIndex + index}
                        imageUrl={`/images/${itemNumber}.png`} // Adjust the path as needed
                        onClick={() => handleNFTClick(itemNumber)} // Pass item number to handleNFTClick
                    />
                ))}
            </Flex>

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

            {/* Render the NFTDrawer component */}
            <NFTDrawer
                isOpen={drawerOpen}
                onClose={handleCloseDrawer}
                metadata={selectedNFT ? `/metadata/${selectedNFT}.json` : null}
                imageUrl={selectedNFT ? `/images/${selectedNFT}.png` : null}
            />
        </Flex>
    );
};

export default Cat3;
