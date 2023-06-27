// components.js

// JavaScript code for defining the custom web components

// Import necessary modules from Lit
import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Define the TallyHeader component
class TallyHeader extends LitElement {
  static styles = css`
    /* Styles for the TallyHeader component */
    header {
      background-color: #4285f4;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the TallyHeader component -->
      <header>
        <h1>Tally Counter</h1>
      </header>
    `;
  }
}
customElements.define('tally-header', TallyHeader);

// Define the PlusButton component
class PlusButton extends LitElement {
  static styles = css`
    /* Styles for the PlusButton component */
    button {
      background-color: #64b5f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the PlusButton component -->
      <button>
        +
      </button>
    `;
  }
}
customElements.define('plus-button', PlusButton);

// Define the MinusButton component
class MinusButton extends LitElement {
  static styles = css`
    /* Styles for the MinusButton component */
    button {
      background-color: #64b5f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the MinusButton component -->
      <button>
        -
      </button>
    `;
  }
}
customElements.define('minus-button', MinusButton);

// Define the ResetButton component
class ResetButton extends LitElement {
  static styles = css`
    /* Styles for the ResetButton component */
    button {
      background-color: #e91e63;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the ResetButton component -->
      <button>
        Reset
      </button>
    `;
  }
}
customElements.define('reset-button', ResetButton);

// Define the FooterElement component
class FooterElement extends LitElement {
  static styles = css`
    /* Styles for the FooterElement component */
    footer {
      background-color: #4285f4;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the FooterElement component -->
      <footer>
        <p>© 2023 Tally Counter. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('footer-element', FooterElement);
