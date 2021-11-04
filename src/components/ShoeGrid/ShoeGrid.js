import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
    return (
        <Wrapper>
            {SHOES.map((shoe) => (
                <ShoeCardWrapper key={shoe.slug}>
                    <ShoeCard {...shoe} />
                </ShoeCardWrapper>
            ))}
            <Filler/>
            <Filler/>
            <Filler/>
            <Filler/>
            <Filler/>
            <Filler/>
            <Filler/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  //gap: 32px;
  margin: 0 -16px
`;

const ShoeCardWrapper = styled.div`
  text-decoration: none;
  color: inherit;
  flex: 1 0 275px;
  margin: 0 16px 48px;
  //margin-bottom: 32px;
`

const Filler = styled.div`
  flex: 1 0 275px;
  margin: 0 16px;
`

export default ShoeGrid;
