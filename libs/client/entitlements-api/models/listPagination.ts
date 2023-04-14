import {createPaginationLinksFromDiscriminatorValue} from './createPaginationLinksFromDiscriminatorValue';
import {createPaginationMetaFromDiscriminatorValue} from './createPaginationMetaFromDiscriminatorValue';
import {PaginationLinks, PaginationMeta} from './index';
import {AdditionalDataHolder, Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class ListPagination implements AdditionalDataHolder, Parsable {
    /** Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well. */
    private _additionalData: Record<string, unknown>;
    /** The links property */
    private _links?: PaginationLinks | undefined;
    /** The meta property */
    private _meta?: PaginationMeta | undefined;
    /**
     * Gets the additionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @returns a Record<string, unknown>
     */
    public get additionalData() {
        return this._additionalData;
    };
    /**
     * Sets the additionalData property value. Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well.
     * @param value Value to set for the AdditionalData property.
     */
    public set additionalData(value: Record<string, unknown>) {
        this._additionalData = value;
    };
    /**
     * Instantiates a new ListPagination and sets the default values.
     */
    public constructor() {
        this._additionalData = {};
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "links": n => { this.links = n.getObjectValue<PaginationLinks>(createPaginationLinksFromDiscriminatorValue); },
            "meta": n => { this.meta = n.getObjectValue<PaginationMeta>(createPaginationMetaFromDiscriminatorValue); },
        };
    };
    /**
     * Gets the links property value. The links property
     * @returns a PaginationLinks
     */
    public get links() {
        return this._links;
    };
    /**
     * Sets the links property value. The links property
     * @param value Value to set for the links property.
     */
    public set links(value: PaginationLinks | undefined) {
        this._links = value;
    };
    /**
     * Gets the meta property value. The meta property
     * @returns a PaginationMeta
     */
    public get meta() {
        return this._meta;
    };
    /**
     * Sets the meta property value. The meta property
     * @param value Value to set for the meta property.
     */
    public set meta(value: PaginationMeta | undefined) {
        this._meta = value;
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeObjectValue<PaginationLinks>("links", this.links);
        writer.writeObjectValue<PaginationMeta>("meta", this.meta);
        writer.writeAdditionalData(this.additionalData);
    };
}
