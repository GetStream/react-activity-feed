/* eslint-disable */
const expect = chai.expect;

const apiKey = 'apiKey';
const appId = 'appId';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This test suite purpose is to verify the full browser bundle is built correctly
 */
describe('Browser build', () => {
  it('StreamApp should be loaded', () => {
    expect(StreamApp).to.be.a('function');
  });

  it('should render the components', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(React.createElement(StreamApp, { appId, apiKey, token }, 'hello from beyond'), container);

    await sleep(1000); // wait for react to flush
    expect(container.textContent).to.equal('hello from beyond');
  });
});
