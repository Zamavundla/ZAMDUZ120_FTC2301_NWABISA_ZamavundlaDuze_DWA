// components.js

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
      background-color: #264573;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.2rem;
      border-radius: 50%;
      cursor: pointer;
      width: 80px;
      height: 80px;
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
      background-color: #264573;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.2rem;
      border-radius: 50%;
      cursor: pointer;
      width: 80px;
      height: 80px;
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
      background-color: #9c274b;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.2rem;
      border-radius: 50%;
      cursor: pointer;
      width: 80px;
      height: 80px;
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

// Define the CounterScreen component
class CounterScreen extends LitElement {
  static styles = css`
    /* Styles for the CounterScreen component */
    input {
      font-size: 2rem;
      text-align: center;
      width: 100%;
      padding: 1rem;
      border: none;
      background-color: #f6f6f6;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the CounterScreen component -->
      <input readonly value="0" data-key="number" />
    `;
  }
}
customElements.define('counter-screen', CounterScreen);

// Define the TallyCounter component
class TallyCounter extends LitElement {
  static styles = css`
    /* Styles for the TallyCounter component */
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }

    .counter-container {
      margin-bottom: 2rem;
    }

    .button-container {
      display: flex;
      justify-content: center;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the TallyCounter component -->
      <main>
        <div class="counter-container">
          <counter-screen></counter-screen>
        </div>
        <div class="button-container">
          <plus-button data-key="add"></plus-button>
          <minus-button data-key="subtract"></minus-button>
        </div>
        <reset-button data-key="reset"></reset-button>
      </main>
    `;
  }
}
customElements.define('tally-counter', TallyCounter);

// Define the FooterElement component
class FooterElement extends LitElement {
  static styles = css`
    /* Styles for the FooterElement component */
    footer {
      background-color: #9c274b;
      color: white;
      padding: 1rem;
      text-align: center;
    }
  `;

  render() {
    return html`
      <!-- HTML template for the FooterElement component -->
      <footer>
        <p>&copy; 2023 Tally Counter. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('footer-element', FooterElement);
