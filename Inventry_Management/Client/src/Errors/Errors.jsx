import React, { useState } from 'react';
import { Alert, Button } from 'antd';

const ExampleComponent = () => {
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      // Simulating an error
      throw new Error('Something went wrong!');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Trigger Error</Button>
      {error && <Alert description={error.message} type="error" showIcon closable />}
    </div>
  );
};

export default ExampleComponent;
