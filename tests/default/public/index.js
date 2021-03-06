import { react, html, css } from 'https://unpkg.com/rplus';

document.title = 'OUR_HTTP_SERVER_TEST_MODULE_INDEX';

const style = css`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  background: #212121;
  color: #f2f2f2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :global(*) {
    display: block;
    flex: none;
    margin: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  :global(head),
  :global(script),
  :global(style) {
    display: none;
  }

  img {
    width: 30vmin;
    opacity: 0.38;
  }

  h1 {
    font-size: 20vmin;
  }

  h2 {
    color: #6f6f6f;
    font-size: 4vmin;
    font-weight: normal;
  }
`;

react.render(
  html`
    <main className=${style}>
      <img src="/assets/exists.png" alt="File that exists" />
      <h1>Our Http Server</h1>
      <h2>${location.href}</h2>
    </main>
  `,
  document.body
);
