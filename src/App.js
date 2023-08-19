import './App.css';
import { useState, useEffect } from 'react';
import { Typography, styled, Box } from '@mui/material';
import Balance from './components/Balance';
import Expenses from './components/Expenses';
import NewTransaction from './components/NewTransaction';
import Transactions from './components/Transactions';

const Header = styled(Typography)`
  margin: 10px 0;
  font-size: 36px;
  color: blue;
  text-transform: uppercase;
`;

const Component = styled(Box)`
  display: flex;
  background: #fff;
  width: 800px;
  padding: 10px;
  border-radius: 20px;
  margin: auto;
  & > div {
    height: 70vh;
    width: 50%;
    padding: 10px;
  }
`;

function App() {
  
  const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

  const [transactions, setTransactions] = useState(initialTransactions);

  useEffect(() => {
   
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
  };

  return (
    <Box className="App">
      <Header>MoneyMate</Header>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <Expenses transactions={transactions} />
          <NewTransaction addTransaction={addTransaction} />
        </Box>
        <Box>
          <Transactions transactions={transactions} deleteTransaction={deleteTransaction} />
        </Box>
      </Component>
    </Box>
  );
}

export default App;
