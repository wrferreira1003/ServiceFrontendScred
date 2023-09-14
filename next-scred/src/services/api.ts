import { getApiClient } from "./apiservidor";
import { getApiClientUser } from "./apiuser";

//Iremos usar o api para apenas chamada que iremos fazer pelo browser
export const apiuser = getApiClientUser();

export const api = getApiClient();


