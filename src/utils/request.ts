/**
 * Custom request network request tool
 * More detailed api documentation: https://github.com/umijs/umi-request
 * @author LiQingSong
 */
import { history } from 'umi';
import { extend } from 'umi-request';
import { notification } from 'antd';
import settings from '@/config/settings';
import { getToken, setToken } from '@/utils/localToken';

export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
  token?: string;
}

const customCodeMessage: any = {
  10002: 'The current user login information is invalid, please log in again to operate', // Not logged in
};

const serverCodeMessage: any = {
  200: 'The server successfully returned the requested data',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'An error occurred on the server, please check the server(Internal Server Error)',
  502: 'Gateway error (Bad Gateway)',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained (Service Unavailable)',
  504: 'Gateway timeout (Gateway Timeout)',
};

/**
 * Exception handler
 */
const errorHandler = (error: {
  response: Response;
  message: string;
  data: any;
}) => {
  const { response, message, data } = error;

  if (message === 'CustomError') {
    // Custom error

    const { req, res } = data;
    const { url } = req;
    const { code } = res;

    const reqUrl = url.split('?')[0].replace(API_HOST, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: `Prompt`,
        description: customCodeMessage[code] || res.msg || 'Error',
      });

      if (code === 10002) {
        history.replace({
          pathname: '/user/login',
        });
      }
    }
  } else if (message === 'CancelToken') {
    // Cancel request Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and you cannot connect to the server',
      message: 'network anomaly',
    });
  }

  // return error; // If return. returns normally, follow the normal process of try.

  throw error; // If throw. error will continue to be thrown, follow the catch process.
};

/**
 * Configure the default parameters of the request request
 */
const request = extend({
  errorHandler, // Default error handling
  credentials: 'same-origin', // Does the default request bring cookies
  prefix: API_HOST,
});

request.use(async (ctx, next) => {
  // Before request
  const { req } = ctx;
  const { options } = req;

  const headers = {};
  const headerToken = await getToken();
  if (headerToken) {
    headers[settings.ajaxHeadersTokenKey] = headerToken;
  }

  ctx.req.options = {
    ...options,
    headers,
  };

  await next();

  // After request
  const { res } = ctx;
  const { code, token } = res;

  /**
   * Unified ajax verification
   * If the custom code is not 0, it is judged as an error.
   */
  if (code !== 0) {
    return Promise.reject({
      data: ctx,
      message: 'CustomError',
    });
  }

  // Reset refresh token
  if (token) {
    await setToken(token);
  }
});

export default request;
