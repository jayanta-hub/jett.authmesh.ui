export const getFilteredSegmentsWithAirlines = (itinerary: any, airlines: any[]) => {
  
  return itinerary?.Segments?.filter(
    (seg: any) => seg?.DepartureAirportCode !== itinerary?.DepartureAirportCode
  )?.map((seg: any) => ({
    ...seg,
    airline: airlines?.find((airline: any) => airline?.Code === seg?.OperatingAirlineCode),
  }));
};