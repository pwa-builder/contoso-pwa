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
        flex-direction: column;
      }

      section.main {
        display: flex;
        justify-content: space-around;
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
              <section class="status-bar">
                <div>
                  <span>Needs attention</span>
                  <span>Team assigned</span>
                  <span>Team deployed</span>
                  <span>Cleanup</span>
                  <span>Done</span>
                </div>
              </section>
      
              <section class="main">
                <div class="column">
                  <p>
                    <label for="status">
                      <span>Status: </span>
                    </label>
                    <p>
                      <select id="status" name="status">
                        <option value="needs-attention">Needs attention</option>
                        <option value="team-assigned">Team assigned</option>
                        <option value="team-deployed">Team deployed</option>
                        <option value="cleanup">Cleanup</option>
                        <option value="done">Done</option>
                      </select>
                    </p>
                  </p>
                  <p>
                    <label for="lead">
                      <span>Lead: </span>
                    </label>
                    <p>
                      <mgt-people-picker name="lead"></mgt-people-picker>
                    </p>
                  </p>
                  <p>
                    <label for="severity">
                      <span>Severity: </span>
                    </label>
                    <p>
                      <select name="severity">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </p>
                  </p>
                  <p>
                    <label for="description">
                      <span>Description: </span>
                    </label>
                    <p>
                      <fast-text-area name="desciption" rows="10" cols="30"></fast-text-area>
                    </p>
                  </p>
                </div>
                <div class="column">
                  <p>
                    <label for="assigned-to">
                      <span>Assigned To: </span>
                    </label>
                    <p>
                      <mgt-people-picker name="assigned-to"></mgt-people-picker>
                    </p>
                  </p>
                  <p>
                    <label for="teams">
                      <span>Send updates to Teams channel: </span>
                    </label>
                    <p>
                      <mgt-teams-channel-picker name="teams"></mgt-teams-channel-picker>
                    </p>
                  </p>
                  <p>
                    <label for="comment">
                      <span>Comment: </span>
                    </label>
                    <p>
                      <fast-text-area name="comment" rows="10" cols="30"></fast-text-area>
                    </p>
                  </p>
                </div>
              </section>
      
            </form>
      
            <div class="cta">
              <fast-button>cancel</fast-button>
              <fast-button>Save</fast-button>
            </div>
          </fast-card>
        </div>
      
      </div>
    `;
  }
}