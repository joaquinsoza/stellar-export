/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useSorobanReact } from '@soroban-react/core';
import 'twin.macro';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { TxType, type TransactionType, TxSubType } from '@/types/ledgifi';
import { type HorizonApi } from '@stellar/stellar-sdk/lib/horizon';
import { Box, Button, Flex, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export const Transactions = () => {
  const { address, serverHorizon } = useSorobanReact();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [exportCSVLoading, setExportCSVLoading] = useState<boolean>(false)
  const [exportXLSXLoading, setExportXLSXLoading] = useState<boolean>(false)

  const [currentPageData, setCurrentPageData] = useState<any |null>(null);


  useEffect(() => {
    fetchPageTransactions().catch((error) => {
      console.log(error)
    })
  }, [currentPage, address]);

  const fetchPageTransactions = async () => {
    if (!serverHorizon || !address) return;
  
    try {
      let paymentsPage;
      if (!currentPageData) {
        const account = await serverHorizon.loadAccount(address);
        paymentsPage = await account.payments();
      } else {
        paymentsPage = await currentPageData.next();
      }
      console.log('🚀 « paymentsPage:', paymentsPage);
      const transformedPayments = paymentsPage.records.map((payment: HorizonApi.PaymentOperationResponse) => transformPayment(payment, address));
      setTransactions(transformedPayments);
      setCurrentPageData(paymentsPage);
    } catch {
      console.log("error")
    }
  };

  const fetchNextPage = async () => {
    if (!serverHorizon || !address || !currentPageData?.next) return;
  
    try {
      const nextPage = await currentPageData.next();
      const transformedPayments: TransactionType[] = nextPage.records.map((payment: HorizonApi.PaymentOperationResponse) => transformPayment(payment, address));
      setTransactions(transformedPayments);
      setCurrentPageData(nextPage); // Update the current page
    } catch {
      console.log("error")
    }
  };
  
  const fetchPrevPage = async () => {
    if (!serverHorizon || !address || !currentPageData?.prev) return;
  
    try {
      const prevPage = await currentPageData.prev();
      const transformedPayments = prevPage.records.map((payment: HorizonApi.PaymentOperationResponse) => transformPayment(payment, address));
      setTransactions(transformedPayments);
      setCurrentPageData(prevPage); // Update the current page
    } catch {
      console.log("error")
    }
  };
  

  const transformPayment = (payment: HorizonApi.PaymentOperationResponse, address: string) => {
    return {
      timestamp: payment.created_at,
      received: payment.to === address ? payment.amount : '0',
      receivedCurrency: payment.asset_type === 'native' ? 'XLM' : payment.asset_code,
      sent: payment.from === address ? payment.amount : '0',
      sentCurrency: payment.asset_type === 'native' ? 'XLM' : payment.asset_code,
      fee: '0',
      feeCurrency: 'XLM',
      txType: payment.to === address ? TxType.INCOME : TxType.TRANSFER,
      txSubType: payment.to === address ? TxSubType['N/A'] : TxSubType.WITHDRAWAL,
      importSource: 'Stellar Network',
      importSourceId: payment.transaction_hash,
      memo: '',
      account: address,
    };
  };
  
  const fetchAllPayments = async (): Promise<TransactionType[]> => {
    let allPayments: TransactionType[] = [];
  
    if (serverHorizon && address) {
      const account = await serverHorizon.loadAccount(address);
      let paymentsPage = await account.payments();
      while (paymentsPage.records && paymentsPage.records.length > 0) {
        const transformedPayments = paymentsPage.records.map(payment => transformPayment(payment, address));
        allPayments = [...allPayments, ...transformedPayments];
        if (!paymentsPage.next) break; // Check if there's a next page
        paymentsPage = await paymentsPage.next();
      }
    }
    return allPayments;
  };
  

  // Function to export data to CSV
  const exportToCSV = async () => {
    setExportCSVLoading(true)
    const allTransactions = await fetchAllPayments();
    const csv = Papa.unparse(allTransactions);
    saveAs(new Blob([csv], { type: 'text/csv' }), 'stellar-transactions.csv');
    setExportCSVLoading(false)
  };

  // Function to export data to XLSX
  const exportToXLSX = async () => {
    setExportXLSXLoading(true)
    const allTransactions = await fetchAllPayments();
    const ws = XLSX.utils.json_to_sheet(allTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, 'stellar-transactions.xlsx');
    setExportXLSXLoading(false)
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1); // You might want to check for the last page here
  };

  return (
    <Box width={'full'} padding={5} justifyContent={'center'}>
      <Flex gap={2} justify={'end'}>
        <Button disabled={exportCSVLoading} onClick={exportToCSV}>{exportCSVLoading ? <Spinner/> : "Export to CSV"}</Button>
        <Button disabled={exportXLSXLoading} onClick={exportToXLSX}>{exportXLSXLoading ? <Spinner /> : "Export to XLSX"}</Button>
      </Flex>
      <div tw="flex grow flex-col space-y-4">
        <h2 tw="text-center font-mono text-gray-400">Transactions</h2>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Account</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.timestamp}</Td>
                <Td>{transaction.received !== '0' ? transaction.received : transaction.sent}</Td>
                <Td>{TxType[transaction.txType]}</Td>
                <Td>{transaction.account}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex gap={2} justify={'end'}>
          <Button onClick={handlePrevPage}>Previous</Button>
          <Button onClick={fetchNextPage}>Next</Button>
        </Flex>
      </div>
    </Box>
  );
};
