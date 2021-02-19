import axios from "axios";
import { handleErrorMessage } from "../utils/handleErrorMessage";

export interface CreateCheckoutApiResponse {
  success: boolean;
  errorMessage: string;
  successMessage: string;
  status: number;
}
/**
 *  Great a checkout session
 *
 * Endpoints:
 * - POST https://api.mocklets.com/mock68075/
 * @param {FormData} form
 *
 * @returns Promise<CreateCheckoutApiResponse>
 */

export const createCheckoutApi = (
  form: any
): Promise<CreateCheckoutApiResponse> =>
  axios
    .post(`https://api.mocklets.com/mock68075/`, form, {
      headers: {
        "X-Mocklets-PublicKey": "txmovies",
        "X-Mocklets-Checksum": "830c7cd4a70be6540a4898441ca02951",
      },
    })
    .then((response: any) => {
      return {
        ...response,
        successMessage: "Purchase was successful",
        success: true,
      };
    })
    .catch((error) => {
      return {
        ...error,
        success: false,
        errorMessage: handleErrorMessage(error),
      };
    });
