<<<<<<< HEAD
import request from './request';
=======
import request from '../libs/request';
>>>>>>> 435fb5ebc473546a59fc0b9150a6c57d2da31ef3

export const mem = params => request('luna://com.webos.memorymanager')(params);

export const sam = params =>
	request('luna://com.webos.applicationManager')(params);
