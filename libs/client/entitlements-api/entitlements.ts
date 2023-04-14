import {ComplianceRequestBuilder} from './compliance/complianceRequestBuilder';
import {SeatsItemRequestBuilder} from './seats/item/seatsItemRequestBuilder';
import {SeatsRequestBuilder} from './seats/seatsRequestBuilder';
import {ServicesRequestBuilder} from './services/servicesRequestBuilder';
import {enableBackingStoreForSerializationWriterFactory, getPathParameters, ParseNodeFactoryRegistry, registerDefaultDeserializer, registerDefaultSerializer, RequestAdapter, SerializationWriterFactoryRegistry} from '@microsoft/kiota-abstractions';
import {JsonParseNodeFactory, JsonSerializationWriterFactory} from '@microsoft/kiota-serialization-json';

/**
 * The main entry point of the SDK, exposes the configuration and the fluent API.
 */
export class Entitlements {
    /** The compliance property */
    public get compliance(): ComplianceRequestBuilder {
        return new ComplianceRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** Path parameters for the request */
    private pathParameters: Record<string, unknown>;
    /** The request adapter to use to execute the requests. */
    private requestAdapter: RequestAdapter;
    /** The seats property */
    public get seats(): SeatsRequestBuilder {
        return new SeatsRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** The services property */
    public get services(): ServicesRequestBuilder {
        return new ServicesRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /** Url template to use to build the URL for the current request builder */
    private urlTemplate: string;
    /**
     * Instantiates a new Entitlements and sets the default values.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(requestAdapter: RequestAdapter) {
        if(!requestAdapter) throw new Error("requestAdapter cannot be undefined");
        this.pathParameters = {};
        this.urlTemplate = "{+baseurl}";
        this.requestAdapter = requestAdapter;
        registerDefaultSerializer(JsonSerializationWriterFactory);
        registerDefaultDeserializer(JsonParseNodeFactory);
        if (requestAdapter.baseUrl === undefined || requestAdapter.baseUrl === "") {
            requestAdapter.baseUrl = "/api/entitlements/v1";
        }
        this.pathParameters["baseurl"] = requestAdapter.baseUrl;
    };
    /**
     * Gets an item from the ApiSdk.seats.item collection
     * @param id Unique identifier of the item
     * @returns a SeatsItemRequestBuilder
     */
    public seatsById(id: string) : SeatsItemRequestBuilder {
        if(!id) throw new Error("id cannot be undefined");
        const urlTplParams = getPathParameters(this.pathParameters);
        urlTplParams["id"] = id
        return new SeatsItemRequestBuilder(urlTplParams, this.requestAdapter);
    };
}
