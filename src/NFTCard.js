import React from 'react';
import { Image, Box } from '@chakra-ui/react';

const NFTCard = ({ imageUrl, onClick }) => {
    return (
        <Box onClick={onClick} cursor="pointer">
            <Image src={imageUrl} boxSize="72px" objectFit="cover" />
        </Box>
    );
};

export default NFTCard;
