import React from 'react';
import { RedirectAuthChangeContextValues } from './RedirectAuthChangeContext.types';

const RedirectAuthChangeContext = React.createContext<RedirectAuthChangeContextValues>({redirectOnLogin: "/profile", redirectOnLogout: "/"})

export default RedirectAuthChangeContext;
