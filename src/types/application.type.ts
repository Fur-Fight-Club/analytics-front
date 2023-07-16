export interface Application {
  name: string;
  description: string;
  url: string;
  applicationId: string;
  clientId: string;
}

export const initialApplications: Application[] = [];
