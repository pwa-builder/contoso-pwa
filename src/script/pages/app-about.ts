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
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 4em;

        inset: 4em 0em 1em;
      }

      #aboutCards fast-card {
        margin-top: 10px;
      }

      #actionsBar {
        display: flex;
        justify-content: flex-end;
        margin-top: 2em;

        position: fixed;
        bottom: 20px;
        right: 16px;
      }

      #actionsBar fast-button {
        margin-left: 8px;
      }

      #aboutCards #feedCard {
        flex: 1;
        margin: 10px;
        margin-top: 14em;
      }

      #feedCard textarea {
        width: 98%;
      }

      #feedCard ul {
        padding: 0;
        list-style: none;

        height: 23em;
        overflow-y: scroll;
      }

      #feedCard ul::-webkit-scrollbar {
        display: none;
      }

      #infoCard {
        flex: 3;
        margin: 10px;
      }

      #infoCard form {
        display: flex;
        justify-content: start;
      }

      .formBlock {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
      }

      #leftSection {
        margin-right: 4em;
      }

      textarea {
        height: 6em;
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
          <fast-card id="feedCard">
            <h2>Feed</h2>
      
            <textarea></textarea>
      
            <ul>
              <fast-card>
                <h3>John Firefighter</h3>
      
                <p>I am fighting this fire, looks like we are making progress!</p>
              </fast-card>
      
              <fast-card>
      
              </fast-card>
            </ul>
          </fast-card>
      
          <fast-card id="infoCard">
            <h2>Information:</h2>
      
            <form>
              <section id="leftSection">
                <div class="formBlock">
                  <label for="leadInput">Lead</label>
                  <input id="leadInput" name="leadInput" type="text">
                </div>
      
                <div class="formBlock">
                  <label for="assignedInput">Assigned To</label>
                  <input id="assignedInput" name="assignedInput" type="text">
                </div>
      
                <div class="formBlock">
                  <label for="descInput">Description</label>
                  <textarea id="descInput" name="descInput"></textarea>
                </div>
              </section>
      
              <section id="rightSection">
                <div class="formBlock">
                  <label for="stateInput">State</label>
                  <select id="stateInput" name="stateInput">
                    <option>Team Assigned</option>
                  </select>
                </div>
      
                <div class="formBlock">
                  <label for="areaInput">Affected Area</label>
                  <input id="areaInput" name="areaInput" type="text">
                </div>
      
                <div class="formBlock">
                  <label for="estNumber">Estimated Number of Affected People</label>
                  <input id="estNumber" name="estNumber" type="number">
                </div>
      
                <div class="formBlock">
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