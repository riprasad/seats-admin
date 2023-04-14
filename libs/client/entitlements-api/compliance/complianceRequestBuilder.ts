import {ComplianceScreeningErrorResponse, ComplianceScreeningResponse, DependencyErrorResponse} from '../models/';
import {createComplianceScreeningErrorResponseFromDiscriminatorValue} from '../models/createComplianceScreeningErrorResponseFromDiscriminatorValue';
import {createComplianceScreeningResponseFromDiscriminatorValue} from '../models/createComplianceScreeningResponseFromDiscriminatorValue';
import {createDependencyErrorResponseFromDiscriminatorValue} from '../models/createDependencyErrorResponseFromDiscriminatorValue';
import {ComplianceRequestBuilderGetRequestConfiguration} from './complianceRequestBuilderGetRequestConfiguration';
import {getPathParameters, HttpMethod, Parsable, ParsableFactory, RequestAdapter, RequestInformation, RequestOption, ResponseHandler} from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /compliance
 */
export class ComplianceRequestBuilder {
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /**
     * Instantiates a new ComplianceRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        if(!pathParameters) throw new Error("pathParameters cannot be undefined");
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.urlTemplate = "{+baseurl}/compliance";
        const urlTplParams = getPathParameters(pathParameters);
        this.pathParameters = urlTplParams;
        this.requestAdapter = requestAdapter;
    };
    /**
     * verify exports compliance for a given user
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @param responseHandler Response handler to use in place of the default response handling provided by the core service
     * @returns a Promise of ComplianceScreeningResponse
     */
    public get(requestConfiguration?: ComplianceRequestBuilderGetRequestConfiguration | undefined, responseHandler?: ResponseHandler | undefined) : Promise<ComplianceScreeningResponse | undefined> {
        const requestInfo = this.toGetRequestInformation(
            requestConfiguration
        );
        const errorMapping: Record<string, ParsableFactory<Parsable>> = {
            "400": createComplianceScreeningErrorResponseFromDiscriminatorValue,
            "500": createDependencyErrorResponseFromDiscriminatorValue,
        };
        return this.requestAdapter?.sendAsync<ComplianceScreeningResponse>(requestInfo, createComplianceScreeningResponseFromDiscriminatorValue, responseHandler, errorMapping) ?? Promise.reject(new Error('request adapter is null'));
    };
    /**
     * verify exports compliance for a given user
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a RequestInformation
     */
    public toGetRequestInformation(requestConfiguration?: ComplianceRequestBuilderGetRequestConfiguration | undefined) : RequestInformation {
        const requestInfo = new RequestInformation();
        requestInfo.urlTemplate = this.urlTemplate;
        requestInfo.pathParameters = this.pathParameters;
        requestInfo.httpMethod = HttpMethod.GET;
        requestInfo.headers["Accept"] = ["application/json"];
        if (requestConfiguration) {
            requestInfo.addRequestHeaders(requestConfiguration.headers);
            requestInfo.addRequestOptions(requestConfiguration.options);
        }
        return requestInfo;
    };
}
