import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LinkRoute from '.';

test('LinkRoute renders correctly', () => {
  const { getByText } = render(
    <Router>
      <LinkRoute to='/example'>Example Link</LinkRoute>
    </Router>
  );

  const linkElement = getByText('Example Link');
  expect(linkElement).toBeInTheDocument();
  const hrefAttribute = linkElement.getAttribute('href');
  expect(hrefAttribute).toBe('/example');
});
