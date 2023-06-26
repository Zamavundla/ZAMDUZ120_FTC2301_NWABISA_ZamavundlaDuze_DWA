import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CounterComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .counter-container {
      display: flex;
      align-items: center;
    }

    .counter-input {
      width: 50px;
      text-align: center;
    }

    .counter-buttons {
      display: flex;
      gap: 8px;
    }
  `;

  static properties = {
    counterValue: { type: Number },
    counterState: { type: String },
  };

  constructor() {
    super();
    // Initial state of the counter
    this.counterValue = 0;
    this.counterState = 'Normal';
  }

  subtract() {
    // Subtract button click handler
    if (this.counterValue > MIN_NUMBER) {
      // Check if counter value is greater than the minimum value
      this.counterValue -= 1; // Decrement the counter value
      if (this.counterValue === MIN_NUMBER) {
        // Check if the counter value has reached the minimum
        this.counterState = 'Minimum Reached'; // Update counter state
      } else {
        this.counterState = 'Normal'; // Update counter state
      }
    }
  }

  add() {
    // Add button click handler
    if (this.counterValue < MAX_NUMBER) {
      // Check if counter value is less than the maximum value
      this.counterValue += 1; // Increment the counter value
      if (this.counterValue === MAX_NUMBER) {
        // Check if the counter value has reached the maximum
        this.counterState = 'Maximum Reached'; // Update counter state
      } else {
        this.counterState = 'Normal'; // Update counter state
      }
    }
  }

  reset() {
    // Reset button click handler
    this.counterValue = 0; // Reset the counter value
    this.counterState = 'Normal'; // Reset counter state
  }

  render() {
    return html`
      <div class="counter-container">
        <input
          class="counter-input"
          type="number"
          .value=${this.counterValue}
          disabled
        />
        <div class="counter-buttons">
          <button @click=${this.subtract} ?disabled=${this.counterValue <= MIN_NUMBER}>-</button>
          <button @click=${this.add} ?disabled=${this.counterValue >= MAX_NUMBER}>+</button>
          <button @click=${this.reset}>Reset</button>
        </div>
      </div>
      <div id="reset-message" ?hidden=${this.counterState !== 'Normal'}>
        Counter reset!
      </div>
    `;
  }
}

customElements.define('counter-component', CounterComponent);
