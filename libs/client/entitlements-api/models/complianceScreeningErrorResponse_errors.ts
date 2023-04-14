import {AdditionalDataHolder, Parsable, ParseNode, SerializationWriter} from '@microsoft/kiota-abstractions';

export class ComplianceScreeningErrorResponse_errors implements AdditionalDataHolder, Parsable {
    /** Stores additional data not described in the OpenAPI description found when deserializing. Can be used for serialization as well. */
    private _additionalData: Record<string, unknown>;
    /** The error property */
    private _errorEscaped?: string | undefined;
    /** The identity property */
    private _identity?: string | undefined;
    /** The identityType property */
    private _identityType?: string | undefined;
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
     * Instantiates a new ComplianceScreeningErrorResponse_errors and sets the default values.
     */
    public constructor() {
        this._additionalData = {};
    };
    /**
     * Gets the error property value. The error property
     * @returns a string
     */
    public get errorEscaped() {
        return this._errorEscaped;
    };
    /**
     * Sets the error property value. The error property
     * @param value Value to set for the errorEscaped property.
     */
    public set errorEscaped(value: string | undefined) {
        this._errorEscaped = value;
    };
    /**
     * The deserialization information for the current model
     * @returns a Record<string, (node: ParseNode) => void>
     */
    public getFieldDeserializers() : Record<string, (node: ParseNode) => void> {
        return {
            "error": n => { this.errorEscaped = n.getStringValue(); },
            "identity": n => { this.identity = n.getStringValue(); },
            "identityType": n => { this.identityType = n.getStringValue(); },
        };
    };
    /**
     * Gets the identity property value. The identity property
     * @returns a string
     */
    public get identity() {
        return this._identity;
    };
    /**
     * Sets the identity property value. The identity property
     * @param value Value to set for the identity property.
     */
    public set identity(value: string | undefined) {
        this._identity = value;
    };
    /**
     * Gets the identityType property value. The identityType property
     * @returns a string
     */
    public get identityType() {
        return this._identityType;
    };
    /**
     * Sets the identityType property value. The identityType property
     * @param value Value to set for the identityType property.
     */
    public set identityType(value: string | undefined) {
        this._identityType = value;
    };
    /**
     * Serializes information the current object
     * @param writer Serialization writer to use to serialize this model
     */
    public serialize(writer: SerializationWriter) : void {
        if(!writer) throw new Error("writer cannot be undefined");
        writer.writeStringValue("error", this.errorEscaped);
        writer.writeStringValue("identity", this.identity);
        writer.writeStringValue("identityType", this.identityType);
        writer.writeAdditionalData(this.additionalData);
    };
}
