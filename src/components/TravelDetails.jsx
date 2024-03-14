import React, { useState } from 'react';
import {
    Box,
    Input,
    Button,
    VStack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    Flex,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './Navbar';
import TravelTable from './TravelTable';
import bgImage from "../images/travel.png"

const TravelDetails = () => {
    const [tripName, setTripName] = useState('');
    const [arrival, setArrival] = useState('');
    const [destination, setDestination] = useState('');
    const [tripDetails, setTripDetails] = useState([{ date: '', placesCovered: [{ placeName: '' }] }]);
    const [error, setError] = useState('');
    const toast = useToast();

    const handleDateChange = (index, value) => {
        const updatedDetails = [...tripDetails];
        updatedDetails[index].date = value;
        setTripDetails(updatedDetails);
    };

    const handleAddPlace = (index) => {
        const updatedDetails = [...tripDetails];
        updatedDetails[index].placesCovered.push({ placeName: '' });
        setTripDetails(updatedDetails);
    };

    const handlePlaceChange = (dateIndex, placeIndex, value) => {
        const updatedDetails = [...tripDetails];
        updatedDetails[dateIndex].placesCovered[placeIndex].placeName = value;
        setTripDetails(updatedDetails);
    };

    const handleAddDate = () => {
        setTripDetails([...tripDetails, { date: '', placesCovered: [{ placeName: '' }] }]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check for empty place names
        const isEmptyPlace = tripDetails.some((detail) =>
            detail.placesCovered.some((place) => place.placeName.trim() === '')
        );

        if (isEmptyPlace) {
            toast({
                title: 'Error creating trip',
                description: 'Place names cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setError('Place names cannot be empty');
            return;
        }

        try {
            const response = await axios.post('https://travelbudget.onrender.com/api/v1/traveldetail', {
                tripName,
                arrival,
                destination,
                tripDetails,
            });

            if (response.data) {
                toast({
                    title: 'Trip created successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Reset form values
                setTripName('');
                setArrival('');
                setDestination('');
                setTripDetails([{ date: '', placesCovered: [{ placeName: '' }] }]);
                setError('');
            } else {
                toast({
                    title: 'Error creating trip',
                    description: response.data.message || 'Unknown error',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setError(response.data.message || 'Error creating trip');
            }
        } catch (error) {
            toast({
                title: 'Error creating trip',
                description: 'Network error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setError('Error creating trip - network error');
        }
    };

    return (
        <>
        <Navbar/>
        <Box bg={`url(${bgImage})`} width={'100%'} backgroundPosition={'center'}
        backgroundSize={'cover'} backgroundRepeat={'no-repeat'}>
            <Text marginTop={5} fontSize={'24px'} fontWeight={'500'}>Add Your Trip</Text>
            <Flex justifyContent={'space-around'} flexDirection={['column','row']} padding={5}
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value to control the opacity
                justifyContent:'space-around'
              }}
            >
                <Box p={4} width={['100%','45%']}>
                    <VStack spacing={4} align="stretch">
                        <FormControl isRequired>
                            <FormLabel>Trip Name</FormLabel>
                            <Input border={'1px solid gray'} type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Arrival</FormLabel>
                            <Input border={'1px solid gray'} type="text" value={arrival} onChange={(e) => setArrival(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Destination</FormLabel>
                            <Input border={'1px solid gray'} type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </FormControl>
                        
                        {tripDetails.map((detail, dateIndex) => (
                            <Flex key={dateIndex} justify={'space-between'}>
                                <FormControl isRequired width={'30%'}>
                                    <FormLabel>Date</FormLabel>
                                    <Input
                                        border={'1px solid gray'}
                                        type="date"
                                        value={detail.date}
                                        onChange={(e) => handleDateChange(dateIndex, e.target.value)}
                                    />
                                </FormControl>
                                <Flex flexDirection={'column'} width={'45%'}>
                                    {detail.placesCovered.map((place, placeIndex) => (
                                        <Box key={placeIndex}>
                                            <FormControl isRequired>
                                                <FormLabel>Place {placeIndex + 1}</FormLabel>
                                                <Input
                                                    border={'1px solid gray'}
                                                    type="text"
                                                    value={place.placeName}
                                                    onChange={(e) => handlePlaceChange(dateIndex, placeIndex, e.target.value)}
                                                />
                                            </FormControl>
                                        </Box>
                                    ))}

                                </Flex>
                                <Flex width={'20%'} alignItems={'flex-end'}>
                                    <Button colorScheme="teal" fontSize={['12px','16px']} mt={2} onClick={() => handleAddPlace(dateIndex)}>
                                        Add Place
                                    </Button>
                                </Flex>
                            </Flex>
                        ))}
                        <Button colorScheme="teal" onClick={handleAddDate}>
                            Add Date
                        </Button>
                        <Button colorScheme="teal" onClick={handleFormSubmit}>
                            Create Trip
                        </Button>
                        {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    </VStack>
                </Box>
                <Box p={4} width={['100%','45%']}>
                    <TravelTable/>
                </Box>
            </Flex>
            
        </Box>
        </>
    );
};

export default TravelDetails;
