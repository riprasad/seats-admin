import {createSeatFromDiscriminatorValue} from './createSeatFromDiscriminatorValue';
import {ListPagination, Seat} from './index';
import {Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class ListSeatsResponsePagination extends ListPagination implements Parsable {
    /** The data property */
    private _data?: Seat[] | undefined;
    /**
     * Instantiates a new ListSeatsResponsePagination and sets the default values.
     */
    public constructor() {
        super();
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
        writer.writeCollectionOfObjectValues<Seat>("data", this.data);
    };
}
