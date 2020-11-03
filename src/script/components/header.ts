import { LitElement, css, html, customElement, property } from 'lit-element';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title: string = 'Contoso Emergency Response';

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        background: var(--app-color-primary);
        color: black;
        height: 4em;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 24px;
        font-weight: normal;
      }

      .headerDiv {
        width: 110px;
      }

      nav {
        width: 7em;
        display: flex;
        justify-content: space-between;
      }

      nav a {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <div class="headerDiv"></div>

        <h1>${this.title}</h1>

        <div class="headerDiv">
          <mgt-login id="me"></mgt-login>
        </div>
      </header>
    `;
  }
}
