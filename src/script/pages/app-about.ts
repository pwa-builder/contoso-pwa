import { LitElement, css, html, customElement } from 'lit-element';
import { Providers, ProviderState, MsalProvider } from '@microsoft/mgt';

import '../components/sidebar';

export enum Status {
  /**
   * Needs Attention = 0
   */
  NeedsAttention,
  /**
   * Team Assigned = 1
   */
  TeamAssigned,
  /**
   * Team Deployed = 2
   */
  TeamDeployed,
  /**
   * Cleanup = 3
   */
  Cleanup,
  /**
   * Done = 4
   */
  Done,
}

export enum Severity {
  /**
   * Low = 0
   */
  Low,
  /**
   * Medium = 1
   */
  Medium,
  /**
   * High
   */
  High,
}

export class Information {
  status: Status;
  lead: [];
  severity: Severity;
  description: string;
  assignedTo: [];
  teamsChannel: {};
  comment: string;
  constructor() {
    const provider = Providers.globalProvider;
    this.status = Status.NeedsAttention;
    this.lead = [];
    this.severity = Severity.Low;
    this.description = '';
    this.assignedTo = [];
    this.teamsChannel = { team: '', channel: '' };
    this.comment = '';
  }
}

@customElement('app-about')
export class AppAbout extends LitElement {
  loggedInUserDisplayName: string = '';
  formInfo: Information;
  newFormInfo: Information;
  isSaveActive: Boolean = false;
  didStatusChange: Boolean = false;
  didLeadChange: Boolean = false;
  didSeverityChange: Boolean = false;
  didDescriptionChange: Boolean = false;
  didAssignedToChange: Boolean = false;
  didTeamsChannelChange: Boolean = false;
  didCommentChange: Boolean = false;
  feedStrings: any[] = [
    {
      displayName: 'John Firefighter',
      text: 'I am fighting this fire, looks like we are making progress!',
    },
  ];
  static generateStatusStrings(status: Status) {
    switch (status) {
      case Status.NeedsAttention:
        return 'Needs Attention';
      case Status.TeamAssigned:
        return 'Team Assigned';
      case Status.TeamDeployed:
        return 'Team Deployed';
      case Status.Cleanup:
        return 'Cleanup';
      case Status.Done:
        return 'Done';
      default:
        return '';
    }
  }

  static get styles() {
    return css`

    select  {
      width: 100%;
      height: 38px;
      border: 1px solid #8a8886;
    }

    textarea {
      width: 97%;
      padding: 0.5em;
      margin: 0 -2em 0 0;
      font-family: 'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
    }

    p {
      margin: 0;
    }

    fast-button {
      background-color: white;
      color: black;
      border: 1px solid #8a8886;
      width: 130px;
      border-radius: 50px;
    }

    fast-button.primary {
      background-color: #0078D4;
      color: #ffffff;
      border: 1px solid #0078D4;
      margin-left: 15px;
    }

    mgt-people-picker,
    mgt-teams-channel-picker {
      --input-border-top: 1px solid #8a8886;
      --input-border-right: 1px solid #8a8886;
      --input-border-bottom: 1px solid #8a8886;
      --input-border-left: 1px solid #8a8886;

    }

    .feed {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 300px
    }

    .feed__card {
      flex: 1;
    }

    .form-wrapper {
      width: calc(100% - 700px);
      position: absolute;
      right: 0;
      margin: 50px 200px;
      background-color: #ffffff;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.03);
      border-radius: 5px;
    }

    .form {
      color: #14142B;
    }

    hr.solid {
      margin: 20px -50px 0;
      border: 0;
    }

    .status-bar {
      padding: 32px 50px 0;
    }

    .status-bar h2 {
      font-size: 28px;
    }

    .main {
      padding: 40px 50px;
      background-color: #fafafa;
      display: flex;
      justify-content: space-around;
    }

    .column {
      width: 45%;
    }

    .column.left {
      padding-right: 50px;
    }

    p.label {
      margin: 1.5em 0 0.5em;
      font-weight: 700;
      font-size: 12px;
    }

    span.label {
      font-size: 14px;
      font-weight: 400;
      color: #14142B;
      opacity: 0.44;
    }

    p.disabled {
      margin: 1.5em 0 3em;
    }

    .cta {
      padding: 0 50px 50px;
      text-align: right;
      background-color: #fafafa;
    }
    `;
  }

  constructor() {
    super();

    this.formInfo = new Information();
    this.newFormInfo = new Information();
  }

