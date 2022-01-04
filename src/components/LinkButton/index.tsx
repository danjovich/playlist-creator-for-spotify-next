import React, { AnchorHTMLAttributes } from 'react';

import * as S from './styles';

const LinkButton: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => <S.LinkButton {...props}>{children}</S.LinkButton>;

export default LinkButton;
