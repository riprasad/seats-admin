import {WithServiceItemRequestBuilder} from './licenses/item/withServiceItemRequestBuilder';
import {LicensesRequestBuilder} from './licenses/licensesRequestBuilder';
import {getPathParameters, RequestAdapter} from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /v1alpha/orgs/{orgId}
 */
export class WithOrgItemRequestBuilder {
    /** The licenses property */
    public get licenses(): LicensesRequestBuilder {
        return new LicensesRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /**
     * Instantiates a new WithOrgItemRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        if(!pathParameters) throw new Error("pathParameters cannot be undefined");
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.urlTemplate = "{+baseurl}/v1alpha/orgs/{orgId}";
        const urlTplParams = getPathParameters(pathParameters);
        this.pathParameters = urlTplParams;
        this.requestAdapter = requestAdapter;
    };
    /**
     * Gets an item from the ApiSdk.v1alpha.orgs.item.licenses.item collection
     * @param id Unique identifier of the item
     * @returns a WithServiceItemRequestBuilder
     */
    public licensesById(id: string) : WithServiceItemRequestBuilder {
        if(!id) throw new Error("id cannot be undefined");
        const urlTplParams = getPathParameters(this.pathParameters);
        urlTplParams["serviceId"] = id
        return new WithServiceItemRequestBuilder(urlTplParams, this.requestAdapter);
    };
}
