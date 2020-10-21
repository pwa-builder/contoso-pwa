import { LitElement, css, html, customElement } from 'lit-element';


@customElement('app-about')
export class AppAbout extends LitElement {

  static get styles() {
    return css`
    fast-card {
        padding: 18px;
        padding-top: 0px;
        margin-top: 10px;

        background: #212121de;
        backdrop-filter: blur(8px);
      }
      
      img {
          position: fixed;
          top: 4em;
          left: 0em;
          right: 0em;
          z-index: -1;
          object-fit: contain;
        }

      #aboutCards {
        display: flex;
      }

      #aboutCards fast-card {
        margin: 10px;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <div id="aboutCards">
          <fast-card>
            <h2>Feed</h2>

            <fast-card>

            </fast-card>

            <fast-card>

            </fast-card>
          </fast-card>
      
          <fast-card>
            <h2>Information:</h2>
      
            <form>
              <section id="leftSection">
                <div>
                  <label for="leadInput">Lead</label>
                  <input id="leadInput" name="leadInput" type="text">
                </div>
      
                <div>
                  <label for="assignedInput">Assigned To</label>
                  <input id="assignedInput" name="assignedInput" type="text">
                </div>
      
                <div>
                  <label for="descInput">Description</label>
                  <textarea id="descInput" name="descInput"></textarea>
                </div>
              </section>

              <section id="rightSection">
                <div>
                  <label for="stateInput">State</label>
                  <select id="stateInput" name="stateInput">
                    <option>Team Assigned</option>
                  </select>
                </div>
      
                <div>
                  <label for="areaInput">Affected Area</label>
                  <input id="areaInput" name="areaInput" type="text">
                </div>
      
                <div>
                  <label for="estNumber">Estimated Number of Affected People</label>
                  <input id="estNumber" name="estNumber" type="number">
                </div>

                <div>
                  <label for="severityInput">Severity</label>
                  <select id="severityInput" name="severityInput">
                    <option>High</option>
                  </select>
                </div>
              </section>
      
            </form>

            <div id="actionsBar">
              <fast-button>Share</fast-button>
              <fast-button>Save</fast-button>
              <fast-button>Subscribe</fast-button>
            </div>
          </fast-card>
        </div>
      
      </div>
    `;
  }
}