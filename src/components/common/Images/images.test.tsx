import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainLogo from './mainLogo';
import TableFlag from './tableFlag';

describe('MainLogo', () => {
  it('displays the image with the correct src', () => {
    const src = '/img/den/aalborg.png';
    const { getByAltText } = render(<MainLogo src={src} />);
    const logoImage = getByAltText('');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', src);
  });

  it('has a height of 80', () => {
    const src = '/img/den/aalborg.png';
    const { getByAltText } = render(<MainLogo src={src} />);
    const logoImage = getByAltText('');
    expect(logoImage).toHaveAttribute('height', '80');
  });
});

describe('TableFlag', () => {
  it('displays the image with the correct src', () => {
    const src = '/img/den/aalborg.png';
    const { getByAltText } = render(<TableFlag src={src} />);
    const logoImage = getByAltText('');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', src);
  });

  it('has a height of 20', () => {
    const src = '/img/den/aalborg.png';
    const { getByAltText } = render(<TableFlag src={src} />);
    const logoImage = getByAltText('');
    expect(logoImage).toHaveAttribute('height', '20');
  });
});
