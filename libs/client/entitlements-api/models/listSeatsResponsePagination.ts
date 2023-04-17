import {createSeatFromDiscriminatorValue} from './createSeatFromDiscriminatorValue';
import {ListPagination, Seat} from './index';
import {Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class ListSeatsResponsePagination extends ListPagination implements Parsable {
    /** The allowed property */
    private _allowed?: number | undefined;
    /** The consumed property */
    private _consumed?: number | undefined;
    /** The data property */
    private _data?: Seat[] | undefined;
    /**
     * Gets the allowed property value. The allowed property
     * @returns a int64
     */
    public get allowed() {
        return this._allowed;
    };
    /**
     * Sets the allowed property value. The allowed property
     * @param value Value to set for the allowed property.
     */
    public set allowed(value: number | undefined) {
        this._allowed = value;
    };
    /**
     * Instantiates a new ListSeatsResponsePagination and sets the default values.
     */
    public constructor() {
        super();
    };
    /**
     * Gets the consumed property value. The consumed property
     * @returns a int64
     */
    public get consumed() {
        return this._consumed;
    };
    /**
     * Sets the consumed property value. The consumed property
     * @param value Value to set for the consumed property.
     */
    public set consumed(value: number | undefined) {
        this._consumed = value;
    };
    /**
     * Gets the data property value. The data property
     * @returns a Seat
     */
    public get data() {
        return this._data;
    };
    /**
     * Sets the data property value. The data property
     * @param value Value to set for the data property.
     */
    public set data(value: Seat[] | undefined) {
        this._data = value;
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {...super.getFieldDeserializers(),
            "allowed": n => { this.allowed = n.getNumberValue(); },
            "consumed": n => { this.consumed = n.getNumberValue(); },
            "data": n => { this.data = n.getCollectionOfObjectValues<Seat>(createSeatFromDiscriminatorValue); },
        };
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        super.serialize(writer);
        writer.writeNumberValue("allowed", this.allowed);
        writer.writeNumberValue("consumed", this.consumed);
        writer.writeCollectionOfObjectValues<Seat>("data", this.data);
    };
}
