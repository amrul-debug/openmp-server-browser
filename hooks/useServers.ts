import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const API_URL = 'https://api.open.mp/servers';

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export function useServers() {
  const { data, error, isLoading, mutate } = useSWR(API_URL, fetcher, {
    refreshInterval: 60000, 
    revalidateOnFocus: true,
    dedupingInterval: 10000, 
  });

  const sortedServers = data ? [...data].sort((a, b) => b.pc - a.pc) : [];

  return {
    servers: sortedServers,
    isLoading,
    isError: error,
    mutate
  };
}