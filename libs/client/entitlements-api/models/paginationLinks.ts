import {AdditionalDataHolder, Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class PaginationLinks implements AdditionalDataHolder, Parsable {
    /** Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well. */
    private _additionalData: Record<string, unknown>;
    /** The first property */
    private _first?: string | undefined;
    /** The last property */
    private _last?: string | undefined;
    /** The next property */
    private _next?: string | undefined;
    /** The previous property */
    private _previous?: string | undefined;
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
     * Instantiates a new PaginationLinks and sets the default values.
     */
    public constructor() {
        this._additionalData = {};
    };
    /**
     * Gets the first property value. The first property
     * @returns a string
     */
    public get first() {
        return this._first;
    };
    /**
     * Sets the first property value. The first property
     * @param value Value to set for the first property.
     */
    public set first(value: string | undefined) {
        this._first = value;
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "first": n => { this.first = n.getStringValue(); },
            "last": n => { this.last = n.getStringValue(); },
            "next": n => { this.next = n.getStringValue(); },
            "previous": n => { this.previous = n.getStringValue(); },
        };
    };
    /**
     * Gets the last property value. The last property
     * @returns a string
     */
    public get last() {
        return this._last;
    };
    /**
     * Sets the last property value. The last property
     * @param value Value to set for the last property.
     */
    public set last(value: string | undefined) {
        this._last = value;
    };
    /**
     * Gets the next property value. The next property
     * @returns a string
     */
    public get next() {
        return this._next;
    };
    /**
     * Sets the next property value. The next property
     * @param value Value to set for the next property.
     */
    public set next(value: string | undefined) {
        this._next = value;
    };
    /**
     * Gets the previous property value. The previous property
     * @returns a string
     */
    public get previous() {
        return this._previous;
    };
    /**
     * Sets the previous property value. The previous property
     * @param value Value to set for the previous property.
     */
    public set previous(value: string | undefined) {
        this._previous = value;
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeStringValue("first", this.first);
        writer.writeStringValue("last", this.last);
        writer.writeStringValue("next", this.next);
        writer.writeStringValue("previous", this.previous);
        writer.writeAdditionalData(this.additionalData);
    };
}
