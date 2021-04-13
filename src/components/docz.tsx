import React, { FC } from 'react';
import { StreamApp } from '../Context';

export const WithExampleStreamApp: FC = ({ children }) => (
  <StreamApp
    apiKey="fpwesm5u2evu"
    appId="64527"
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhhbXBsZS11c2VyIn0.cM6zFlcQ68qP2LLz-Y6fPeNglfOuwB2aeBUaQild1wg"
  >
    {children}
  </StreamApp>
);
