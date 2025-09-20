import React from 'react';

import { AppProviders } from './core/providers/AppProviders';
import { RootNavigator } from './navigation/RootNavigator';

export default function App(): React.ReactElement {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
