import { LitElement, css, html, customElement, property } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties in lit-element
  // check out this link https://lit-element.polymer-project.org/guide/properties#declare-with-decorators
  @property() message: string = "Welcome!";

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
        <aside>
          <fast-card>
            <h2>Hello Megan!</h2>
      
            <p>You have 2 new emergency requests today!</p>
          </fast-card>
      
          <fast-card>
            <h2>Filter Status</h2>

            <div id="gridFilter">
              <button>Needs Attention</button>
              <button>Team Assigned</button>
            </div>
          </fast-card>
        </aside>

        <img src="/assets/mainMap.png" alt="Image of a map of Washington State">
      </div>
    `;
  }
}