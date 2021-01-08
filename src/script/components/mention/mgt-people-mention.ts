import { User } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson, MgtPeoplePicker } from '@microsoft/mgt';
import {
  css,
  customElement,
  html,
  internalProperty,
  TemplateResult,
} from 'lit-element';
import { Providers, ProviderState } from '@microsoft/mgt';
import { findUsers } from '@microsoft/mgt-components/dist/es6/graph/graph.user';
import {
  PersonType,
  findPeople,
} from '@microsoft/mgt-components/dist/es6/graph/graph.people';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
//import { styles } from './mgt-people-mention-css';
/**
 * An interface used to mark an object as 'focused',
 * so it can be rendered differently.
 *
 * @interface IFocusable
 */
interface IFocusable {
  // tslint:disable-next-line: completed-docs
  isFocused: boolean;
}

@customElement('mgt-people-mention')
export class MgtPeopleMention extends MgtPeoplePicker {
  private atmention: boolean = false;
  private inputQuery: string = '';
  public people: IDynamicPerson[] = [];
  public selected_people: IDynamicPerson[] = [];
  @internalProperty() private _foundPeopleList: IDynamicPerson[] = [];

  // public person_on_focus: IDynamicPerson ;

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 50) {
      this.atmention = true;
    }
    const input = event.target as HTMLDivElement;
    if (this.atmention) {
      if (input.textContent !== null && input.textContent !== undefined) {
        this.inputQuery = input.textContent.substring(
          input.textContent.lastIndexOf('@') + 1
        );
        this.loadState();
      }
      //this.handleUserSearch(this.inputQuery);
    }
    this.fireCustomEvent('textChanged', input.textContent);
  }

  protected async loadState(): Promise<void> {
    const input = this.inputQuery.toLowerCase();
    let people = this.people;

    const provider = Providers.globalProvider;

    if (
      people.length === 0 &&
      provider &&
      provider.state === ProviderState.SignedIn
    ) {
      const graph = provider.graph.forComponent(this);
      if (input) {
        people = [];
        if (this.type === PersonType.person || this.type === PersonType.any) {
          try {
            people = (await findPeople(graph, input, 9)) || [];
          } catch (e) {
            // nop
          }

          if (people.length < 9) {
            try {
              const users = (await findUsers(graph, input, 9)) || [];

              // make sure only unique people
              const peopleIds = new Set(people.map((p) => p.id));
              for (const user of users) {
                if (!peopleIds.has(user.id)) {
                  people.push(user);
                }
              }
            } catch (e) {
              // nop
            }
          }
        }
      }

      this._foundPeopleList = people;
      this.requestUpdate();
      this.showFlyout();
    }
  }

  public setText(text: string) {
    (this.renderRoot.querySelector(
      '#mentionbox'
    ) as HTMLDivElement).textContent = text;
  }
  protected showFlyout(): void {
    const flyout = this.flyout;
    if (flyout && this.atmention) {
      flyout.open();
    }
  }

  protected renderFlyout(anchor: TemplateResult): TemplateResult {
    return html`
      <mgt-flyout light-dismiss class="flyout">
        ${anchor}
        <div
          slot="flyout"
          style="
    background: white;
    color: black;"
        >
          <div class="flyout-root">${this.renderFlyoutContent()}</div>
        </div>
      </mgt-flyout
    `;
  }

  protected renderFlyoutContent(): TemplateResult {
    let people = this._foundPeopleList;
    if (people !== undefined && people.length > 0) {
      return this.renderSearchResults(people);
    }
    return html``;
  }

  protected renderSearchResults(people?: IDynamicPerson[]) {
    people = people || this._foundPeopleList;

    return html`
      <div class="people-list">
        ${repeat(
          people,
          (person) => person.id,
          (person) => {
            const listPersonClasses = {
              focused: (person as IFocusable).isFocused,
              'list-person': true,
            };
            return html`
              <li class="${classMap(listPersonClasses)}">
                ${this.renderPersonResult(person)}
              </li>
            `;
          }
        )}
      </div>
    `;
  }

  render() {
    const inputClasses = {
      'people-picker': true,
    };

    const inputTemplate = html`<div
      contenteditable="true"
      role="textarea"
      id="mentionbox"
      class="people-selected-input"
      @keyup="${this.onKeyUp}"
      style="display: block;
        overflow: hidden;
        resize: both;
        min-height: 20px;
        line-height: 20px;
        margin-bottom: -6px;
        padding: 8px;"
    ></div>`;
    const flyoutTemplate = this.renderFlyout(inputTemplate);
    return html`
      <div class=${classMap(inputClasses)} style="padding-top: 0; padding-bottom:6px;">
        <div class="people-selected-list">${flyoutTemplate}</div>
      </div>
    `;
  }

  protected renderPersonResult(person: IDynamicPerson): TemplateResult {
    const user = person as User;
    const subTitle = user.jobTitle || user.mail;

    const classes = {
      'people-person-job-title': true,
      uppercase: !!user.jobTitle,
    };
    return (
      this.renderTemplate('person', { person }, person.id) ||
      html`
        <mgt-person .personDetails=${person} .fetchImage=${true}></mgt-person>
        <div
          class="people-person-text-area"
          id="${person.displayName}"
          style="color: black;"
          @click="${() => this.onPersonSelectClick(person)}"
        >
          ${person.displayName}
          <span class="${classMap(classes)}">${subTitle}</span>
        </div>
      `
    );
  }

  private onPersonSelectClick(person: IDynamicPerson): void {
    this.atmention = false;
    this.hideFlyout();
    this.selected_people.push(person);

    (this.renderRoot.querySelector(
      '#mentionbox'
    ) as HTMLDivElement).innerHTML = (this.renderRoot.querySelector(
      '#mentionbox'
    ) as HTMLDivElement).innerHTML.replace('@' + this.inputQuery, '');

    const mydiv = this.renderRoot.querySelector(
      '#mentionbox'
    ) as HTMLDivElement;
    const aTag = document.createElement('span');

    (aTag as HTMLElement).innerText = person.displayName as string;
    (aTag as HTMLElement).style.color = '#47a5d2';

    aTag.setAttribute('id', this.selected_people.length.toString());

    mydiv.innerHTML += '&#8205;';
    mydiv.appendChild(aTag);
    mydiv.innerHTML += '&#8205;';

    var ele = this.renderRoot.querySelector('#mentionbox') as HTMLDivElement;
    var length =
      (this.renderRoot.querySelector('#mentionbox') as HTMLDivElement).innerText
        .length - 1;
    var rng = document.createRange();
    var sel = window.getSelection();
    rng.setStart(ele.childNodes[ele.childNodes.length - 1], 1);
    rng.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(rng);
    ele?.focus();
    this.fireCustomEvent('textChanged', mydiv.innerHTML);
  }

  protected hideFlyout(): void {
    const flyout = this.flyout;
    if (flyout) {
      flyout.close();
    }
  }
}
