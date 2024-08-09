import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  border: 0;
  height: 1.4px;
  background: #213260;
  margin-bottom: 2rem;
`;

const HrComponent: React.FC = () => {
  return <StyledHr />;
};

export default HrComponent;


