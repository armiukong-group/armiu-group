import React from 'react';
import styled from 'styled-components';
import { ServiceSection as ServiceSectionType } from '../../types';

const Section = styled.section`
  background-color: #000000;
  color: #ffffff;
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  color: #00E5FF;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

interface ServiceSectionProps {
  data: ServiceSectionType[keyof ServiceSectionType];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ data }) => {
  return (
    <Section>
      <Title>{data.title}</Title>
      <Subtitle>{data.subtitle}</Subtitle>
      <p>{data.description}</p>
      {/* 這裡將添加項目展示網格 */}
    </Section>
  );
};

export default ServiceSection; 