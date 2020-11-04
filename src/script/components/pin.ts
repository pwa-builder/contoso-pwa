import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('app-pin')
export class AppPin extends LitElement {
    @property({ type: String }) pin: string = "wildfire";
    
    static get styles() {
        return css``
    }

    constructor() {
        super();
    }

    render() {
        return html`
          <div class="pin">
            <img src="/assets/pinIcons/ic_${this.pin}_pin.svg">
          </div>
        `;
      }
}