  onClickSave() {
    const provider = Providers.globalProvider;
    // if (provider.state === ProviderState.SignedIn) {
    //   this.loggedInUserDisplayName = (document
    //     .querySelector('body > fast-design-system-provider > app-index')
    //     .shadowRoot.querySelector('div > app-header')
    //     .shadowRoot.querySelector('#me')
    //     .querySelector('#me') as any).userDetails.displayName;
    //   console.log('DisplayName', this.loggedInUserDisplayName);
    // }

    if (
      this.didStatusChange ||
      this.didLeadChange ||
      this.didSeverityChange ||
      this.didDescriptionChange ||
      this.didAssignedToChange ||
      this.didTeamsChannelChange
    ) {
      this.feedStrings.push({ displayName: 'Megan Bowen', text: '' });
    }
    let index = this.feedStrings.length - 1;

    if (this.didStatusChange) {
      this.feedStrings[index].text +=
        'Status was changed to ' +
        AppAbout.generateStatusStrings(this.newFormInfo.status) +
        '\n';
      this.formInfo.status = this.newFormInfo.status;
    }

    if (this.didLeadChange) {
      this.feedStrings[index].text += 'Leads assigned: ';
      this.newFormInfo.lead.forEach((element: any) => {
        console.log(element.displayName);
        this.feedStrings[index].text += element.displayName + ' ';
      }) + '\n';
      this.formInfo.lead = this.newFormInfo.lead;
    }

    if (this.didSeverityChange) {
      this.feedStrings[index].text +=
        'Severity changed to: ' + Severity[this.newFormInfo.severity] + '\n';
      this.formInfo.severity = this.newFormInfo.severity;
    }

    if (this.didDescriptionChange) {
      this.feedStrings[index].text += this.newFormInfo.description + '\n';
    }

    if (this.didAssignedToChange) {
      this.feedStrings[index].text += 'Assigned To: ';
      this.newFormInfo.assignedTo.forEach((element: any) => {
        console.log(element.displayName);
        this.feedStrings[index].text += element.displayName + ' ';
      }) + '\n';
      this.formInfo.assignedTo = this.newFormInfo.assignedTo;
    }

    if (this.didTeamsChannelChange) {
      this.feedStrings[index].text +=
        'Update to teams channel: ' +
        (this.newFormInfo.teamsChannel as any).team.displayName +
        ' > ' +
        (this.newFormInfo.teamsChannel as any).channel.displayName +
        '\n';
      (this.formInfo.teamsChannel as any).team = (this.newFormInfo
        .teamsChannel as any).team;
      (this.formInfo.teamsChannel as any).channel = (this.newFormInfo
        .teamsChannel as any).channel;
    }
    console.log('this.feedstring', this.feedStrings);
    this.didStatusChange = this.didLeadChange = this.didSeverityChange = this.didAssignedToChange = this.didDescriptionChange = this.didTeamsChannelChange = false;
    this.updateSave();
  }

  onStatusChange() {
    this.newFormInfo.status = Number(
      (this.renderRoot.querySelector('#status') as HTMLSelectElement).value
    );

    if (this.newFormInfo.status !== this.formInfo.status) {
      this.didStatusChange = true;
    } else {
      this.didStatusChange = false;
    }
    this.updateSave();
  }

  onLeadChange() {
    this.newFormInfo.lead = (this.renderRoot.querySelector(
      '#lead'
    ) as any).selectedPeople;
    if (this.newFormInfo.lead.length === this.formInfo.lead.length) {
      for (var i = 0; i < this.newFormInfo.lead.length; i++) {
        if (
          (this.newFormInfo.lead[i] as any).id !==
          (this.formInfo.lead[i] as any).id
        ) {
          this.didLeadChange = true;
          return;
        }
      }
      this.didLeadChange = false;
    } else this.didLeadChange = true;

    this.updateSave();
  }

  onSeverityChange() {
    this.newFormInfo.severity = Number(
      (this.renderRoot.querySelector('#severity') as HTMLSelectElement).value
    );
    if (this.newFormInfo.severity !== this.formInfo.severity) {
      this.didSeverityChange = true;
    } else {
      this.didSeverityChange = false;
    }

    this.updateSave();
  }
  onDescriptionChange() {
    this.newFormInfo.description = (this.renderRoot.querySelector(
      '#description'
    ) as HTMLInputElement).value;
    if (this.newFormInfo.description !== this.formInfo.description) {
      this.didDescriptionChange = true;
    } else {
      this.didDescriptionChange = false;
    }
    this.updateSave();
  }

  onAssignedToChange() {
    this.newFormInfo.lead = (this.renderRoot.querySelector(
      '#assigned'
    ) as any).selectedPeople;
    if (
      this.newFormInfo.assignedTo.length === this.formInfo.assignedTo.length
    ) {
      for (var i = 0; i < this.newFormInfo.assignedTo.length; i++) {
        if (
          (this.newFormInfo.assignedTo[i] as any).id !==
          (this.formInfo.assignedTo[i] as any).id
        ) {
          this.didAssignedToChange = true;
          return;
        }
      }
      this.didAssignedToChange = false;
    } else this.didAssignedToChange = true;

    this.updateSave();
  }

  onTeamsChannelChange() {
    let selectedItem = (this.renderRoot.querySelector('#teams') as any)
      .selectedItem;
    if (selectedItem !== undefined) {
      (this.newFormInfo.teamsChannel as any).team = selectedItem.team;
      (this.newFormInfo.teamsChannel as any).channel = selectedItem.channel;
    }
    if (
      (this.newFormInfo.teamsChannel as any).team !==
        (this.formInfo.teamsChannel as any).team ||
      (this.newFormInfo.teamsChannel as any).channel !==
        (this.formInfo.teamsChannel as any).channel
    ) {
      this.didTeamsChannelChange = true;
    } else {
      this.didTeamsChannelChange = false;
    }
    this.updateSave();
  }

