import { stringify } from 'query-string';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

/**
 * Maps react-admin queries to a onem2m-server powered REST API
 *
 * @see http://www.onem2m.org/component/rsfiles/download-file/files?path=Release_3_Draft_TS%255CTS-0009-HTTP_Protocol_Binding-V3_0_0.docx&Itemid=238
 * @example
 * GET_LIST     => GET 
 * GET_ONE      => GET 
 * GET_MANY     => GET 
 * UPDATE       => PUT 
 * CREATE       => POST 
 * DELETE       => DELETE 
 */

export default (apiUrl, httpClient = fetchUtils.fetchJson, user="admin", password="admin") => {
    const onem2mResourceType = {
        'AE' : 2,
    }
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        options.headers = new Headers({
            Accept : "application/json",
        }) 
        options.headers.set('X-M2M-Origin', `${user}:${password}`)
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE: {
                /*
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };*/
                options.method = 'GET';
                url = `${apiUrl}?fu=1`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl.replace(/\/[^\/]*$/gi, '')}${params.id}`;
                break;
             /*{
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...fetchUtils.flattenObject(params.filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }*/
            case GET_MANY: {
                const query = {
                    [`id_like`]: params.ids.join('|'),
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                /*if (!headers.has('x-total-count')) {
                    throw new Error(
                        'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('x-total-count')
                            .split('/')
                            .pop(),
                        10
                    ),
                };*/
                return {
                    data: json["m2m:uril"].map(rn => {
                        return {
                            id:rn,
                            rn:rn.match(/[^\/]*$/gi)[0],
                        }
                    }),
                    total: json["m2m:uril"].length,
                }
            case GET_ONE:
                var rdata = json[Object.keys(json)[0]]
                rdata.id = params.id
                // convert lbl
                if (rdata.lbl) {
                    rdata.lbl = rdata.lbl.map((l)=>{
                        return {name:l}
                    })
                }
                return {
                    data: rdata    
                }
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};