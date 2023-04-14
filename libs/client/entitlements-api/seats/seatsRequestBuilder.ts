import {ErrorEscaped, ListSeatsResponsePagination, Seat, SeatRequest} from '../models/';
import {createErrorEscapedFromDiscriminatorValue} from '../models/createErrorEscapedFromDiscriminatorValue';
import {createListSeatsResponsePaginationFromDiscriminatorValue} from '../models/createListSeatsResponsePaginationFromDiscriminatorValue';
import {createSeatFromDiscriminatorValue} from '../models/createSeatFromDiscriminatorValue';
import {SeatsRequestBuilderGetRequestConfiguration} from './seatsRequestBuilderGetRequestConfiguration';
import {SeatsRequestBuilderPostRequestConfiguration} from './seatsRequestBuilderPostRequestConfiguration';
import {getPathParameters, HttpMethod, Parsable, ParsableFactory, RequestAdapter, RequestInformation, RequestOption, ResponseHandler} from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /seats
 */
export class SeatsRequestBuilder {
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /**
     * Instantiates a new SeatsRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        if(!pathParameters) throw new Error("pathParameters cannot be undefined");
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.urlTemplate = "{+baseurl}/seats{?limit*,offset*}";
        const urlTplParams = getPathParameters(pathParameters);
        this.pathParameters = urlTplParams;
        this.requestAdapter = requestAdapter;
    };
    /**
     * returns list of users occupying seats
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @param responseHandler Response handler to use in place of the default response handling provided by the core service
     * @returns a Promise of ListSeatsResponsePagination
     */
    public get(requestConfiguration?: SeatsRequestBuilderGetRequestConfiguration | undefined, responseHandler?: ResponseHandler | undefined) : Promise<ListSeatsResponsePagination | undefined> {
        const requestInfo = this.toGetRequestInformation(
            requestConfiguration
        );
        const errorMapping: Record<string, ParsableFactory<Parsable>> = {
            "500": createErrorEscapedFromDiscriminatorValue,
        };
        return this.requestAdapter?.sendAsync<ListSeatsResponsePagination>(requestInfo, createListSeatsResponsePaginationFromDiscriminatorValue, responseHandler, errorMapping) ?? Promise.reject(new Error('request adapter is null'));
    };
    /**
     * assign a user to a seat
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @param responseHandler Response handler to use in place of the default response handling provided by the core service
     * @returns a Promise of Seat
     */
    public post(body: SeatRequest | undefined, requestConfiguration?: SeatsRequestBuilderPostRequestConfiguration | undefined, responseHandler?: ResponseHandler | undefined) : Promise<Seat | undefined> {
        if(!body) throw new Error("body cannot be undefined");
        const requestInfo = this.toPostRequestInformation(
            body, requestConfiguration
        );
        const errorMapping: Record<string, ParsableFactory<Parsable>> = {
            "400": createErrorEscapedFromDiscriminatorValue,
        };
        return this.requestAdapter?.sendAsync<Seat>(requestInfo, createSeatFromDiscriminatorValue, responseHandler, errorMapping) ?? Promise.reject(new Error('request adapter is null'));
    };
    /**
     * returns list of users occupying seats
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a RequestInformation
     */
    public toGetRequestInformation(requestConfiguration?: SeatsRequestBuilderGetRequestConfiguration | undefined) : RequestInformation {
        const requestInfo = new RequestInformation();
        requestInfo.urlTemplate = this.urlTemplate;
        requestInfo.pathParameters = this.pathParameters;
        requestInfo.httpMethod = HttpMethod.GET;
        requestInfo.headers["Accept"] = ["application/json"];
        if (requestConfiguration) {
            requestInfo.addRequestHeaders(requestConfiguration.headers);
            requestInfo.setQueryStringParametersFromRawObject(requestConfiguration.queryParameters);
            requestInfo.addRequestOptions(requestConfiguration.options);
        }
        return requestInfo;
    };
    /**
     * assign a user to a seat
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a RequestInformation
     */
    public toPostRequestInformation(body: SeatRequest | undefined, requestConfiguration?: SeatsRequestBuilderPostRequestConfiguration | undefined) : RequestInformation {
        if(!body) throw new Error("body cannot be undefined");
        const requestInfo = new RequestInformation();
        requestInfo.urlTemplate = this.urlTemplate;
        requestInfo.pathParameters = this.pathParameters;
        requestInfo.httpMethod = HttpMethod.POST;
        requestInfo.headers["Accept"] = ["application/json"];
        if (requestConfiguration) {
            requestInfo.addRequestHeaders(requestConfiguration.headers);
            requestInfo.addRequestOptions(requestConfiguration.options);
        }
        requestInfo.setContentFromParsable(this.requestAdapter, "application/json", body);
        return requestInfo;
    };
}
