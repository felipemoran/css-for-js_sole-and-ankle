import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, pluralize, isNewShoe} from '../../utils';
import Spacer from '../Spacer';

const STYLES = {
    "on-sale": {
        opacity: 1,
        backgroundColor: COLORS.primary,
        label: "Sale",
    },
    "new-release": {
        opacity: 1,
        backgroundColor: COLORS.secondary,
        label: "Just Released!",
    }
}

const ShoeCard = ({
                      slug,
                      name,
                      imageSrc,
                      price,
                      salePrice,
                      releaseDate,
                      numOfColors,
                  }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
        ? 'on-sale'
        : isNewShoe(releaseDate)
            ? 'new-release'
            : 'default'

    const style = STYLES[variant]

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc}/>
                    {variant !== "default" ? (
                        <SaleFlag
                            style={{
                                "--background-color": style.backgroundColor,
                            }}
                        >{style.label}</SaleFlag>) : undefined}
                </ImageWrapper>
                <Spacer size={14}/>
                <Row class={"infoRow"}>
                    <Name>{name}</Name>
                    {variant !== "on-sale" ? (
                            <NormalPrice>{formatPrice(price)}</NormalPrice>) :
                        <OldPrice>{formatPrice(price)}</OldPrice>}
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                    {variant === "on-sale" ? (
                        <SalePrice>{formatPrice(salePrice)}</SalePrice>
                    ) : undefined
                    }
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
  text-decoration: none;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const NormalPrice = styled.span`
  color: ${COLORS.gray[900]};
`;

const OldPrice = styled(NormalPrice)`
  text-decoration: line-through;
  color: ${COLORS.gray[700]};
`
const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SaleFlag = styled.label`
  border-radius: 2px;
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  font-size: ${14 / 18}rem;
  background-color: var(--background-color);
  padding: 5px 9px 7px 9px;
`

export default ShoeCard;
