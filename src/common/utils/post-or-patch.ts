import { useFetch } from '#root/composables/useFetch';
import { PageContext } from '#root/renderer/types';
import { FetchOptions } from 'ofetch';

/** Just a lazy way to tidy up the decision making whether a FormComponent should do a `POST` or a `PATCH` request.
 * This operates under the assumption that the Web API complies to the `POST ./domain` and `PATCH ./domain/:id` format.
 *
 * **NOTE:** This small layer of abstraction may sacrifice readability and maintainability so it is not a good practice.
 * That said, this helps simplify a small area for the form components with too many things going on in the setup script.
 * @returns arguments for the composable `useFetch`
 */
export default function postOrPatch(
  entity: { id: number | string } | undefined | null,
  domainUrl: string,
  pageContext?: PageContext,
): Parameters<typeof useFetch> {
  const request: Parameters<typeof useFetch>[] = [
    [domainUrl, { method: 'POST' }, pageContext],
    [domainUrl + '/' + entity?.id, { method: 'PATCH' }, pageContext],
  ];

  // Bypass TS prohibitting bitwise operation with boolean
  const i = (!!entity as unknown as number) | 0;
  return request[i]; // request[!!subject | 0]
}
