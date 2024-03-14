import React, { useEffect, useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack, Text, Divider, Heading, Image, Stack, CloseButton, Center } from '@chakra-ui/react';

const NFTDrawer = ({ isOpen, onClose, metadata, imageUrl }) => {
    const [metadataContent, setMetadataContent] = useState(null);
    const [stats, setStats] = useState(null);
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        if (metadata) {
            fetch(metadata)
                .then(response => response.json())
                .then(data => setMetadataContent(data))
                .catch(error => console.error('Error fetching metadata:', error));
        }

        fetch('/stats.json')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));


    }, [metadata]);

    useEffect(() => {
        if (metadataContent && metadataContent.token_id) {
            fetch('/final_items.json')
                .then(response => response.json())
                .then(data => {
                    if (data[metadataContent.token_id]) {
                        setItemInfo(data[metadataContent.token_id]);
                    }
                })
                .catch(error => console.error('Error fetching item info:', error));
        }
    }, [metadataContent]);


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
            return '#757bc8'; // Default color
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
            <DrawerOverlay />
            <DrawerContent color={'white'} bg="#000000d6" maxH="90vh" overflowY="auto">
                <DrawerBody display={'flex'} flexDirection={'column'} p={"1rem"} gap={0}>
                    {metadataContent && (
                        <VStack alignItems="flex-start" w="100%" spacing={4} p={4}>
                            <Stack display={'flex'} w={'100%'} alignItems={'center'}>
                                <Heading fontSize='x-large'>{metadataContent.token_id}</Heading>
                                <Image src={imageUrl} boxSize="256px" objectFit="cover" />

                                {itemInfo && (
                                    <Center direction={'row'} gap={'1rem'}>
                                        <Heading>#{10000 - itemInfo.global}</Heading>
                                        {/*  <Text>(#{ itemInfo.catrank} in category)</Text> */}
                                    </Center>

                                )}
                            </Stack>
                            {metadataContent.attributes.map((attribute, index) => (
                                <Stack direction={'row'} bg={'black'} w={'100%'} display={'flex'} justifyContent={'space-between'} key={index}>
                                    <Text fontSize={'small'}>
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
                    <CloseButton onClick={onClose} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default NFTDrawer;
