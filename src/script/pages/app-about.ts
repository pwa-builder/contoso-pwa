import { LitElement, css, html, customElement } from 'lit-element';


@customElement('app-about')
export class AppAbout extends LitElement {

  static get styles() {
    return css`
      img {
          position: fixed;
          top: 4em;
          left: 0em;
          right: 0em;
          z-index: 0;
          object-fit: contain;
        }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <img src="/assets/mainMap.png" alt="Image of a map of Washington State">
      </div>
    `;
  }
}