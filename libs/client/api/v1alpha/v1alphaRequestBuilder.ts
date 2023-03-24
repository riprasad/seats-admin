import {CheckRequestBuilder} from './check/checkRequestBuilder';
import {WithOrgItemRequestBuilder} from './orgs/item/withOrgItemRequestBuilder';
import {OrgsRequestBuilder} from './orgs/orgsRequestBuilder';
import {getPathParameters, RequestAdapter} from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /v1alpha
 */
export class V1alphaRequestBuilder {
    /** The check property */
    public get check(): CheckRequestBuilder {
        return new CheckRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** The orgs property */
    public get orgs(): OrgsRequestBuilder {
        return new OrgsRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /**
     * Instantiates a new V1alphaRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        if(!pathParameters) throw new Error("pathParameters cannot be undefined");
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.urlTemplate = "{+baseurl}/v1alpha";
        const urlTplParams = getPathParameters(pathParameters);
        this.pathParameters = urlTplParams;
        this.requestAdapter = requestAdapter;
    };
    /**
     * Gets an item from the ApiSdk.v1alpha.orgs.item collection
     * @param id Unique identifier of the item
     * @returns a WithOrgItemRequestBuilder
     */
    public orgsById(id: string) : WithOrgItemRequestBuilder {
        if(!id) throw new Error("id cannot be undefined");
        const urlTplParams = getPathParameters(this.pathParameters);
        urlTplParams["orgId"] = id
        return new WithOrgItemRequestBuilder(urlTplParams, this.requestAdapter);
    };
}
