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
        <aside>
          <fast-card>
            <h2>Hello Megan!</h2>
      
            <p>You have 2 new emergency requests today!</p>

            <ul id="alerts">
              <li>Okanogon has a Wildfire</li>
              <li>Lake Chelan has a Wildfire</li>
              <fast-anchor appearance="hypertext" href="/about">Forks has a Wildfire</fast-anchor>
            </ul>
          </fast-card>
      
          <fast-card>
            <h2>Filter by Status</h2>

            <div class="gridFilter">
              <button>Needs Attention</button>
              <button>Team Assigned</button>
              <button>Team Deployed</button>
              <button>Cleanup</button>
              <button>Done</button>
            </div>

            <h2>Filter By Emergency</h2>

            <div class="gridFilter">
              <button>Wildfire</button>
              <button>Tsunami</button>
              <button>EarthQuake</button>
              <button>Tornado</button>
            </div>
          </fast-card>
        </aside>

        <img src="/assets/mainMap.png" alt="Image of a map of Washington State">
      </div>
    `;
  }
}