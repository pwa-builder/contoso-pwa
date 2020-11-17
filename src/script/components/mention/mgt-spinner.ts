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
import { findUsers } from '@microsoft/mgt/dist/es6/graph/graph.user';
import {
  PersonType,
  findPeople,
} from '@microsoft/mgt/dist/es6/graph/graph.people';
import { classMap } from 'lit-html/directives/class-map';
import { repeat } from 'lit-html/directives/repeat';
import { MgtBaseComponent } from '@microsoft/mgt/dist/es6/components/baseComponent';

/**
 * Custom Component used to handle loading state in components.
 *
 * @export MgtSpinner
 * @class MgtSpinner
 * @extends {MgtBaseComponent}
 */
@customElement('mgt-spinner')
export class MgtSpinner extends MgtBaseComponent {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * user the `css` tag function.
   */
  public static get styles() {
    return [
      css`
        .spinner {
          border: 2px solid #c7e0f4; /* Light grey */
          border-top: 2px solid #0078d4; /* Blue */
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `,
    ];
  }

  /**
   * Render the loading spinner
   *
   * @returns
   * @memberof MgtSpinner
   */
  public render() {
    return html` <div class="spinner"></div> `;
  }
}
