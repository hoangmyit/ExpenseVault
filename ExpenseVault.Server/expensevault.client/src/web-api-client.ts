//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import followIfLoginRedirect from './components/api-authorization/followIfLoginRedirect';

export class CategoryClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getApiCategory(pageIndex: number, pageSize: number): Promise<PaginatedListOfCategoryDto> {
        let url_ = this.baseUrl + "/api/Category?";
        if (pageIndex === undefined || pageIndex === null)
            throw new Error("The parameter 'pageIndex' must be defined and cannot be null.");
        else
            url_ += "PageIndex=" + encodeURIComponent("" + pageIndex) + "&";
        if (pageSize === undefined || pageSize === null)
            throw new Error("The parameter 'pageSize' must be defined and cannot be null.");
        else
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetApiCategory(_response);
        });
    }

    protected processGetApiCategory(response: Response): Promise<PaginatedListOfCategoryDto> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PaginatedListOfCategoryDto.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginatedListOfCategoryDto>(null as any);
    }

    /**
     * @return OK
     */
    postApiCategory(command: CreateCategoryCommand): Promise<void> {
        let url_ = this.baseUrl + "/api/Category";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPostApiCategory(_response);
        });
    }

    protected processPostApiCategory(response: Response): Promise<void> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return null;
            });
        } else if (status === 201) {
            return response.text().then((_responseText) => {
            let result201: any = null;
            let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result201 = resultData201 !== undefined ? resultData201 : <any>null;
    
            return throwException("A server side error occurred.", status, _responseText, _headers, result201);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    getApiCategory2(id: string): Promise<CategoryDto> {
        let url_ = this.baseUrl + "/api/Category/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetApiCategory2(_response);
        });
    }

    protected processGetApiCategory2(response: Response): Promise<CategoryDto> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CategoryDto.fromJS(resultData200);
            return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            return throwException("A server side error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CategoryDto>(null as any);
    }

    /**
     * @return OK
     */
    putApiCategory(id: string, command: UpdateCategoryCommand): Promise<void> {
        let url_ = this.baseUrl + "/api/Category/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPutApiCategory(_response);
        });
    }

    protected processPutApiCategory(response: Response): Promise<void> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return null;
            });
        } else if (status === 204) {
            return response.text().then((_responseText) => {
            return null;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            return throwException("A server side error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return OK
     */
    deleteApiCategory(id: string): Promise<void> {
        let url_ = this.baseUrl + "/api/Category/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteApiCategory(_response);
        });
    }

    protected processDeleteApiCategory(response: Response): Promise<void> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return null;
            });
        } else if (status === 204) {
            return response.text().then((_responseText) => {
            return null;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            return throwException("A server side error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            return throwException("A server side error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }
}

export class WeatherForecastClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    weatherForecast_Get(): Promise<WeatherForecast[]> {
        let url_ = this.baseUrl + "/WeatherForecast";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processWeatherForecast_Get(_response);
        });
    }

    protected processWeatherForecast_Get(response: Response): Promise<WeatherForecast[]> {
        followIfLoginRedirect(response);
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(WeatherForecast.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<WeatherForecast[]>(null as any);
    }
}

export class PaginatedListOfCategoryDto implements IPaginatedListOfCategoryDto {
    items?: CategoryDto[];
    pageIndex?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;

    constructor(data?: IPaginatedListOfCategoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [] as any;
                for (let item of _data["items"])
                    this.items!.push(CategoryDto.fromJS(item));
            }
            this.pageIndex = _data["pageIndex"];
            this.totalPages = _data["totalPages"];
            this.totalCount = _data["totalCount"];
            this.hasPreviousPage = _data["hasPreviousPage"];
            this.hasNextPage = _data["hasNextPage"];
        }
    }

    static fromJS(data: any): PaginatedListOfCategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new PaginatedListOfCategoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            for (let item of this.items)
                data["items"].push(item.toJSON());
        }
        data["pageIndex"] = this.pageIndex;
        data["totalPages"] = this.totalPages;
        data["totalCount"] = this.totalCount;
        data["hasPreviousPage"] = this.hasPreviousPage;
        data["hasNextPage"] = this.hasNextPage;
        return data;
    }
}

export interface IPaginatedListOfCategoryDto {
    items?: CategoryDto[];
    pageIndex?: number;
    totalPages?: number;
    totalCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
}

export class CategoryDto implements ICategoryDto {
    id?: string;
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;

    constructor(data?: ICategoryDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.avatar = _data["avatar"];
            this.isDefault = _data["isDefault"];
        }
    }

    static fromJS(data: any): CategoryDto {
        data = typeof data === 'object' ? data : {};
        let result = new CategoryDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["avatar"] = this.avatar;
        data["isDefault"] = this.isDefault;
        return data;
    }
}

export interface ICategoryDto {
    id?: string;
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;
}

export class CreateCategoryCommand implements ICreateCategoryCommand {
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;

    constructor(data?: ICreateCategoryCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.avatar = _data["avatar"];
            this.isDefault = _data["isDefault"];
        }
    }

    static fromJS(data: any): CreateCategoryCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCategoryCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["avatar"] = this.avatar;
        data["isDefault"] = this.isDefault;
        return data;
    }
}

export interface ICreateCategoryCommand {
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;
}

export class UpdateCategoryCommand implements IUpdateCategoryCommand {
    id?: string;
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;

    constructor(data?: IUpdateCategoryCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.avatar = _data["avatar"];
            this.isDefault = _data["isDefault"];
        }
    }

    static fromJS(data: any): UpdateCategoryCommand {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateCategoryCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["avatar"] = this.avatar;
        data["isDefault"] = this.isDefault;
        return data;
    }
}

export interface IUpdateCategoryCommand {
    id?: string;
    name?: string;
    description?: string;
    avatar?: string;
    isDefault?: boolean;
}

export class WeatherForecast implements IWeatherForecast {
    date?: Date;
    temperatureC?: number;
    temperatureF?: number;
    summary?: string | undefined;

    constructor(data?: IWeatherForecast) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
            this.temperatureC = _data["temperatureC"];
            this.temperatureF = _data["temperatureF"];
            this.summary = _data["summary"];
        }
    }

    static fromJS(data: any): WeatherForecast {
        data = typeof data === 'object' ? data : {};
        let result = new WeatherForecast();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["date"] = this.date ? formatDate(this.date) : <any>undefined;
        data["temperatureC"] = this.temperatureC;
        data["temperatureF"] = this.temperatureF;
        data["summary"] = this.summary;
        return data;
    }
}

export interface IWeatherForecast {
    date?: Date;
    temperatureC?: number;
    temperatureF?: number;
    summary?: string | undefined;
}

function formatDate(d: Date) {
    return d.getFullYear() + '-' + 
        (d.getMonth() < 9 ? ('0' + (d.getMonth()+1)) : (d.getMonth()+1)) + '-' +
        (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
}

export class SwaggerException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new SwaggerException(message, status, response, headers, null);
}