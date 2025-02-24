import React from 'react';
import { Spin as Spins } from 'antd';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const AntSpin = props => <Spins {...props} />;

const Spin = styled(AntSpin)`
  && {
    .ant-spin-dot {
      i {
        background-color: ${palette('primary', 0)};
      }
    }
  }
`;

export default Spin;
