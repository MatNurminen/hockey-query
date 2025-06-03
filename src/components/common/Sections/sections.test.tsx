import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SectionHeader from './sectionHeader';
import SectionFirst from './sectionFirst';

describe('SectionHeader', () => {
  it('renders section header with the correct content and text alignment', () => {
    const content = 'Test Content';
    const txtAlign = 'left';

    const { getByText } = render(
      <SectionHeader content={content} txtAlign={txtAlign} />
    );

    const headerElement = getByText(content);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.parentElement).toHaveClass(
      `MuiTypography-align${txtAlign[0].toUpperCase() + txtAlign.slice(1)}`
    );
  });
});

describe('SectionFirst', () => {
  it('renders section first with the correct content and text alignment', () => {
    const content = 'Test Content';
    const txtAlign = 'left';

    const { getByText } = render(
      <SectionFirst content={content} txtAlign={txtAlign} />
    );

    const headerElement = getByText(content);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.parentElement).toHaveClass(
      `MuiTypography-align${txtAlign[0].toUpperCase() + txtAlign.slice(1)}`
    );
  });
});
