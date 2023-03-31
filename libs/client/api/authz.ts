import {V1alphaRequestBuilder} from './v1alpha/v1alphaRequestBuilder';
import {registerDefaultDeserializer, registerDefaultSerializer, RequestAdapter} from '@microsoft/kiota-abstractions';
import {JsonParseNodeFactory, JsonSerializationWriterFactory} from '@microsoft/kiota-serialization-json';

/**
 * The main entry point of the SDK, exposes the configuration and the fluent API.
 */
export class Authz {
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /** The v1alpha property */
    public get v1alpha(): V1alphaRequestBuilder {
        return new V1alphaRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /**
     * Instantiates a new Authz and sets the default values.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(requestAdapter: RequestAdapter) {
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.pathParameters = {};
        this.urlTemplate = "{+baseurl}";
        this.requestAdapter = requestAdapter;
        registerDefaultSerializer(JsonSerializationWriterFactory);
        registerDefaultDeserializer(JsonParseNodeFactory);
        // if (requestAdapter.baseUrl === undefined || requestAdapter.baseUrl === "") {
        //     requestAdapter.baseUrl = "https://ciam-authz-hw-ciam-authz--runtime-ext.apps.ext.spoke.preprod.us-east-1.aws.paas.redhat.com";
        // }
        this.pathParameters["baseurl"] = "";
    };
}
