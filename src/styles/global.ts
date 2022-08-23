import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const global = css``;

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1180px;
`;

export const Divider = styled.div`
  height: 1px;
  border-bottom: #ddd solid 1px;
`;

interface FlexProps {
  column?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  itemsCenter?: boolean;
  itemsStretch?: boolean;
  itemsEnd?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: ${(props) => {
    let justify = 'start';
    if (props.justifyCenter) justify = 'center';
    else if (props.justifyBetween) justify = 'space-between';
    return justify;
  }};
  align-items: ${(props) => {
    let items = 'start';
    if (props.itemsCenter) items = 'center';
    else if (props.itemsStretch) items = 'stretch';
    else if (props.itemsEnd) items = 'end';
    return items;
  }};
`;
