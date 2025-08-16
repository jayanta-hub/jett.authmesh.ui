export interface UpdateUserProps {
    data: {
      userId?: number;
      title?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      employeeId?: string;
    };
    filteredData: {
      userId?: number;
      title?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      email?: string;
      phoneNumber?: string;
      employeeId?: string;
    };
    onUpdateSuccess: () => any;
  }