  onCommentChange() {}

  updateSave() {
    if (
      this.didStatusChange ||
      this.didLeadChange ||
      this.didSeverityChange ||
      this.didDescriptionChange ||
      this.didAssignedToChange ||
      this.didTeamsChannelChange
    ) {
      (this.renderRoot.querySelector('#save') as any).disabled = false;
    } else {
      (this.renderRoot.querySelector('#save') as any).disabled = true;
    }
    super.requestUpdate();
  }
  render() {
    return html`
      <div>
        <side-bar>
          <div class="feed__card">
            <h2>Feed</h2>      
            <ul>
              <fast-card>
                ${this.feedStrings.map((info) => {
                  return html`<h3>${info.displayName}</h3>
                    <p>${info.text}</p>`;
                })}
              </fast-card>
      
              <fast-card>
      
              </fast-card>
            </ul>
          </div>
        </side-bar>
      
        <div class="form-wrapper">
          
      
          <div class="form">
      
            <form>
              <section class="status-bar">
              <h2>Information:</h2>
                <div>
                   ${Object.values(Status).map((element: Status) => {
                     if (!isNaN(Number(element))) {
                       return html`<span
                         >${AppAbout.generateStatusStrings(element)}</span
                       >`;
                     }
                   })}
                </div>
                <hr class="solid">
              </section>
      
              <section class="main">
                <div class="column left">
                  <p class="label">
                    <label for="status">
                      <span>Status: </span>
                    </label>
                    <p>
                      <select id="status" name="status" .value=${
                        this.formInfo.status
                      } @change="${(e) =>
      // this.onStatusChange(e)
      this.onStatusChange()}">
                      ${Object.values(Status).map((element: Status) => {
                        if (!isNaN(Number(element))) {
                          return html`<option value=${element}>
                            ${AppAbout.generateStatusStrings(element)}
                          </option>`;
                        }
                      })}
                        <!-- <option value="needs-attention">Needs attention</option>
                        <option value="team-assigned">Team assigned</option>
                        <option value="team-deployed">Team deployed</option>
                        <option value="cleanup">Cleanup</option>
                        <option value="done">Done</option> -->
                      </select>
                    </p>
                  </p>
                  <p class="label">
                    <label for="lead">
                      <span>Lead: </span>
                    </label>
                    <p>
                      <mgt-people-picker name="lead" id="lead" @selectionChanged="${() =>
                        this.onLeadChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p class="label">
                    <label for="severity">
                      <span>Severity: </span>
                    </label>
                    <p>
                      <select name="severity" id="severity" @change="${() =>
                        this.onSeverityChange()}">
                      ${Object.values(Severity).map((element: Severity) => {
                        if (isNaN(Number(element))) {
                          return html`<option value=${Severity[element]}>
                            ${element}
                          </option>`;
                        }
                      })}
                      </select>
                    </p>
                  </p>
                  <p class="label">
                    <label for="description">
                      <span>Description: </span>
                    </label>
                    <p>
                      <textarea @change="${() =>
                        this.onDescriptionChange()}"  name="description" rows="10" cols="30">Fire started due to campfire near xxx lake. Reported around 10 pm by one of the nearby campers on site.</textarea>
                    </p>
                  </p>
                </div>
                <div class="column right">
                  <p class="disabled">
                    <p>
                      <span class="label">Affected area: </span>
                      <span>50 acres</span>
                    </p>
                    <p>
                      <span class="label">Estimated # of affected people: </span>
                      <span>40</span>
                    </p>
                  </p>
                  <p class="label">
                    <label for="assigned">
                      <span>Assigned To: </span>
                    </label>
                    <p>
                    <mgt-people-picker name="assigned" id="assigned" @selectionChanged="${() =>
                      this.onAssignedToChange()}"></mgt-people-picker>
                    </p>
                  </p>
                  <p class="label">
                    <label for="teams">
                      <span>Send updates to Teams channel: </span>
                    </label>
                    <p>
                      <mgt-teams-channel-picker name="teams" id="teams" @selectionChanged="${() =>
                        this.onTeamsChannelChange()}"></mgt-teams-channel-picker>
                    </p>
                  </p>
                  <p class="label">
                    <label for="comment">
                      <span>Comment: </span>
                    </label>
                    <p>
                      <textarea name="comment" rows="10" cols="30" placeholder="Leave your comment here..."></textarea>
                    </p>
                  </p>
                </div>
              </section>
      
            </form>
      
            <div class="cta">
              <fast-button>cancel</fast-button>
              <fast-button id="save" @click="${() =>
                this.onClickSave()}" disabled class="primary">Save</fast-button>
            </div>
          </div>
        </div>
      
      </div>
    `;
  }
}
