import { APP_ID } from "../constants";
import bridge from '@vkontakte/vk-bridge';


class AuthData {

    access_token = null;

    getAuthToken(scope) {
        const scopeQuery = (scope || []).join(',');
        if (this.access_token) {
            return Promise.resolve(this.access_token);
        }
        return bridge.send("VKWebAppGetAuthToken", { app_id: APP_ID, scope: scopeQuery })
            .then(response => {
                if (response && response.access_token) {
                    return response.access_token;
                }
                return Promise.reject('Токен не найден');
            })
            .catch(err => console.log('Не удалось получить токен', err))
    }

}

export const authData = new AuthData();
