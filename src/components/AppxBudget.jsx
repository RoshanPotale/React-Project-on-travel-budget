import React, { useState, useEffect } from 'react';
import {

  Box,
  Input,
  Stack,
  Button,
  List,
  ListItem,
  Heading,
  Text,
  useToast,
  Flex,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ListIcon,
} from '@chakra-ui/react';
import bgImage from "../images/budgetbg.jpg"
import axios from 'axios';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import Navbar from './Navbar';
import "./AnimateButton.css"

const AppxBudget = () => {
  const [tripDetails, setTripDetails] = useState({
    tripName: '',
    arrival: '',
    destination: '',
    totalBudget: '',
    
  });

  const [expense, setExpense] = useState({ name: '', cost: '' });
  const [expenses, setExpenses] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [travelData, setTravelData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [expenseData, setExpenseData] = useState([])

  const toast = useToast();

  const fetchById = async (id) => {
      try {
        const response = await fetch(`https://travelbudget.onrender.com/api/v1/appxbudget/${id}`);
        const data = await response.json();
        setTripData(data);
        setExpenseData(data.expenses)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const fetchData = async () => {
    try {
      const response = await fetch('https://travelbudget.onrender.com/api/v1/appxbudget');
      const data = await response.json();
      setTravelData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    // Recalculate remaining amount whenever expenses change
    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.cost) || 0, 0);
    const newRemainingAmount = parseFloat(tripDetails.totalBudget) - totalExpenses || 0;
    setRemainingAmount(newRemainingAmount);
  }, [expenses, tripDetails.totalBudget]);
  

  const handleTripDetailsChange = (e) => {
    setTripDetails({
      ...tripDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpenseChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = () => {
    if(!(tripDetails.totalBudget===''))
    {
      if(!(expense.name==='' && expense.cost===''))
      {
        setExpenses([...expenses, expense]);
        setExpense({ name: '', cost: '' });
        toast({
          title: 'Expense Added',
          description: 'New expense added successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: 'Error Adding expense',
          description: 'Please Add the expense details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
    else{
      toast({
        title: 'Error',
        description: 'Please Add Total Budget',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTrip = async(id)=>{
      try {
            // Make a DELETE request to the backend API to delete the product
            await axios.delete(`https://travelbudget.onrender.com/api/v1/appxbudget/${id}`); // Replace with your API endpoint
            // After successful deletion, update the product list
            fetchData();
          } catch (error) {
            console.error('Error deleting product:', error);
          }
  }


  const handleSubmit = async () => {
    const formData = {
      ...tripDetails,
      expenses: expenses,
      remainingAmount:remainingAmount,
    };

    try {
      const response = await fetch('https://travelbudget.onrender.com/api/v1/appxbudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Form Submitted',
          description: 'Budget details submitted successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Reset the form after submission (you may want to handle this differently)
        setTripDetails({
          tripName: '',
          arrival: '',
          destination: '',
          totalBudget: '',
        });
        setExpenses([]);
        setRemainingAmount(0);
        fetchData()
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while submitting the form.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <>
    <Navbar/>
    <Box bg={`url(${bgImage})`} width={'100%'} backgroundPosition={'center'} height={'100vh'} backgroundSize={'cover'} backgroundRepeat={'no-repeat'}>
    <Flex p={4}
    flexDirection={['column','row']}
    style={{
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Adjust the alpha value to control the opacity
      justifyContent:'space-around'
    }}
    >
      <Box width={['100%','90%','45%']}
      boxShadow= {'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset'}
      // backgroundColor= {'rgba(255, 255, 255, 0.8)'}
      backgroundColor= {'#f9fcff'}
      backgroundImage= {'linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)'}
      borderRadius={'30px'} padding={5} margin={'auto'}>

        <Heading>Create Appx Budget</Heading>
        <Stack spacing={3} mt={4}>
          <Input
            placeholder="Trip Name"
            name="tripName"
            value={tripDetails.tripName}
            onChange={handleTripDetailsChange}
            border={'1px solid gray'}
          />
          <Input
            placeholder="Arrival"
            name="arrival"
            value={tripDetails.arrival}
            onChange={handleTripDetailsChange}
            border={'1px solid gray'}
          />
          <Input
            placeholder="Destination"
            name="destination"
            value={tripDetails.destination}
            onChange={handleTripDetailsChange}
            border={'1px solid gray'}
          />
          <Input
            placeholder="Total Budget"
            name="totalBudget"
            type="number"
            value={tripDetails.totalBudget}
            onChange={handleTripDetailsChange}
            border={'1px solid gray'}
          />
          <Stack spacing={2} direction="row">
            <Input
              placeholder="Expense Name"
              name="name"
              value={expense.name}
              onChange={handleExpenseChange}
              border={'1px solid gray'}
            />
            <Input
              placeholder="Expense Cost"
              name="cost"
              type="number"
              value={expense.cost}
              onChange={handleExpenseChange}
              border={'1px solid gray'}
            />
          </Stack>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button onClick={handleAddExpense} className='button' transition={'all 0.5s ease-in-out'} bg={'red'} color={'white'} _hover={{bg:'red',color:'white',transform:'scale(1.05)'}}>Add Expense</Button>
          </Box>
          <List mt={4}>
            {expenses.map((expense, index) => (
              <ListItem key={index}>
                {expense.name}: {expense.cost}
              </ListItem>
            ))}
          </List>
          <Text mt={2} fontWeight="bold">
            Balance Amount: {remainingAmount}
          </Text>
          <Button onClick={handleSubmit} className='button' colorScheme="#002a53">
            Submit
          </Button>
        </Stack>
      </Box>
      <Box bg={'rgba(11, 4, 81, 0.81)'}
      backgroundColor= {'#2234ae'}
      backgroundImage= {'linear-gradient(315deg, #2234ae 0%, #191714 74%)'}      
      height={'fit-content'} width={['100%','90%','50%']} margin={'auto'} borderRadius={'20px'} color={'white'}>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Approximate Travelling Budgets</TableCaption>
          <Thead>
            <Tr>
              <Th color={'white'}>Trip Name</Th>
              <Th color={'white'}>Budget</Th>
              <Th color={'white'}>Other Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              travelData.map((el)=>{
                return(
                  <Tr key={el._id} color={'yellow'}>
                    <Td>
                      <Text>
                        {el.tripName}
                      </Text>
                      <Text>
                        {new Date(el.dateCreated).toLocaleDateString()}
                      </Text>
                      </Td>
                    <Td>{el.totalBudget}</Td>
                    <Td>
                    <Button
                    onClick={() => {
                      setOverlay(<OverlayOne />)
                      fetchById(el.id)
                      onOpen()
                    }}
                    color={'white'}
                    bg={'none'}
                    transition={'all 0.5s ease-in-out'}
                    _hover={{bg:'none',color:'red',transform:'scale(1.05)'}}
                    >Click Here</Button>
                    <Button bg={'none'} padding={0} onClick={()=>{deleteTrip(el.id)}}>
                      <DeleteIcon color={'red'}/>
                    </Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isCentered isOpen={isOpen} size={'md'} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>{tripData.tripName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Flex justifyContent={'flex-end'}>
                <Button fontSize={'20px'} bg={'green'} color={'white'} fontWeight={'500'} mb={'10px'}>Appx Budget : {tripData.totalBudget}</Button>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Text fontSize={'18px'} fontWeight={'500'}>{tripData.arrival}</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>To</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>{tripData.destination}</Text>
              </Flex>
              <List spacing={3} marginTop={'20px'} marginBottom={'20px'}>
                {
                  expenseData.map((el)=>{
                    return(
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color='green.500' />
                      {el.name} : {el.cost}
                    </ListItem>
                    )
                  })
                }
              </List>
              <Flex justifyContent={'flex-end'}>
                <Button fontSize={'18px'} bg={'red'} color={'white'} fontWeight={'500'} mb={'10px'}>Balance Amount : {tripData.remainingAmount}</Button>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </Flex>
    </Box>
    </>
  );
};

export default AppxBudget;
