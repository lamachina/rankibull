import React, { useEffect, useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, VStack, Text, Divider, Heading, Image, Stack, CloseButton } from '@chakra-ui/react';

const NFTDrawer = ({ isOpen, onClose, metadata, imageUrl }) => {
    const [metadataContent, setMetadataContent] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (metadata) {
            // Fetch metadata content
            fetch(metadata)
                .then(response => response.json())
                .then(data => setMetadataContent(data))
                .catch(error => console.error('Error fetching metadata:', error));
        }

        // Fetch stats content
        fetch('/stats.json') // Adjust the path accordingly if needed
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));
    }, [metadata]);

    const getRarityInfo = (traitType, value) => {
        if (stats && stats[traitType] && stats[traitType][value]) {
            const rarity = stats[traitType][value];
            return {
                count: rarity.count,
                percentage: rarity.percentage,
                color: getColorByCount(rarity.count)
            };
        }
        return null;
    };

    const getColorByCount = (count) => {
        if (count < 21) {
            return '#e0c3fc';
        } else if (count >= 21 && count < 100) {
            return '#dab6fc';
        } else if (count >= 100 && count < 300) {
            return '#bbadff';
        } else if (count >= 300 && count < 700) {
            return '#9fa0ff';
        } else if (count >= 700 && count < 1000) {
            return '#8187dc';
        } else {
            // Handle other cases as needed
            return '#757bc8'; // Default color
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent display={'flex'} alignItems={'center'} justifyContent={'center'} color={'white'} bg="#000000d6" >
                <DrawerBody display={'flex'} flexDirection={'column'} pb={'1rem'} gap={0}>
                    {metadataContent && (
                        <VStack alignItems="flex-start">
                            <Stack display={'flex'} w={'100%'} alignItems={'center'}>
                                <Heading fontSize='x-large'>{metadataContent.token_id}</Heading>
                                <Image src={imageUrl} boxSize="256px" objectFit="cover" />
                            </Stack>
                            {metadataContent.attributes.map((attribute, index) => (
                                <Stack direction={'row'} bg={'black'} w={'100%'} display={'flex'} justifyContent={'space-between'}>
                                    <Text fontSize={'small'} key={index}>
                                        {attribute.trait_type}
                                    </Text>
                                    <Text fontSize={'small'} fontWeight={'bold'}>
                                        {attribute.value}
                                    </Text>
                                    {getRarityInfo(attribute.trait_type, attribute.value) && (
                                        <Text fontSize={'small'} fontWeight={'bold'} ml={4} color={getRarityInfo(attribute.trait_type, attribute.value).color}>
                                            {getRarityInfo(attribute.trait_type, attribute.value).percentage}%
                                        </Text>
                                    )}
                                </Stack>
                            ))}
                        </VStack>

                    )}
                    <CloseButton w={'100%'} onClick={onClose} variant="solid" >Close</CloseButton>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default NFTDrawer;
