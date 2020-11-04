import { LitElement, css, html, customElement, property } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';

import '../components/sidebar';
import '../components/pin';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties in lit-element
  // check out this link https://lit-element.polymer-project.org/guide/properties#declare-with-decorators
  @property() pins: string[] = ['earthquake', 'flood', 'flood', 'flood', 'wildfire', 'wildfire', 'wildfire'];

  static get styles() {
    return css`
      fast-card {
        padding: 18px;
        padding-top: 0px;
        margin-top: 10px;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;
      }

      aside {
        position: fixed;
        top: 5em;
        left: 1em;
        z-index: 9;
      }

      .gridFilter {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
      }

      #alerts {
        list-style: none;
        padding: 0;
        color: red;
        font-weight: bold;
      }

      #alerts li, #alerts fast-anchor::part(control) {
        border: solid 1px;
        padding: 8px;
        margin-top: 10px;
        color: red;
      }

      #alerts fast-anchor {
        width: 100%;
      }

    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit-element
    // for more info check out the lit-element docs https://lit-element.polymer-project.org/guide/lifecycle
    console.log('This is your home page');
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      })
    }
  }

  render() {
    return html`
      <div>
        <side-bar></side-bar>

        ${
          this.pins.map((pin) => {
            return html`
            <app-pin pin=${pin} .style="position: absolute; top: ${150 + Math.floor(Math.random() * 500)}px; left: ${Math.floor(Math.random() * (+1000 - +280)) + +280}px;" class="pin">
            </app-pin>
            `
          })
        }
      </div>
    `;
  }
}