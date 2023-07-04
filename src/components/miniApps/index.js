import React, { useContext } from 'react';
import { Load } from '../../components';
import { GlobalContext } from '../../context';

const MiniApps = (data) => () => {
  const context = useContext(GlobalContext)
  // const { params: { user } } = useRoute();
  const Component = data.component;

  return (
    <React.Suspense fallback={<Load show={true} size="large" />}>
      <Component globalContext={context} />
    </React.Suspense>
  );
};

export default MiniApps