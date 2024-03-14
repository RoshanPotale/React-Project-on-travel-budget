import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import bgImage from "../images/travel.png"

const TravelTable = () => {
  const [travelData, setTravelData] = useState([]);
  const navigate = useNavigate()

  function handleClick(id){
    navigate(`/tripdetail/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://travelbudget.onrender.com/api/v1/traveldetail/${id}`);
      // Remove the deleted entry from the state
      setTravelData((prevData) => prevData.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://travelbudget.onrender.com/api/v1/traveldetail'); // Update the API endpoint
        setTravelData(response.data); // Assuming the API response is an array of travel details
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    // Call the fetch data function
    fetchData();
    // console.log(travelData)
  }, []); // Empty dependency array to fetch data only once when the component mounts


  return (
    <Table variant="simple" style={{tableLayout:'auto'}}>
    <Thead>
      <Tr>
        <Th>Trip Name</Th>
        <Th>Arrival</Th>
        <Th>Destination</Th>
        <Th>Other Details</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
      {travelData && travelData.map((trip) => (
        <Tr key={trip.id}>
          <Td>{trip.tripName}</Td>
          <Td>{trip.arrival}</Td>
          <Td>{trip.destination}</Td>
          <Td><Button onClick={()=>handleClick(trip.id)}>Click Here</Button></Td>
          <Td>
          <Button colorScheme="red" ml={2} onClick={() => handleDelete(trip.id)}>
                Delete
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  );
};

export default TravelTable;
