export const getColumnWidth = (columnId: string): number => {
  const columnWidths: { [key: string]: number } = {
    policyName: 89,
    id: 34,
    dateOfCreation: 105,
    createdBy: 81,
    updatedBy: 82,
    journeyType: 90,
    sector: 57,
    supplier: 64,
    airline: 55,
    class: 52,
    fareType: 69,
    status: 56,
    actions: 26
  };
  return columnWidths[columnId] || 100;
}; 