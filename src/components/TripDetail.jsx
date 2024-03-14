import { Box, Flex, List, ListIcon, ListItem, Text, } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
import bgImage from "../images/travel.png"
import { CheckCircleIcon } from '@chakra-ui/icons';


const TripDetail = () => {

    const { id } = useParams();

    const [tripData, setTripData] = useState([])

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://travelbudget.onrender.com/api/v1/traveldetail/${id}`); // Update the API endpoint
            setTripData(response.data); // Assuming the API response is an array of travel details
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
        console.log(tripData)
      }, []);

  return (
    <>
      <Navbar/>
      <Box bg={`url(${bgImage})`} width={'100%'} backgroundPosition={'center'}
        backgroundSize={'cover'} backgroundRepeat={'no-repeat'}>
            <Text textAlign={'center'} fontSize={'32px'}>Travel Itinerary</Text>
        <Box width={'60%'} margin={'auto'} mt={5} backgroundColor= {'rgba(255, 255, 255, 0.4)'} padding={5}>
            <Box backgroundColor= {'rgba(255, 255, 255, 0.9)'}>
                <Text textAlign={'center'} fontSize={'20px'} mt={2} mb={2}>{tripData.tripName}</Text>
                <Flex justifyContent={'space-between'} flexDirection={['column','row']} color={'white'}>
                    <Box padding={5} backgroundColor={'#3a9e3a'} width={'50%'} textAlign={'left'}>
                        <Text>From : </Text>
                        <Text fontSize={'18px'} fontWeight={'500'} ml={5}>Nagpur</Text>
                    </Box>
                    <Box padding={5} backgroundColor={'#366a75'} width={'50%'} textAlign={'left'}>
                        <Text>To : </Text>
                        <Text fontSize={'18px'} fontWeight={'500'} ml={5}>Delhi</Text>
                    </Box>
                </Flex>
            </Box>
            <Box>
                {
                    tripData.tripDetails && tripData.tripDetails.map((el,i)=>{
                        return(
                            <Box marginTop={3} key={i}>
                                <Flex padding={3} borderTopLeftRadius={'10px'} borderTopRightRadius={'10px'} backgroundColor={'#171863'} justifyContent={'space-between'}> 
                                    <Text fontSize={'20px'} color={'white'}>Day {i+1}</Text>
                                    <Text fontSize={'20px'} color={'white'}>{new Date(el.date).toLocaleDateString()}</Text>
                                </Flex>
                                
                                <Box backgroundColor={'white'} padding={3}>
                                    <Text textAlign={'left'} fontSize={'18px'} fontWeight={'500'}>What To Do</Text>
                                    {
                                        el.placesCovered && el.placesCovered.map((place,j)=>{
                                            return(
                                                <List key={j} spacing={3} textAlign={'left'} mt={2} marginLeft={10}>
                                                    <ListItem fontSize={'18px'}>
                                                        <ListIcon as={CheckCircleIcon} color='green.500' />
                                                        {place.placeName}
                                                    </ListItem>
                                                </List>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
      </Box>
    </>
  )
}

export default TripDetail
