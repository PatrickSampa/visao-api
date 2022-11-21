import { RequestInformationForSamir } from './RequestInformationForSamir';
import { RequestInformationForSamirController } from './RequestInformationForSamirController';

const requestInformationForSamir = new RequestInformationForSamir();
const requestInformationForSamirController = new RequestInformationForSamirController(requestInformationForSamir);

export {requestInformationForSamir, requestInformationForSamirController};