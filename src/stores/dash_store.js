// dash_stores.js
import { derived, writable } from 'svelte/store';

export const tableData = writable([]);
export const selectedCategory = writable('total');

export const requestCounts = derived(tableData, ($tableData) => {
  return {
    total: $tableData.length,
    approved: $tableData.filter((request) => request.approved).length,
    inProgress: $tableData.filter((request) => request.status === 'inProgress')
      .length,
    completed: $tableData.filter((request) => request.status === 'completed')
      .length,
  };
});
