// 请求响应参数
export interface Result {
	code: string;
	message: string;
}

// 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}